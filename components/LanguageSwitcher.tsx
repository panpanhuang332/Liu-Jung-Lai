"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

/**
 * Switches between /zh/... and /en/... while keeping the current
 * page path and the URL hash (anchor), so a reader at §2.4 stays at §2.4.
 */
export default function LanguageSwitcher({
  locale,
  label,
  otherLabel,
}: {
  locale: Locale;
  label: string;
  otherLabel: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const other: Locale = locale === "zh" ? "en" : "zh";
  const target = pathname.replace(/^\/(zh|en)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={target}
      lang={other === "zh" ? "zh-Hant" : "en"}
      aria-label={label}
      className="text-sm text-muted hover:text-accent px-1 py-1"
      onClick={(e) => {
        e.preventDefault();
        router.push(`${target}${window.location.hash}`);
      }}
    >
      {otherLabel}
    </Link>
  );
}
