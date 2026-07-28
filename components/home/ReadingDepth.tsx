import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { readingDepth } from "@/lib/content/home";

export default function ReadingDepth({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 border-b border-line" aria-labelledby="depth-h">
      <h2 id="depth-h" className="font-serif text-2xl text-ink">
        {readingDepth.heading[locale]}
      </h2>
      <p className="mt-2 text-sm text-muted">{readingDepth.sub[locale]}</p>
      <ul className="mt-6 divide-y divide-line border-t border-b border-line">
        {readingDepth.items.map((item) => (
          <li key={item.href + (item.hash ?? "")}>
            <Link
              href={`/${locale}/${item.href}/${item.hash ?? ""}`}
              className="group flex items-baseline gap-6 py-5 hover:bg-surface/60 px-2 -mx-2"
            >
              <span
                className="w-16 shrink-0 text-right font-serif text-3xl text-accent tabular-nums"
                aria-hidden="true"
              >
                {item.n[locale]}
              </span>
              <span className="flex-1">
                <span className="block font-medium text-ink">{item.time[locale]}</span>
                <span className="block text-sm text-muted">{item.what[locale]}</span>
              </span>
              <span className="text-muted group-hover:text-accent" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
