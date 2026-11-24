import type { Metadata } from "next";
import { Cite } from "@/components/Cite";
import CaseStudy from "@/components/CaseStudy";
import { SetDuelingDiagram } from "@/components/Diagrams";
import { LINKS, type Source } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cache replacement policies in ChampSim",
  description: "Case study: LIP, BIP and DIP last-level cache insertion policies in C++ for ChampSim, compared with LRU on SPEC CPU 2017.",
};

const SOURCES: Source[] = [
  { label: "Résumé (PDF)", href: LINKS.resume, note: "(project description and setup)" },
  { label: "Qureshi, Jaleel, Patt, Steely and Emer, “Adaptive Insertion Policies for High Performance Caching”, ISCA 2007", href: LINKS.dipPaper, note: "(the paper that introduced LIP, BIP and DIP)" },
];

export default function Page() {
  return (
    <CaseStudy
      title="Cache replacement policies in ChampSim"
      dek="Coursework for Computer Architecture (CSCE 614) at Texas A&M, fall 2026: three ways to decide where a new block enters a last-level cache, written in C++ for the ChampSim simulator and compared with plain LRU."
      artifact={<SetDuelingDiagram />}
      caption={<>How DIP chooses a policy: a few sets always use LRU insertion, a few always use BIP, and one counter keeps score for everyone else. Diagram, not measured data.</>}
      role={
        <p>
          I implemented the three policies as ChampSim replacement modules and ran the comparison against LRU.<Cite n={1} />{" "}
          It was coursework for CSCE 614, so the policies themselves come from published research; my work was the
          implementation and the experiments.<Cite n={2} />
        </p>
      }
      sections={[
        {
          id: "problem", label: "Problem", title: "Problem",
          body: (
            <>
              <p>
                LRU puts every incoming block at the most-recently-used end of the recency order. When a program streams
                through more data than the cache holds, those blocks push everything else out and are evicted before
                they are ever reused, so the cache thrashes.
              </p>
              <p>
                Insertion policies change only where a new block enters that order. The question for the project was how
                much that small change matters on real workloads.<Cite n={2} />
              </p>
            </>
          ),
        },
        {
          id: "constraints", label: "Setup", title: "Setup and constraints",
          body: (
            <ul>
              <li>Policies had to fit ChampSim’s replacement-policy interface as C++ modules.</li>
              <li>A 2MB last-level cache, a 25M-instruction warmup, then 100M measured instructions.<Cite n={1} /></li>
              <li>Five SPEC CPU 2017 workloads (gcc, wrf, cam4, roms and xz), 20 runs.<Cite n={1} /></li>
            </ul>
          ),
        },
        {
          id: "decisions", label: "Key decisions", title: "What each policy does",
          body: (
            <ol>
              <li><strong>LIP</strong> inserts new blocks at the LRU end, so a block only moves up if it is actually reused. It resists thrashing, but a new working set can struggle to get in.</li>
              <li><strong>BIP</strong> does the same, except that one insertion in 32 (ε = 1/32) goes to the MRU end, which lets a changing working set settle in over time.</li>
              <li><strong>DIP</strong> chooses between LRU-style insertion and BIP at run time with set dueling: 32 dedicated sets for each policy, and a 10-bit saturating counter that moves on misses in those sets and decides what the other sets do.<Cite n={1} /></li>
            </ol>
          ),
        },
        {
          id: "tradeoffs", label: "Tradeoffs", title: "Tradeoffs",
          body: (
            <ul>
              <li>Static policies are simple but win only on some access patterns; LIP can hurt a workload whose working set keeps changing.</li>
              <li>Set dueling adapts, but the dedicated sets always run their fixed policy, including the losing one.</li>
              <li>The counter’s width trades how fast DIP reacts against how easily it flips back and forth.</li>
            </ul>
          ),
        },
        {
          id: "evaluation", label: "Evaluation", title: "Evaluation",
          body: (
            <div className="eval-grid">
              <div>
                <h3>What I measured</h3>
                <p>Instructions per cycle (IPC), read-miss misses per kilo-instruction (MPKI), and the geometric-mean speedup across workloads.<Cite n={1} /></p>
              </div>
              <div>
                <h3>Baseline</h3>
                <p>Plain LRU on the same cache, workloads and instruction windows.<Cite n={1} /></p>
              </div>
              <div>
                <h3>What it doesn’t show</h3>
                <p>Five workloads are a small sample, and a simulator is not hardware. A single-core setup also says nothing about caches shared between cores.</p>
              </div>
            </div>
          ),
        },
      ]}
      sources={SOURCES}
    />
  );
}
