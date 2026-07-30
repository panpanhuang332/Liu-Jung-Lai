import type { Metadata } from "next";
import Link from "next/link";
import { languageAlternates, siteUrl, type Locale, ogImage } from "@/lib/i18n";
import { author } from "@/content/author";
import { featuredPapers } from "@/content/papers";
import AuthorPhoto from "@/components/AuthorPhoto";

const copy = {
  zh: {
    title: "關於作者",
    description:
      "賴柳蓉（Liu-Jung Lai）：建國科技大學經營管理系。研究生成式 AI 導入、組織意義建構、角色威脅評估與科技採用。",
    nameLabel: "姓名",
    affiliationLabel: "單位",
    locationLabel: "所在地",
    orcidLabel: "ORCID",
    emailLabel: "聯絡信箱",
    statementLabel: "研究主張",
    interestsLabel: "研究興趣",
    worksLabel: "學術作品",
    wipLabel: "工作論文與研究計畫",
    wipNote:
      "《整合—可替代性弔詭》為研究進行中之工作論文：實驗設計、材料與量表題項池已封版，資料蒐集尚未開始。",
    linksLabel: "外部學術連結",
    askLabel: "向作者提問",
    askNote: "如對論文內容或研究方向有疑問，歡迎透過讀者提問頁提出。",
  },
  en: {
    title: "About the Author",
    description:
      "Liu-Jung Lai, Department of Business Management, Chienkuo Technology University. Research on generative AI implementation, organizational sensemaking, role threat appraisal, and technology adoption.",
    nameLabel: "Name",
    affiliationLabel: "Affiliation",
    locationLabel: "Location",
    orcidLabel: "ORCID",
    emailLabel: "Contact",
    statementLabel: "Research statement",
    interestsLabel: "Research interests",
    worksLabel: "Academic works",
    wipLabel: "Working manuscripts & research in progress",
    wipNote:
      "“The Integration–Replaceability Paradox” is a working manuscript with research in progress: the experimental design, materials, and item pools are sealed; data collection has not yet begun.",
    linksLabel: "External academic links",
    askLabel: "Ask the author",
    askNote:
      "Questions about the papers or the research direction are welcome through the reader question page.",
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
  const works = featuredPapers();

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

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-14 pb-16">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>

        <div className="mt-8 flex flex-col sm:flex-row gap-8">
          <div className="shrink-0">
            <AuthorPhoto locale={locale} size={160} />
          </div>
          <dl className="space-y-5 text-ink/90 min-w-0">
            <div>
              <dt className="text-sm font-medium text-muted uppercase tracking-wider">{c.nameLabel}</dt>
              <dd className="mt-1">
                {locale === "zh" ? (
                  <>
                    {author.name.zh}
                    <span lang="en" className="text-muted">（{author.name.en}）</span>
                  </>
                ) : (
                  <span lang="en">{author.name.en}</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted uppercase tracking-wider">{c.affiliationLabel}</dt>
              <dd className="mt-1">
                {author.affiliation[locale]}
                {locale === "zh" && (
                  <>
                    <br />
                    <span lang="en" className="text-muted">{author.affiliation.en}</span>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted uppercase tracking-wider">{c.locationLabel}</dt>
              <dd className="mt-1">{author.location[locale]}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted uppercase tracking-wider">{c.orcidLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`https://orcid.org/${author.orcid}`}
                  rel="me external"
                  className="text-accent underline underline-offset-4 hover:no-underline"
                >
                  {author.orcid}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted uppercase tracking-wider">{c.emailLabel}</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${author.email}`}
                  className="text-accent underline underline-offset-4 hover:no-underline"
                >
                  {author.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <section className="mt-10 max-w-prose" aria-labelledby="stmt-h">
          <h2 id="stmt-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.statementLabel}
          </h2>
          <p className="mt-2 leading-relaxed text-ink/90">{author.statement[locale]}</p>
        </section>

        <section className="mt-8 max-w-prose" aria-labelledby="int-h">
          <h2 id="int-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.interestsLabel}
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {author.interests[locale].map((t) => (
              <li key={t} className="border border-line bg-surface/60 px-2.5 py-1 text-sm text-ink/85">
                {t}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="works-h">
          <h2 id="works-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.worksLabel}
          </h2>
          <ul className="mt-3 space-y-5 max-w-prose">
            {works.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${locale}${p.routes.overview}/`}
                  className="font-serif text-lg text-ink hover:text-accent"
                >
                  <span lang="en">{p.titleMain.en}</span>
                </Link>
                <p className="text-sm text-muted mt-0.5">{p.title.zh}</p>
                <p className="text-sm text-muted mt-1">
                  {p.type[locale]}
                  <span className="mx-2" aria-hidden="true">·</span>
                  {p.status[locale]}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 max-w-prose" aria-labelledby="wip-h">
          <h2 id="wip-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.wipLabel}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/90">{c.wipNote}</p>
        </section>

        <section className="mt-10 max-w-prose" aria-labelledby="links-h">
          <h2 id="links-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.linksLabel}
          </h2>
          <ul className="mt-2 text-sm space-y-1">
            {author.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  rel="me external"
                  className="text-accent underline underline-offset-4 hover:no-underline"
                >
                  {l.label[locale]}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 max-w-prose border-t border-line pt-6" aria-labelledby="ask-h">
          <h2 id="ask-h" className="text-sm font-medium text-muted uppercase tracking-wider">
            {c.askLabel}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">{c.askNote}</p>
          <p className="mt-2 text-sm">
            <Link
              href={`/${locale}/questions/`}
              className="text-accent underline underline-offset-4 hover:no-underline"
            >
              {c.askLabel} →
            </Link>
          </p>
        </section>
      </article>
    </div>
  );
}
