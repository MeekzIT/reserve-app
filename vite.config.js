// import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react";
// import svgrPlugin from "vite-plugin-svgr";

// export default defineConfig({
//   build: {
//     outDir: "build",
//   },
//   plugins: [
//     reactRefresh(),
//     svgrPlugin({
//       svgrOptions: {
//         icon: true,
//       },
//     }),
//   ],
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import fs from "fs/promises";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3001,
    host: "127.0.0.1",
    hmr: {
      clientPort: 3001,
    },
    proxy: {
      '/api': {
        target: 'http://154.49.137.44:5000',
        changeOrigin: true,
      },
    },
    // host: "154.49.137.44",
  },
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: "load-js-files-as-jsx",
          setup(build) {
            build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
              loader: "jsx",
              contents: await fs.readFile(args.path, "utf8"),
            }));
          },
        },
      ],
    },
  },
  plugins: [react()],
});
