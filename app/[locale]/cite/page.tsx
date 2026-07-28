import type { Metadata } from "next";
import {
  languageAlternates,
  paperTitle,
  authorName,
  affiliation,
  siteUrl,
  type Locale,
  ogImage,
} from "@/lib/i18n";
import CopyButton from "@/components/CopyButton";

const YEAR = 2026;

const bibtex = `@unpublished{lai${YEAR}enablement,
  author = {Lai, Liu-Jung},
  title  = {When Enablement Narratives Backfire: Recursive Sensemaking and
            Modes of Adoption Response in Generative AI Implementation},
  year   = {${YEAR}},
  note   = {Manuscript under review},
  url    = {${siteUrl}/}
}`;

const apa = `Lai, L.-J. (${YEAR}). When enablement narratives backfire: Recursive sensemaking and modes of adoption response in generative AI implementation [Manuscript under review]. Department of Business Management, Chienkuo Technology University.`;

const chicago = `Lai, Liu-Jung. ${YEAR}. "When Enablement Narratives Backfire: Recursive Sensemaking and Modes of Adoption Response in Generative AI Implementation." Unpublished manuscript, under review. Department of Business Management, Chienkuo Technology University.`;

const copy = {
  zh: {
    title: "引用本文",
    description:
      "《當賦能敘事反噬》的引用格式：BibTeX、APA 第 7 版、Chicago（作者—年份制），一鍵複製。本文目前為投稿中之手稿。",
    status:
      "本文目前為投稿中之手稿（manuscript under review），尚未正式發表。以下格式依「未發表手稿」體例撰寫；正式發表後引用資訊將更新。",
    copyLabel: "複製",
    copied: "已複製",
    formats: [
      { key: "bibtex", name: "BibTeX", text: bibtex },
      { key: "apa", name: "APA（第 7 版）", text: apa },
      { key: "chicago", name: "Chicago（作者—年份制）", text: chicago },
    ],
  },
  en: {
    title: "Cite This Paper",
    description:
      "Citation formats for “When Enablement Narratives Backfire”: BibTeX, APA 7th, and Chicago author–date, with one-click copy. Currently a manuscript under review.",
    status:
      "This paper is currently a manuscript under review and has not been formally published. The formats below follow unpublished-manuscript conventions; citation details will be updated upon publication.",
    copyLabel: "Copy",
    copied: "Copied",
    formats: [
      { key: "bibtex", name: "BibTeX", text: bibtex },
      { key: "apa", name: "APA (7th ed.)", text: apa },
      { key: "chicago", name: "Chicago (author–date)", text: chicago },
    ],
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
      canonical: `${siteUrl}/${locale}/cite/`,
      ...languageAlternates("/cite"),
    },
    openGraph: {
      images: ogImage,
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/cite/`,
      type: "article",
    },
  };
}

export default async function CitePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paperTitle.en,
    author: {
      "@type": "Person",
      name: authorName.en,
      affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
    },
    creativeWorkStatus: "Manuscript under review",
    url: `${siteUrl}/${locale}/cite/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="pt-14 pb-8 border-b border-line">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
        <p lang="en" className="mt-4 max-w-prose font-serif italic text-ink/90">
          {paperTitle.en}
        </p>
        <p className="mt-4 max-w-prose border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink/90">
          {c.status}
        </p>
      </header>

      <div className="py-8 space-y-8">
        {c.formats.map((f) => (
          <section key={f.key} aria-labelledby={`fmt-${f.key}`}>
            <div className="flex items-baseline justify-between gap-4">
              <h2 id={`fmt-${f.key}`} className="font-serif text-xl text-ink">
                {f.name}
              </h2>
              <CopyButton text={f.text} label={c.copyLabel} copiedLabel={c.copied} />
            </div>
            <pre
              lang="en"
              className="mt-3 overflow-x-auto border border-line bg-surface p-4 text-[0.85rem] leading-relaxed whitespace-pre-wrap"
            >
              {f.text}
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
