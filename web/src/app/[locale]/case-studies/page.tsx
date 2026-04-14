import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CaseStudiesBrowser } from "@/components/sections/case-studies-browser";
import { CTASection } from "@/components/sections/cta-section";
import { getContent } from "@/content/get-content";
import { isLocale } from "@/i18n/routing";
import type { ServiceSlug } from "@/content/en/case-studies";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Studies — Bexovar",
  description:
    "Anonymized engagements that back our headline numbers. Filter by industry or service to see what we've actually shipped.",
};

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const { caseStudies, caseStudyIndustries, caseStudyServices, serviceLabelBySlug, industryLabels } = await getContent(locale);

  const serviceLabels = Object.fromEntries(
    caseStudyServices.map((s: ServiceSlug) => [s, serviceLabelBySlug(s) ?? s]),
  ) as Record<string, string>;

  return (
    <>
      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Case studies"
            title="Proof, not promises"
            subtitle="Anonymized engagements with mid-market operators. Filter by industry or service to see what we've actually shipped."
          />
          <div className="mt-10">
            <CaseStudiesBrowser
              caseStudies={caseStudies}
              industries={caseStudyIndustries}
              serviceSlugs={caseStudyServices}
              serviceLabels={serviceLabels}
              industryLabels={industryLabels}
            />
          </div>
        </Container>
      </section>
      <CTASection
        heading="Want one of these outcomes for your team?"
        subtitle="A 30-minute discovery call is the fastest way to find out if we're a fit."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.tertiary}
      />
    </>
  );
}
