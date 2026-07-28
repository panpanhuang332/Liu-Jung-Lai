"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { modes, quiz, type ModeId } from "@/lib/content/modes";

const ui = {
  zh: {
    progress: (a: number, b: number) => `已作答 ${a} / ${b} 題`,
    result: "你的作答最接近",
    tie: "你的作答同時接近以下模式（同分）：",
    seePaper: "論文對應段落",
    reset: "重新作答",
    incomplete: "全部作答後即顯示結果。",
    resultNote:
      "再次提醒：這是依論文表 3 判準設計的教學示意，不是經驗證的量表，結果不具診斷效力。",
  },
  en: {
    progress: (a: number, b: number) => `${a} / ${b} answered`,
    result: "Your answers are closest to",
    tie: "Your answers are equally close to (tied):",
    seePaper: "Corresponding sections of the paper",
    reset: "Start over",
    incomplete: "The result appears once all questions are answered.",
    resultNote:
      "A reminder: this is a teaching illustration built on the Table 3 criteria, not a validated scale; the result has no diagnostic validity.",
  },
} as const;

export default function ModesQuiz({ locale }: { locale: Locale }) {
  const [answers, setAnswers] = useState<Record<number, ModeId>>({});
  const t = ui[locale];
  const answered = Object.keys(answers).length;
  const total = quiz.length;

  const result = useMemo(() => {
    if (answered < total) return null;
    const score: Record<ModeId, number> = { avoid: 0, comp: 0, defad: 0, genint: 0 };
    Object.values(answers).forEach((m) => score[m]++);
    const max = Math.max(...Object.values(score));
    const top = (Object.keys(score) as ModeId[]).filter((m) => score[m] === max);
    return { top, score };
  }, [answers, answered, total]);

  return (
    <div>
      <ol className="space-y-8">
        {quiz.map((q, qi) => (
          <li key={qi}>
            <fieldset>
              <legend className="leading-relaxed">
                <span className="text-xs uppercase tracking-wider text-muted block">
                  {q.criterion[locale]}
                </span>
                <span className="font-medium text-ink">
                  {qi + 1}. {q.q[locale]}
                </span>
              </legend>
              <div className="mt-3 space-y-2">
                {q.options.map((o, oi) => (
                  <label
                    key={oi}
                    className={`flex items-baseline gap-3 border px-4 py-2.5 text-[0.95rem] cursor-pointer ${
                      answers[qi] === o.mode
                        ? "border-accent"
                        : "border-line hover:border-muted"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q${qi}`}
                      className="accent-[rgb(var(--c-accent))]"
                      checked={answers[qi] === o.mode}
                      onChange={() => setAnswers((a) => ({ ...a, [qi]: o.mode }))}
                    />
                    <span>{o.text[locale]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div className="mt-8 border-t border-line pt-6" aria-live="polite">
        <p className="text-sm text-muted">{t.progress(answered, total)}</p>
        {!result && <p className="mt-2 text-sm text-muted">{t.incomplete}</p>}
        {result && (
          <div className="mt-4">
            <p className="text-sm text-muted">
              {result.top.length > 1 ? t.tie : t.result}
            </p>
            {result.top.map((id) => {
              const m = modes.find((x) => x.id === id)!;
              return (
                <div key={id} className="mt-3 border border-accent/60 p-5">
                  <p className="font-serif text-xl text-ink">
                    {m.name[locale]}
                    <span lang={locale === "zh" ? "en" : "zh-Hant"} className="ml-2 text-sm text-muted">
                      {m.name[locale === "zh" ? "en" : "zh"]}
                    </span>
                  </p>
                  <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 text-[0.95rem]">
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {locale === "zh" ? "主要驅動" : "Primary driver"}
                      </dt>
                      <dd>{m.driver[locale]}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {locale === "zh" ? "裁量權／強制性" : "Discretion / mandate"}
                      </dt>
                      <dd>{m.discretion[locale]}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {locale === "zh" ? "行為深度" : "Behavioral depth"}
                      </dt>
                      <dd>{m.depth[locale]}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wider text-muted">
                        {locale === "zh" ? "潛在的角色意義" : "Underlying role meaning"}
                      </dt>
                      <dd>{m.meaning[locale]}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-muted">{m.source[locale]}</p>
                  <p className="mt-2 text-sm">
                    {t.seePaper}：
                    {m.anchors.map((a, i) => (
                      <span key={a.id}>
                        {i > 0 && "、"}
                        <Link
                          href={`/${locale}/paper/#${a.id}`}
                          className="text-accent underline underline-offset-4 hover:no-underline"
                        >
                          {a.label}
                        </Link>
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
            <p className="mt-4 max-w-prose text-sm text-muted">{t.resultNote}</p>
            <button
              type="button"
              onClick={() => setAnswers({})}
              className="mt-4 border border-line px-3 py-1.5 text-sm text-muted hover:border-accent hover:text-accent"
            >
              {t.reset}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
