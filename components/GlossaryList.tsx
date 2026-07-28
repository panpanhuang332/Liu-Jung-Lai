"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export type GlossaryRow = {
  en: string;
  zh: string;
  section: string;
  anchor: string | null;
  def?: string;
  note?: string;
};

const ui = {
  zh: {
    searchLabel: "搜尋術語",
    placeholder: "輸入中文或英文……",
    count: (n: number, total: number) => `顯示 ${n} / ${total} 條`,
    firstSeen: "首次出現",
    empty: "沒有符合的術語。",
  },
  en: {
    searchLabel: "Search terms",
    placeholder: "Type in English or Chinese…",
    count: (n: number, total: number) => `Showing ${n} of ${total}`,
    firstSeen: "First appears",
    empty: "No matching terms.",
  },
} as const;

export default function GlossaryList({
  rows,
  locale,
}: {
  rows: GlossaryRow[];
  locale: Locale;
}) {
  const [q, setQ] = useState("");
  const t = ui[locale];

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.en.toLowerCase().includes(needle) ||
        r.zh.toLowerCase().includes(needle) ||
        (r.def ?? "").toLowerCase().includes(needle)
    );
  }, [q, rows]);

  return (
    <div>
      <div className="max-w-md">
        <label htmlFor="glossary-search" className="block text-sm text-muted">
          {t.searchLabel}
        </label>
        <input
          id="glossary-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.placeholder}
          className="mt-1 w-full border border-line bg-paper px-3 py-2 text-[0.95rem] placeholder:text-muted/70"
        />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {t.count(filtered.length, rows.length)}
      </p>

      <ul className="mt-4 divide-y divide-line border-t border-b border-line">
        {filtered.map((r) => (
          <li key={r.en} className="py-4">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <span className="font-medium text-ink">
                {locale === "zh" ? r.zh : r.en}
              </span>
              <span
                lang={locale === "zh" ? "en" : "zh-Hant"}
                className="text-sm text-muted"
              >
                {locale === "zh" ? r.en : r.zh}
              </span>
            </div>
            {r.def && (
              <p className="mt-1.5 max-w-prose text-[0.92rem] leading-relaxed text-ink/90">
                {r.def}
              </p>
            )}
            <p className="mt-1.5 text-sm text-muted">
              {t.firstSeen}：
              {r.anchor ? (
                <Link
                  href={`/${locale}/paper/#${r.anchor}`}
                  className="text-accent underline underline-offset-4 hover:no-underline"
                >
                  {r.section}
                </Link>
              ) : (
                r.section
              )}
              {r.note ? <span className="ml-3">{r.note}</span> : null}
            </p>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="mt-6 text-muted">{t.empty}</p>}
    </div>
  );
}
