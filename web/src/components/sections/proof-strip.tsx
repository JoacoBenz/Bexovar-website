import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import { StatBlock } from "@/components/marketing/stat-block";
import type { Metric } from "@/content/en/home";

export function ProofStrip({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <SectionHeader
          eyebrow="Proof"
          title="Real outcomes, real clients"
          subtitle="Names withheld under NDA. Metrics verified."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <StatBlock key={m.industry} tag={m.industry} headline={m.headline} label={m.detail} />
          ))}
        </div>
      </Container>
    </section>
  );
}
