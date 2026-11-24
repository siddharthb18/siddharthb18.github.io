"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  { id: "tea", name: "Tea" },
  { id: "aura", name: "Aura" },
] as const;
type Id = (typeof PALETTES)[number]["id"];

/** Script that runs before paint so the saved palette shows without a flash. */
export const paletteScript = `try{var p=localStorage.getItem('palette');if(p==='aura'||p==='tea')document.documentElement.dataset.palette=p}catch(e){}`;

/** Switches between the two palettes and remembers the choice in this browser. */
export default function Palette() {
  const [id, setId] = useState<Id>("tea");

  useEffect(() => {
    const cur = document.documentElement.dataset.palette;
    if (cur === "aura" || cur === "tea") setId(cur);
  }, []);

  const next = PALETTES[(PALETTES.findIndex((p) => p.id === id) + 1) % PALETTES.length];
  const flip = () => {
    document.documentElement.dataset.palette = next.id;
    try { localStorage.setItem("palette", next.id); } catch {}
    setId(next.id);
  };

  return (
    <button type="button" className="btn btn-sm palette" onClick={flip} aria-label={`Colour palette: ${PALETTES.find((p) => p.id === id)?.name}. Switch to ${next.name}.`}>
      Palette: {PALETTES.find((p) => p.id === id)?.name}
    </button>
  );
}
