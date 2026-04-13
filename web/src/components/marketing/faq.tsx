export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer items-center justify-between list-none text-ink font-semibold">
            <span>{item.q}</span>
            <span className="ml-4 text-accent transition-transform group-open:rotate-45" aria-hidden="true">+</span>
          </summary>
          <p className="mt-3 text-ink-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
