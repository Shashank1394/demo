import { createSitecoreRevalidateRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import sites from ".sitecore/sites.json";
import { SITECORE_CONTENT_CACHE_TAG } from "src/lib/sitecore-cache";

const { POST: sitecoreRevalidate } = createSitecoreRevalidateRouteHandler({
  sites,
  defaultLocale: "en",
  secret: process.env.SITECORE_REVALIDATE_SECRET,
});

export async function POST(request: NextRequest) {
  // Experience Edge OnUpdate webhooks contain the changed item identifiers. The
  // Content SDK maps them to selective tags; this tag also covers datasource
  // changes that are not directly associated with a route item.
  const response = await sitecoreRevalidate(request);

  if (response.ok) {
    revalidateTag(SITECORE_CONTENT_CACHE_TAG, "max");
  }

  return response;
}
