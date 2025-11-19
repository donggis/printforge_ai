import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

const resolveBasePath = () => {
  try {
    const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];
    const runningOnPages = process.env.GITHUB_ACTIONS === "true";
    if (runningOnPages && repositoryName) {
      return `/${repositoryName}/`;
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