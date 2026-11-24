"use client";

import { useEffect, useState } from "react";

export type RailItem = { id: string; label: string };

/**
 * "On this page" navigation. Desktop: a sticky rail on the right with a short numbered marker and a
 * readable label for each section; the section in view is highlighted. Mobile: a compact "Jump to"
 * menu in a slim bar at the top. Both are plain anchor links, so they work with the keyboard and
 * without JavaScript; the script only adds the highlight.
 */
export default function Rail({ items, title = "On this page" }: { items: RailItem[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const pick = () => {
      // The active section is the last one whose top has passed 35% of the viewport.
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    pick();
    window.addEventListener("scroll", pick, { passive: true });
    window.addEventListener("resize", pick);
    return () => { window.removeEventListener("scroll", pick); window.removeEventListener("resize", pick); };
  }, [items]);

  const list = (onPick?: () => void) => (
    <ol>
      {items.map((it, i) => (
        <li key={it.id}>
          <a href={`#${it.id}`} aria-current={active === it.id ? "location" : undefined} onClick={onPick}>
            <span className="mark" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <span className="label">{it.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  const current = items.find((i) => i.id === active)?.label;

  return (
    <>
      <nav className="rail" aria-label={title}>
        <p className="rail-title">{title}</p>
        {list()}
      </nav>
      <nav className="jump" aria-label={`${title} (menu)`}>
        <button type="button" aria-expanded={open} aria-controls="jump-list" onClick={() => setOpen((o) => !o)}>
          Jump to <span className="jump-current">{current}</span>
          <span aria-hidden="true" className="chev">{open ? "▴" : "▾"}</span>
        </button>
        <div id="jump-list" hidden={!open}>{list(() => setOpen(false))}</div>
      </nav>
    </>
  );
}
