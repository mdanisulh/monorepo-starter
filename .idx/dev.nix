{ pkgs, ... }: {
  channel = "stable-24.05";

  packages = [ pkgs.bun ];

  env = { };

  idx = {
    extensions = [
      "bradlc.vscode-tailwindcss"
      "biomejs.biome"
      "esbenp.prettier-vscode"
      "yoavbls.pretty-ts-errors"
      "usernamehw.errorlens"
    ];

    workspace = {
      onCreate = {
        default.openFiles = [
          "README.md"
        ];
        bun-install = "bun install";
      };
      onStart = {
        dev = "bun run dev";
      };
    };
  };
}
