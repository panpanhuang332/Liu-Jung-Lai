"use client";

import { useState } from "react";

export default function CopyButton({
  text,
  label,
  copiedLabel,
}: {
  text: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for older browsers / denied permissions
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`border px-3 py-1.5 text-sm ${
        copied
          ? "border-accent text-accent"
          : "border-line text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
