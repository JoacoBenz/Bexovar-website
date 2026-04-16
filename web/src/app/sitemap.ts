import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/routing";
import { serviceSlugs } from "@/content/en/services";
import { caseStudies } from "@/content/en/case-studies";

const origin = "https://bexovar.io";

const staticPaths = ["/", "/services", "/demos", "/how-we-work", "/about", "/case-studies"];

function localizedUrl(path: string, locale: string): string {
  const suffix = path === "/" ? "" : path;
  return locale === defaultLocale ? `${origin}${suffix || "/"}` : `${origin}/${locale}${suffix}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: localizedUrl(path, defaultLocale),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(path, l)])),
      },
    });
  }

  for (const slug of serviceSlugs) {
    const path = `/services/${slug}`;
    entries.push({
      url: localizedUrl(path, defaultLocale),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(path, l)])),
      },
    });
  }

  for (const cs of caseStudies) {
    const path = `/case-studies/${cs.slug}`;
    entries.push({
      url: localizedUrl(path, defaultLocale),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(path, l)])),
      },
    });
  }

  return entries;
}
