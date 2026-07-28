import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, paperTitle, siteUrl, type Locale } from "@/lib/i18n";
import { drivers } from "@/lib/content/mechanisms";
import LoopDiagram from "@/components/mech/LoopDiagram";

const copy = {
  zh: {
    title: "機制拆解",
    description:
      "拆解《當賦能敘事反噬》的兩個機制：賦能敘事反噬的五個語用驅動因子（可展開卡片），與 AI 互動式角色意義建構迴圈的互動式流程圖（含 P7 三種軌跡）。",
    m1: "機制一：賦能敘事反噬",
    m1Lead:
      "一則明確正向的賦能訊息，如何被逆轉為「AI 即替代」框架？論文指出五個語用驅動因子，累積地（而非缺一不可地）提高逆轉的可能性。展開每張卡片看原理、職場例句與反轉的原因。",
    m2: "機制二：AI 互動式角色意義建構迴圈",
    m2Lead:
      "以下是論文圖 1 的互動重繪。實線為主要因果路徑，灰色點虛線為邊界條件，弧線為遞迴迴圈，長虛線為再評估路徑。點擊節點顯示定義；切換上方按鈕可高亮 P7 的三種軌跡。",
    fieldPrinciple: "原理",
    fieldExample: "一個具體的職場例句",
    fieldReversal: "為何會反轉",
    toPaper: "閱讀原文",
    m1Ref: "對應 §2.3.1–2.3.6",
    m2Ref: "對應 §2.5、§3.1、P7",
  },
  en: {
    title: "The Two Mechanisms",
    description:
      "Unpacking the two mechanisms of “When Enablement Narratives Backfire”: five pragmatic drivers of narrative backfire (expandable cards) and an interactive diagram of the AI-interactive role sensemaking loop with the three P7 trajectories.",
    m1: "Mechanism 1: enablement narrative backfire",
    m1Lead:
      "How is an explicitly positive enablement message reversed into an AI-as-substitute frame? The paper identifies five pragmatic drivers that raise the likelihood of reversal cumulatively rather than as joint requirements. Expand each card for the principle, a concrete workplace example, and why it reverses.",
    m2: "Mechanism 2: the AI-interactive role sensemaking loop",
    m2Lead:
      "Below is an interactive redraw of the paper's Figure 1. Solid arrows are the primary causal path, dotted grey arrows the boundary conditions, curved arrows the recursive loop, and the long-dashed arrow the reappraisal pathway. Click a node for its definition; the buttons highlight the three P7 trajectories.",
    fieldPrinciple: "Principle",
    fieldExample: "A concrete workplace example",
    fieldReversal: "Why it reverses",
    toPaper: "Read the original",
    m1Ref: "Corresponds to §2.3.1–2.3.6",
    m2Ref: "Corresponds to §2.5, §3.1, P7",
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
      canonical: `${siteUrl}/${locale}/mechanisms/`,
      ...languageAlternates("/mechanisms"),
    },
    openGraph: {
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/mechanisms/`,
      type: "article",
    },
  };
}

export default async function MechanismsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    about: paperTitle.en,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    url: `${siteUrl}/${locale}/mechanisms/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="pt-14 pb-8 border-b border-line">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
      </header>

      {/* Mechanism 1 */}
      <section className="py-10 border-b border-line" aria-labelledby="m1">
        <h2 id="m1" className="font-serif text-2xl text-ink">{c.m1}</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/90">{c.m1Lead}</p>
        <div className="mt-6 space-y-3">
          {drivers.map((d) => (
            <details key={d.id} className="group border border-line">
              <summary className="cursor-pointer list-none px-5 py-4 flex items-baseline justify-between gap-4 hover:text-accent">
                <span className="font-medium">
                  {d.name[locale]}
                  <span lang={locale === "zh" ? "en" : "zh-Hant"} className="ml-2 text-sm text-muted font-normal">
                    {d.name[locale === "zh" ? "en" : "zh"]}
                  </span>
                </span>
                <span aria-hidden="true" className="text-muted group-open:rotate-90 transition-transform">
                  ›
                </span>
              </summary>
              <div className="px-5 pb-5 border-t border-line pt-4">
                <dl className="space-y-3 text-[0.95rem] leading-relaxed max-w-prose">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldPrinciple}</dt>
                    <dd className="mt-1 text-ink/90">{d.principle[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldExample}</dt>
                    <dd className="mt-1 border-l-2 border-line pl-3 text-ink/90">{d.example[locale]}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldReversal}</dt>
                    <dd className="mt-1 text-ink/90">{d.reversal[locale]}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm">
                  <Link
                    href={`/${locale}/paper/#${d.anchor}`}
                    className="text-accent underline underline-offset-4 hover:no-underline"
                  >
                    {d.refLabel[locale]} → {c.toPaper}
                  </Link>
                </p>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          <Link href={`/${locale}/paper/#s-2-3`} className="underline underline-offset-4 hover:text-accent">
            {c.m1Ref}
          </Link>
        </p>
      </section>

      {/* Mechanism 2 */}
      <section className="py-10" aria-labelledby="m2">
        <h2 id="m2" className="font-serif text-2xl text-ink">{c.m2}</h2>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/90">{c.m2Lead}</p>
        <div className="mt-6">
          <LoopDiagram locale={locale} />
        </div>
        <p className="mt-4 text-sm text-muted">
          <Link href={`/${locale}/paper/#s-2-5`} className="underline underline-offset-4 hover:text-accent">
            {c.m2Ref}
          </Link>
        </p>
      </section>
    </div>
  );
}
