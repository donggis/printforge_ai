import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

const REPO_BASE_PATH = "/printforge_ai/";

const resolveBasePath = () => {
  try {
    const isProdBuild =
      process.env.NODE_ENV === "production" ||
      process.env.BUILD_FOR_PAGES === "true" ||
      process.env.CI === "true" ||
      process.env.GITHUB_ACTIONS === "true";

    if (isProdBuild) {
      return REPO_BASE_PATH;
    }
    if (process.env.VITE_BASE_PATH) {
      return process.env.VITE_BASE_PATH;
    }
    return "/";
  } catch (error) {
    console.error("Failed to resolve base path:", error);
    return "/";
  }
};

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: resolveBasePath(),
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: false,
    open: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
}));