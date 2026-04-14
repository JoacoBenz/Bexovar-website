export function CaseStudySection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const paragraphs = body
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return (
    <section className="mt-12">
      <h2 className="text-h3 font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-ink-muted">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
