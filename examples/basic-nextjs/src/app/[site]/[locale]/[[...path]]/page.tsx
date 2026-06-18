import { isDesignLibraryPreviewData } from "@sitecore-content-sdk/nextjs/editing";
import { notFound } from "next/navigation";
import { draftMode, headers as nextHeaders } from "next/headers";
import { SiteInfo } from "@sitecore-content-sdk/nextjs";
import sites from ".sitecore/sites.json";
import { routing } from "src/i18n/routing";
import scConfig from "sitecore.config";
import client from "src/lib/sitecore-client";
import Layout, { RouteFields } from "src/Layout";
import components from ".sitecore/component-map";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { getBaseUrl } from "lib/utils";

type PageProps = {
  params: Promise<{
    site: string;
    locale: string;
    path?: string[];
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { site, locale, path } = await params;
  const draft = await draftMode();

  setRequestLocale(`${site}_${locale}`);

  const currentPath = path ?? [];

  let page;
  let cardSlug: string | undefined;

  if (draft.isEnabled) {
    const headers = await nextHeaders();
    const previewData = client.getPreviewData(headers);

    if (isDesignLibraryPreviewData(previewData)) {
      page = await client.getDesignLibraryData(previewData);
    } else {
      page = await client.getPreview(previewData);
    }
  } else {
    page = await client.getPage(currentPath, {
      site,
      locale,
    });

    if (
      !page &&
      currentPath.length === 2 &&
      currentPath[0].toLowerCase() === "cards"
    ) {
      cardSlug = currentPath[1];

      page = await client.getPage(["cards", "card-details"], {
        site,
        locale,
      });
    }
  }

  if (!page) {
    notFound();
  }

  if (cardSlug && page?.layout?.sitecore?.context) {
    (page.layout.sitecore.context as Record<string, unknown>).cardSlug =
      cardSlug;
  }

  const componentProps = await client.getComponentData(
    page.layout,
    {},
    components,
  );

  return (
    <NextIntlClientProvider>
      <Providers page={page} componentProps={componentProps}>
        <Layout page={page} />
      </Providers>
    </NextIntlClientProvider>
  );
}

export const generateStaticParams = async () => {
  if (process.env.NODE_ENV !== "development" && scConfig.generateStaticPaths) {
    const defaultSite = scConfig.defaultSite;

    const allowedSites = defaultSite
      ? sites
          .filter((site: SiteInfo) => site.name === defaultSite)
          .map((site: SiteInfo) => site.name)
      : sites.map((site: SiteInfo) => site.name);

    return await client.getAppRouterStaticParams(
      allowedSites,
      routing.locales.slice(),
    );
  }

  return [];
};

export const generateMetadata = async ({ params }: PageProps) => {
  const baseUrl = getBaseUrl();

  const { path, site, locale } = await params;

  const pathSegment = path?.length ? `/${path.join("/")}` : "";
  const canonicalUrl = baseUrl ? `${baseUrl}${pathSegment}` : undefined;

  const currentPath = path ?? [];

  let page = await client.getPage(currentPath, {
    site,
    locale,
  });

  if (
    !page &&
    currentPath.length === 2 &&
    currentPath[0].toLowerCase() === "cards"
  ) {
    page = await client.getPage(["cards", "card-details"], {
      site,
      locale,
    });
  }

  if (!page) {
    return {};
  }

  const fields = page?.layout.sitecore.route?.fields as RouteFields;

  const keywordsString = fields?.metadataKeywords?.value?.toString() || "";

  const keywords = keywordsString
    ? keywordsString.split(",").map((k: string) => k.trim())
    : [];

  return {
    title: fields?.Title?.value?.toString() || "Page",
    description:
      fields?.ogDescription?.value?.toString() ||
      fields?.metadataDescription?.value?.toString() ||
      "Sitecore Next.js Basic Example",
    keywords,
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    openGraph: {
      title: fields?.ogTitle?.value?.toString() || "Page",
      description:
        fields?.ogDescription?.value?.toString() ||
        fields?.metadataDescription?.value?.toString() ||
        "Sitecore Next.js Basic Example",
      url: canonicalUrl,
      images: fields?.ogImage?.value?.src || fields?.thumbnailImage?.value?.src,
    },
  };
};
