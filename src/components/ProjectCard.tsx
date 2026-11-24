"use client";

import Link from "next/link";
import { useId, useState } from "react";

export type Project = {
  slug: string;
  title: string;
  kind: string; // honest label: personal prototype, course project...
  when: string;
  what: string;
  owned: React.ReactNode;
  evidence: React.ReactNode;
  preview: string;
  artifact: React.ReactNode;
  extraLink?: { href: string; label: string };
};

/**
 * Three layers: the summary is always visible; the preview sentence appears over the artifact on
 * hover or keyboard focus (desktop) or with the "More" button (touch), without moving the layout;
 * "View case study" is always shown.
 */
export default function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const pid = useId();
  return (
    <article className="project" data-open={open} aria-labelledby={`${pid}-t`}>
      <div className="project-text">
        <p className="kicker"><span className="num">{String(index).padStart(2, "0")}</span> {p.kind} · {p.when}</p>
        <h3 id={`${pid}-t`}><Link href={`/work/${p.slug}/`}>{p.title}</Link></h3>
        <p className="what">{p.what}</p>
        <dl className="facts">
          <dt>What I owned</dt><dd>{p.owned}</dd>
          <dt>Evidence</dt><dd>{p.evidence}</dd>
        </dl>
        <div className="project-actions">
          <Link className="cta" href={`/work/${p.slug}/`}>View case study <span aria-hidden="true">→</span></Link>
          {p.extraLink && <a href={p.extraLink.href}>{p.extraLink.label}</a>}
          <button type="button" className="more" aria-expanded={open} aria-controls={`${pid}-p`} onClick={() => setOpen((o) => !o)}>
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
