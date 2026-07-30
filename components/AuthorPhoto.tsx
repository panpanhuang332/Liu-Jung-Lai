import fs from "node:fs";
import path from "node:path";
import { withBase } from "@/lib/assets";
import { author } from "@/content/author";
import type { Locale } from "@/lib/i18n";

/**
 * About-page hero visual: the symbolic research avatar (NOT an author
 * portrait — labeled as such, and never written into Schema.org
 * Person.image). If public/images/author/research-avatar.jpg is absent at
 * build time, a quality initials placeholder card renders instead of a
 * broken image. Replacement/licensing notes: docs/HANDOFF_zh-TW.md.
 *
 * Portrait card: ~240x320 desktop, ~160x210 mobile; rounded, thin oxblood
 * border, slight desaturation + paper-tone softening overlay, no heavy
 * shadow; object-contain so the figure and the vessel are never cropped.
 */
export default function AuthorPhoto({ locale }: { locale: Locale }) {
  const { avatar } = author;
  const exists = fs.existsSync(path.join(process.cwd(), "public", avatar.path));

  const frame =
    "relative overflow-hidden rounded-xl border border-accent/50 bg-surface " +
    "w-[160px] h-[210px] sm:w-[240px] sm:h-[320px]";

  if (!exists) {
    const initials = author.name.en
      .split(/[\s-]+/)
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 3)
      .join("");
    return (
      <div className={`${frame} flex items-center justify-center`} aria-hidden="true">
        <span className="font-serif text-muted select-none text-4xl sm:text-6xl tracking-wide">
          {initials}
        </span>
        <span className="absolute inset-x-0 bottom-0 h-px bg-line" />
      </div>
    );
  }

  return (
    <figure className="m-0">
      <div className={frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase(avatar.path)}
          alt={avatar.alt[locale]}
          width={240}
          height={320}
          className="h-full w-full object-contain saturate-[.8]"
        />
        {/* paper-tone softening overlay (light) / neutral deepening (dark) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] bg-paper/20 dark:bg-black/15"
        />
      </div>
      <figcaption className="mt-2 text-center text-xs text-muted">
        {avatar.label[locale]}
      </figcaption>
    </figure>
  );
}
