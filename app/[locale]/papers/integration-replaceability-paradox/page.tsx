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

const paper = getPaperEntry("integration-replaceability-paradox");

const copy = {
  zh: {
    title: "整合—可替代性弔詭（The Integration–Replaceability Paradox）",
    description:
      "工作論文《The Integration–Replaceability Paradox》論文頁：深度 AI 工作流程整合如何同時發出「導入成功」與「角色可替代」兩種訊號。研究進行中；實驗材料與完整方法於資料蒐集完成前暫不公開。",
    statusHeading: "研究狀態",
    statusBody:
      "本篇為工作論文（working manuscript），研究進行中：資料尚未蒐集，摘要、討論（§6）與結論（§7）尚未撰寫。網站僅公開原稿實際存在、且不影響後續資料蒐集的內容。",
    rqHeading: "核心研究問題",
    theoryHeading: "理論背景摘要",
    theory: [
      "導入研究以例行化與深化滲透——而非初始接受——作為技術同化的成熟階段。當生成式 AI 的使用被標準化、與組織系統串接並嵌入工作流程，組織端傾向將其解讀為導入成功。",
      "同樣的結構特徵，對員工而言也是線索：知識被外化為規格與範本後，「這個角色的執行較不依賴特定現任者」成為一項可信的推論。本研究將此推論命名為知覺角色可替代性，並將「同一結構同時發出導入成功與角色可替代兩種訊號」稱為整合—可替代性弔詭。",
      "本研究進一步探討此推論在何種條件下會、或不會，被轉譯為角色威脅評估；並檢視可信的角色再設計承諾（以可查證的組織作為支持之承諾）作為邊界條件的角色。",
    ],
    designHeading: "研究設計概要",
    design:
      "計畫採 2 × 2 受試者間、分階段呈現之情境實驗，對象為知識密集職業之在職成人；以變異數分析與拔靴法調節式中介分析檢驗假設。為避免需求特徵與假設猜測，具體情境刺激、操弄內容、量表與檢核題項在資料蒐集完成前不予公開。",
    embargoHeading: "資料蒐集前之公開限制（embargo）",
    excerptHeading: "目前公開的內容",
    excerptNote: "公開節錄（英文基準稿與中文工作譯本）存放於 repository 的 translation/paper-b/。",
    missingHeading: "暫不公開／尚未存在的內容",
    keywordsHeading: "關鍵詞（暫定）",
    translationNote: "中文內容為中文工作譯本（待作者審定）。",
    citeHeading: "引用方式",
  },
  en: {
    title: "The Integration–Replaceability Paradox",
    description:
      "Paper page for the working manuscript “The Integration–Replaceability Paradox”: how deep AI workflow integration signals implementation success and role replaceability at once. Research in progress; experimental materials and the full method are withheld until data collection is complete.",
    statusHeading: "Research status",
    statusBody:
      "This is a working manuscript with research in progress: data have not yet been collected, and the abstract, Discussion (§6), and Conclusion (§7) are not yet written. Only content that actually exists in the manuscript and does not compromise upcoming data collection is published here.",
    rqHeading: "Core research question",
    theoryHeading: "Theoretical background (summary)",
    theory: [
      "Implementation research treats routinization and infusion — not initial acceptance — as the mature stages of technology assimilation. When generative AI use is standardized, connected to organizational systems, and embedded in workflows, organizations tend to read this as implementation success.",
      "The same structural features are also cues for employees: once know-how is externalized into specifications and templates, “this role's execution depends less on its particular incumbent” becomes a plausible inference. The study names this inference perceived role replaceability, and calls the simultaneous dual signaling from one structure the integration–replaceability paradox.",
      "The study further asks under what conditions this inference is — or is not — translated into role threat appraisal, and examines credible role-redesign commitment (commitments backed by verifiable organizational action) as a boundary condition.",
    ],
    designHeading: "Research design (overview)",
    design:
      "The planned study is a 2 × 2 between-subjects scenario experiment with staged presentation among working adults in knowledge-intensive occupations, testing hypotheses with analysis of variance and bootstrapped moderated mediation analysis. To avoid demand characteristics and hypothesis guessing, the concrete scenario stimuli, condition manipulations, scales, and check items are not published before data collection is complete.",
    embargoHeading: "Pre-data-collection embargo",
    excerptHeading: "Currently public",
    excerptNote:
      "The public excerpt (English baseline and Chinese working translation) lives in translation/paper-b/ in the repository.",
    missingHeading: "Withheld / not yet existing",
    keywordsHeading: "Keywords (provisional)",
    translationNote: "Chinese content is a working translation pending author review.",
    citeHeading: "How to cite",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title.en,
    alternativeHeadline: paper.title.zh,
    author: {
      "@type": "Person",
      name: authorName.en,
      alternateName: authorName.zh,
      affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
      identifier: `https://orcid.org/${orcid}`,
    },
    creativeWorkStatus: paper.statusSchema,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    keywords: paper.keywords.en.join(", "),
    url: `${siteUrl}/${locale}/papers/integration-replaceability-paradox/`,
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
        <p className="mt-3 text-sm text-muted">
          {paper.authors.display[locale]} · {affiliation[locale]}
        </p>
        <p className="mt-2 text-sm text-muted">{c.translationNote}</p>

        <section className="mt-8 border border-line bg-surface/50 p-5 max-w-prose" aria-labelledby="status-h">
          <h2 id="status-h" className="text-xs text-muted uppercase tracking-wider">{c.statusHeading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">{c.statusBody}</p>
        </section>

        <section className="mt-10 max-w-prose" aria-labelledby="rq-h">
          <h2 id="rq-h" className="font-serif text-xl text-ink">{c.rqHeading}</h2>
          <p className="mt-3 leading-relaxed text-ink/90">{paper.coreQuestion[locale]}</p>
        </section>

        <section className="mt-10 max-w-prose" aria-labelledby="theory-h">
          <h2 id="theory-h" className="font-serif text-xl text-ink">{c.theoryHeading}</h2>
          {c.theory.map((p, i) => (
            <p key={i} className="mt-3 text-sm leading-relaxed text-ink/90">{p}</p>
          ))}
        </section>

        <section className="mt-10 max-w-prose" aria-labelledby="design-h">
          <h2 id="design-h" className="font-serif text-xl text-ink">{c.designHeading}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink/90">{c.design}</p>
        </section>

        <section className="mt-10 border border-accent/40 bg-surface/50 p-5 max-w-prose" aria-labelledby="embargo-h">
          <h2 id="embargo-h" className="text-xs text-accent uppercase tracking-wider">{c.embargoHeading}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">{paper.embargo?.note[locale]}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">{paper.embargo?.until[locale]}</p>
        </section>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <section aria-labelledby="sec-h">
            <h2 id="sec-h" className="text-xs text-muted uppercase tracking-wider">{c.excerptHeading}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-ink/90">
              {paper.availableSections.map((s, i) => (
                <li key={i}>· {s[locale]}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">{c.excerptNote}</p>
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

        <section className="mt-10 max-w-prose border-t border-line pt-5" aria-labelledby="cite-h">
          <h2 id="cite-h" className="text-xs text-muted uppercase tracking-wider">{c.citeHeading}</h2>
          <p lang="en" className="mt-2 text-sm text-muted">{paper.citation[locale]}</p>
        </section>

        <p className="mt-10 text-sm">
          <Link
            href={`/${locale}/questions/`}
            className="text-accent underline underline-offset-4 hover:no-underline"
          >
            {locale === "zh" ? "對本研究提問" : "Ask about this study"} →
          </Link>
        </p>
      </article>
    </div>
  );
}
