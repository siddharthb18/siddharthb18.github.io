"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useGL, useStill } from "./three/useGL";
import { story } from "./three/storyState";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const StoryView = dynamic(() => import("./three/StoryView"), { ssr: false });

// Wording follows the resume. Keep the two in sync.
const STEPS = [
  {
    title: "Monolith to microservices",
    text: "Scintilla was moving from one large application to microservices. I built and maintained three of the new services from scratch, using domain-driven design to draw service boundaries and define API contracts, and owned their Kubernetes deployment paths.",
  },
  {
    title: "Kafka between services",
    text: "I implemented Kafka-based asynchronous messaging between services, and supported production monitoring and incident follow-up for the service fleet.",
  },
  {
    title: "Email to 190K+ users",
    text: "I built and shipped a Braze-powered email notification system that reaches over 190,000 production users. Each dot stands for about 95 of them.",
  },
];

export default function WalmartStory() {
  const root = useRef<HTMLDivElement>(null);
  const gl = useGL();
  const still = useStill();

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const steps = el.querySelectorAll<HTMLElement>(".step");
    const set = (i: number) => steps.forEach((s, k) => s.classList.toggle("on", k === i));
    set(0);
    const st = ScrollTrigger.create({
      trigger: el, start: "top top", end: "bottom bottom",
      onUpdate: (self) => {
        story.p = self.progress;
        set(self.progress < 0.33 ? 0 : self.progress < 0.6 ? 1 : 2);
      },
    });
    return () => st.kill();
  }, { scope: root });

  return (
    <div className="story" ref={root}>
      <div className="story-sticky">
        <ol className="story-text">
          {STEPS.map((s, i) => (
            <li className={i === 0 ? "step on" : "step"} key={s.title}>
              <span className="n">{i + 1} / 3</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="story-stage" aria-hidden="true">
          {gl === false && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src="/media/story.webp" alt="" width={792} height={684} />
          )}
          {gl && <StoryView still={still} />}
        </div>
      </div>
    </div>
  );
}
