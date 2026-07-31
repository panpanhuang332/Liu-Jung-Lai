import Link from "next/link";
import { author } from "@/content/author";
import AuthorPhoto from "@/components/AuthorPhoto";
import type { Locale } from "@/lib/i18n";

const copy = {
  zh: {
    themesLabel: "主要研究主題",
    themes: [
      "生成式 AI 導入與員工回應",
      "組織意義建構與科技框架",
      "角色威脅／角色機會評估",
      "賦能敘事與組織溝通",
      "AI 工作流程整合",
    ],
    more: "完整作者頁",
    orcid: "ORCID",
    email: "Email",
  },
  en: {
    themesLabel: "Main research themes",
    themes: [
      "Generative AI implementation and employee responses",
      "Organizational sensemaking and technological frames",
      "Role threat / role opportunity appraisal",
      "Enablement narratives and organizational communication",
      "AI workflow integration",
    ],
    more: "Full author page",
    orcid: "ORCID",
    email: "Email",
  },
} as const;

/**
 * Author-first hero — the "about the author" presence on the home page:
 * avatar card, bilingual name, positioning sentence, metadata row, themes.
 */
export default function AuthorHero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="pt-10 sm:pt-12 pb-10 border-b border-line">
      <div className="flex flex-col sm:flex-row gap-7 sm:gap-10">
        <div className="shrink-0 self-start">
          <AuthorPhoto locale={locale} />
        </div>
        <div className="min-w-0">
          <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-ink">
            {locale === "zh" ? (
              <>
                {author.name.zh}
                <span lang="en" className="block mt-2 text-2xl sm:text-3xl text-ink/80">
                  {author.name.en}
                </span>
              </>
            ) : (
              <span lang="en">{author.name.en}</span>
            )}
          </h1>
          <p className="mt-5 max-w-prose font-serif text-lg sm:text-xl leading-relaxed text-ink/90">
            {author.positioning[locale]}
          </p>
          <p className="mt-5 text-sm text-muted">
            {author.affiliation[locale]}
            <span className="mx-2" aria-hidden="true">·</span>
            {author.location[locale]}
            <span className="mx-2" aria-hidden="true">·</span>
            <a
              href={`https://orcid.org/${author.orcid}`}
              rel="me external"
              target="_blank"
              className="underline underline-offset-4 hover:text-accent"
            >
              {c.orcid} {author.orcid}
            </a>
            <span className="mx-2" aria-hidden="true">·</span>
            <a
              href={`mailto:${author.email}`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {c.email}
            </a>
          </p>
          <p className="mt-3 text-sm">
            <Link
              href={`/${locale}/about/`}
              className="text-accent underline underline-offset-4 hover:no-underline"
            >
              {c.more} →
            </Link>
          </p>
        </div>
      </div>
      <p className="mt-8 text-xs text-muted uppercase tracking-wider">{c.themesLabel}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {c.themes.map((t) => (
          <li key={t} className="border border-line bg-surface/60 px-2.5 py-1 text-sm text-ink/85">
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
