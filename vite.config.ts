import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //TODO: just added for process.env error patch
  define: {
    "process.env": {},
  },
});
