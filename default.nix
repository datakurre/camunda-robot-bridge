{ pkgs ? import ./nix { nixpkgs = sources."nixpkgs-21.05"; }
, sources ? import ./nix/sources.nix
}:

let sitePackages = ./lib; in

pkgs.buildEnv {
  name = "robot";
  paths = with pkgs; [
    (poetry2nix.mkPoetryEnv { projectDir = ./.; })
    firefox
    geckodriver
  ];
  buildInputs = with pkgs; [
    makeWrapper
  ];
  postBuild = ''
    wrapProgram $out/bin/robot \
      --prefix PATH : $out/bin \
      --prefix PYTHONPATH : ${sitePackages}
  '';
}
