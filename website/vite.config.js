import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { vitePreprocess } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  preprocess: vitePreprocess(),
  optimizeDeps: {
    include: ["lodash.get", "lodash.isequal", "lodash.clonedeep"],
  },
});
