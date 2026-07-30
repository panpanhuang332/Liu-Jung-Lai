import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { PaperEntry } from "@/content/papers";

const ui = {
  zh: {
    readFullText: "閱讀全文",
    zhTranslation: "中文譯本",
    guide: "研究導讀",
    overview: "論文頁",
    coreQuestion: "核心研究問題",
    workingTitle: "暫定題名",
  },
  en: {
    readFullText: "Read full text",
    zhTranslation: "Chinese translation",
    guide: "Reader's guide",
    overview: "Paper page",
    coreQuestion: "Core research question",
    workingTitle: "Working title",
  },
} as const;

/**
 * A single paper card. Paper A and Paper B share this component so the two
 * works stay visually parallel (same size, hierarchy, status badge, entries).
 */
export default function PaperCard({ locale, paper }: { locale: Locale; paper: PaperEntry }) {
  const t = ui[locale];
  const inProgress = !paper.translationStatus.authorApproved && paper.missingSections.length > 0;

  return (
    <article className="flex h-full flex-col border border-line bg-surface/50 p-6 sm:p-7">
      <p className="text-xs text-muted tracking-wide">
        {paper.type[locale]}
        <span className="mx-2" aria-hidden="true">·</span>
        <span className={inProgress ? "text-accent" : ""}>{paper.status[locale]}</span>
      </p>

      <h3 className="mt-4 font-serif text-xl sm:text-2xl leading-snug text-ink">
        <Link
          href={`/${locale}${paper.routes.overview}/`}
          className="hover:text-accent"
        >
          <span lang="en" className="block">{paper.titleMain.en}</span>
        </Link>
      </h3>
      <p lang="en" className="mt-1 font-serif italic text-sm text-ink/75">
        {paper.titleSub.en}
      </p>
      <p className="mt-2 text-sm text-muted">
        {paper.title.zh}
        {paper.titleProvisional && (
          <span className="ml-2 text-xs border border-line px-1.5 py-0.5">{t.workingTitle}</span>
        )}
      </p>

      <p className="mt-2 text-xs text-muted">{paper.authors.display[locale]}</p>

      <div className="mt-4 flex-1">
        <p className="text-xs text-muted uppercase tracking-wider">{t.coreQuestion}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/90 max-w-prose">
          {paper.coreQuestion[locale]}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-4 text-sm">
        {paper.routes.fullText ? (
          <>
            <Link href={`/${locale}${paper.routes.fullText}/`} className="btn-primary">
              {t.readFullText}
            </Link>
            <Link
              href={`/zh${paper.routes.fullText}/`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {t.zhTranslation}
            </Link>
          </>
        ) : (
          <Link href={`/${locale}${paper.routes.overview}/`} className="btn-primary">
            {t.overview}
          </Link>
        )}
        {paper.routes.guide && (
          <Link
            href={`/${locale}${paper.routes.guide}/`}
            className="underline underline-offset-4 hover:text-accent"
          >
            {t.guide}
          </Link>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">{paper.translationStatus.label[locale]}</p>
    </article>
  );
}
