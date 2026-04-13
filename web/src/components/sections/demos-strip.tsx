import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "./section-header";
import type { DemoPlaceholder } from "@/content/home";

export function DemosStrip({ demos }: { demos: readonly DemoPlaceholder[] }) {
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
            <div
              key={d.title}
              className="group rounded-lg border border-border bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="aspect-video bg-bg-alt flex items-center justify-center text-ink-subtle">
                <span aria-hidden="true" className="mr-2">▶</span>
                <span className="text-sm"><span>{d.title}</span>{" · "}<span>{d.duration}</span></span>
              </div>
              <div className="p-5">
                <p className="text-sm text-ink-muted">{d.summary}</p>
              </div>
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
  );
}
