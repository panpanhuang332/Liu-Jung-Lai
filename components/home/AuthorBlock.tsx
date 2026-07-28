import Link from "next/link";
import { authorName, affiliation, type Locale } from "@/lib/i18n";
import { authorSection } from "@/lib/content/home";

export default function AuthorBlock({ locale }: { locale: Locale }) {
  return (
    <section className="py-10" aria-labelledby="author-h">
      <h2 id="author-h" className="text-xs text-muted uppercase tracking-wider">
        {authorSection.heading[locale]}
      </h2>
      <p className="mt-3 text-ink">
        {locale === "zh" ? (
          <>
            {authorName.zh}
            <span lang="en" className="text-muted">（{authorName.en}）</span>
          </>
        ) : (
          authorName.en
        )}
        <span className="mx-2 text-muted" aria-hidden="true">·</span>
        <span className="text-muted text-sm">{affiliation[locale]}</span>
      </p>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
        {authorSection.interests[locale]}
      </p>
      <p className="mt-3 text-sm">
        <Link
          href={`/${locale}/about/`}
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {authorSection.more[locale]} →
        </Link>
      </p>
    </section>
  );
}
