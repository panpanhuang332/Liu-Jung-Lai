import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, paperTitle, siteUrl, type Locale,
  ogImage,
} from "@/lib/i18n";
import { oneMinute, tenMinute, fullGuide } from "@/lib/content/guide";

const copy = {
  zh: {
    title: "論文導讀",
    description:
      "《當賦能敘事反噬》三層深度導讀：一分鐘版、十分鐘版與逐章節完整導讀，每節附對應原文段落連結。",
    lead: "本頁依閱讀時間分三層深度。所有內容嚴格自論文本身推導，各節末標註對應的原文章節。",
    l1: "一分鐘版",
    l2: "十分鐘版",
    l3: "完整導讀",
    l3Note: "逐章節說明：每節回答「這節在回答什麼」「核心主張」「用到哪些理論」，並附對應原文連結。",
    fieldQ: "這節在回答什麼",
    fieldClaim: "核心主張",
    fieldTheory: "用到哪些理論",
    toPaper: "閱讀原文",
  },
  en: {
    title: "Reader's Guide",
    description:
      "A three-depth guide to “When Enablement Narratives Backfire”: one-minute, ten-minute, and full chapter-by-chapter versions, each linked to the corresponding sections of the paper.",
    lead: "Three depths, by reading time. Everything here derives strictly from the paper itself; each part ends with the sections it corresponds to.",
    l1: "One minute",
    l2: "Ten minutes",
    l3: "Full guide",
    l3Note: "Chapter by chapter: what each section answers, its core claim, the theories it draws on, and links into the original text.",
    fieldQ: "What this section answers",
    fieldClaim: "Core claim",
    fieldTheory: "Theories drawn on",
    toPaper: "Read the original",
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
      canonical: `${siteUrl}/${locale}/guide/`,
      ...languageAlternates("/guide"),
    },
    openGraph: {
      images: ogImage,
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/guide/`,
      type: "article",
    },
  };
}

function RefNote({
  locale,
  label,
  ids,
}: {
  locale: Locale;
  label: string;
  ids: string[];
}) {
  return (
    <p className="mt-4 text-sm text-muted">
      <Link
        href={`/${locale}/paper/#${ids[0]}`}
        className="underline underline-offset-4 hover:text-accent"
      >
        {label}
      </Link>
    </p>
  );
}

export default async function GuidePage({
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
    url: `${siteUrl}/${locale}/guide/`,
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
        <nav aria-label={c.title} className="mt-6 flex gap-4 text-sm">
          <a href="#one-minute" className="text-accent underline underline-offset-4 hover:no-underline">{c.l1}</a>
          <a href="#ten-minutes" className="text-accent underline underline-offset-4 hover:no-underline">{c.l2}</a>
          <a href="#full-guide" className="text-accent underline underline-offset-4 hover:no-underline">{c.l3}</a>
        </nav>
      </header>

      {/* one minute */}
      <section id="one-minute" className="py-10 border-b border-line">
        <h2 className="font-serif text-2xl text-ink">{c.l1}</h2>
        <dl className="mt-6 space-y-6 max-w-prose">
          {oneMinute.items.map((item, i) => (
            <div key={i}>
              <dt className="font-medium text-ink">{item.title[locale]}</dt>
              <dd className="mt-1 leading-relaxed text-ink/90">{item.body[locale]}</dd>
            </div>
          ))}
        </dl>
        <RefNote locale={locale} label={oneMinute.ref.label[locale]} ids={oneMinute.ref.ids} />
      </section>

      {/* ten minutes */}
      <section id="ten-minutes" className="py-10 border-b border-line">
        <h2 className="font-serif text-2xl text-ink">{c.l2}</h2>
        <div className="mt-6 space-y-10">
          {tenMinute.map((s, i) => (
            <div key={i} className="max-w-prose">
              <h3 className="font-serif text-xl text-ink">{s.q[locale]}</h3>
              {s.paras.map((p, j) => (
                <p key={j} className="mt-4 leading-relaxed text-ink/90">
                  {p[locale]}
                </p>
              ))}
              <RefNote locale={locale} label={s.ref.label[locale]} ids={s.ref.ids} />
            </div>
          ))}
        </div>
      </section>

      {/* full guide */}
      <section id="full-guide" className="py-10">
        <h2 className="font-serif text-2xl text-ink">{c.l3}</h2>
        <p className="mt-3 max-w-prose text-sm text-muted">{c.l3Note}</p>
        <div className="mt-8 space-y-8">
          {fullGuide.map((g) => (
            <section key={g.id} aria-labelledby={`h-${g.id}`} className="border border-line p-5 sm:p-6">
              <h3 id={`h-${g.id}`} className="font-serif text-lg text-ink">
                {g.title[locale]}
              </h3>
              <dl className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldQ}</dt>
                  <dd className="mt-1 text-ink/90">{g.question[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldClaim}</dt>
                  <dd className="mt-1 text-ink/90">{g.claim[locale]}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted">{c.fieldTheory}</dt>
                  <dd className="mt-1 text-ink/90">{g.theories[locale]}</dd>
                </div>
              </dl>
              <p className="mt-4 text-sm">
                <Link
                  href={`/${locale}/paper/#${g.anchor}`}
                  className="text-accent underline underline-offset-4 hover:no-underline"
                >
                  {g.refLabel[locale]} → {c.toPaper}
                </Link>
              </p>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
