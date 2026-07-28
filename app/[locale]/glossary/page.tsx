import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import { languageAlternates, paperTitle, siteUrl, type Locale } from "@/lib/i18n";
import { glossaryDefs } from "@/lib/content/glossaryDefs";
import GlossaryList, { type GlossaryRow } from "@/components/GlossaryList";

const copy = {
  zh: {
    title: "術語辭典",
    description:
      "《當賦能敘事反噬》全文術語的中英對照辭典：可搜尋，核心構念附定義，每詞連結至論文中首次出現的章節。",
    lead: "本辭典收錄譯本核定術語表的全部詞條。核心構念附有自論文推導的簡短定義；每詞標注並連結首次出現的章節。",
  },
  en: {
    title: "Glossary",
    description:
      "A searchable bilingual glossary of the terms of “When Enablement Narratives Backfire”: core constructs carry definitions, and every term links to the section of the paper where it first appears.",
    lead: "All entries of the approved translation glossary. Core constructs carry short definitions derived from the paper; every term is linked to the section where it first appears.",
  },
} as const;

type RawEntry = { en: string; zh: string; section: string; note: string };

function sectionAnchor(section: string): string | null {
  const m = section.match(/^§(\d+(?:\.\d+)*)/);
  if (m) return "s-" + m[1].split(".").join("-");
  if (/^Title$/i.test(section)) return "top";
  if (/^Abstract$/i.test(section)) return "abstract";
  if (/Public Interest/i.test(section)) return "public-interest-statement";
  if (/^References$/i.test(section)) return "references";
  return null;
}

function cleanNote(note: string): string | undefined {
  const n = note
    .replace(/^種子術語（已核定）$/, "")
    .replace(/^(已核定|譯程新增)(；|$)/, "")
    .trim();
  return n || undefined;
}

function loadRows(): GlossaryRow[] {
  const raw = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "content/glossary.json"), "utf8")
  ) as RawEntry[];
  return raw
    .map((r) => ({
      en: r.en,
      zh: r.zh,
      section: r.section,
      anchor: sectionAnchor(r.section),
      note: cleanNote(r.note),
    }))
    .sort((a, b) => a.en.toLowerCase().localeCompare(b.en.toLowerCase()));
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
      canonical: `${siteUrl}/${locale}/glossary/`,
      ...languageAlternates("/glossary"),
    },
    openGraph: {
      title: `${c.title}｜${paperTitle.en}`,
      description: c.description,
      url: `${siteUrl}/${locale}/glossary/`,
      type: "article",
    },
  };
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const rows = loadRows().map((r) => ({
    ...r,
    def: glossaryDefs[r.en]?.[locale],
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: c.title,
    about: paperTitle.en,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    url: `${siteUrl}/${locale}/glossary/`,
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
      <div className="py-8">
        <GlossaryList rows={rows} locale={locale} />
      </div>
    </div>
  );
}
