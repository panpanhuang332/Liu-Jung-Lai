import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { modesTeaser } from "@/lib/content/home";
import { modes } from "@/lib/content/modes";

const abbr: Record<string, string> = {
  avoid: "A",
  comp: "C",
  defad: "D",
  genint: "G",
};

export default function ModesTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 border-b border-line" aria-labelledby="modes-teaser-h">
      <h2 id="modes-teaser-h" className="font-serif text-2xl text-ink">
        {modesTeaser.heading[locale]}
      </h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line">
        {modes.map((m) => (
          <div key={m.id} className={`p-5 ${m.id === "genint" ? "bg-surface" : "bg-paper"}`}>
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-accent" aria-hidden="true">
                {abbr[m.id]}
              </span>
              <span className="font-medium text-ink">{m.name[locale]}</span>
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{m.meaning[locale]}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{modesTeaser.note[locale]}</p>
      <p className="mt-4 text-sm">
        <Link
          href={`/${locale}/modes/`}
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {modesTeaser.link[locale]} →
        </Link>
      </p>
    </section>
  );
}
