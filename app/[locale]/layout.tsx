import type { Metadata } from "next";
import "../globals.css";
import { serifEn, serifTc } from "@/lib/fonts";
import {
  locales,
  htmlLang,
  getDict,
  siteUrl,
  authorName,
  type Locale,
} from "@/lib/i18n";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const dict = getDict(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.siteName,
      template: `%s｜${authorName.en}`,
    },
    authors: [{ name: authorName.en }],
  };
}

const themeInit = `(function(){try{var t=localStorage.getItem("theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  const dict = getDict(locale);
  return (
    <html
      lang={htmlLang[locale]}
      className={`${serifEn.variable} ${serifTc.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:border focus:border-line"
        >
          {dict.skipToContent}
        </a>
        <SiteHeader locale={locale} />
        <main id="main" className="flex-1 w-full">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
