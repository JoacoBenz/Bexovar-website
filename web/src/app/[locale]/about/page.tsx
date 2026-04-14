import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { CTASection } from "@/components/sections/cta-section";
import { StatBlock } from "@/components/marketing/stat-block";
import { ValueCard } from "@/components/marketing/value-card";
import { getContent } from "@/content/get-content";
import { isLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const { about } = await getContent(locale);
  return {
    title: "About",
    description: about.hero.body,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const { about } = await getContent(locale);

  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="max-w-3xl">
          <p className="text-eyebrow uppercase text-accent mb-4">{about.hero.eyebrow}</p>
          <h1 className="text-display text-ink">{about.hero.title}</h1>
          <p className="mt-6 text-lg text-ink-muted">{about.hero.body}</p>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container className="max-w-3xl">
          <h2 className="text-h2 text-ink">{about.mission.title}</h2>
          <p className="mt-4 text-lg text-ink-muted">{about.mission.body}</p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Values" title="How we operate" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {about.values.map((v) => (
              <ValueCard key={v.title} title={v.title} body={v.body} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader eyebrow="By the numbers" title="A bit of context" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {about.stats.map((s) => (
              <StatBlock key={s.label} headline={s.headline} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        heading="Want to know if we're a fit?"
        subtitle="Book a 30-min call. If we're not, we'll tell you."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
