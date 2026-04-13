export function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <h3 className="text-h3 text-ink">{title}</h3>
      <p className="mt-3 text-ink-muted">{body}</p>
    </div>
  );
}
