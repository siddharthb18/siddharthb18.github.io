import Link from "next/link";
import { Sources } from "./Cite";
import Rail from "./Rail";
import type { Source } from "@/lib/site";

export type CaseSection = { id: string; label: string; title: string; body: React.ReactNode };

/** Case study: artifact and role first, then problem, constraints, decisions, tradeoffs and evaluation. */
export default function CaseStudy(props: {
  title: string;
  dek: React.ReactNode;
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
    <>
      <Rail items={rail} />
      <main id="main" className="page">
        <Link className="btn btn-sm" href="/#work">← All projects</Link>
        <header className="case-head">
          <h1>{props.title}</h1>
          <p>{props.dek}</p>
        </header>
        <div className="case-top">
          <div>
            <figure>
              <div className="case-art">{props.artifact}</div>
              <figcaption className="case-cap">{props.caption}</figcaption>
            </figure>
            {props.links && props.links.length > 0 && (
              <div className="btns case-links">{props.links.map((l) => <a key={l.href} className="btn btn-sm" href={l.href}>{l.label}</a>)}</div>
            )}
          </div>
          <section id="role" className="role-box" aria-labelledby="role-h">
            <h2 id="role-h">My role</h2>
            {props.role}
          </section>
        </div>

        {props.sections.map((s) => (
          <section key={s.id} id={s.id} className="sec" aria-labelledby={`${s.id}-h`}>
            <h2 id={`${s.id}-h`}>{s.title}</h2>
            <div className="sec-body prose">{s.body}</div>
          </section>
        ))}

        <section id="sources" className="sec" aria-labelledby="sources-h">
          <h2 id="sources-h">Sources</h2>
          <div className="sec-body"><Sources items={props.sources} /></div>
        </section>

        <p className="back-link"><Link className="btn" href="/#work">← Back to all projects</Link></p>
        <footer className="site"><span>© 2026 Siddharth Bhatt</span></footer>
      </main>
    </>
  );
}
