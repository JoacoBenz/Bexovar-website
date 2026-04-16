import { useTranslations } from "next-intl";

export function BilingualBanner() {
  const t = useTranslations("caseStudyDetail");
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 px-4 py-3 text-sm text-ink">
      <p className="font-medium">{t("spanishNarrativeNoticeTitle")}</p>
      <p className="text-ink-muted">{t("spanishNarrativeNoticeBody")}</p>
    </div>
  );
}
