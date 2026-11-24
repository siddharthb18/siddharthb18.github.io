import type { Source } from "@/lib/site";

/** A footnote marker: a small number that jumps to the source list at the bottom of the page. */
export function Cite({ n }: { n: number }) {
  return (
    <sup className="cite">
      <a href={`#source-${n}`} aria-label={`Source ${n}`}>{n}</a>
    </sup>
  );
}

/** The numbered source list that every Cite on the page points to. */
export function Sources({ items }: { items: Source[] }) {
  return (
    <ol className="sources">
      {items.map((s, i) => (
        <li key={s.label} id={`source-${i + 1}`}>
          <a href={s.href}>{s.label}</a>
          {s.note && <span className="note"> {s.note}</span>}
        </li>
      ))}
    </ol>
  );
}
