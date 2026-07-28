import Link from "next/link";
import {
  paperTitleMain,
  paperTitleSub,
  paperTitle,
  paperStatus,
  paperVersion,
  authorName,
  affiliation,
  authorEmail,
  orcid,
  type Locale,
} from "@/lib/i18n";
import { hero } from "@/lib/content/home";
import HeroConceptDiagram from "./HeroConceptDiagram";

export default function Hero({ locale }: { locale: Locale }) {
  const other = locale === "zh" ? "en" : "zh";
  return (
    <section className="pt-12 pb-12 border-b border-line">
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
        {/* left: the paper */}
        <div>
          <p className={`text-xs text-muted ${locale === "en" ? "uppercase tracking-widest" : "tracking-wide"}`}>
            {paperStatus[locale]}
            <span className="mx-2" aria-hidden="true">·</span>
            {paperVersion[locale]}
          </p>

          <h1 lang="en" className="mt-5 font-serif text-4xl sm:text-5xl leading-[1.12] text-ink text-balance">
            {paperTitleMain.en}
          </h1>
          <p lang="en" className="mt-3 max-w-[38ch] font-serif italic text-lg sm:text-xl leading-snug text-ink/80">
            {paperTitleSub.en}
          </p>
          {locale === "zh" && (
            <p className="mt-2 text-sm text-muted">
              {paperTitle.zh}
            </p>
          )}

          <blockquote className="claim mt-8 max-w-prose">
            <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink">
              {hero.claim[locale]}
            </p>
            <p
              lang={other === "zh" ? "zh-Hant" : "en"}
              className="mt-2 font-serif text-sm text-muted"
            >
              {hero.claim[other]}
            </p>
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href={`/${locale}/guide/#one-minute`} className="btn-primary">
              {hero.primaryCta[locale]}
            </Link>
            <Link href={`/${locale}/mechanisms/#m2`} className="btn-secondary">
              {hero.secondaryCta[locale]}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">
            {hero.tertiary.map((t, i) => (
              <span key={t.href}>
                {i > 0 && <span className="mx-2" aria-hidden="true">·</span>}
                <Link
                  href={`/${locale}/${t.href}/`}
                  className="underline underline-offset-4 hover:text-accent"
                >
                  {t.label[locale]} →
                </Link>
              </span>
            ))}
          </p>

          {/* author — deliberately secondary to the paper */}
          <div className="mt-10 border-t border-line pt-5">
            <p className="text-ink">
              {locale === "zh" ? (
                <>
                  {authorName.zh}
                  <span lang="en" className="text-muted">（{authorName.en}）</span>
                </>
              ) : (
                authorName.en
              )}
            </p>
            <p className="text-sm text-muted">{affiliation[locale]}</p>
            <p className="mt-2 text-sm">
              <a
                href={`https://orcid.org/${orcid}`}
                rel="me external"
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {hero.identity.orcid[locale]}
              </a>
              <span className="mx-2 text-muted" aria-hidden="true">·</span>
              <a
                href={`mailto:${authorEmail}`}
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {hero.identity.email[locale]}
              </a>
              <span className="mx-2 text-muted" aria-hidden="true">·</span>
              <Link
                href={`/${locale}/cite/`}
                className="text-accent underline underline-offset-4 hover:no-underline"
              >
                {hero.identity.cite[locale]}
              </Link>
            </p>
          </div>
        </div>

        {/* right: concept-model anchor */}
        <figure className="lg:pt-2">
          <div className="border border-line p-4 sm:p-5">
            <HeroConceptDiagram locale={locale} />
          </div>
          <figcaption className="mt-2 text-xs leading-relaxed text-muted">
            {hero.diagramCaption[locale]}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
