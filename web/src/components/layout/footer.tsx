"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Container } from "./container";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg-alt border-t border-border">
      <Container className="py-16 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">{t("servicesHeading")}</h3>
          <ul className="space-y-2">
            {siteConfig.footer.services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">{t("companyHeading")}</h3>
          <ul className="space-y-2">
            {siteConfig.footer.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-ink-muted hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-eyebrow uppercase text-ink-subtle mb-4">Ready to talk?</h3>
          <p className="text-sm text-ink-muted mb-4">
            30-min call. See a live demo on your workflow.
          </p>
          <Button href={siteConfig.cta.primary.href} size="md">
            {siteConfig.cta.primary.label}
          </Button>
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-subtle">
          <p>{t("copyright", { year })}</p>
          <div className="flex items-center gap-6">
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <Link href="/privacy">Privacy</Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
