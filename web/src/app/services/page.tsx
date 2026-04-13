import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CTASection } from "@/components/sections/cta-section";
import { servicesOverview, services } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Services",
  description: servicesOverview.body,
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            eyebrow={servicesOverview.eyebrow}
            title={servicesOverview.title}
            subtitle={servicesOverview.body}
          />
          <div className="mt-12">
            <ServicesGrid
              withContainer={false}
              items={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }))}
            />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl text-center">
          <h2 className="text-h2 text-ink">{servicesOverview.midCta.heading}</h2>
          <p className="mt-4 text-lg text-ink-muted">{servicesOverview.midCta.subtitle}</p>
        </Container>
      </section>

      <CTASection
        heading="Ready to scope a project?"
        subtitle="30-min call. No slides."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
