"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Delegated lightbox for [data-lightbox] buttons inside the static article. */
export default function LightboxController({
  closeLabel,
  alt,
}: {
  closeLabel: string;
  alt: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setSrc(null);
    lastTrigger.current?.focus();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-lightbox]");
      if (!btn) return;
      lastTrigger.current = btn;
      setSrc(btn.getAttribute("data-lightbox"));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!src) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [src, close]);

  if (!src) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={close}
    >
      <button
        type="button"
        ref={closeBtn}
        onClick={close}
        className="absolute right-4 top-4 px-3 py-1.5 text-sm bg-paper text-ink border border-line"
      >
        {closeLabel}
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full bg-white"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
