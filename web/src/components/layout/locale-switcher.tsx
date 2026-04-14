"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const current = useLocale() as Locale;
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  function go(next: Locale) {
    if (next === current) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("languageGroupLabel")}
      className="inline-flex overflow-hidden rounded-full border border-border text-xs"
    >
      {locales.map((l, i) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            onClick={() => go(l)}
            className={cn(
              "px-2.5 py-1 uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
              i > 0 && "border-l border-border",
              active ? "bg-ink text-white" : "bg-white text-ink-muted hover:text-ink",
            )}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
