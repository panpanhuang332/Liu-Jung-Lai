import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { resources } from "@/lib/content/home";

export default function ResourcesRow({ locale }: { locale: Locale }) {
  return (
    <section className="py-8 border-b border-line" aria-labelledby="res-h">
      <h2 id="res-h" className="text-xs text-muted uppercase tracking-wider">
        {resources.heading[locale]}
      </h2>
      <p className="mt-3 text-sm text-muted">
        {resources.items.map((r, i) => (
          <span key={r.href}>
            {i > 0 && <span className="mx-2.5" aria-hidden="true">·</span>}
            <Link
              href={`/${locale}/${r.href}/`}
              className="underline underline-offset-4 hover:text-accent"
            >
              {r.label[locale]}
            </Link>
          </span>
        ))}
      </p>
    </section>
  );
}
