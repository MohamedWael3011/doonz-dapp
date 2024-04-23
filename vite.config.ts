import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  build: {
    target: 'esnext', // you can also use 'es2020' here
  },
  define: {
    "process.env": {
      VITE_TEMPLATE_CLIENT_ID: JSON.stringify(process.env.VITE_TEMPLATE_CLIENT_ID)
    },

  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext', // you can also use 'es2020' here
    },
  },
});
