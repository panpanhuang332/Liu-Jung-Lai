import type { Metadata } from "next";
import Link from "next/link";
import {
  getDict,
  languageAlternates,
  paperTitle,
  authorName,
  affiliation,
  orcid,
  siteUrl,
  htmlLang,
  type Locale,
} from "@/lib/i18n";

const copy = {
  zh: {
    title: "Liu-Jung Lai｜學術作者網站",
    description:
      "Liu-Jung Lai 的學術網站：概念性論文《When Enablement Narratives Backfire》全文、導讀、命題總表與術語辭典，中英雙語。",
    roleLine: "建國科技大學經營管理系",
    intro:
      "本網站為一篇投稿中概念性論文的作者網站。論文探討組織導入生成式 AI 時，管理端善意的「賦能敘事」為何可能被員工解讀為取代訊號，以及員工如何透過與 AI 系統的直接互動，遞迴地更新對自身角色的意義建構，進而形成四種不同「種類」的採用回應。",
    interestsLabel: "研究關注",
    interests: [
      "生成式 AI 導入",
      "賦能敘事反噬",
      "角色威脅／角色機會評估",
      "組織意義建構（sensemaking）",
      "科技採用與員工回應",
    ],
    claimLabel: "本論文的一句話主張",
    claim: "使用量本身無法區辨一支被賦能的團隊與一支被嚇壞的團隊。",
    paperLabel: "投稿中論文",
    statusBadge: "投稿中（manuscript under review）",
    cards: [
      {
        href: "paper",
        title: "讀論文",
        desc: "中英全文對照閱讀，含目錄、引註與 Figure 1。",
      },
      {
        href: "guide",
        title: "看導讀",
        desc: "一分鐘、十分鐘與完整導讀三種深度。",
      },
      {
        href: "propositions",
        title: "命題總表",
        desc: "13 條命題的原文、白話說明與檢驗方式。",
      },
      {
        href: "glossary",
        title: "術語辭典",
        desc: "全文核心術語的中英對照與定義。",
      },
    ],
  },
  en: {
    title: "Liu-Jung Lai | Academic Author Site",
    description:
      "Academic site of Liu-Jung Lai: full text, reader's guide, propositions, and glossary for the conceptual paper “When Enablement Narratives Backfire,” in English and Traditional Chinese.",
    roleLine: "Department of Business Management, Chienkuo Technology University",
    intro:
      "This is the author site for a conceptual paper currently under review. The paper examines why well-intended managerial “enablement narratives” in generative AI implementation can be read by employees as signals of substitution, and how employees recursively update the meaning of their own roles through direct interaction with the AI system—yielding four distinct kinds of adoption response.",
    interestsLabel: "Research focus",
    interests: [
      "Generative AI implementation",
      "Enablement narrative backfire",
      "Role threat / role opportunity appraisal",
      "Organizational sensemaking",
      "Technology adoption and employee responses",
    ],
    claimLabel: "The paper's claim in one sentence",
    claim:
      "Usage volume alone cannot distinguish an empowered workforce from a frightened one.",
    paperLabel: "Manuscript under review",
    statusBadge: "Manuscript under review",
    cards: [
      {
        href: "paper",
        title: "Read the paper",
        desc: "Full text with side-by-side bilingual mode, table of contents, citations, and Figure 1.",
      },
      {
        href: "guide",
        title: "Reader's guide",
        desc: "Three depths: one minute, ten minutes, and a full chapter-by-chapter guide.",
      },
      {
        href: "propositions",
        title: "Propositions",
        desc: "All 13 propositions with plain-language glosses and observable tests.",
      },
      {
        href: "glossary",
        title: "Glossary",
        desc: "Core terms of the paper, bilingual, with definitions.",
      },
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
    title: { absolute: c.title },
    description: c.description,
    alternates: {
      canonical: `${siteUrl}/${locale}/`,
      ...languageAlternates(""),
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/`,
      siteName: c.title,
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
  const dict = getDict(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName.en,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: affiliation.en,
    },
    identifier: `https://orcid.org/${orcid}`,
    url: `${siteUrl}/${locale}/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Author block */}
      <section className="pt-14 pb-10 border-b border-line">
        <h1 className="font-serif text-3xl sm:text-4xl text-ink">
          {authorName.en}
        </h1>
        <p className="mt-2 text-muted">{c.roleLine}</p>
        <p className="mt-6 max-w-prose leading-relaxed text-ink/90">
          {c.intro}
        </p>
        <div className="mt-6">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.interestsLabel}
          </h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/80">
            {c.interests.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Claim */}
      <section className="py-10 border-b border-line">
        <h2 className="text-sm font-medium text-muted uppercase tracking-wider">
          {c.claimLabel}
        </h2>
        <blockquote className="mt-4 max-w-prose font-serif text-2xl sm:text-[1.7rem] leading-snug text-ink">
          {c.claim}
        </blockquote>
        <p className="mt-6 text-sm text-muted">
          {c.paperLabel}
          {locale === "zh" ? "：" : ": "}
          <span lang="en" className="italic font-serif">
            {paperTitle.en}
          </span>
        </p>
      </section>

      {/* Entry cards */}
      <section className="py-10">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.cards.map((card) => (
            <li key={card.href}>
              <Link
                href={`/${locale}/${card.href}`}
                className="group block border border-line px-5 py-5 h-full hover:border-accent"
              >
                <span className="font-serif text-lg text-ink group-hover:text-accent">
                  {card.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">
                  {card.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
