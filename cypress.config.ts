import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:1337",
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
