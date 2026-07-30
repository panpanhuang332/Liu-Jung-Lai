import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, siteUrl, type Locale, ogImage } from "@/lib/i18n";
import { publishedQa } from "@/content/qa";
import QaList from "@/components/qa/QaList";

const copy = {
  zh: {
    title: "學術問答",
    description:
      "由作者人工整理並公開的學術問答：針對《當賦能敘事反噬》《整合—可替代性弔詭》兩篇論文與作者研究方向的讀者提問。",
    intro:
      "本頁問答由作者自讀者提問中挑選整理後公開；未經審核的提問不會自動出現在此。若讀者同意公開，將依其選擇匿名或署名刊登。",
    empty: "目前尚無公開問答。歡迎透過讀者提問表單提出問題。",
    toQuestions: "前往讀者提問表單",
    labels: {
      all: "全部",
      paperA: "當賦能敘事反噬",
      paperB: "整合—可替代性弔詭",
      direction: "作者研究方向",
      relatedSection: "相關：",
      anonymous: "匿名讀者",
      filterLabel: "依類別篩選問答",
    },
  },
  en: {
    title: "Academic Q&A",
    description:
      "Curated academic Q&A published by the author: reader questions on “When Enablement Narratives Backfire,” “The Integration–Replaceability Paradox,” and the author's research direction.",
    intro:
      "Questions on this page are selected, edited, and published manually by the author; unreviewed submissions never appear automatically. With the reader's consent, entries are published anonymously or with attribution as chosen.",
    empty: "No published Q&A yet. You are welcome to submit a question through the reader question form.",
    toQuestions: "Go to the question form",
    labels: {
      all: "All",
      paperA: "Enablement Narratives",
      paperB: "Integration–Replaceability",
      direction: "Research direction",
      relatedSection: "Related: ",
      anonymous: "Anonymous reader",
      filterLabel: "Filter Q&A by category",
    },
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
      canonical: `${siteUrl}/${locale}/qa/`,
      ...languageAlternates("/qa"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/qa/`,
      type: "website",
    },
  };
}

export default async function QaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const items = publishedQa(locale);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="pt-14 pb-16">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>
        <p className="mt-4 max-w-prose text-muted leading-relaxed">{c.intro}</p>
        <p className="mt-3 text-sm">
          <Link
            href={`/${locale}/questions/`}
            className="text-accent underline underline-offset-4 hover:no-underline"
          >
            {c.toQuestions} →
          </Link>
        </p>
        <div className="mt-8">
          <QaList items={items} labels={c.labels} emptyText={c.empty} />
        </div>
      </div>
    </div>
  );
}
