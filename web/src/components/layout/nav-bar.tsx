"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { cn } from "@/lib/cn";

export function NavBar() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");

  const links = [
    { href: "/services", label: t("services") },
    { href: "/case-studies", label: t("caseStudies") },
    { href: "/demos", label: t("demos") },
    { href: "/how-we-work", label: t("howWeWork") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-border">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-ink">
          {siteConfig.name}
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label={t("primaryLabel")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={siteConfig.cta.primary.href} size="sm">
            {tCta("bookCall")}
          </Button>
        </div>

        <button
          className="md:hidden p-2"
          aria-label={t("toggleMenu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </Container>

      <div
        className={cn(
          "md:hidden border-t border-border bg-white",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-4 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button href={siteConfig.cta.primary.href} size="md" className="w-full">
            {tCta("bookCall")}
          </Button>
        </Container>
      </div>
    </header>
  );
}
