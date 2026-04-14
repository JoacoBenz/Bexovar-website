import Link from "next/link";
import type { CaseStudy } from "@/content/en/case-studies";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <article className="flex flex-col rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      <div className="mb-3">
        <span className="inline-block rounded-full bg-bg-alt px-2 py-0.5 text-xs text-ink-muted">
          {caseStudy.industry}
        </span>
      </div>
      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-3xl font-semibold text-ink">{caseStudy.headlineMetric.value}</span>
        <span className="text-sm text-ink-muted">{caseStudy.headlineMetric.label}</span>
      </div>
      <p className="mb-5 flex-1 text-sm text-ink-muted">{caseStudy.cardSummary}</p>
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="text-sm font-medium text-accent hover:text-accent-hover"
        aria-label={`Read the ${caseStudy.slug} case study`}
      >
        Read case study →
      </Link>
    </article>
  );
}
