import { getDict, authorName, affiliation, type Locale } from "@/lib/i18n";

export default function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDict(locale);
  return (
    <footer className="border-t border-line mt-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 text-sm text-muted space-y-2">
        <p>{dict.footer.statusNote}</p>
        <p>
          © {new Date().getFullYear()} {authorName.en} ·{" "}
          {affiliation[locale]}
        </p>
      </div>
    </footer>
  );
}
