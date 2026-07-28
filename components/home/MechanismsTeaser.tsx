import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { mechanisms } from "@/lib/content/home";

export default function MechanismsTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 border-b border-line" aria-labelledby="mech-h">
      <h2 id="mech-h" className="font-serif text-2xl text-ink">
        {mechanisms.heading[locale]}
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* mechanism 1: discourse — rendered as an indented editorial block */}
        <div className="border-l-2 border-accent pl-5">
          <h3 className="font-serif text-lg text-ink">{mechanisms.m1.name[locale]}</h3>
          <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink/85">
            {mechanisms.m1.body[locale]}
          </p>
        </div>
        {/* mechanism 2: process — rendered with a loop mark */}
        <div className="bg-surface px-5 py-4">
          <h3 className="font-serif text-lg text-ink">
            <span className="text-accent mr-2" aria-hidden="true">↺</span>
            {mechanisms.m2.name[locale]}
          </h3>
          <p className="mt-2 max-w-prose text-[0.95rem] leading-relaxed text-ink/85">
            {mechanisms.m2.body[locale]}
          </p>
        </div>
      </div>
      <p className="mt-6 text-sm">
        <Link
          href={`/${locale}/mechanisms/`}
          className="text-accent underline underline-offset-4 hover:no-underline"
        >
          {mechanisms.link[locale]} →
        </Link>
      </p>
    </section>
  );
}
