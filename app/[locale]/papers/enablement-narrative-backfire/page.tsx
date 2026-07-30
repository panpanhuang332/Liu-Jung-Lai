import type { Metadata } from "next";
import {
  languageAlternates,
  paperTitle,
  authorName,
  affiliation,
  orcid,
  siteUrl,
  type Locale,
  ogImage,
} from "@/lib/i18n";
import Hero from "@/components/home/Hero";
import ResearchQuestions from "@/components/home/ResearchQuestions";
import MechanismsTeaser from "@/components/home/MechanismsTeaser";
import ModesTeaser from "@/components/home/ModesTeaser";
import ReadingDepth from "@/components/home/ReadingDepth";
import ResourcesRow from "@/components/home/ResourcesRow";

const copy = {
  zh: {
    title: "當賦能敘事反噬（When Enablement Narratives Backfire）",
    description:
      "概念性論文《When Enablement Narratives Backfire》論文頁：為什麼「AI 是來賦能你」會被聽成「AI 將取代你」，以及員工與 AI 的互動如何形成四種採用回應。中英雙語全文、導讀、互動模型與命題總表。",
  },
  en: {
    title: "When Enablement Narratives Backfire",
    description:
      "Paper page for the conceptual paper “When Enablement Narratives Backfire”: why “AI is here to enable you” is heard as “AI will replace you,” and how employee–AI interaction yields four modes of adoption response. Bilingual full text, guides, interactive model, and propositions.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/papers/enablement-narrative-backfire/`,
      ...languageAlternates("/papers/enablement-narrative-backfire"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/papers/enablement-narrative-backfire/`,
      type: "article",
    },
  };
}

export default async function PaperAOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paperTitle.en,
    alternativeHeadline: paperTitle.zh,
    author: {
      "@type": "Person",
      name: authorName.en,
      affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
      identifier: `https://orcid.org/${orcid}`,
    },
    creativeWorkStatus: "Manuscript under review",
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    url: `${siteUrl}/${locale}/papers/enablement-narrative-backfire/`,
    image: `${siteUrl}/figures/figure1.png`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero locale={locale} />
      <ResearchQuestions locale={locale} />
      <MechanismsTeaser locale={locale} />
      <ModesTeaser locale={locale} />
      <ReadingDepth locale={locale} />
      <ResourcesRow locale={locale} />
    </div>
  );
}
