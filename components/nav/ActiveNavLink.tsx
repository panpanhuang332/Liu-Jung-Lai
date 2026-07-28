"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** nav link with reusable current-page detection (aria-current + accent) */
export default function ActiveNavLink({
  href,
  children,
  className = "",
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);
  const active = normalize(pathname) === normalize(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={`${className} ${
        active
          ? "text-accent font-medium border-b-2 border-accent"
          : "text-muted border-b-2 border-transparent hover:text-accent"
      }`}
    >
      {children}
    </Link>
  );
}
