import Link from "next/link";
import { Sources } from "./Cite";
import Rail from "./Rail";
import type { Source } from "@/lib/site";

export type CaseSection = { id: string; label: string; title: string; body: React.ReactNode };

/**
 * Case-study layout: the artifact and my role come first, then problem, constraints, decisions,
 * tradeoffs and evaluation. A way back to the project list is always one click away.
 */
export default function CaseStudy(props: {
  kind: string;
  title: string;
  dek: string;
  artifact: React.ReactNode;
  caption: React.ReactNode;
  links?: { href: string; label: string }[];
  role: React.ReactNode;
  sections: CaseSection[];
  sources: Source[];
}) {
  const rail = [
    { id: "role", label: "My role" },
    ...props.sections.map((s) => ({ id: s.id, label: s.label })),
    { id: "sources", label: "Sources" },
  ];
  return (
    <div className="frame">
      <Rail items={rail} />
      <main id="main">
        <p className="crumb"><Link href="/#work">← All projects</Link> · <Link href="/">Siddharth Bhatt</Link></p>
        <header className="case-head">
          <p className="kicker">{props.kind}</p>
          <h1>{props.title}</h1>
          <p className="dek">{props.dek}</p>
        </header>
        <figure>
          <div className="case-art">{props.artifact}</div>
          <figcaption className="case-cap">{props.caption}</figcaption>
        </figure>
        {props.links && props.links.length > 0 && (
          <p className="case-links">{props.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}</p>
        )}

        <section id="role" className="role-box" aria-labelledby="role-h">
          <h2 id="role-h">My role</h2>
          {props.role}
        </section>

        {props.sections.map((s, i) => (
          <section key={s.id} id={s.id} className="sec prose" aria-labelledby={`${s.id}-h`}>
            <div className="sec-head">
              <span className="mark" aria-hidden="true">{String(i + 2).padStart(2, "0")}</span>
              <h2 id={`${s.id}-h`}>{s.title}</h2>
            </div>
            {s.body}
          </section>
        ))}

        <section id="sources" className="sec" aria-labelledby="sources-h">
          <div className="sec-head">
            <span className="mark" aria-hidden="true">{String(props.sections.length + 2).padStart(2, "0")}</span>
            <h2 id="sources-h">Sources</h2>
          </div>
          <Sources items={props.sources} />
        </section>

        <p className="back-link"><Link href="/#work">← Back to all projects</Link></p>
        <footer className="site">
          <span>© 2026 Siddharth Bhatt</span>
          <Link href="/#contact">Contact</Link>
        </footer>
      </main>
    </div>
  );
}
