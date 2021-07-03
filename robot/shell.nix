{ pkgs ? import ../nix { nixpkgs = sources."nixpkgs-21.05"; }
, sources ? import ../nix/sources.nix
}:

let sitePackages = ./site-packages; in

pkgs.mkShell {
  buildInputs = with pkgs; [
    poetry
    poetry2nix.cli
#   (import ./setup.nix { inherit pkgs; }).python
    firefox
    geckodriver
  ];
  shellHook = ''
    export PYTHONPATH=${sitePackages}:$PYTHONPATH
  '';
}
