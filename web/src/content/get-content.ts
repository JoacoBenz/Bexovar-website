import type { Locale } from "@/i18n/routing";

export async function getContent(locale: Locale) {
  if (locale === "es") return await import("./es");
  return await import("./en");
}

export type Content = Awaited<ReturnType<typeof getContent>>;
