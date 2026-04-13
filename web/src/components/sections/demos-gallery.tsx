"use client";

import { useMemo, useState } from "react";
import {
  CategoryFilter,
  type CategoryValue,
} from "@/components/marketing/category-filter";
import { DemoCard } from "@/components/marketing/demo-card";
import type { Demo, DemoCategory } from "@/content/demos";

export function DemosGallery({
  demos,
  categories,
}: {
  demos: readonly Demo[];
  categories: readonly DemoCategory[];
}) {
  const [active, setActive] = useState<CategoryValue<DemoCategory>>("All");

  const visible = useMemo(
    () => (active === "All" ? demos : demos.filter((d) => d.category === active)),
    [active, demos],
  );

  return (
    <div>
      <CategoryFilter categories={categories} active={active} onChange={setActive} />
      {visible.length === 0 ? (
        <p className="mt-10 text-ink-muted">No demos in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <DemoCard key={d.slug} demo={d} />
          ))}
        </div>
      )}
    </div>
  );
}
