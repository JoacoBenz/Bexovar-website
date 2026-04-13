import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CaseStudiesBrowser } from "@/components/sections/case-studies-browser";
import { CTASection } from "@/components/sections/cta-section";
import {
  caseStudies,
  caseStudyIndustries,
  caseStudyServices,
} from "@/content/case-studies";
import { serviceLabelBySlug } from "@/content/services";
import type { ServiceSlug } from "@/content/case-studies";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Case Studies — Bexovar",
  description:
    "Anonymized engagements that back our headline numbers. Filter by industry or service to see what we've actually shipped.",
};

const serviceLabels = Object.fromEntries(
  caseStudyServices.map((s: ServiceSlug) => [s, serviceLabelBySlug(s) ?? s]),
) as Record<string, string>;

export default function CaseStudiesPage() {
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
