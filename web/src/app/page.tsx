import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase text-accent mb-4">Foundation preview</p>
            <h1 className="text-display text-ink">
              Bexovar site foundation
            </h1>
            <p className="mt-6 text-lg text-ink-muted max-w-xl">
              This page is a placeholder exercising the design system and shared components.
              Real homepage content lands in Plan 2.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={siteConfig.cta.primary.href} size="lg">Book a call</Button>
              <Button href="#" variant="secondary" size="lg">Secondary action</Button>
            </div>
          </div>
          <OrbitalGraphic />
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Primitives"
            title="Cards render like this"
            subtitle="Verifying the Card primitive with hover elevation."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card><h3 className="text-h3">Custom Software</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
            <Card><h3 className="text-h3">RPA & Agents</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
            <Card><h3 className="text-h3">Integrations</h3><p className="mt-2 text-ink-muted">Placeholder.</p></Card>
          </div>
        </Container>
      </section>

      <CTASection
        heading="Ready to see what this looks like on your workflow?"
        subtitle="30-min call. We'll show you a live demo built around your actual process."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
