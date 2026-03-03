// EVA-STORY: F46-02-001
// EVA-STORY: F46-03-002
// EVA-FEATURE: F46-02 F46-03
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src'),
      // Spark design system -- sourced from 31-eva-faces shared packages
      '@eva/ui': resolve(projectRoot, '../31-eva-faces/shared/eva-ui/src'),
      '@eva/gc-design-system/tokens': resolve(projectRoot, '../31-eva-faces/shared/gc-design-system/src/tokens'),
      '@eva/gc-design-system': resolve(projectRoot, '../31-eva-faces/shared/gc-design-system/src'),
    }
  },
  server: {
    port: 5173,
    proxy: {
      // Proxy EVA Brain v2 API (port 8001) -- wired to eva-brain-api
      '/api/brain': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/brain/, ''),
      },
    },
  },
});
