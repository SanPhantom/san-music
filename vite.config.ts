import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
      include: "**/*.svg",
      svgrOptions: {
        memo: true,
      },
    }),
  ],
  optimizeDeps: {
    include: [],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            "./src/assets/less/base.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
