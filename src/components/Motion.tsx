"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Quiet motion: the header settles in once, and each block fades up a little as it arrives. */
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".top > *", { opacity: 0, y: 12, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.05 });
      gsap.from(".hero-art", { opacity: 0, duration: 1.6, ease: "power2.out", delay: 0.3 });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { opacity: 0, y: 16, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
      });
    });
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  });
  return null;
}
