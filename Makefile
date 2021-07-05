PYTHON ?= python39
NIX_OPTIONS ?= --argstr python $(PYTHON)

CACHIX_CACHE = vasara-bpm

.PHONY: all
all: build

build: requirements-$(PYTHON).nix
	$(RM) build
	nix-build $(NIX_OPTIONS) setup.nix -A build -o build

.PHONY: cache
cache:
	nix-store --query \
	--references $$(nix-instantiate shell.nix) \
	--references $$(nix-instantiate setup.nix) | \
	xargs nix-store --realise | xargs nix-store --query --requisites | cachix push $(CACHIX_CACHE)

.PHONY: clean
clean:
	rm -rf .cache env result

.PHONY: coverage
coverage: htmlcov

.PHONY: format
format:
	black -t py37 src tests
	isort src tests

.PHONY: shell
shell:
	nix-shell $(NIX_OPTIONS) setup.nix -A shell

.PHONY: check
check:
	black --check -t py37 src tests
	isort -c src tests
	MYPYPATH=$(PWD)/stubs mypy --show-error-codes --strict src tests
	pylama src test

.PHONY: watch
watch: init_vault
	uvicorn app.main:app --reload

.PHONY: run
run: init_vault
	uvicorn app.main:app --port 8000

.PHONY: init_vault
init_vault:
	vault secrets enable -path=transit/default transit || true
	vault write -f transit/default/keys/test1 || true

.PHONY: watch_mypy
watch_mypy:
	find src tests -name "*.py"|MYPYPATH=$(PWD)/stubs entr mypy --show-error-codes --strict src tests

.PHONY: watch_pytest
watch_pytest:
	find src tests -name "*.py"|entr pytest tests

.PHONY: watch_tests
watch_tests:
	  $(MAKE) -j watch_mypy watch_pytest

.PHONY: pytest
pytest:
	pytest --cov=app tests

.PHONY: test
test: check pytest

env: requirements-$(PYTHON).nix
	nix-build $(NIX_OPTIONS) setup.nix -A env -o env

###

nix-%:
	nix-shell $(NIX_OPTIONS) setup.nix -A shell --run "$(MAKE) $*"

.coverage: test

htmlcov: .coverage
	coverage html

.cache:
	@mkdir -p .cache
	@if [ -d ~/.cache/pip ]; then ln -s ~/.cache/pip ./.cache; fi

.PHONY: requirements
requirements: .cache requirements-$(PYTHON).nix

requirements-$(PYTHON).nix: .cache requirements-$(PYTHON).txt
	HOME=$(PWD) NIX_CONF_DIR=$(PWD) pip2nix generate -r requirements-$(PYTHON).txt --output=requirements-$(PYTHON).nix

requirements-$(PYTHON).txt: .cache requirements.txt
	HOME=$(PWD) NIX_CONF_DIR=$(PWD) pip2nix generate -r requirements.txt --output=requirements-$(PYTHON).nix
	@grep "pname =\|version =" requirements-$(PYTHON).nix|awk "ORS=NR%2?FS:RS"|sed 's|.*"\(.*\)";.*version = "\(.*\)".*|\1==\2|' > requirements-$(PYTHON).txt
