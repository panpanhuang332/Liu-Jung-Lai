import type { Metadata } from "next";
import Link from "next/link";
import {
  languageAlternates,
  authorName,
  affiliation,
  orcid,
  siteUrl,
  type Locale,
  ogImage,
} from "@/lib/i18n";
import { featuredPapers, getPaperEntry } from "@/content/papers";
import AuthorHero from "@/components/home/AuthorHero";
import PaperCard from "@/components/PaperCard";

const copy = {
  zh: {
    title: "Liu-Jung Lai（賴柳蓉）｜學術網站",
    description:
      "Liu-Jung Lai（賴柳蓉）的個人學術網站：生成式 AI 導入、組織意義建構與員工角色評估研究。收錄概念性論文《當賦能敘事反噬》與實驗研究工作論文《整合—可替代性弔詭》，提供中英雙語全文、研究導讀與學術問答。",
    worksHeading: "精選學術作品",
    worksNote: "兩篇平行的獨立研究，可分別閱讀。",
    wipHeading: "近期研究／工作論文",
    wipBody:
      "《整合—可替代性弔詭》為研究進行中的工作論文：實驗設計與材料已封版，資料蒐集尚未開始。",
    wipLink: "查看研究狀態與已公開章節",
    qaHeading: "學術問答",
    qaBody: "讀者可透過提問表單就論文內容提問；具代表性的問題經作者整理後公開。",
    qaAsk: "前往讀者提問",
    qaBrowse: "瀏覽公開問答",
    aboutHeading: "關於作者",
    aboutBody: "研究興趣、學術作品與聯絡方式。",
    aboutLink: "作者頁",
  },
  en: {
    title: "Liu-Jung Lai | Academic Site",
    description:
      "Personal academic site of Liu-Jung Lai: research on generative AI implementation, organizational sensemaking, and employee role appraisal. Home of the conceptual paper “When Enablement Narratives Backfire” and the working manuscript “The Integration–Replaceability Paradox,” with bilingual full texts, reader's guides, and academic Q&A.",
    worksHeading: "Selected academic works",
    worksNote: "Two parallel, independent studies; each can be read on its own.",
    wipHeading: "Recent research / working manuscripts",
    wipBody:
      "“The Integration–Replaceability Paradox” is a working manuscript with research in progress: the experimental design and materials are sealed; data collection has not yet begun.",
    wipLink: "See research status and published sections",
    qaHeading: "Academic Q&A",
    qaBody:
      "Readers can ask questions about the papers through the question form; representative questions are curated and published by the author.",
    qaAsk: "Ask a question",
    qaBrowse: "Browse published Q&A",
    aboutHeading: "About the author",
    aboutBody: "Research interests, academic works, and contact.",
    aboutLink: "Author page",
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
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/`,
      ...languageAlternates(""),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/`,
      siteName: `${authorName.en} — Academic Site`,
      locale: locale === "zh" ? "zh_TW" : "en_US",
      type: "website",
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const works = featuredPapers();
  const wip = getPaperEntry("integration-replaceability-paradox");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      mainEntity: {
        "@type": "Person",
        name: authorName.en,
        alternateName: authorName.zh,
        affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
        identifier: `https://orcid.org/${orcid}`,
        url: `${siteUrl}/${locale}/`,
      },
    },
    ...works.map((p) => ({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: p.title.en,
      alternativeHeadline: p.title.zh,
      author: {
        "@type": "Person",
        name: authorName.en,
        affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
        identifier: `https://orcid.org/${orcid}`,
      },
      creativeWorkStatus: p.statusSchema,
      inLanguage: locale === "zh" ? "zh-Hant" : "en",
      url: `${siteUrl}/${locale}${p.routes.overview}/`,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AuthorHero locale={locale} />

      <section className="py-10" aria-labelledby="works-h">
        <h2 id="works-h" className="font-serif text-2xl text-ink">{c.worksHeading}</h2>
        <p className="mt-2 text-sm text-muted">{c.worksNote}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 items-stretch">
          {works.map((p) => (
            <PaperCard key={p.slug} locale={locale} paper={p} />
          ))}
        </div>
      </section>

      <section className="py-8 border-t border-line" aria-labelledby="wip-h">
        <h2 id="wip-h" className="text-xs text-muted uppercase tracking-wider">{c.wipHeading}</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/90">{c.wipBody}</p>
        <p className="mt-2 text-sm">
          <Link
            href={`/${locale}${wip.routes.overview}/`}
            className="text-accent underline underline-offset-4 hover:no-underline"
          >
            {c.wipLink} →
          </Link>
        </p>
      </section>

      <section className="py-8 border-t border-line" aria-labelledby="qa-h">
        <h2 id="qa-h" className="text-xs text-muted uppercase tracking-wider">{c.qaHeading}</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/90">{c.qaBody}</p>
        <p className="mt-2 text-sm space-x-4">
          <Link
            href={`/${locale}/questions/`}
            className="text-accent underline underline-offset-4 hover:no-underline"
          >
            {c.qaAsk} →
          </Link>
          <Link
            href={`/${locale}/qa/`}
            className="underline underline-offset-4 hover:text-accent"
          >
            {c.qaBrowse} →
          </Link>
        </p>
      </section>

      <section className="py-8 border-t border-line mb-8" aria-labelledby="about-h">
        <h2 id="about-h" className="text-xs text-muted uppercase tracking-wider">{c.aboutHeading}</h2>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink/90">{c.aboutBody}</p>
        <p className="mt-2 text-sm">
          <Link
            href={`/${locale}/about/`}
            className="text-accent underline underline-offset-4 hover:no-underline"
          >
            {c.aboutLink} →
          </Link>
        </p>
      </section>
    </div>
  );
}
