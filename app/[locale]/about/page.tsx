import type { Metadata } from "next";
import {
  authorEmail,
  languageAlternates,
  paperTitle,
  authorName,
  affiliation,
  orcid,
  siteUrl,
  type Locale,
  ogImage,
} from "@/lib/i18n";

const copy = {
  zh: {
    title: "關於作者",
    description:
      "Liu-Jung Lai：建國科技大學經營管理系。研究關注生成式 AI 導入、組織意義建構與科技採用。",
    nameLabel: "姓名",
    affiliationLabel: "單位",
    orcidLabel: "ORCID",
    emailLabel: "聯絡信箱",
    interestsLabel: "研究興趣",
    interests: [
      "生成式 AI 導入（generative AI implementation）",
      "賦能敘事與組織溝通",
      "角色威脅與角色機會評估",
      "組織意義建構（sensemaking）",
      "科技採用與員工回應",
    ],
    currentWorkLabel: "目前研究",
    currentWork:
      "目前投稿中的概念性論文探討生成式 AI 導入中的賦能敘事反噬與 AI 互動式角色意義建構迴圈，並提出四種採用回應模式。",
  },
  en: {
    title: "About the Author",
    description:
      "Liu-Jung Lai, Department of Business Management, Chienkuo Technology University. Research on generative AI implementation, organizational sensemaking, and technology adoption.",
    nameLabel: "Name",
    affiliationLabel: "Affiliation",
    orcidLabel: "ORCID",
    emailLabel: "Contact",
    interestsLabel: "Research interests",
    interests: [
      "Generative AI implementation",
      "Enablement narratives and organizational communication",
      "Role threat and role opportunity appraisal",
      "Organizational sensemaking",
      "Technology adoption and employee responses",
    ],
    currentWorkLabel: "Current work",
    currentWork:
      "A conceptual paper currently under review examines enablement narrative backfire and the AI-interactive role sensemaking loop in generative AI implementation, proposing four modes of adoption response.",
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: authorName.en,
    affiliation: { "@type": "CollegeOrUniversity", name: affiliation.en },
    identifier: `https://orcid.org/${orcid}`,
    url: `${siteUrl}/${locale}/about/`,
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="pt-14 pb-10 max-w-prose">
        <h1 className="font-serif text-3xl text-ink">{c.title}</h1>

        <dl className="mt-8 space-y-5 text-ink/90">
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.nameLabel}
            </dt>
            <dd className="mt-1">
              {authorName.zh}
              <span lang="en" className="text-muted">
                {"（"}
                {authorName.en}
                {"）"}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.affiliationLabel}
            </dt>
            <dd className="mt-1">
              {affiliation.zh}
              <br />
              <span lang="en" className="text-muted">
                {affiliation.en}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.orcidLabel}
            </dt>
            <dd className="mt-1">
              <a
                href={`https://orcid.org/${orcid}`}
                rel="me external"
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {orcid}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.emailLabel}
            </dt>
            <dd className="mt-1">
              <a
                href={`mailto:${authorEmail}`}
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {authorEmail}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.interestsLabel}
            </dt>
            <dd className="mt-1 max-w-prose leading-relaxed">
              {c.interests.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span className="mx-2 text-muted" aria-hidden="true">·</span>}
                  {t}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted uppercase tracking-wider">
              {c.currentWorkLabel}
            </dt>
            <dd className="mt-1 leading-relaxed">
              {c.currentWork}
              <br />
              <span lang="en" className="italic font-serif text-muted">
                {paperTitle.en}
              </span>
            </dd>
          </div>
        </dl>
      </article>
    </div>
  );
}
