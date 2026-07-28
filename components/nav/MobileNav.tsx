"use client";

import { useEffect, useRef, useState } from "react";
import ActiveNavLink from "./ActiveNavLink";

export type NavGroup = { label?: string; items: { href: string; label: string }[] };

export default function MobileNav({
  groups,
  menuLabel,
  closeLabel,
}: {
  groups: NavGroup[];
  menuLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        ref={btnRef}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap px-2 py-2 text-sm text-muted hover:text-accent"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" stroke="currentColor" strokeWidth="1.6">
          {open ? (
            <path d="M3 3 L15 15 M15 3 L3 15" />
          ) : (
            <path d="M2 4.5 H16 M2 9 H16 M2 13.5 H16" />
          )}
        </svg>
        {open ? closeLabel : menuLabel}
      </button>
      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          className="absolute left-0 right-0 top-full z-40 border-b border-line bg-paper shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
        >
          <nav aria-label={menuLabel} className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {groups.map((g, gi) => (
              <ul key={gi} className={gi > 0 ? "border-t border-line pt-2 mt-2" : ""}>
                {g.items.map((item) => (
                  <li key={item.href}>
                    <ActiveNavLink
                      href={item.href}
                      onNavigate={() => setOpen(false)}
                      className="block min-h-[44px] px-1 py-2.5 text-[0.95rem] !border-b-0"
                    >
                      {item.label}
                    </ActiveNavLink>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
