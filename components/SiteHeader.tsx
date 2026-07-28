import Link from "next/link";
import { getDict, authorName, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

const navItems = (locale: Locale) => {
  const d = getDict(locale).nav;
  return [
    { href: `/${locale}/paper`, label: d.paper },
    { href: `/${locale}/guide`, label: d.guide },
    { href: `/${locale}/mechanisms`, label: d.mechanisms },
    { href: `/${locale}/propositions`, label: d.propositions },
    { href: `/${locale}/modes`, label: d.modes },
    { href: `/${locale}/glossary`, label: d.glossary },
    { href: `/${locale}/cite`, label: d.cite },
    { href: `/${locale}/about`, label: d.about },
  ];
};

export default function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex items-baseline justify-between pt-5 pb-1">
          <Link
            href={`/${locale}`}
            className="font-serif text-lg tracking-wide text-ink hover:text-accent"
          >
            {authorName.en}
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              label={dict.langSwitch.label}
              otherLabel={dict.langSwitch.other}
            />
            <ThemeToggle
              toLight={dict.themeToggle.toLight}
              toDark={dict.themeToggle.toDark}
            />
          </div>
        </div>
        <nav aria-label="Main" className="-mx-1 pb-3 pt-1">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {navItems(locale).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-1 py-1 text-muted hover:text-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
