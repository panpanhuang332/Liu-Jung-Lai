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
import { featuredPapers } from "@/content/papers";
import PaperCard from "@/components/PaperCard";

const copy = {
  zh: {
    title: "學術作品",
    description:
      "Liu-Jung Lai 的學術作品：兩篇關於生成式 AI 導入與員工角色意義的平行研究——概念性論文《當賦能敘事反噬》與實驗研究工作論文《整合—可替代性弔詭》。",
    intro:
      "以下為目前公開的學術作品。兩篇論文為平行的獨立研究：一篇是投稿審查中的概念性論文，一篇是研究進行中的實驗研究工作論文。",
  },
  en: {
    title: "Papers",
    description:
      "Academic works by Liu-Jung Lai: two parallel studies on generative AI implementation and employee role meaning — the conceptual paper “When Enablement Narratives Backfire” and the working manuscript “The Integration–Replaceability Paradox.”",
    intro:
      "The academic works currently published on this site. The two papers are parallel, independent studies: a conceptual paper under review, and an experimental working manuscript with research in progress.",
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
      canonical: `${siteUrl}/${locale}/papers/`,
      ...languageAlternates("/papers"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/papers/`,
      type: "website",
    },
  };
}

export default async function PapersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const list = featuredPapers();

  const jsonLd = list.map((p) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: p.title.en,
    alternativeHeadline: p.title.zh,
    author: {
      "@type": "Person",
      name: authorName.en,
      affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
      identifier: `https://orcid.org/${orcid}`,
    },
    creativeWorkStatus: p.statusSchema,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    keywords: p.keywords.en.join(", "),
    url: `${siteUrl}/${locale}${p.routes.overview}/`,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-14 pb-16">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
        <p className="mt-4 max-w-prose text-muted leading-relaxed">{c.intro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 items-stretch">
          {list.map((p) => (
            <PaperCard key={p.slug} locale={locale} paper={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
