import path from "path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg"
    })
  ],
  envDir: "../../",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@genz-deezer/core": path.resolve(__dirname, "../../packages/core/src/index.ts"),
      "@genz-deezer/infrastructure": path.resolve(
        __dirname,
        "../../packages/infrastructure/src/index.ts"
      )
    }
  }
})
