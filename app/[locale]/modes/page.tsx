import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, paperTitle, siteUrl, type Locale } from "@/lib/i18n";
import { modes } from "@/lib/content/modes";
import ModesQuiz from "@/components/modes/ModesQuiz";

const copy = {
  zh: {
    title: "採用模式自我檢視",
    description:
      "《當賦能敘事反噬》四種採用回應模式（迴避／純遵從性使用／防衛性採用／真正整合）的互動說明，附依表 3 判準設計的 8 題教學示意自我檢視。",
    lead: "論文主張：對生成式 AI 的採用不是「用多用少」，而是四種性質不同的回應模式，由驅動因素、裁量權／強制性、行為深度與角色意義區分（§3.4、表 3）。",
    quizTitle: "自我檢視（教學示意）",
    quizLead:
      "以下 8 題依表 3 的四個判準各出兩題。作答後會顯示與你的作答最接近的模式，以及該模式在論文中的說明。",
    disclaimer:
      "本工具僅為教學示意，用以說明論文表 3 的分類判準；它不是經驗證的量表，結果不具任何診斷效力。所有運算都在你的瀏覽器內完成，本網站不蒐集、不傳送、不儲存任何作答資料。",
    modesTitle: "四種模式",
    colDriver: "主要驅動",
    colDiscretion: "裁量權／強制性",
    colDepth: "行為深度",
    colMeaning: "潛在的角色意義",
    toPaper: "論文對應段落",
  },
  en: {
    title: "Adoption-Mode Self-Check",
    description:
      "An interactive walkthrough of the four adoption response modes of “When Enablement Narratives Backfire” (avoidance / compliance-only use / defensive adoption / genuine integration), with an 8-question teaching-illustration self-check built on the Table 3 criteria.",
    lead: "The paper's claim: adoption of generative AI is not more-or-less use but four qualitatively different response modes, distinguished by driver, discretion versus mandate, behavioral depth, and role meaning (§3.4, Table 3).",
    quizTitle: "Self-check (teaching illustration)",
    quizLead:
      "Eight questions, two per Table 3 criterion. After answering, you will see the mode closest to your answers, with the paper's description of that mode.",
    disclaimer:
      "This tool is a teaching illustration of the Table 3 criteria only; it is not a validated scale and its result has no diagnostic validity. Everything runs in your browser—this site collects, transmits, and stores no answers.",
    modesTitle: "The four modes",
    colDriver: "Primary driver",
    colDiscretion: "Discretion / mandate",
    colDepth: "Behavioral depth",
    colMeaning: "Underlying role meaning",
    toPaper: "Corresponding sections",
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
      canonical: `${siteUrl}/${locale}/modes/`,
      ...languageAlternates("/modes"),
    },
    openGraph: {
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/modes/`,
      type: "article",
    },
  };
}

export default async function ModesPage({
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
    url: `${siteUrl}/${locale}/modes/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="pt-14 pb-8 border-b border-line">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/90">{c.lead}</p>
      </header>

      {/* the four modes */}
      <section className="py-10 border-b border-line" aria-labelledby="modes-h">
        <h2 id="modes-h" className="font-serif text-2xl text-ink">{c.modesTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {modes.map((m) => (
            <article key={m.id} className="border border-line p-5">
              <h3 className="font-serif text-lg text-ink">
                {m.name[locale]}
                <span lang={locale === "zh" ? "en" : "zh-Hant"} className="ml-2 text-sm text-muted font-sans">
                  {m.name[locale === "zh" ? "en" : "zh"]}
                </span>
              </h3>
              <dl className="mt-3 space-y-2 text-[0.92rem] leading-relaxed">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.colDriver}</dt>
                  <dd>{m.driver[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.colDiscretion}</dt>
                  <dd>{m.discretion[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.colDepth}</dt>
                  <dd>{m.depth[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.colMeaning}</dt>
                  <dd>{m.meaning[locale]}</dd>
                </div>
              </dl>
              <p className="mt-3 text-sm">
                {c.toPaper}：
                {m.anchors.map((a, i) => (
                  <span key={a.id}>
                    {i > 0 && "、"}
                    <Link
                      href={`/${locale}/paper/#${a.id}`}
                      className="text-accent underline underline-offset-4 hover:no-underline"
                    >
                      {a.label}
                    </Link>
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* quiz */}
      <section className="py-10" aria-labelledby="quiz-h">
        <h2 id="quiz-h" className="font-serif text-2xl text-ink">{c.quizTitle}</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-ink/90">{c.quizLead}</p>
        <p className="mt-3 max-w-prose border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-ink/90">
          {c.disclaimer}
        </p>
        <div className="mt-8 max-w-prose">
          <ModesQuiz locale={locale} />
        </div>
      </section>
    </div>
  );
}
