import type { Metadata } from "next";
import {
  languageAlternates,
  authorName,
  affiliation,
  orcid,
  siteUrl,
  type Locale,
  ogImage,
} from "@/lib/i18n";
import { getPaper } from "@/lib/paper";
import { getPaperEntry } from "@/content/papers";
import PaperView from "@/components/paper/PaperView";
import Toc from "@/components/paper/Toc";
import BilingualToggle from "@/components/paper/BilingualToggle";

const paper = getPaperEntry("integration-replaceability-paradox");

const copy = {
  zh: {
    title: "整合—可替代性弔詭：全文",
    description:
      "《The Integration–Replaceability Paradox》工作論文全文（§1–§5、參考文獻、附錄 A／B）：中文工作譯本（待作者審定），附中英對照模式。研究進行中，尚無實證結果。",
    tocTitle: "目錄",
    bilingual: "中英對照",
    bilingualHint: "開啟後每段並排顯示中英兩版",
    statusNote:
      "工作論文（研究進行中）。中文為工作譯本（待作者審定）；§5 為預定分析架構模板，不含數據；摘要與 §6–§7 依原稿尚未撰寫。",
  },
  en: {
    title: "The Integration–Replaceability Paradox: Full Text",
    description:
      "Full text of the working manuscript “The Integration–Replaceability Paradox” (Sections 1–5, references, Appendices A–B), with a bilingual view. Research in progress; no empirical results yet.",
    tocTitle: "Contents",
    bilingual: "Bilingual view",
    bilingualHint: "Show each paragraph in English and Chinese side by side",
    statusNote:
      "Working manuscript (research in progress). The Chinese text is a working translation pending author review; Section 5 is a preregistered analysis template with no data; the abstract and Sections 6–7 are not yet written in the source.",
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
      canonical: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/full-text/`,
      ...languageAlternates("/papers/integration-replaceability-paradox/full-text"),
    },
    openGraph: {
      images: ogImage,
      title: `${c.title}｜${paper.titleMain.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/full-text/`,
      type: "article",
    },
  };
}

export default async function PaperBFullTextPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const { toc } = getPaper(paper.contentId!);
  const items = toc.map((t) => ({ id: t.id, level: t.level, label: t.label[locale] }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title.en,
    alternativeHeadline: paper.title.zh,
    author: {
      "@type": "Person",
      name: authorName.en,
      affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
      identifier: `https://orcid.org/${orcid}`,
    },
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    creativeWorkStatus: paper.statusSchema,
    keywords: paper.keywords.en.join(", "),
    url: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/full-text/`,
    image: `${siteUrl}${paper.figures[0].src}`,
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
            <p className="text-sm text-muted max-w-prose">{c.statusNote}</p>
            <BilingualToggle label={c.bilingual} hint={c.bilingualHint} />
          </div>
          <PaperView
            locale={locale}
            contentId={paper.contentId!}
            figureAlt={{ zh: paper.figures[0].alt.zh, en: paper.figures[0].alt.en }}
          />
        </div>
      </div>
    </div>
  );
}
