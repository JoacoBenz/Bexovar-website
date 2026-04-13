import Link from "next/link";
import { Container } from "@/components/layout/container";

export function FeaturedCase({
  eyebrow,
  title,
  summary,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
}) {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <div className="rounded-2xl border border-border bg-white p-10 md:p-14 shadow-sm">
          <p className="text-eyebrow uppercase text-accent mb-4">{eyebrow}</p>
          <h2 className="text-h2 text-ink max-w-3xl">{title}</h2>
          <p className="mt-4 text-lg text-ink-muted max-w-2xl">{summary}</p>
          <Link
            href={href}
            className="mt-6 inline-flex items-center text-accent font-semibold hover:text-accent-hover"
          >
            {cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
