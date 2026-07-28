"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import {
  mechLabels,
  tierLabels,
  type MechGroup,
  type Tier,
} from "@/lib/content/propositions";

export type PropRow = {
  id: string;
  anchor: string;
  textZh: string;
  textEn: string;
  gloss: string;
  mech: MechGroup;
  tier: Tier;
  test: string;
};

const ui = {
  zh: {
    filterMech: "依機制",
    filterTier: "依層級",
    all: "全部",
    count: (n: number) => `顯示 ${n} 條命題`,
    colProp: "命題原文（中英）",
    colGloss: "白話說明",
    colMech: "機制／層級",
    colTest: "可觀察的檢驗方式",
    toPaper: "見原文 §4",
  },
  en: {
    filterMech: "By mechanism",
    filterTier: "By tier",
    all: "All",
    count: (n: number) => `Showing ${n} propositions`,
    colProp: "Proposition (zh / en)",
    colGloss: "Plain language",
    colMech: "Mechanism / tier",
    colTest: "Observable test",
    toPaper: "See §4 of the paper",
  },
} as const;

export default function PropositionsTable({
  rows,
  locale,
}: {
  rows: PropRow[];
  locale: Locale;
}) {
  const [mech, setMech] = useState<MechGroup | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);
  const t = ui[locale];

  const filtered = rows.filter(
    (r) => (!mech || r.mech === mech) && (!tier || r.tier === tier)
  );

  const chip = (activeVal: boolean) =>
    `border px-3 py-1 text-sm ${
      activeVal
        ? "border-accent text-accent"
        : "border-line text-muted hover:border-accent hover:text-accent"
    }`;

  return (
    <div>
      {/* filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.filterMech}>
          <span className="text-sm text-muted w-20">{t.filterMech}</span>
          <button type="button" aria-pressed={mech === null} className={chip(mech === null)} onClick={() => setMech(null)}>
            {t.all}
          </button>
          {(Object.keys(mechLabels) as MechGroup[]).map((m) => (
            <button key={m} type="button" aria-pressed={mech === m} className={chip(mech === m)} onClick={() => setMech(mech === m ? null : m)}>
              {mechLabels[m][locale]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label={t.filterTier}>
          <span className="text-sm text-muted w-20">{t.filterTier}</span>
          <button type="button" aria-pressed={tier === null} className={chip(tier === null)} onClick={() => setTier(null)}>
            {t.all}
          </button>
          {(Object.keys(tierLabels) as Tier[]).map((x) => (
            <button key={x} type="button" aria-pressed={tier === x} className={chip(tier === x)} onClick={() => setTier(tier === x ? null : x)}>
              {tierLabels[x][locale]}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted" aria-live="polite">
        {t.count(filtered.length)}
      </p>

      {/* desktop table */}
      <table className="hidden lg:table mt-4 w-full border-collapse text-[0.9rem] leading-relaxed align-top">
        <thead>
          <tr className="border-b-2 border-ink/60 text-left">
            <th scope="col" className="py-2 pr-4 w-[38%] font-semibold">{t.colProp}</th>
            <th scope="col" className="py-2 pr-4 w-[20%] font-semibold">{t.colGloss}</th>
            <th scope="col" className="py-2 pr-4 w-[14%] font-semibold">{t.colMech}</th>
            <th scope="col" className="py-2 font-semibold">{t.colTest}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r) => (
            <tr key={r.id} className="border-b border-line align-top">
              <td className="py-3 pr-4">
                <p className="font-serif">
                  <Link href={`/${locale}/paper/#${r.anchor}`} className="font-semibold text-accent hover:underline underline-offset-4">
                    {r.id}.
                  </Link>{" "}
                  {locale === "zh" ? r.textZh : r.textEn}
                </p>
                <p lang={locale === "zh" ? "en" : "zh-Hant"} className="mt-2 font-serif text-[0.85rem] text-muted">
                  {locale === "zh" ? r.textEn : r.textZh}
                </p>
              </td>
              <td className="py-3 pr-4">{r.gloss}</td>
              <td className="py-3 pr-4">
                <p>{mechLabels[r.mech][locale]}</p>
                <p className="mt-1 text-muted">{tierLabels[r.tier][locale]}</p>
              </td>
              <td className="py-3">{r.test}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* mobile cards */}
      <div className="lg:hidden mt-4 space-y-4">
        {filtered.map((r) => (
          <article key={r.id} className="border border-line p-4 text-sm leading-relaxed">
            <p className="font-serif">
              <Link href={`/${locale}/paper/#${r.anchor}`} className="font-semibold text-accent hover:underline underline-offset-4">
                {r.id}.
              </Link>{" "}
              {locale === "zh" ? r.textZh : r.textEn}
            </p>
            <details className="mt-2">
              <summary className="cursor-pointer text-muted text-xs">
                {locale === "zh" ? "英文原文" : "Chinese version"}
              </summary>
              <p lang={locale === "zh" ? "en" : "zh-Hant"} className="mt-1 font-serif text-[0.85rem] text-muted">
                {locale === "zh" ? r.textEn : r.textZh}
              </p>
            </details>
            <dl className="mt-3 space-y-2">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">{t.colGloss}</dt>
                <dd>{r.gloss}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">{t.colMech}</dt>
                <dd>
                  {mechLabels[r.mech][locale]}｜{tierLabels[r.tier][locale]}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted">{t.colTest}</dt>
                <dd>{r.test}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
