import type { Metadata } from "next";
import { HeroOutcomes } from "@/components/sections/hero-outcomes";
import { ProofStrip } from "@/components/sections/proof-strip";
import { DemosStrip } from "@/components/sections/demos-strip";
import { ServicesGrid } from "@/components/sections/services-grid";
import { FeaturedCase } from "@/components/sections/featured-case";
import { ProcessStrip } from "@/components/sections/process-strip";
import { CTASection } from "@/components/sections/cta-section";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { home } from "@/content/home";
import { getFeaturedDemos } from "@/content/demos";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  description:
    "Bexovar builds custom software and intelligent automation for mid-market operators. Cut operational cost 30–60%. Book a call to see a live demo on your workflow.",
};

export default function HomePage() {
  return (
    <>
      <HeroOutcomes
        eyebrow={home.hero.eyebrow}
        title={home.hero.title}
        body={home.hero.body}
        industries={home.hero.industries}
        primary={siteConfig.cta.primary}
        secondary={{ href: "/demos", label: "See demos" }}
      />
      <ProofStrip metrics={home.metrics} />
      <DemosStrip demos={getFeaturedDemos()} />

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="What we build"
            subtitle="Most engagements blend these. We help you pick the mix."
          />
          <div className="mt-10">
            <ServicesGrid
              withContainer={false}
              items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }))}
            />
          </div>
        </Container>
      </section>

      <FeaturedCase {...home.featuredCase} />
      <ProcessStrip steps={home.process} />
      <CTASection
        heading={home.closingCta.heading}
        subtitle={home.closingCta.subtitle}
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
