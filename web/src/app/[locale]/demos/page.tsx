import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { SectionHeader } from "@/components/sections/section-header";
import { DemosGallery } from "@/components/sections/demos-gallery";
import { CTASection } from "@/components/sections/cta-section";
import { getContent } from "@/content/get-content";
import { isLocale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations("demos");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function DemosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const { demos, demoCategories, demoCategoryLabels } = await getContent(locale);

  return (
    <>
      <section className="py-20 md:py-28 bg-bg-alt">
        <Container>
          <SectionHeader
            eyebrow="Demos"
            title="See what we've shipped"
            subtitle="Anonymized, real implementations. Filter by what looks closest to your workflow — and if you want a live one on your data, book a call."
          />
          <div className="mt-10">
            <DemosGallery demos={demos} categories={demoCategories} categoryLabels={demoCategoryLabels} />
          </div>
        </Container>
      </section>
      <CTASection
        heading="Want a live demo on your own data?"
        subtitle="A 30-minute discovery call earns you a working demo on a workflow you pick."
        primary={siteConfig.cta.primary}
        secondary={siteConfig.cta.tertiary}
      />
    </>
  );
}
