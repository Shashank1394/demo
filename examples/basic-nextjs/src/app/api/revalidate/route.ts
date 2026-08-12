import { NextRequest } from "next/server";
import { createSitecoreRevalidateRouteHandler } from "@sitecore-content-sdk/nextjs/route-handler";
import sites from ".sitecore/sites.json";

const { POST: sitecoreRevalidate } = createSitecoreRevalidateRouteHandler({
  sites,
  defaultLocale: "en",
  secret: process.env.SITECORE_REVALIDATE_SECRET,
});

export async function POST(request: NextRequest) {
  console.log("========== SITECORE REVALIDATION ==========");

  console.log("User-Agent:", request.headers.get("user-agent"));
  console.log("Content-Type:", request.headers.get("content-type"));

  const body = await request.clone().text();

  console.log("WEBHOOK BODY:");
  console.log(body);

  const response = await sitecoreRevalidate(request);

  console.log("REVALIDATION STATUS:", response.status);

  console.log("============================================");

  return response;
}
