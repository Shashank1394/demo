import Link from "next/link";
import { ErrorPage, getCachedPageParams } from "@sitecore-content-sdk/nextjs";
import { getErrorPage } from "lib/cached-functions";
import scConfig from "sitecore.config";
import Layout from "src/Layout";
import Providers from "src/Providers";
import { NextIntlClientProvider } from "next-intl";

export default async function NotFound() {
  const { site, locale } = getCachedPageParams();

  try {
    const page = await getErrorPage(ErrorPage.NotFound, {
      site: site || scConfig.defaultSite,
      locale: locale || scConfig.defaultLanguage,
    });

    if (page) {
      return (
        <NextIntlClientProvider>
          <Providers page={page}>
            <Layout page={page} />
          </Providers>
        </NextIntlClientProvider>
      );
    }
  } catch (error) {
    console.error("Error fetching 404 page:", error);
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
