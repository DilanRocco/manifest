import { resolve } from 'node:path'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
  },
});