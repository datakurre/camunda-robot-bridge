{ pkgs ? import ../nix { nixpkgs = sources."nixpkgs-20.09"; }
, sources ? import ../nix/sources.nix
, python ? "python39"
, pythonPackages ? builtins.getAttr (python + "Packages") pkgs
, requirements ?  ./. + "/requirements-${python}.nix"
, buildInputs ? []
, propagatedBuildInputs ? with pkgs; [ firefox geckodriver ]
}:

with builtins;
with pkgs;
with pkgs.lib;

let

  # Requirements for generating requirements.nix
  requirementsBuildInputs = [ cacert nix nix-prefetch-git ];

  # Load generated requirements
  requirementsFunc = import requirements {
    inherit pkgs;
    inherit (builtins) fetchurl;
    inherit (pkgs) fetchgit fetchhg;
  };

  # List package names in requirements
  requirementsNames = attrNames (requirementsFunc {} {});

  # Return base name from python drv name or name when not python drv
  pythonNameOrName = drv:
    if hasAttr "overridePythonAttrs" drv && hasAttr "pname" drv then drv.pname else drv.name;

  # Merge named input list from nixpkgs drv with input list from requirements drv
  mergedInputs = old: new: inputsName: self: super:
    (attrByPath [ inputsName ] [] new) ++ map
    (x: attrByPath [ (pythonNameOrName x) ] x self)
    (filter (x: !isNull x) (attrByPath [ inputsName ] [] old));

  # Merge package drv from nixpkgs drv with requirements drv
  mergedPackage = old: new: self: super:
    if isString new.src
       && !isNull (match ".*\.whl" new.src)  # do not merge build inputs for wheels
       && new.pname != "wheel"               # ...
    then new.overridePythonAttrs(old: rec {
      propagatedBuildInputs =
        mergedInputs old new "propagatedBuildInputs" self super;
    })
    else old.overridePythonAttrs(old: rec {
      inherit (new) pname version src;
      name = "${pname}-${version}";
      checkInputs =
        mergedInputs old new "checkInputs" self super;
      buildInputs =
        mergedInputs old new "buildInputs" self super;
      nativeBuildInputs =
        mergedInputs old new "nativeBuildInputs" self super;
      propagatedBuildInputs =
        mergedInputs old new "propagatedBuildInputs" self super;
      doCheck = false;
    });

  # Build python with manual aliases for naming differences between world and nix
  buildPython = (pythonPackages.python.override {
    packageOverrides = self: super:
      listToAttrs (map (name: {
        name = name; value = getAttr (getAttr name aliases) super;
      }) (filter (x: hasAttr (getAttr x aliases) super) (attrNames aliases)));
  });

  # Build target python with all generated & customized requirements
  targetPython = (buildPython.override {
    packageOverrides = self: super:
      # 1) Merge packages already in pythonPackages
      let super_ = (requirementsFunc self buildPython.pkgs);  # from requirements
          results = (listToAttrs (map (name: let new = getAttr name super_; in {
        inherit name;
        value = mergedPackage (getAttr name buildPython.pkgs) new self super_;
      })
      (filter (name: hasAttr "overridePythonAttrs"
                     (if (tryEval (attrByPath [ name ] {} buildPython.pkgs)).success
                      then (attrByPath [ name ] {} buildPython.pkgs) else {}))
       requirementsNames)))
      // # 2) with packages only in requirements or disabled in nixpkgs
      (listToAttrs (map (name: { inherit name; value = (getAttr name super_); })
      (filter (name: (! ((hasAttr name buildPython.pkgs) &&
                         (tryEval (getAttr name buildPython.pkgs)).success)))
       requirementsNames)));
      in # 3) finally, apply overrides (with aliased drvs mapped back)
      (let final = (super // (results //
        (listToAttrs (map (name: {
          name = getAttr name aliases; value = getAttr name results;
        }) (filter (x: hasAttr x results) (attrNames aliases))))
      )); in (final // (overrides self final)));
    self = buildPython;
  });

  # Alias packages with different names in requirements and in nixpkgs
  aliases = {
    "Pillow" = "pillow";
    "PySocks" = "pysocks";
    "Xlib" = "xlib";
    "typing-extensions" = "typing_extensions";
  };

  # Final overrides to fix issues all the magic above cannot fix automatically
  overrides = self: super: {
    "jsonschema" = super."jsonschema".overridePythonAttrs(old: {
      nativeBuildInputs = old.nativeBuildInputs ++ [ self."importlib-metadata" ];
    });
    "mouseinfo" = super."mouseinfo".overridePythonAttrs(old: {
      propagatedBuildInputs = old.propagatedBuildInputs ++ [ self."pillow" ];
    });
    "notifiers" = super."notifiers".overridePythonAttrs(old: {
      nativeBuildInputs = old.nativeBuildInputs ++ [ self."importlib-metadata" ];
    });
    "pynput-robocorp-fork" = super."pynput-robocorp-fork".overridePythonAttrs(old: {
      # requires python-xlib, which conflicts with python3-Xlib
      pipInstallFlags = [ "--no-dependencies" ];
    });
    "pyscreeze" = super."pyscreeze".overridePythonAttrs(old: {
      propagatedBuildInputs = old.propagatedBuildInputs ++ [ pkgs.scrot self.pillow ];
    });
    "python-xlib" = self."python3-Xlib";
    "rpaframework" = super."rpaframework".overridePythonAttrs(old: {
      # requires python-xlib, which conflicts with python3-Xlib
      pipInstallFlags = [ "--no-dependencies" ];
    });
    "tweepy" = super."tweepy".overridePythonAttrs(old: {
      propagatedBuildInputs = old.propagatedBuildInputs ++ [ self.pysocks ];
    });
  };

in rec {

  inherit pkgs;

  python = (targetPython.withPackages(ps:
  (map (name: getAttr name ps) requirementsNames)
  ++ [ ps.opencv3 ]
  ));

}
