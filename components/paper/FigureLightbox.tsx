"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function FigureLightbox({
  src,
  fullSrc,
  alt,
  openLabel,
  closeLabel,
}: {
  src: string;
  fullSrc?: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
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
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        ref={trigger}
        onClick={() => setOpen(true)}
        aria-label={openLabel}
        className="block w-full cursor-zoom-in border border-line bg-white"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={1600}
          height={898}
          loading="lazy"
          className="w-full h-auto"
        />
      </button>
      {open && (
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
            src={fullSrc ?? src}
            alt={alt}
            className="max-h-full max-w-full bg-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
