"use client";

import { usePathname } from "next/navigation";
import ActiveNavLink from "./ActiveNavLink";
import type { Locale } from "@/lib/i18n";

/**
 * Contextual sub-navigation for Paper A. The portfolio header keeps four
 * site-level items; this bar restores the original per-paper navigation
 * (full text, guide, mechanisms, propositions, modes, glossary, cite)
 * whenever the reader is inside a Paper A page.
 */
const PAPER_A_ROUTES = [
  "paper",
  "guide",
  "mechanisms",
  "propositions",
  "modes",
  "glossary",
  "cite",
] as const;

const labels = {
  zh: {
    scope: "當賦能敘事反噬",
    overview: "論文頁",
    paper: "論文全文",
    guide: "導讀",
    mechanisms: "機制拆解",
    propositions: "命題總表",
    modes: "採用模式",
    glossary: "術語辭典",
    cite: "引用本文",
  },
  en: {
    scope: "When Enablement Narratives Backfire",
    overview: "Paper page",
    paper: "Full Paper",
    guide: "Reader's Guide",
    mechanisms: "Mechanisms",
    propositions: "Propositions",
    modes: "Adoption Modes",
    glossary: "Glossary",
    cite: "Cite",
  },
} as const;

export default function PaperContextNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const inPaperA =
    new RegExp(`^/(zh|en)/(${PAPER_A_ROUTES.join("|")})(/|$)`).test(pathname) ||
    pathname.includes("/papers/enablement-narrative-backfire");
  if (!inPaperA) return null;

  const t = labels[locale];
  const items: { href: string; label: string }[] = [
    { href: `/${locale}/papers/enablement-narrative-backfire`, label: t.overview },
    ...PAPER_A_ROUTES.map((r) => ({ href: `/${locale}/${r}`, label: t[r] })),
  ];

  return (
    <nav
      aria-label={locale === "zh" ? "本論文導覽" : "Paper navigation"}
      className="border-b border-line bg-surface/60"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center gap-x-1 overflow-x-auto py-1.5 text-sm whitespace-nowrap">
          <span
            className="mr-2 shrink-0 font-serif text-xs text-muted"
            lang={locale === "zh" ? undefined : "en"}
          >
            {t.scope}
          </span>
          <span className="mr-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
          {items.map((i) => (
            <ActiveNavLink
              key={i.href}
              href={i.href}
              className="inline-block shrink-0 px-2 py-1"
            >
              {i.label}
            </ActiveNavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
