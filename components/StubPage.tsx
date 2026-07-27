import { getDict, type Locale } from "@/lib/i18n";

export default function StubPage({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const dict = getDict(locale);
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="pt-14 pb-10 max-w-prose">
        <h1 className="font-serif text-3xl text-ink">{title}</h1>
        <p className="mt-6 text-muted">
          {dict.underConstruction}
          {locale === "zh" ? "，" : ". "}
          {dict.underConstructionNote}
        </p>
      </div>
    </div>
  );
}
