import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import type { ProcessStep } from "@/content/home";

export function ProcessStrip({
  steps,
  eyebrow = "How we work",
  title = "Predictable process. No mystery.",
  subtitle,
}: {
  steps: readonly ProcessStep[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.number} className="rounded-lg border border-border bg-white p-6 shadow-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent font-bold">
                {s.number}
              </span>
              <h3 className="mt-4 text-h3 text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{s.summary}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
