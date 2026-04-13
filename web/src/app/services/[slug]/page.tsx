import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/sections/section-header";
import { getService, serviceSlugs } from "@/content/services";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.title, description: s.tagline };
}

export default async function ServiceDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
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
              {siteConfig.cta.primary.label}
            </Button>
            <Button href={siteConfig.cta.secondary.href} variant="secondary" size="lg">
              {siteConfig.cta.secondary.label}
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
