"use client";

import dynamic from "next/dynamic";
import { useGL, useStill } from "./three/useGL";

const Attractor = dynamic(() => import("./three/Attractor"), { ssr: false });

/** The Lorenz attractor, integrated and drawn live. Decorative; hidden from screen readers. */
export default function HeroArt() {
  const gl = useGL();
  const still = useStill();
  return (
    <figure className="hero-art" aria-hidden="true">
      {gl === false && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/media/lorenz.svg" alt="" width={800} height={600} />
      )}
      {gl && <Attractor still={still} />}
      <figcaption>Lorenz attractor, drawn live</figcaption>
    </figure>
  );
}
