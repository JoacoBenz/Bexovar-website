import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { CaseStudySection } from "@/components/marketing/case-study-section";
import { PullQuote } from "@/components/marketing/pull-quote";
import { DemoCard } from "@/components/marketing/demo-card";
import { CTASection } from "@/components/sections/cta-section";
import { getContent } from "@/content/get-content";
import { isLocale, locales, defaultLocale } from "@/i18n/routing";
import { caseStudies } from "@/content/en/case-studies";
import { siteConfig } from "@/lib/site-config";
import { BilingualBanner } from "@/components/layout/bilingual-banner";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const { getCaseStudyBySlug } = await getContent(locale);
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case study not found — Bexovar" };
  const origin = "https://bexovar.io";
  const pathBase = `/case-studies/${slug}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, l === defaultLocale ? `${origin}${pathBase}` : `${origin}/${l}${pathBase}`]),
  );
  return {
    title: `${cs.industry} · ${cs.headlineMetric.value} — Case Study`,
    description: cs.headlineOutcome,
    alternates: { languages, canonical: languages[locale] },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const { getCaseStudyBySlug, demos, industryLabels, demoCategoryLabels } = await getContent(locale);
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const relatedDemos = cs.relatedDemoSlugs
    .map((slug) => demos.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  return (
    <>
      <section className="py-20 md:py-24 bg-bg-alt">
        <Container>
          {locale === "es" && (
            <div className="mb-6">
              <BilingualBanner />
            </div>
          )}
          <p className="text-eyebrow uppercase text-accent mb-4">
            {industryLabels[cs.industry]} · {cs.engagementLength}
          </p>
          <h1 className="text-h1 font-semibold text-ink max-w-3xl">{cs.headlineOutcome}</h1>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl">{cs.clientDescriptor}</p>
          <div className="mt-10 inline-flex items-baseline gap-3 rounded-lg bg-white px-6 py-4 shadow-sm">
            <span className="text-4xl font-semibold text-ink">{cs.headlineMetric.value}</span>
            <span className="text-sm text-ink-muted">{cs.headlineMetric.label}</span>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-3xl">
            <CaseStudySection title="The Situation" body={cs.situation} />
            <CaseStudySection title="What We Built" body={cs.whatWeBuilt} />
            <CaseStudySection title="The Outcome" body={cs.outcome} />
            {cs.pullQuotes.map((q, i) => (
              <PullQuote key={i} quote={q.quote} attribution={q.attribution} />
            ))}
            <CaseStudySection title="How It Was Delivered" body={cs.delivery} />
          </div>
        </Container>
      </section>

      {relatedDemos.length > 0 && (
        <section className="py-16 md:py-20 bg-bg-alt">
          <Container>
            <p className="text-eyebrow uppercase text-accent mb-4">Related demos</p>
            <h2 className="text-h2 font-semibold text-ink">See the pieces in action</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedDemos.map((d) => (
                <DemoCard key={d.slug} demo={d} categoryLabel={demoCategoryLabels[d.category]} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection
        heading="Want a result like this?"
        subtitle="A 30-minute discovery call is the fastest way to find out if we're a fit."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.tertiary}
      />
    </>
  );
}
