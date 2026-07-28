import { renderInline } from "./Inline";
import type { RefEntry } from "@/lib/paper";

/**
 * Desktop: a regular table. Below md: card-per-row layout (no horizontal
 * scrolling), with the column header repeated as a label above each cell.
 * Rows whose non-first cells are all empty act as group headings (Table 2).
 */
export default function PaperTable({
  header,
  rows,
  refs,
  lang,
}: {
  header: string[];
  rows: string[][];
  refs: RefEntry[];
  lang?: string;
}) {
  const ctx = { refs, cite: true };
  return (
    <div lang={lang}>
      {/* desktop */}
      <table className="hidden md:table w-full border-collapse text-[0.925rem] leading-relaxed">
        <thead>
          <tr className="border-b-2 border-ink/60 text-left">
            {header.map((h, i) => (
              <th key={i} scope="col" className="py-2 pr-4 align-bottom font-semibold">
                {renderInline(h, ctx, `th${i}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => {
            const isGroup = r.slice(1).every((c) => !c);
            return (
              <tr key={ri} className="border-b border-line align-top">
                {isGroup ? (
                  <td colSpan={header.length} className="py-2 pr-4 font-semibold">
                    {renderInline(r[0], ctx, `g${ri}`)}
                  </td>
                ) : (
                  r.map((c, ci) => (
                    <td key={ci} className="py-2 pr-4">
                      {renderInline(c, ctx, `c${ri}-${ci}`)}
                    </td>
                  ))
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* mobile: cards */}
      <div className="md:hidden space-y-3">
        {rows.map((r, ri) => {
          const isGroup = r.slice(1).every((c) => !c);
          if (isGroup) {
            return (
              <p key={ri} className="pt-2 font-semibold">
                {renderInline(r[0], ctx, `mg${ri}`)}
              </p>
            );
          }
          return (
            <dl key={ri} className="border border-line p-4 text-sm leading-relaxed">
              {r.map((c, ci) =>
                c ? (
                  <div key={ci} className={ci ? "mt-2" : ""}>
                    <dt className="text-xs uppercase tracking-wider text-muted">
                      {renderInline(header[ci], ctx, `mh${ri}-${ci}`)}
                    </dt>
                    <dd>{renderInline(c, ctx, `mc${ri}-${ci}`)}</dd>
                  </div>
                ) : null
              )}
            </dl>
          );
        })}
      </div>
    </div>
  );
}
