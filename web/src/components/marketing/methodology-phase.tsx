import type { Phase } from "@/content/how-we-work";

export function MethodologyPhase({ phase }: { phase: Phase }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white font-bold text-lg">
          {phase.number}
        </span>
        <div>
          <h3 className="text-h3 text-ink">{phase.title}</h3>
          <p className="text-sm text-ink-subtle">{phase.duration}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-eyebrow uppercase text-ink-subtle mb-3">Deliverables</p>
          <ul className="space-y-2 text-sm text-ink-muted list-disc pl-5">
            {phase.deliverables.map((d) => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow uppercase text-ink-subtle mb-3">Your role</p>
          <p className="text-sm text-ink-muted">{phase.clientRole}</p>
        </div>
      </div>
    </div>
  );
}
