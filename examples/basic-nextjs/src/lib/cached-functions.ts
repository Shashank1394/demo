import { ErrorPage } from "@sitecore-content-sdk/nextjs";
import client from "./sitecore-client";

export async function getPage(
  path: string[],
  { site, locale }: { site: string; locale: string },
) {
  "use cache";

  console.log("========== GET PAGE ==========");
  console.log({
    path,
    site,
    locale,
    timestamp: new Date().toISOString(),
  });

  const result = await client.getPage(path, {
    site,
    locale,
  });

  console.log("========== GET PAGE COMPLETE ==========");

  return result;
}

export async function getErrorPage(
  code: ErrorPage,
  { site, locale }: { site: string; locale: string },
) {
  "use cache";

  return client.getErrorPage(code, {
    site,
    locale,
  });
}

export async function getDictionary({
  site,
  locale,
}: {
  site: string;
  locale: string;
}) {
  "use cache";

  return client.getDictionary({
    site,
    locale,
  });
}
