import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { researchProblem } from "@/lib/content/home";

export default function ResearchQuestions({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 border-b border-line" aria-labelledby="rq-h">
      <h2 id="rq-h" className="font-serif text-2xl text-ink">
        {researchProblem.heading[locale]}
      </h2>
      <ol className="mt-8 grid gap-8 md:grid-cols-3">
        {researchProblem.steps.map((s, i) => (
          <li key={i} className="border-t-2 border-ink/70 pt-4">
            <span className="font-serif text-sm text-accent" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="mt-2 font-medium leading-snug text-ink">{s.title[locale]}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/85">{s.body[locale]}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">
        <Link
          href={`/${locale}/paper/#${researchProblem.ref.anchor}`}
          className="underline underline-offset-4 hover:text-accent"
        >
          {researchProblem.ref.label[locale]}
        </Link>
      </p>
    </section>
  );
}
