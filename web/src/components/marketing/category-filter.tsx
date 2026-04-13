"use client";

import { cn } from "@/lib/cn";

export type CategoryValue<C extends string> = C | "All";

export function CategoryFilter<C extends string>({
  categories,
  active,
  onChange,
}: {
  categories: readonly C[];
  active: CategoryValue<C>;
  onChange: (next: CategoryValue<C>) => void;
}) {
  const options: CategoryValue<C>[] = ["All", ...categories];
  return (
    <div
      role="group"
      aria-label="Filter demos by category"
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const isActive = opt === active;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent",
              isActive
                ? "border-accent bg-accent text-white"
                : "border-border bg-white text-ink-muted hover:border-accent hover:text-ink",
            )}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
