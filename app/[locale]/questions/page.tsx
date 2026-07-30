import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, siteUrl, type Locale, ogImage } from "@/lib/i18n";
import { siteConfig, googleFormReady } from "@/lib/site-config";

const copy = {
  zh: {
    title: "讀者提問",
    description:
      "透過 Google 表單向作者提問：可針對特定論文、章節、圖表或研究方向提出學術問題。提問經人工審核後，部分將整理為公開學術問答。",
    howHeading: "提問方式",
    points: [
      "讀者可以針對特定論文、章節、圖表或作者研究方向提問。",
      "提問不會自動公開。",
      "作者會視問題代表性與時間，決定私下回覆或整理為公開學術問答。",
      "若問題被公開，會依讀者在表單中的同意選項，以匿名或署名方式刊登。",
      "不保證每一則問題都會獲得回覆。",
    ],
    open: "開啟提問表單",
    openNote: "表單將在新分頁開啟。",
    preparing: "讀者提問表單準備中",
    preparingNote: "表單開放後，本頁將提供填寫入口。您也可以先瀏覽已公開的學術問答。",
    toQa: "瀏覽公開問答",
    iframeTitle: "讀者提問表單（Google 表單）",
  },
  en: {
    title: "Ask a Question",
    description:
      "Ask the author a question through a Google Form: academic questions about a specific paper, section, figure, or research direction. Submissions are reviewed manually; some are curated into the public academic Q&A.",
    howHeading: "How it works",
    points: [
      "You may ask about a specific paper, section, figure, or the author's research direction.",
      "Submissions are never published automatically.",
      "Depending on representativeness and time, the author may reply privately or curate the question into the public academic Q&A.",
      "If published, a question appears anonymously or with attribution according to the consent you give in the form.",
      "A reply to every submission cannot be guaranteed.",
    ],
    open: "Open the question form",
    openNote: "The form opens in a new tab.",
    preparing: "The reader question form is being prepared",
    preparingNote:
      "Once the form is open, this page will provide the entry point. Meanwhile, you can browse the published Q&A.",
    toQa: "Browse published Q&A",
    iframeTitle: "Reader question form (Google Form)",
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
      canonical: `${siteUrl}/${locale}/questions/`,
      ...languageAlternates("/questions"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/questions/`,
      type: "website",
    },
  };
}

export default async function QuestionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const ready = googleFormReady();
  const { publicUrl, embedUrl } = siteConfig.googleForm;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: c.title,
    description: c.description,
    inLanguage: locale === "zh" ? "zh-Hant" : "en",
    url: `${siteUrl}/${locale}/questions/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-14 pb-16">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>

        <section className="mt-8 max-w-prose" aria-labelledby="how-h">
          <h2 id="how-h" className="text-xs text-muted uppercase tracking-wider">
            {c.howHeading}
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink/90">
            {c.points.map((p, i) => (
              <li key={i}>· {p}</li>
            ))}
          </ul>
        </section>

        {ready ? (
          <section className="mt-10">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {c.open}
              </a>
              <span className="text-sm text-muted">{c.openNote}</span>
            </div>
            {embedUrl && (
              <div className="mt-8 border border-line">
                <iframe
                  src={embedUrl}
                  title={c.iframeTitle}
                  className="block w-full max-w-full"
                  style={{ height: "70vh", minHeight: 560 }}
                />
              </div>
            )}
          </section>
        ) : (
          <section className="mt-10 border border-line bg-surface/50 p-6 max-w-prose">
            <p className="font-medium text-ink">{c.preparing}</p>
            <p className="mt-2 text-sm text-muted leading-relaxed">{c.preparingNote}</p>
            <p className="mt-3 text-sm">
              <Link
                href={`/${locale}/qa/`}
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {c.toQa} →
              </Link>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
