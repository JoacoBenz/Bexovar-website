import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import { DemoCard } from "@/components/marketing/demo-card";
import type { Demo } from "@/content/demos";

export function DemosStrip({ demos }: { demos: readonly Demo[] }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          eyebrow="Demos"
          title="See it in action"
          subtitle="Short demos of automation we've actually shipped. Want us to run one on your data? Book a call."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {demos.map((d) => (
            <DemoCard key={d.slug} demo={d} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/demos" className="text-accent hover:text-accent-hover">
            Browse full demo gallery →
          </Link>
        </p>
      </Container>
    </section>
  );
}
