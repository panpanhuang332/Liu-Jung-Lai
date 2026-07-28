"use client";

import { useEffect } from "react";

/**
 * With content-visibility:auto, block heights above an anchor are estimates
 * until rendered, so a hash jump can land short of its target. Re-run
 * scrollIntoView after layout settles to correct the landing position.
 */
export default function AnchorFix() {
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const fix = () => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const land = () => {
        // stop correcting once the target is already at the expected offset
        const top = el.getBoundingClientRect().top;
        if (top < 60 || top > 130) el.scrollIntoView();
      };
      el.scrollIntoView();
      requestAnimationFrame(land);
      for (const ms of [150, 400, 800, 1500]) timers.push(setTimeout(land, ms));
    };
    fix();
    window.addEventListener("hashchange", fix);
    return () => {
      window.removeEventListener("hashchange", fix);
      timers.forEach(clearTimeout);
    };
  }, []);
  return null;
}
