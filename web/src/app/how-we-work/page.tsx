import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { MethodologyPhase } from "@/components/marketing/methodology-phase";
import { ValueCard } from "@/components/marketing/value-card";
import { Faq } from "@/components/marketing/faq";
import { howWeWork } from "@/content/how-we-work";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How we work",
  description: howWeWork.hero.body,
};

export default function HowWeWorkPage() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-eyebrow uppercase text-accent mb-4">{howWeWork.hero.eyebrow}</p>
            <h1 className="text-display text-ink">{howWeWork.hero.title}</h1>
            <p className="mt-6 text-lg text-ink-muted max-w-xl">{howWeWork.hero.body}</p>
          </div>
          <OrbitalGraphic />
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader eyebrow="The four phases" title="Same shape every time" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {howWeWork.phases.map((p) => (
              <MethodologyPhase key={p.number} phase={p} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Why this works" title="What makes this different" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {howWeWork.differentiators.map((d) => (
              <ValueCard key={d.title} title={d.title} body={d.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow="Questions" title="Things execs usually ask" />
          <div className="mt-10">
            <Faq items={howWeWork.faq} />
          </div>
        </Container>
      </section>

      <CTASection
        heading={howWeWork.closingCta.heading}
        subtitle={howWeWork.closingCta.subtitle}
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
