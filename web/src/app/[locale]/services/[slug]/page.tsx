import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/sections/section-header";
import { getContent } from "@/content/get-content";
import { isLocale, locales, defaultLocale } from "@/i18n/routing";
import { serviceSlugs } from "@/content/en/services";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceSlugs.map((slug) => ({ locale, slug })),
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
  const { getService } = await getContent(locale);
  const s = getService(slug);
  if (!s) return {};
  const origin = "https://bexovar.io";
  const pathBase = `/services/${slug}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, l === defaultLocale ? `${origin}${pathBase}` : `${origin}/${l}${pathBase}`]),
  );
  return { title: s.title, description: s.tagline, alternates: { languages, canonical: languages[locale] } };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const tCta = await getTranslations("cta");
  const { getService } = await getContent(locale);
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl">
          <p className="text-eyebrow uppercase text-accent mb-4">{service.hero.eyebrow}</p>
          <h1 className="text-display text-ink">{service.hero.title}</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-2xl">{service.hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={siteConfig.cta.primary.href} size="lg">
              {tCta("bookCall")}
            </Button>
            <Button href={siteConfig.cta.secondary.href} variant="secondary" size="lg">
              {tCta("requestProposal")}
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="In practice"
            title="What this looks like"
            subtitle="A few examples of recent shipments in this area."
          />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {service.examples.map((ex, i) => (
              <li key={i} className="rounded-lg border border-border bg-white p-6 shadow-sm text-ink-muted">
                {ex}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="Demos" title="See it work" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {service.demos.map((d) => (
              <div
                key={d.title}
                className="rounded-lg border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="text-h3 text-ink">{d.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{d.summary}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link href="/demos" className="text-accent hover:text-accent-hover">
              Browse full demo gallery →
            </Link>
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <div className="rounded-2xl border border-border bg-white p-10 md:p-14 shadow-sm">
            <p className="text-eyebrow uppercase text-accent mb-3">Mini case</p>
            <h2 className="text-h2 text-ink">{service.miniCase.headline}</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl">{service.miniCase.summary}</p>
            <Link href="/case-studies" className="mt-6 inline-block text-accent font-semibold hover:text-accent-hover">
              See more cases →
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader eyebrow="How we deliver" title="Four phases, every time" />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((p, i) => (
              <li key={p.title} className="rounded-lg border border-border bg-white p-6 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent font-bold">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-h3 text-ink">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{p.summary}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTASection
        heading={`Ready to scope ${service.title.toLowerCase()}?`}
        subtitle="30-min call. We'll show you a live demo on your workflow."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.secondary}
      />
    </>
  );
}
