import Link from "next/link";
import { getDict, authorName, paperTitleMain, type Locale } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import ActiveNavLink from "./nav/ActiveNavLink";
import MobileNav, { type NavGroup } from "./nav/MobileNav";

/** grouped navigation: paper | explore | about — shared by desktop and mobile */
function navGroups(locale: Locale): NavGroup[] {
  const d = getDict(locale).nav;
  return [
    { items: [{ href: `/${locale}/paper`, label: d.paper }] },
    {
      items: [
        { href: `/${locale}/guide`, label: d.guide },
        { href: `/${locale}/mechanisms`, label: d.mechanisms },
        { href: `/${locale}/propositions`, label: d.propositions },
        { href: `/${locale}/modes`, label: d.modes },
        { href: `/${locale}/glossary`, label: d.glossary },
      ],
    },
    {
      items: [
        { href: `/${locale}/cite`, label: d.cite },
        { href: `/${locale}/about`, label: d.about },
      ],
    },
  ];
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  const groups = navGroups(locale);
  const menuLabel = locale === "zh" ? "選單" : "Menu";
  const closeLabel = locale === "zh" ? "關閉" : "Close";

  return (
    <header className="relative border-b border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link
            href={`/${locale}`}
            className="min-w-0 shrink font-serif text-[0.95rem] leading-tight text-ink hover:text-accent"
          >
            <span lang="en" className="block truncate">{paperTitleMain.en}</span>
            <span className="block text-xs text-muted font-sans">{authorName.en}</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher
              locale={locale}
              label={dict.langSwitch.label}
              otherLabel={dict.langSwitch.other}
            />
            <ThemeToggle
              toLight={dict.themeToggle.toLight}
              toDark={dict.themeToggle.toDark}
            />
            <MobileNav groups={groups} menuLabel={menuLabel} closeLabel={closeLabel} />
          </div>
        </div>
        {/* desktop nav: grouped, active state via ActiveNavLink */}
        <nav aria-label="Main" className="hidden md:block pb-0">
          <ul className="flex items-center gap-x-1 text-sm -mb-px">
            {groups.map((g, gi) => (
              <li key={gi} className="flex items-center gap-x-1">
                {gi > 0 && (
                  <span className="mx-2 h-4 w-px bg-line" aria-hidden="true" />
                )}
                <ul className="flex items-center gap-x-1">
                  {g.items.map((item) => (
                    <li key={item.href}>
                      <ActiveNavLink
                        href={item.href}
                        className="inline-block px-2 pb-2.5 pt-1"
                      >
                        {item.label}
                      </ActiveNavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
