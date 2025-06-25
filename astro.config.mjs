// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://mikhuy-ld.netlify.app/",
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), sitemap()],
});