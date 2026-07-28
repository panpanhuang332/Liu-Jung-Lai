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
import { getPaper } from "@/lib/paper";
import PaperView from "@/components/paper/PaperView";
import Toc from "@/components/paper/Toc";
import BilingualToggle from "@/components/paper/BilingualToggle";

const copy = {
  zh: {
    title: "論文全文",
    description:
      "《當賦能敘事反噬》全文中譯本：解釋生成式 AI 導入中賦能敘事為何反噬、員工如何遞迴更新角色評估，並提出四種採用回應模式。附中英對照模式。",
    tocTitle: "目錄",
    bilingual: "中英對照",
    bilingualHint: "開啟後每段並排顯示中英兩版",
    statusNote: "投稿中手稿之全文，內容與投稿版本一致。",
  },
  en: {
    title: "Full Paper",
    description:
      "Full text of “When Enablement Narratives Backfire”: why enablement narratives in generative AI implementation can backfire, how employees recursively update role appraisals, and four modes of adoption response. With a bilingual view.",
    tocTitle: "Contents",
    bilingual: "Bilingual view",
    bilingualHint: "Show each paragraph in English and Chinese side by side",
    statusNote:
      "Full text of the manuscript under review; identical to the submitted version.",
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
      canonical: `${siteUrl}/${locale}/paper/`,
      ...languageAlternates("/paper"),
    },
    openGraph: {
      images: ogImage,
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/paper/`,
      type: "article",
    },
  };
}

export default async function PaperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const { toc } = getPaper();
  const items = toc.map((t) => ({ id: t.id, level: t.level, label: t.label[locale] }));

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
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    creativeWorkStatus: "Manuscript under review",
    url: `${siteUrl}/${locale}/paper/`,
    image: `${siteUrl}/figures/figure1.png`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-10 xl:grid-cols-[15rem_minmax(0,1fr)] pt-10 pb-16">
        <aside className="hidden xl:block">
          <div className="sticky top-8 max-h-[88vh] overflow-y-auto pr-2">
            <Toc items={items} title={c.tocTitle} />
          </div>
        </aside>
        <div className="min-w-0">
          <details className="xl:hidden mb-6 border border-line">
            <summary className="cursor-pointer px-4 py-2 text-sm font-medium">
              {c.tocTitle}
            </summary>
            <div className="px-4 pb-4 max-h-[50vh] overflow-y-auto">
              <Toc items={items} title={c.tocTitle} />
            </div>
          </details>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-muted">{c.statusNote}</p>
            <BilingualToggle label={c.bilingual} hint={c.bilingualHint} />
          </div>
          <PaperView locale={locale} />
        </div>
      </div>
    </div>
  );
}
