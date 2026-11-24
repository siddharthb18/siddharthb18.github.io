"use client";

import { useEffect, useRef, useState } from "react";

export type RailItem = { id: string; label: string };

/**
 * Section navigation. Wide screens: a rail fixed to the right edge, vertically centered, with a label
 * and a short bar for each section; the section in view gets a longer bar. A clicked section stays
 * highlighted even when it is too close to the end of the page to scroll to the top. Narrow screens: a
 * "Jump to" menu at the top. Both are plain anchor links, so they work with the keyboard and without
 * JavaScript; the script only adds the highlight.
 */
export default function Rail({ items, title = "On this page" }: { items: RailItem[]; title?: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const unlockAfter = (ms: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { locked.current = false; }, ms);
  };

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const pick = () => {
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = els[els.length - 1].id;
      setActive(current);
    };
    const onScroll = () => {
      // While a clicked link is scrolling the page, keep its highlight; release once scrolling stops.
      if (locked.current) { unlockAfter(200); return; }
      pick();
    };
    // Scrolling by hand releases the clicked highlight straight away.
    const release = () => { locked.current = false; };
    const manual = ["wheel", "touchstart", "keydown"] as const;
    pick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", pick);
    manual.forEach((ev) => window.addEventListener(ev, release, { passive: true }));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", pick);
      manual.forEach((ev) => window.removeEventListener(ev, release));
      clearTimeout(timer.current);
    };
  }, [items]);

  const choose = (id: string) => {
    setActive(id);
    locked.current = true;
    unlockAfter(1000);
  };

  const list = (onPick?: () => void) => (
    <ol>
      {items.map((it) => (
        <li key={it.id}>
          <a href={`#${it.id}`} aria-current={active === it.id ? "location" : undefined} onClick={() => { choose(it.id); onPick?.(); }}>
            <span className="rail-label">{it.label}</span>
            <span className="mark" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <nav className="rail" aria-label={title}>{list()}</nav>
      <nav className="jump" aria-label={`${title} (menu)`}>
        <div className="jump-inner">
          <button type="button" aria-expanded={open} aria-controls="jump-list" onClick={() => setOpen((o) => !o)}>
            Jump to <span className="jump-current">{items.find((i) => i.id === active)?.label}</span>
            <span aria-hidden="true" className="chev">{open ? "▴" : "▾"}</span>
          </button>
          <div id="jump-list" hidden={!open}>{list(() => setOpen(false))}</div>
        </div>
      </nav>
    </>
  );
}
