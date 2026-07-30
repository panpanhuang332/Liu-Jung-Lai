import type { Locale } from "@/lib/i18n";
import type { QaItem, QaCategory } from "./types";
import { qaZh } from "./zh";
import { qaEn } from "./en";

export type { QaItem, QaCategory } from "./types";

/** 只回傳已公開之問答（published: true） */
export function publishedQa(locale: Locale): QaItem[] {
  const all = locale === "zh" ? qaZh : qaEn;
  return all.filter((q) => q.published);
}

export function qaForPaper(locale: Locale, paperSlug: QaCategory): QaItem[] {
  return publishedQa(locale).filter((q) => q.paperSlug === paperSlug);
}
