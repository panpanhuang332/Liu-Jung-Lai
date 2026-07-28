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
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length) {
          setActive(visible[0].target.id);
        } else {
          // nothing in band: highlight the last heading above the viewport top
          let current = "";
          for (const h of headings) {
            if (h.getBoundingClientRect().top < 120) current = h.id;
            else break;
          }
          if (current) setActive(current);
        }
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
