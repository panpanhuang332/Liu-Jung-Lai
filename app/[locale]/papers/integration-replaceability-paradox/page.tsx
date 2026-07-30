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
import { getPaperEntry } from "@/content/papers";
import { withBase } from "@/lib/assets";

const paper = getPaperEntry("integration-replaceability-paradox");

const copy = {
  zh: {
    title: "整合—可替代性弔詭（The Integration–Replaceability Paradox）",
    description:
      "工作論文《The Integration–Replaceability Paradox》論文頁：深度 AI 工作流程整合如何同時發出「導入成功」與「角色可替代」兩種訊號，以及可信的角色再設計承諾如何弱化威脅轉譯。2 × 2 分階段情境實驗設計，研究進行中。",
    statusHeading: "研究狀態",
    statusBody:
      "本篇為工作論文（working manuscript），研究進行中：第 1–5 節與附錄 A、B 已封版，但資料尚未蒐集，摘要、討論（§6）與結論（§7）尚未撰寫。網站僅公開原稿實際存在的章節，第 5 節以「預定分析架構」名義呈現、不含任何數據。",
    hypothesesHeading: "假設一覽（H1a–H5）",
    hypotheses: [
      ["H1a", "較高的 AI 工作流程整合深度會提高知覺組織導入成功。"],
      ["H1b", "較高的 AI 工作流程整合深度會提高知覺角色可替代性。"],
      ["H2", "知覺角色可替代性與角色威脅評估呈正向關聯。"],
      ["H3", "整合深度經由知覺角色可替代性，對角色威脅評估有正向間接效果。"],
      ["H4", "承諾之可驗證佐證調節可替代性—威脅關係：高佐證下較弱。"],
      ["H5", "經由可替代性之條件化間接效果，在高佐證下小於低佐證下。"],
    ],
    modelHeading: "研究模型",
    figureNote: "點擊圖片可放大。中文版為依英文原圖忠實重建之工作版本。",
    sectionsHeading: "目前公開的章節",
    missingHeading: "尚未公開／來源缺漏的章節",
    ctaFull: "閱讀全文（中英對照）",
    ctaEn: "English full text",
    keywordsHeading: "關鍵詞（暫定）",
    translationNote: "中文內容為中文工作譯本（待作者審定）。",
    authorNoteHeading: "署名說明",
    figureAltZh: "圖 1 中文版",
    figureAltEn: "圖 1（英文原圖）",
  },
  en: {
    title: "The Integration–Replaceability Paradox",
    description:
      "Paper page for the working manuscript “The Integration–Replaceability Paradox”: how deep AI workflow integration signals implementation success and role replaceability at once, and how credible role-redesign commitment weakens the translation into role threat. A 2 × 2 staged scenario experiment design; research in progress.",
    statusHeading: "Research status",
    statusBody:
      "This is a working manuscript with research in progress: Sections 1–5 and Appendices A–B are sealed, but data have not yet been collected, and the abstract, Discussion (§6), and Conclusion (§7) are not yet written. Only sections that actually exist in the manuscript are published here; Section 5 is presented as a preregistered analysis plan template with no data.",
    hypothesesHeading: "Hypotheses at a glance (H1a–H5)",
    hypotheses: [
      ["H1a", "Higher AI workflow integration depth increases perceived organizational implementation success."],
      ["H1b", "Higher AI workflow integration depth increases perceived role replaceability."],
      ["H2", "Perceived role replaceability is positively associated with role threat appraisal."],
      ["H3", "Integration depth has a positive indirect effect on role threat appraisal through perceived role replaceability."],
      ["H4", "Commitment substantiation moderates the replaceability–threat relationship: weaker under high substantiation."],
      ["H5", "The conditional indirect effect through replaceability is smaller under high substantiation."],
    ],
    modelHeading: "Research model",
    figureNote: "Click the figure to enlarge. The Chinese version is a faithful working reconstruction of the original figure.",
    sectionsHeading: "Sections currently published",
    missingHeading: "Not yet available / missing in the source",
    ctaFull: "Read the full text (bilingual)",
    ctaEn: "English full text",
    keywordsHeading: "Keywords (provisional)",
    translationNote: "Chinese content is a working translation pending author review.",
    authorNoteHeading: "Byline note",
    figureAltZh: "Figure 1, Chinese version",
    figureAltEn: "Figure 1 (English original)",
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
      canonical: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/`,
      ...languageAlternates("/papers/integration-replaceability-paradox"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/`,
      type: "article",
    },
  };
}

export default async function PaperBOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const fig = paper.figures[0];

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
    creativeWorkStatus: paper.statusSchema,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    keywords: paper.keywords.en.join(", "),
    url: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/`,
    image: `${siteUrl}${fig.src}`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-12 pb-16">
        <p className="text-xs text-muted tracking-wide">
          {paper.type[locale]}
          <span className="mx-2" aria-hidden="true">·</span>
          <span className="text-accent">{paper.status[locale]}</span>
        </p>
        <h1 lang="en" className="mt-4 font-serif text-3xl sm:text-4xl leading-tight text-ink text-balance">
          {paper.titleMain.en}
        </h1>
        <p lang="en" className="mt-2 font-serif italic text-lg text-ink/80 max-w-[52ch]">
          {paper.titleSub.en}
        </p>
        <p className="mt-3 text-muted">
          {paper.title.zh}
          <span className="ml-2 text-xs border border-line px-1.5 py-0.5 align-middle">
            {locale === "zh" ? "暫定題名" : "working title"}
          </span>
        </p>
        <p className="mt-3 text-sm text-muted">{paper.authors.display[locale]} · {affiliation[locale]}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}${paper.routes.fullText}/`} className="btn-primary">
            {c.ctaFull}
          </Link>
          <Link
            href={`/en${paper.routes.fullText}/`}
            lang="en"
            className="btn-secondary"
          >
            {c.ctaEn}
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted">{c.translationNote}</p>

        <section className="mt-10 border border-line bg-surface/50 p-5 max-w-prose" aria-labelledby="status-h">
          <h2 id="status-h" className="text-xs text-muted uppercase tracking-wider">{c.statusHeading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">{c.statusBody}</p>
        </section>

        <section className="mt-10" aria-labelledby="model-h">
          <h2 id="model-h" className="font-serif text-xl text-ink">{c.modelHeading}</h2>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(fig.src)}
                alt={fig.alt[locale]}
                width={1880}
                height={1060}
                loading="lazy"
                className="w-full h-auto border border-line bg-white"
              />
              <figcaption className="mt-2 text-xs text-muted">
                {fig.caption[locale]}（{c.figureAltEn}）
              </figcaption>
            </figure>
            {fig.zhSrc && (
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={withBase(fig.zhSrc)}
                  alt={`${fig.alt.zh}（中文重建版）`}
                  width={1880}
                  height={1060}
                  loading="lazy"
                  className="w-full h-auto border border-line bg-white"
                />
                <figcaption className="mt-2 text-xs text-muted">
                  {fig.caption.zh}（{c.figureAltZh}，待作者審定）
                </figcaption>
              </figure>
            )}
          </div>
          <p className="mt-2 text-xs text-muted">{c.figureNote}</p>
        </section>

        <section className="mt-10" aria-labelledby="hyp-h">
          <h2 id="hyp-h" className="font-serif text-xl text-ink">{c.hypothesesHeading}</h2>
          <ul className="mt-4 space-y-2 max-w-prose">
            {c.hypotheses.map(([id, text]) => (
              <li key={id} className="flex gap-3 text-sm leading-relaxed">
                <Link
                  href={`/${locale}${paper.routes.fullText}/#prop-${id.toLowerCase()}`}
                  className="shrink-0 font-medium text-accent underline underline-offset-4"
                >
                  {id}
                </Link>
                <span className="text-ink/90">{text}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <section aria-labelledby="sec-h">
            <h2 id="sec-h" className="text-xs text-muted uppercase tracking-wider">{c.sectionsHeading}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/90">
              {paper.availableSections.map((s, i) => (
                <li key={i}>· {s[locale]}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="miss-h">
            <h2 id="miss-h" className="text-xs text-muted uppercase tracking-wider">{c.missingHeading}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              {paper.missingSections.map((s, i) => (
                <li key={i}>· {s[locale]}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-10 max-w-prose" aria-labelledby="kw-h">
          <h2 id="kw-h" className="text-xs text-muted uppercase tracking-wider">{c.keywordsHeading}</h2>
          <p lang="en" className="mt-2 text-sm text-muted">{paper.keywords.en.join("; ")}</p>
        </section>

        {paper.authors.note && (
          <section className="mt-10 max-w-prose border-t border-line pt-5" aria-labelledby="byline-h">
            <h2 id="byline-h" className="text-xs text-muted uppercase tracking-wider">{c.authorNoteHeading}</h2>
            <p className="mt-2 text-sm text-muted">{paper.authors.note[locale]}</p>
          </section>
        )}
      </article>
    </div>
  );
}
