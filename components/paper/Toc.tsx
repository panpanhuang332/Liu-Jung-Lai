"use client";

import { useEffect, useState } from "react";

export type TocEntry = { id: string; level: number; label: string };

export default function Toc({ items, title }: { items: TocEntry[]; title: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    const order = new Map(headings.map((h, i) => [h.id, i]));
    // last observed top per heading, from observer entries only — never query
    // layout ourselves (forced reflow is expensive on this very long page)
    const lastTop = new Map<string, number>();
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          lastTop.set(e.target.id, e.boundingClientRect.top);
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        }
        let current = "";
        if (inBand.size) {
          let best = Infinity;
          for (const id of inBand) {
            const i = order.get(id) ?? Infinity;
            if (i < best) {
              best = i;
              current = id;
            }
          }
        } else {
          // nothing in band: the last heading whose observed top is above it
          let best = -1;
          for (const [id, top] of lastTop) {
            const i = order.get(id) ?? -1;
            if (top < 120 && i > best) {
              best = i;
              current = id;
            }
          }
        }
        if (current) setActive(current);
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title} className="text-sm leading-relaxed">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">{title}</p>
      <ul className="space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`block border-l-2 py-0.5 pr-2 hover:text-accent ${
                i.level >= 3 ? "pl-6" : i.level === 2 ? "pl-3" : "pl-3 font-medium"
              } ${
                active === i.id
                  ? "border-accent text-accent"
                  : "border-transparent text-muted"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
