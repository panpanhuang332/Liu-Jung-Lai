import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { languageAlternates, siteUrl, type Locale, ogImage } from "@/lib/i18n";
import { author } from "@/content/author";
import { featuredPapers } from "@/content/papers";
import AuthorPhoto from "@/components/AuthorPhoto";
import PaperCard from "@/components/PaperCard";

const copy = {
  zh: {
    title: "關於作者",
    description:
      "賴柳蓉（Liu-Jung Lai）：建國科技大學經營管理系。研究生成式 AI 導入過程中，組織如何塑造員工對科技、角色與未來工作的理解。",
    introHeading: "研究簡介",
    coreTopicsHeading: "核心研究主題",
    extendedTopicsHeading: "延伸研究主題",
    worksHeading: "代表性研究作品",
    worksNote: "兩篇平行的獨立研究，權重相當，可分別閱讀。",
    linksHeading: "學術連結",
    linkPapers: "論文列表",
    linkCite: "引用頁",
    orcidLabel: "ORCID",
    emailLabel: "Email",
  },
  en: {
    title: "About the Author",
    description:
      "Liu-Jung Lai, Department of Business Management, Chienkuo Technology University. Researching how organizations shape employees' understanding of technology, roles, and future work during generative AI implementation.",
    introHeading: "Research",
    coreTopicsHeading: "Core research themes",
    extendedTopicsHeading: "Extended themes",
    worksHeading: "Selected works",
    worksNote: "Two parallel, independent studies of equal standing; each can be read on its own.",
    linksHeading: "Academic links",
    linkPapers: "Papers",
    linkCite: "Cite",
    orcidLabel: "ORCID",
    emailLabel: "Email",
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
      canonical: `${siteUrl}/${locale}/about/`,
      ...languageAlternates("/about"),
    },
    openGraph: {
      images: ogImage,
      title: c.title,
      description: c.description,
      url: `${siteUrl}/${locale}/about/`,
      type: "profile",
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const c = copy[locale];
  const other: Locale = locale === "zh" ? "en" : "zh";
  const works = featuredPapers();

  // Person.image is deliberately omitted: the page visual is a symbolic
  // research avatar, not a portrait of the author.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name.en,
      alternateName: author.name.zh,
      affiliation: { "@type": "CollegeOrUniversity", name: author.affiliation.en },
      identifier: `https://orcid.org/${author.orcid}`,
      email: `mailto:${author.email}`,
      url: `${siteUrl}/${locale}/about/`,
    },
  };

  const metaItems: { label: string; node: ReactNode }[] = [
    { label: locale === "zh" ? "單位" : "Affiliation", node: author.affiliation[locale] },
    { label: locale === "zh" ? "所在地" : "Location", node: author.location[locale] },
    {
      label: c.orcidLabel,
      node: (
        <a
          href={`https://orcid.org/${author.orcid}`}
          rel="me external"
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {author.orcid}
        </a>
      ),
    },
    {
      label: c.emailLabel,
      node: (
        <a
          href={`mailto:${author.email}`}
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {author.email}
        </a>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-12 sm:pt-14 pb-16">
        {/* ---- Hero: avatar left, identity right (stacked on mobile) ---- */}
        <header className="flex flex-col sm:flex-row gap-7 sm:gap-10">
          <div className="shrink-0 self-start">
            <AuthorPhoto locale={locale} />
          </div>
          <div className="min-w-0">
            {locale === "zh" ? (
              <>
                <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-ink">
                  {author.name.zh}
                </h1>
                <p lang="en" className="mt-1.5 font-serif text-xl sm:text-2xl text-ink/75">
                  {author.name.en}
                </p>
              </>
            ) : (
              <>
                <h1 lang="en" className="font-serif text-4xl sm:text-5xl leading-tight text-ink">
                  {author.name.en}
                </h1>
                <p lang="zh-Hant" className="mt-1.5 font-serif text-xl sm:text-2xl text-ink/75">
                  {author.name.zh}
                </p>
              </>
            )}
            <p className="mt-5 max-w-[40ch] font-serif text-lg leading-relaxed text-ink/90">
              {author.positioning[locale]}
            </p>
            {/* metadata row */}
            <dl className="mt-6 border-t border-line pt-4 space-y-1.5">
              {metaItems.map((m) => (
                <div key={m.label} className="flex gap-3 text-sm">
                  <dt className="w-16 shrink-0 text-xs uppercase tracking-wider text-muted pt-0.5">
                    {m.label}
                  </dt>
                  <dd className="min-w-0 text-ink/90">{m.node}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* ---- Pull quote: the page's memory point ---- */}
        <blockquote className="claim mt-12 max-w-prose">
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink">
            {locale === "zh" ? `「${author.quote.zh}」` : `“${author.quote.en}”`}
          </p>
          <p lang={other === "zh" ? "zh-Hant" : "en"} className="mt-2 font-serif text-sm text-muted">
            {locale === "zh" ? `“${author.quote.en}”` : `「${author.quote.zh}」`}
          </p>
        </blockquote>

        {/* ---- Research intro: two short paragraphs ---- */}
        <section className="mt-12 max-w-prose" aria-labelledby="intro-h">
          <h2 id="intro-h" className="text-xs font-medium text-muted uppercase tracking-wider">
            {c.introHeading}
          </h2>
          {author.introParagraphs[locale].map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink/90">
              {p}
            </p>
          ))}
        </section>

        {/* ---- Topics: core cards + extended tags ---- */}
        <section className="mt-12" aria-labelledby="core-h">
          <h2 id="core-h" className="text-xs font-medium text-muted uppercase tracking-wider">
            {c.coreTopicsHeading}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            {author.coreTopics.map((t) => (
              <li key={t.label.en}>
                <Link
                  href={`/${locale}${t.href}/`}
                  className="group block h-full border border-line bg-surface/50 px-4 py-3.5 hover:border-accent/60 focus-visible:border-accent/60"
                >
                  <span className="block h-px w-6 bg-accent/70 mb-2.5" aria-hidden="true" />
                  <span className="font-serif text-[0.98rem] leading-snug text-ink group-hover:text-accent">
                    {t.label[locale]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <h3 id="ext-h" className="mt-6 text-xs font-medium text-muted uppercase tracking-wider">
            {c.extendedTopicsHeading}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2" aria-labelledby="ext-h">
            {author.extendedTopics.map((t) => (
              <li
                key={t.label.en}
                className="border-b border-line px-1 py-0.5 text-sm text-ink/80"
              >
                {t.label[locale]}
              </li>
            ))}
          </ul>
        </section>

        {/* ---- Representative works: parallel cards ---- */}
        <section className="mt-14 border-t border-line pt-8" aria-labelledby="works-h">
          <h2 id="works-h" className="font-serif text-2xl text-ink">
            {c.worksHeading}
          </h2>
          <p className="mt-2 text-sm text-muted">{c.worksNote}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 items-stretch">
            {works.map((p) => (
              <PaperCard key={p.slug} locale={locale} paper={p} />
            ))}
          </div>
        </section>

        {/* ---- Academic links ---- */}
        <section className="mt-12 border-t border-line pt-6" aria-labelledby="links-h">
          <h2 id="links-h" className="text-xs font-medium text-muted uppercase tracking-wider">
            {c.linksHeading}
          </h2>
          <p className="mt-3 text-sm text-ink/90">
            <a
              href={`https://orcid.org/${author.orcid}`}
              rel="me external"
              className="underline underline-offset-4 hover:text-accent"
            >
              {c.orcidLabel}
            </a>
            <span className="mx-2.5 text-muted" aria-hidden="true">·</span>
            <a
              href={`mailto:${author.email}`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {c.emailLabel}
            </a>
            <span className="mx-2.5 text-muted" aria-hidden="true">·</span>
            <Link href={`/${locale}/papers/`} className="underline underline-offset-4 hover:text-accent">
              {c.linkPapers}
            </Link>
            <span className="mx-2.5 text-muted" aria-hidden="true">·</span>
            <Link href={`/${locale}/cite/`} className="underline underline-offset-4 hover:text-accent">
              {c.linkCite}
            </Link>
          </p>
        </section>
      </article>
    </div>
  );
}
