"use client";

import { useEffect, useState } from "react";

const KEY = "paper-bilingual";

export default function BilingualToggle({
  label,
  hint,
}: {
  label: string;
  hint: string;
}) {
  const [on, setOn] = useState(false);

  const apply = (v: boolean) => {
    document
      .querySelectorAll("[data-paper-root]")
      .forEach((el) => el.setAttribute("data-bilingual", v ? "on" : "off"));
  };

  useEffect(() => {
    let v = false;
    try {
      v = localStorage.getItem(KEY) === "on";
    } catch {
      /* unavailable */
    }
    setOn(v);
    apply(v);
  }, []);

  const toggle = () => {
    const v = !on;
    setOn(v);
    apply(v);
    try {
      localStorage.setItem(KEY, v ? "on" : "off");
    } catch {
      /* unavailable */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      title={hint}
      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-sm ${
        on
          ? "border-accent text-accent"
          : "border-line text-muted hover:text-accent hover:border-accent"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-3 w-3 border ${
          on ? "bg-accent border-accent" : "border-muted"
        }`}
      />
      {label}
    </button>
  );
}
