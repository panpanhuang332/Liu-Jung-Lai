"use client";

import { useState } from "react";
import type { QaItem, QaCategory } from "@/content/qa/types";

type Filter = "all" | QaCategory;

export default function QaList({
  items,
  labels,
  emptyText,
}: {
  items: QaItem[];
  labels: {
    all: string;
    paperA: string;
    paperB: string;
    direction: string;
    relatedSection: string;
    anonymous: string;
    filterLabel: string;
  };
  emptyText: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "enablement-narrative-backfire", label: labels.paperA },
    { key: "integration-replaceability-paradox", label: labels.paperB },
    { key: "research-direction", label: labels.direction },
  ];
  const shown = filter === "all" ? items : items.filter((q) => q.paperSlug === filter);

  return (
    <div>
      <div role="group" aria-label={labels.filterLabel} className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={`border px-3 py-1.5 text-sm transition-colors ${
              filter === f.key
                ? "border-accent text-accent"
                : "border-line text-muted hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 max-w-prose text-muted leading-relaxed">{emptyText}</p>
      ) : (
        <ul className="mt-8 space-y-8">
          {shown.map((q) => (
            <li key={q.id} className="border border-line bg-surface/40 p-5 sm:p-6">
              <h2 className="font-serif text-lg text-ink">{q.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/90 whitespace-pre-line">
                {q.answer}
              </p>
              <p className="mt-4 text-xs text-muted">
                {q.date}
                {(q.relatedSection || q.relatedHypothesisOrProposition) && (
                  <>
                    <span className="mx-2" aria-hidden="true">·</span>
                    {labels.relatedSection}
                    {[q.relatedSection, q.relatedHypothesisOrProposition]
                      .filter(Boolean)
                      .join("、")}
                  </>
                )}
                <span className="mx-2" aria-hidden="true">·</span>
                {q.anonymous || !q.attribution ? labels.anonymous : q.attribution}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
