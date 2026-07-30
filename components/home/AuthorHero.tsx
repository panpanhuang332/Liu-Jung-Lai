import { authorName, affiliation, orcid, type Locale } from "@/lib/i18n";

const copy = {
  zh: {
    positioning:
      "研究生成式 AI 導入中的組織意義建構：賦能敘事為何反噬、整合結構如何同時發出成功與可替代訊號，以及員工的角色威脅與角色機會評估如何形塑採用回應。",
    themesLabel: "主要研究主題",
    themes: [
      "生成式 AI 導入與員工回應",
      "組織意義建構與科技框架",
      "角色威脅／角色機會評估",
      "賦能敘事與組織溝通",
      "AI 工作流程整合",
    ],
    location: "臺灣彰化市",
  },
  en: {
    positioning:
      "Research on organizational sensemaking in generative AI implementation: why enablement narratives backfire, how integration structures signal success and replaceability at once, and how employees' role threat and role opportunity appraisals shape adoption responses.",
    themesLabel: "Main research themes",
    themes: [
      "Generative AI implementation and employee responses",
      "Organizational sensemaking and technological frames",
      "Role threat / role opportunity appraisal",
      "Enablement narratives and organizational communication",
      "AI workflow integration",
    ],
    location: "Changhua City, Taiwan",
  },
} as const;

/** Author-first hero: identity, positioning, themes. Academic, restrained. */
export default function AuthorHero({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="pt-12 pb-10 border-b border-line">
      <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-ink">
        {locale === "zh" ? (
          <>
            {authorName.zh}
            <span lang="en" className="block mt-2 text-2xl sm:text-3xl text-ink/80">
              {authorName.en}
            </span>
          </>
        ) : (
          authorName.en
        )}
      </h1>
      <p className="mt-4 text-sm text-muted">
        {affiliation[locale]}
        <span className="mx-2" aria-hidden="true">·</span>
        {c.location}
        <span className="mx-2" aria-hidden="true">·</span>
        <a
          href={`https://orcid.org/${orcid}`}
          rel="noopener noreferrer"
          target="_blank"
          className="underline underline-offset-4 hover:text-accent"
        >
          ORCID {orcid}
        </a>
      </p>
      <p className="mt-6 max-w-prose font-serif text-lg sm:text-xl leading-relaxed text-ink/90">
        {c.positioning}
      </p>
      <p className="mt-6 text-xs text-muted uppercase tracking-wider">{c.themesLabel}</p>
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
