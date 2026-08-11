import { getRequestConfig, GetRequestConfigParams } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { getDictionary } from "src/lib/cached-functions";

export default getRequestConfig(
  async ({ requestLocale }: GetRequestConfigParams) => {
    // set by the catch-all route setRequestLocale
    // to support SSG and multisite here we expect both site and locale
    // in the format {site}_{locale}
    const requested = await requestLocale;

    const [parsedSite, parsedLocale] = requested?.split("_") || [];

    const locale = hasLocale(routing.locales, parsedLocale)
      ? parsedLocale
      : routing.defaultLocale;

    const messages: Record<string, object> = {};

    messages[parsedSite] = await getDictionary({
      locale,
      site: parsedSite,
    });

    return {
      locale,
      messages,
    };
  },
);
