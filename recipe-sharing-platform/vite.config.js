import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // needed for Docker
    port: 3000,
  },
  // Enable absolute imports
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
