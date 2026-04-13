import Link from "next/link";
import { Container } from "@/components/layout/container";

export type ServicesGridItem = {
  slug: string;
  title: string;
  summary: string;
};

export function ServicesGrid({
  items,
  withContainer = true,
}: {
  items: readonly ServicesGridItem[];
  withContainer?: boolean;
}) {
  const grid = (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((s) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          className="group block rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
        >
          <h3 className="text-h3 text-ink group-hover:text-accent">{s.title}</h3>
          <p className="mt-2 text-sm text-ink-muted">{s.summary}</p>
          <span aria-hidden="true" className="mt-4 inline-block text-sm font-semibold text-accent">
            Learn more →
          </span>
        </Link>
      ))}
    </div>
  );
  return withContainer ? <Container>{grid}</Container> : grid;
}
