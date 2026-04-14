"use client";

import { useMemo, useState } from "react";
import { CategoryFilter } from "@/components/marketing/category-filter";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import type { CaseStudy, Industry, ServiceSlug } from "@/content/case-studies";

type ChipValue = "All" | Industry | ServiceSlug;

export function CaseStudiesBrowser({
  caseStudies,
  industries,
  serviceSlugs,
  serviceLabels,
}: {
  caseStudies: readonly CaseStudy[];
  industries: readonly Industry[];
  serviceSlugs: readonly ServiceSlug[];
  serviceLabels: Record<string, string>;
}) {
  const serviceLabel = (slug: ServiceSlug) => serviceLabels[slug] ?? slug;

  const [active, setActive] = useState<ChipValue>("All");

  // Build the flat chip row: industries first, then service labels.
  // CategoryFilter always prepends "All", so we pass the combined list without it.
  const chipLabels: string[] = [
    ...industries,
    ...serviceSlugs.map((s) => serviceLabel(s)),
  ];

  const labelToValue = useMemo(() => {
    const map = new Map<string, ChipValue>();
    for (const ind of industries) map.set(ind, ind);
    for (const s of serviceSlugs) map.set(serviceLabel(s), s);
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industries, serviceSlugs, serviceLabels]);

  const valueToLabel = useMemo(() => {
    const map = new Map<ChipValue, string>();
    for (const ind of industries) map.set(ind, ind);
    for (const s of serviceSlugs) map.set(s, serviceLabel(s));
    map.set("All", "All");
    return map;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industries, serviceSlugs, serviceLabels]);

  const activeLabel = valueToLabel.get(active) ?? "All";

  const industrySet = useMemo(() => new Set<string>(industries), [industries]);

  const visible = useMemo(() => {
    if (active === "All") return caseStudies;
    if (industrySet.has(active as string)) {
      return caseStudies.filter((c) => c.industry === active);
    }
    return caseStudies.filter((c) => (c.services as readonly string[]).includes(active as string));
  }, [active, caseStudies, industrySet]);

  return (
    <div>
      <CategoryFilter
        categories={chipLabels}
        active={activeLabel}
        label="Filter case studies by industry or service"
        onChange={(next) => {
          if (next === "All") {
            setActive("All");
            return;
          }
          const value = labelToValue.get(next);
          if (value) setActive(value);
        }}
      />
      {visible.length === 0 ? (
        <p className="mt-10 text-ink-muted">No case studies match this filter.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {visible.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      )}
    </div>
  );
}
