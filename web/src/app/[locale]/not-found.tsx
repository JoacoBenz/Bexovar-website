import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow uppercase text-accent mb-4">404</p>
          <h1 className="text-display text-ink">Page not found.</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">
            The page you&apos;re looking for moved, or never existed. Either way — not what you wanted.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">Back to home</Button>
            <Button href={siteConfig.cta.primary.href} variant="secondary" size="lg">
              {siteConfig.cta.primary.label}
            </Button>
          </div>
        </div>
        <OrbitalGraphic />
      </Container>
    </section>
  );
}
