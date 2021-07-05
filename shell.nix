{ pkgs ? import ./nix { nixpkgs = sources."nixpkgs-21.05"; }
, sources ? import ./nix/sources.nix
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    poetry
    poetry2nix.cli
  ];
}
