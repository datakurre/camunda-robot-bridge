{ pkgs ? import ./nix { nixpkgs = sources."nixpkgs-21.05"; }
, sources ? import ./nix/sources.nix
}:

pkgs.mkShell {
  buildInputs = with pkgs; [
    entr
    gnumake
    nodejs-14_x
    node2nix
  ];
  shellHook = ''
    export SSL_CERT_FILE=${pkgs.cacert}/etc/ssl/certs/ca-bundle.crt
  '';
}
