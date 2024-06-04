import react from "@vitejs/plugin-react"
import path from "node:path"
import { configDefaults } from "vitest/config"

/** @type {import("vitest/config").UserConfig} */
const config = {
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./mocks/setup.ts",
    root: "./src",
    coverage: {
      reporter: ["text", "html"],
      reportsDirectory: "../coverage",
      provider: "v8",
      exclude: [
        ...configDefaults.exclude,
        "**/mocks/**",
        "**/types/**",
        "**/providers.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}

export default config
