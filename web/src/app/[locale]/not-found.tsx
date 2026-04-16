import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { OrbitalGraphic } from "@/components/graphics/orbital-graphic";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  const t = useTranslations("notFound");
  const tCta = useTranslations("cta");
  return (
    <section className="py-20 md:py-28">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-eyebrow uppercase text-accent mb-4">404</p>
          <h1 className="text-display text-ink">{t("heading")}</h1>
          <p className="mt-6 text-lg text-ink-muted max-w-xl">
            {t("body")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/" size="lg">{t("backHome")}</Button>
            <Button href={siteConfig.cta.primary.href} variant="secondary" size="lg">
              {tCta("bookCall")}
            </Button>
          </div>
        </div>
        <OrbitalGraphic />
      </Container>
    </section>
  );
}
