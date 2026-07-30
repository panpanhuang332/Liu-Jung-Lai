import fs from "node:fs";
import path from "node:path";
import { withBase } from "@/lib/assets";
import { author } from "@/content/author";
import { siteConfig } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n";

/**
 * Author photo with graceful fallback: if public/images/author/liu-jung-lai.jpg
 * does not exist at build time, render an initials placeholder instead of a
 * broken image. Replacement steps are documented in docs/HANDOFF_zh-TW.md.
 */
export default function AuthorPhoto({ locale, size = 160 }: { locale: Locale; size?: number }) {
  const rel = siteConfig.authorPhoto;
  const exists = fs.existsSync(path.join(process.cwd(), "public", rel));
  const alt =
    locale === "zh"
      ? `${author.name.zh}（${author.name.en}）的照片`
      : `Portrait of ${author.name.en}`;

  if (!exists) {
    const initials = author.name.en
      .split(/[\s-]+/)
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 3)
      .join("");
    return (
      <div
        aria-hidden="true"
        className="flex items-center justify-center border border-line bg-surface font-serif text-muted select-none"
        style={{ width: size, height: size, fontSize: size / 3.6 }}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBase(rel)}
      alt={alt}
      width={size}
      height={size}
      className="border border-line object-cover"
      style={{ width: size, height: size }}
    />
  );
}
