import Link from "next/link";

export type Project = {
  slug: string;
  title: string;
  year: string;
  body: React.ReactNode;
  artifact: React.ReactNode;
  links?: { href: string; label: string }[];
};

/** One project: summary and links on the left, the artifact on the right. */
export default function ProjectCard({ p }: { p: Project }) {
  const tid = `project-${p.slug}`;
  return (
    <article className="project" aria-labelledby={tid}>
      <div>
        <h3 id={tid}><Link href={`/work/${p.slug}/`}>{p.title}</Link><span className="year">{p.year}</span></h3>
        <p>{p.body}</p>
        <div className="btns">
          <Link className="btn btn-sm" href={`/work/${p.slug}/`}>Case study →</Link>
          {p.links?.map((l) => <a key={l.href} className="btn btn-sm" href={l.href}>{l.label}</a>)}
        </div>
      </div>
      <figure className="project-art">{p.artifact}</figure>
    </article>
  );
}
