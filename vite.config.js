import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // Plugins array must be properly closed
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Ensure these extensions are resolved
  },
});
