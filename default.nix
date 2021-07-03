{ pkgs ? import ./nix { nixpkgs = sources."nixpkgs-21.05"; }
, sources ? import ./nix/sources.nix
}:

let

  dev_node_modules = (import ./nix/node-dev-composition.nix { inherit pkgs; }).package.override {
    src = builtins.filterSource (path: type:
      (baseNameOf path) == "package.json" ||
      (baseNameOf path) == "package-lock.json" ) ./.;
    preRebuild = ''
    '';
    postInstall = ''
      mv $out/lib/node_modules/*/node_modules /tmp/_; rm -rf $out; mv /tmp/_ $out
    '';
  };

  run_node_modules = (import ./nix/node-run-composition.nix { inherit pkgs; }).package.override {
    src = builtins.filterSource (path: type:
      (baseNameOf path) == "package.json" ||
      (baseNameOf path) == "package-lock.json" ) ./.;
    preRebuild = ''
    '';
    postInstall = ''
      mv $out/lib/node_modules/*/node_modules /tmp/_; rm -rf $out; mv /tmp/_ $out
    '';
  };

in

pkgs.stdenv.mkDerivation rec {
  name = "external-task-client";
  src = pkgs.gitignoreSource ./.;
  buildPhase = ''
    source $stdenv/setup;
    cp -a ${dev_node_modules} node_modules
    node_modules/.bin/tsc
  '';
  installPhase = ''
    source $stdenv/setup;
    mkdir -p $out/bin $out/var/lib/camunda-robot-bridge
    cp -a dist/* $out/var/lib/camunda-robot-bridge
    cat > $out/bin/camunda-robot-bridge << EOF
    #!/usr/bin/env sh
    cd $out/var/lib/camunda-robot-bridge && node .
    EOF
    chmod u+x $out/bin/camunda-robot-bridge
  '';
  postFixup = ''
    wrapProgram $out/bin/camunda-robot-bridge \
      --prefix PATH : ${pkgs.lib.makeBinPath propagatedBuildInputs} \
      --suffix NODE_ENV : production \
      --suffix NODE_PATH : ${run_node_modules}
  '';
  buildInputs = with pkgs; [ makeWrapper bindfs ];
  propagatedBuildInputs = with pkgs; [
    coreutils findutils gnused nodejs-14_x dev_node_modules
  ];
  shellHook = ''
    fusermount -qu node_modules
    mkdir -p node_modules
    bindfs ${dev_node_modules} node_modules -o nonempty
    export PATH=$(pwd)/node_modules/.bin:$PATH
  '';
}
