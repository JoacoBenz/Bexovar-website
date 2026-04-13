import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/cn";

type CTA = { href: string; label: string };

export function CTASection({
  heading,
  subtitle,
  primary,
  secondary,
  tone = "dark",
  className,
}: {
  heading: string;
  subtitle?: string;
  primary: CTA;
  secondary?: CTA;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      className={cn(
        "py-20 md:py-28",
        dark ? "bg-dark-bg text-dark-ink" : "bg-bg-alt text-ink",
        className
      )}
    >
      <Container className="text-center max-w-3xl">
        <h2 className={cn("text-h2", dark ? "text-dark-ink" : "text-ink")}>
          {heading}
        </h2>
        {subtitle && (
          <p className={cn("mt-4 text-lg", dark ? "text-dark-muted" : "text-ink-muted")}>
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href} size="lg">{primary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondary.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
