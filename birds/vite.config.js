import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
// Node >=17
import manifest from './manifest.json' assert { type: 'json' } 

export default defineConfig({
  plugins: [react(), crx({ manifest })],
  optimizer: {
    include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
  },
});