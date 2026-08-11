import { createSitecoreRevalidateRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
import sites from ".sitecore/sites.json";

export const { POST } = createSitecoreRevalidateRouteHandler({
  sites,
  defaultLocale: "en",
  secret: process.env.SITECORE_REVALIDATE_SECRET,
});
