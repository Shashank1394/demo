import {
  buildSitecoreDictionaryCacheTag,
  collectSitecorePageCacheTags,
  ErrorPage,
} from "@sitecore-content-sdk/nextjs";
import { cacheTag } from "next/cache";
import { SITECORE_CONTENT_CACHE_TAG } from "./sitecore-cache";
import client from "./sitecore-client";

export async function getPage(
  path: string[],
  { site, locale }: { site: string; locale: string },
) {
  "use cache";

  const result = await client.getPage(path, {
    site,
    locale,
  });

  cacheTag(
    SITECORE_CONTENT_CACHE_TAG,
    ...collectSitecorePageCacheTags({
      path: `/${path.join("/")}`,
      site,
      locale,
      route: result?.layout.sitecore.route,
    }),
  );

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

  const dictionary = await client.getDictionary({
    site,
    locale,
  });

  cacheTag(
    SITECORE_CONTENT_CACHE_TAG,
    buildSitecoreDictionaryCacheTag({ site, locale }),
  );

  return dictionary;
}
