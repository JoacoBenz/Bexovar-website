export function PullQuote({
  quote,
  attribution,
}: {
  quote: string;
  attribution: string;
}) {
  return (
    <figure className="my-10 border-l-4 border-accent pl-6">
      <blockquote className="text-xl italic text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-sm text-ink-muted">— {attribution}</figcaption>
    </figure>
  );
}
