import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";
import vitePluginImp from "vite-plugin-imp";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  resolve: {},
  plugins: [
    react(),
    vitePluginImp({
      libList: [],
    }),
    svgr({
      exportAsDefault: false,
      include: "**/*.svg",
      svgrOptions: {
        memo: true,
      },
    }),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dts: "src/auto-import.d.ts", // 生成 `auto-import.d.ts` 全局声明
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
