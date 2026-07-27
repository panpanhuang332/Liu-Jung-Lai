import type { Metadata } from "next";
import StubPage from "@/components/StubPage";
import { getDict, languageAlternates, siteUrl, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const title = getDict(locale).nav.guide;
  return {
    title,
    alternates: {
      canonical: `${siteUrl}/${locale}/guide/`,
      ...languageAlternates("/guide"),
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  return <StubPage locale={locale} title={getDict(locale).nav.guide} />;
}
