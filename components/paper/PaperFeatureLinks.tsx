import Link from "next/link";
import type { Locale } from "@/lib/i18n";

/**
 * Icon entry tiles shown at the top of the full-paper page: every Paper A
 * feature page, one tap away. Restrained line icons (1.5px stroke, ink),
 * accent on hover/current; wraps 4-per-row on mobile.
 */
type Item = {
  key: string;
  href: (l: Locale) => string;
  label: { zh: string; en: string };
  current?: boolean;
  icon: React.ReactNode;
};

const S = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const items: Item[] = [
  {
    key: "paper",
    href: (l) => `/${l}/paper`,
    label: { zh: "論文全文", en: "Full Paper" },
    current: true,
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M6 3.75h9l3 3v13.5H6z" />
        <path d="M15 3.75v3h3" />
        <path d="M8.5 10h7M8.5 13h7M8.5 16h4.5" />
      </svg>
    ),
  },
  {
    key: "guide",
    href: (l) => `/${l}/guide`,
    label: { zh: "導讀", en: "Guide" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M12 5.5C10.5 4.3 8.4 3.75 6 3.75c-1 0-2 .1-3 .35V19.1c1-.25 2-.35 3-.35 2.4 0 4.5.55 6 1.75 1.5-1.2 3.6-1.75 6-1.75 1 0 2 .1 3 .35V4.1c-1-.25-2-.35-3-.35-2.4 0-4.5.55-6 1.75z" />
        <path d="M12 5.5v15" />
      </svg>
    ),
  },
  {
    key: "mechanisms",
    href: (l) => `/${l}/mechanisms`,
    label: { zh: "機制拆解", en: "Mechanisms" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
        <path d="M17.6 3.4v3.5h-3.5" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    ),
  },
  {
    key: "propositions",
    href: (l) => `/${l}/propositions`,
    label: { zh: "命題總表", en: "Propositions" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M4 5.5h2M9 5.5h11M4 12h2M9 12h11M4 18.5h2M9 18.5h11" />
      </svg>
    ),
  },
  {
    key: "modes",
    href: (l) => `/${l}/modes`,
    label: { zh: "採用模式", en: "Modes" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <rect x="4" y="4" width="7" height="7" rx="1" />
        <rect x="13" y="4" width="7" height="7" rx="1" />
        <rect x="4" y="13" width="7" height="7" rx="1" />
        <rect x="13" y="13" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    key: "glossary",
    href: (l) => `/${l}/glossary`,
    label: { zh: "術語辭典", en: "Glossary" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M5 4.5A1.75 1.75 0 0 1 6.75 2.75H19v16.5H6.75A1.75 1.75 0 0 0 5 21z" />
        <path d="M5 19.25A1.75 1.75 0 0 1 6.75 17.5H19" />
        <path d="M9.75 12.5 12 7l2.25 5.5M10.4 11h3.2" />
      </svg>
    ),
  },
  {
    key: "cite",
    href: (l) => `/${l}/cite`,
    label: { zh: "引用本文", en: "Cite" },
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...S}>
        <path d="M9.5 7.5H6.25A2.25 2.25 0 0 0 4 9.75v2A2.25 2.25 0 0 0 6.25 14H8v.5A3.5 3.5 0 0 1 4.5 18" />
        <path d="M20 7.5h-3.25a2.25 2.25 0 0 0-2.25 2.25v2A2.25 2.25 0 0 0 16.75 14h1.75v.5A3.5 3.5 0 0 1 15 18" />
      </svg>
    ),
  },
];

export default function PaperFeatureLinks({ locale }: { locale: Locale }) {
  return (
    <nav
      aria-label={locale === "zh" ? "本論文功能" : "Paper features"}
      className="mb-8"
    >
      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {items.map((it) => (
          <li key={it.key}>
            <Link
              href={`${it.href(locale)}/`}
              aria-current={it.current ? "page" : undefined}
              className={`group flex h-full flex-col items-center gap-1.5 border px-2 py-3 text-center transition-colors ${
                it.current
                  ? "border-accent/60 text-accent"
                  : "border-line text-muted hover:border-accent/60 hover:text-accent focus-visible:text-accent"
              }`}
            >
              <span className="h-6 w-6">{it.icon}</span>
              <span className="text-xs leading-tight text-ink/85 group-hover:text-accent">
                {it.label[locale]}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
