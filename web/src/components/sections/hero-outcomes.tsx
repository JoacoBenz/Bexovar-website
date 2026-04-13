import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";

type Cta = { href: string; label: string };

export function HeroOutcomes({
  eyebrow,
  title,
  body,
  industries,
  primary,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  industries: string;
  primary?: Cta;
  secondary?: Cta;
}) {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow uppercase text-accent mb-4">{eyebrow}</p>
          <h1 className="text-display text-ink">{title}</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">{body}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primary && <Button href={primary.href} size="lg">{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary" size="lg">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          <p className="mt-8 text-sm text-ink-subtle">{industries}</p>
        </div>
        <OrbitalGraphic />
      </Container>
    </section>
  );
}
