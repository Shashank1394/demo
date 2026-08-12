import { defineConfig } from "@sitecore-content-sdk/nextjs/config";

export default defineConfig({
  dictionary: {
    caching: {
      enabled: false,
    },
  },
});
