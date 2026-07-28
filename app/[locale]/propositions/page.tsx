import type { Metadata } from "next";
import { languageAlternates, paperTitle, siteUrl, type Locale,
  ogImage,
} from "@/lib/i18n";
import { getPaper } from "@/lib/paper";
import { propMeta } from "@/lib/content/propositions";
import PropositionsTable, { type PropRow } from "@/components/PropositionsTable";

const copy = {
  zh: {
    title: "命題總表",
    description:
      "《當賦能敘事反噬》13 條命題（P1–P10 含 a 型）的可篩選總表：命題原文（中英）、白話說明、所屬機制與層級、依 §5.3 的可觀察檢驗方式。",
    lead: "本頁彙整論文第 4 節的 13 條命題。命題原文逐字取自論文（中英兩版皆同全文頁）；白話說明與檢驗方式為導讀性質，自論文 §4 與 §5.3 推導。點命題編號可跳至原文段落。",
  },
  en: {
    title: "Propositions",
    description:
      "A filterable table of the 13 propositions (P1–P10 with a-variants) of “When Enablement Narratives Backfire”: verbatim text (zh/en), plain-language glosses, mechanism and tier, and observable tests per §5.3.",
    lead: "This page collects the 13 propositions of Section 4. Proposition texts are verbatim from the paper (identical to the full-text page in both languages); glosses and tests are reader's-guide material derived from §4 and §5.3. Click a proposition number to jump to it in the paper.",
  },
} as const;

/** strip markdown emphasis and the leading "**P1.**" label from a proposition paragraph */
function clean(text: string, id: string): string {
  return text
    .replace(new RegExp(`^\\*\\*${id}\\.?\\*\\*\\s*`), "")
    .replace(/\*\*/g, "")
    .replace(/(^|[\s（(「])\*([^*]+)\*(?=[\s）)」.,;:。，；]|$)/g, "$1$2")
    .replace(/\*/g, "")
    .trim();
}

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
      canonical: `${siteUrl}/${locale}/propositions/`,
      ...languageAlternates("/propositions"),
    },
    openGraph: {
      images: ogImage,
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/propositions/`,
      type: "article",
    },
  };
}

export default async function PropositionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const { pairs } = getPaper();

  const rows: PropRow[] = propMeta.map((m) => {
    const anchor = `prop-${m.id.toLowerCase()}`;
    const pair = pairs.find((p) => p.id === anchor);
    if (!pair || pair.en.type !== "para" || pair.zh.type !== "para") {
      throw new Error(`proposition ${m.id} not found in paper`);
    }
    return {
      id: m.id,
      anchor,
      textEn: clean(pair.en.text, m.id),
      textZh: clean(pair.zh.text, m.id),
      gloss: m.gloss[locale],
      mech: m.mech,
      tier: m.tier,
      test: m.test[locale],
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    about: paperTitle.en,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    url: `${siteUrl}/${locale}/propositions/`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="pt-14 pb-8 border-b border-line">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
        <p className="mt-4 max-w-prose leading-relaxed text-ink/90">{c.lead}</p>
      </header>
      <div className="py-8">
        <PropositionsTable rows={rows} locale={locale} />
      </div>
    </div>
  );
}
