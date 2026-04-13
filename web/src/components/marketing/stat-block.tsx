import { cn } from "@/lib/cn";

export function StatBlock({
  tag,
  headline,
  label,
  className,
}: {
  tag?: string;
  headline: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-border bg-white p-6 shadow-sm", className)}>
      {tag && (
        <span className="inline-block rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
          {tag}
        </span>
      )}
      <p className="mt-4 text-4xl font-bold text-metric leading-none">{headline}</p>
      <p className="mt-3 text-sm text-ink-muted">{label}</p>
    </div>
  );
}
