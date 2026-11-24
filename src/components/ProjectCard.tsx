"use client";

import Link from "next/link";
import { useId, useState } from "react";

export type Project = {
  slug: string;
  title: string;
  year: string;
  body: React.ReactNode;
  preview: string;
  artifact: React.ReactNode;
  links?: { href: string; label: string }[];
};

/**
 * Summary always visible. The artifact shows one extra sentence on hover or keyboard focus, or with
 * the "More" button on touch screens, without moving anything. "Case study" is always shown.
 */
export default function ProjectCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false);
  const pid = useId();
  return (
    <article className="project" data-open={open} aria-labelledby={`${pid}-t`}>
      <div>
        <h3 id={`${pid}-t`}><Link href={`/work/${p.slug}/`}>{p.title}</Link><span className="year">{p.year}</span></h3>
        <p>{p.body}</p>
        <div className="btns">
          <Link className="btn btn-sm" href={`/work/${p.slug}/`}>Case study →</Link>
          {p.links?.map((l) => <a key={l.href} className="btn btn-sm" href={l.href}>{l.label}</a>)}
          <button type="button" className="btn btn-sm" aria-expanded={open} aria-controls={`${pid}-p`} onClick={() => setOpen((o) => !o)}>
            {open ? "Less" : "More"}
          </button>
        </div>
      </div>
      <figure className="project-art">
        {p.artifact}
        <figcaption id={`${pid}-p`} className="preview">{p.preview}</figcaption>
      </figure>
    </article>
  );
}
