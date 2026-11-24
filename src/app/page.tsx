/* eslint-disable @next/next/no-img-element */
import { Cite, Sources } from "@/components/Cite";
import { EnsembleDiagram, SetDuelingDiagram } from "@/components/Diagrams";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import Rail from "@/components/Rail";
import { EMAIL, LINKS, type Source } from "@/lib/site";

// Footnote numbers below point into this list, in order.
const SOURCES: Source[] = [
  { label: "Cohortex recorded demo run", href: LINKS.cohortexDemo, note: "(a recording of a real run, not a live service)" },
  { label: "Cohortex repository", href: LINKS.cohortexRepo },
  { label: "Résumé (PDF)", href: LINKS.resume, note: "(Walmart figures are self-reported; the systems are internal)" },
];

const PROJECTS: Project[] = [
  {
    slug: "cohortex",
    title: "Cohortex",
    year: "2026",
    body: (
      <>
        An agent that looks into hard-drive failures using Backblaze’s public data. It can only read the data through
        typed tools, and code checks every number in its report against the tool result it came from. I designed it and
        wrote the specs; Claude coding agents wrote much of the code.<Cite n={2} /> In its first real run it found the
        worst drive model of Q2 2026 failing at 9.75% a year, 5.6 times the fleet rate.<Cite n={1} /> It’s a working
        prototype, still being evaluated.
      </>
    ),
    preview: "The model never writes SQL, so a whole class of wrong or unsafe queries can’t happen.",
    artifact: <img src="/media/cohortex-report.webp" width={945} height={933} alt="A Cohortex report: findings where each number links to the tool call it came from" />,
    links: [{ href: LINKS.cohortexDemo, label: "Demo" }, { href: LINKS.cohortexRepo, label: "Code" }],
  },
  {
    slug: "cache-replacement",
    title: "Cache replacement in ChampSim",
    year: "2026",
    body: (
      <>
        Three last-level cache insertion policies (LIP, BIP and DIP) written in C++ for the ChampSim simulator and
        compared with LRU on five SPEC CPU 2017 workloads. Coursework for Computer Architecture at Texas A&amp;M.<Cite n={3} />
      </>
    ),
    preview: "DIP lets a few sample sets of each policy compete, and a 10-bit counter picks the winner for the rest.",
    artifact: <SetDuelingDiagram />,
  },
  {
    slug: "movie-reviews",
    title: "Movie review sentiment",
    year: "2023",
    body: (
      <>
        Eight models on 50,000 IMDb reviews, combined by majority vote to reach 93.4% accuracy against 92.4% for the
        best single model.<Cite n={3} /> Coursework for Big Data Analytics at IIT Guwahati, with a small Flask app for
        movie search and recommendations.
      </>
    ),
    preview: "Five models on Spark MLlib and three TensorFlow networks.",
    artifact: <EnsembleDiagram />,
    links: [{ href: LINKS.movieReport, label: "Report" }],
  },
];

const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "sources", label: "Sources" },
];

export default function Home() {
  return (
    <>
      <Rail items={SECTIONS} />
      <main id="main" className="page">
        <section id="intro" className="intro" aria-labelledby="intro-h">
          <div className="intro-text">
            <h1 id="intro-h">Siddharth Bhatt</h1>
            <p>
              hi I’m Siddharth and I study CSE at TAMU. I love coding because it tickles my trivia coded brain. Beyond
              code, I geek about physics, data analytics, and chess.
            </p>
            <div className="btns">
              <a className="btn" href={LINKS.resume}>Résumé</a>
              <a className="btn" href={LINKS.email}>Email</a>
              <a className="btn" href={LINKS.github}>GitHub</a>
              <a className="btn" href={LINKS.linkedin}>LinkedIn</a>
            </div>
          </div>
          <img className="portrait" src="/media/siddharth.webp" width={720} height={900} alt="Siddharth Bhatt" />
        </section>

        <section id="work" className="sec" aria-labelledby="work-h">
          <h2 id="work-h">Work</h2>
          <div className="sec-body">
            {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} />)}
            <div className="also">
              <h3>Smaller things</h3>
              <ul>
                <li>A Canny edge detector in Verilog and SystemC, connected to a bus with SRAM and a UART. Coursework, 2026.</li>
                <li>A GAN that brightens dark underwater photos, with a team of five, 2023. <a className="btn btn-sm" href={LINKS.ganReport}>Report</a></li>
                <li>Molecular dynamics of ion diffusion, my BTech thesis, 2023 to 2024. <a className="btn btn-sm" href={LINKS.thesisReport}>Report</a></li>
                <li>Agro Drone, an autonomous seeding and spraying drone built at the Aeromodelling Club, 2023.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="experience" className="sec" aria-labelledby="experience-h">
          <h2 id="experience-h">Experience</h2>
          <div className="sec-body">
            <ul className="entries">
              <li>
                <strong>Walmart Global Tech</strong> <span className="meta">(Software Developer, 2024 to 2026)</span>: On
                Scintilla, a data analytics platform, I built and maintained three microservices during its move off a
                monolith. All three ran at 100% uptime with P99 latency under 15 ms.<Cite n={3} /> I also wrote its sign-in
                and session APIs in Java and Spring Boot.
              </li>
              <li>
                <strong>Stello</strong> <span className="meta">(Software Developer, 2024)</span>: Built the real-time chat
                feature end to end with React, Node.js and Firebase.
              </li>
              <li>
                <strong>Walmart Global Tech</strong> <span className="meta">(Software Development Intern, 2023)</span>:
                Backend work on Marketplace seller flows in Java and Spring Boot.
              </li>
            </ul>
          </div>
        </section>

        <section id="education" className="sec" aria-labelledby="education-h">
          <h2 id="education-h">Education</h2>
          <div className="sec-body">
            <ul className="entries">
              <li><strong>Texas A&amp;M University</strong> <span className="meta">(MS, Computer Engineering, 2026 to 2028)</span></li>
              <li><strong>IIT Guwahati</strong> <span className="meta">(BTech, Engineering Physics, 2020 to 2024)</span>: CGPA 8.49/10.<Cite n={3} /></li>
              <li><strong>JEE Advanced</strong>: All India Rank 5013.<Cite n={3} /></li>
            </ul>
          </div>
        </section>

        <section id="contact" className="sec contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Contact</h2>
          <div className="sec-body">
            <p>I’m looking for a Summer 2027 internship.</p>
            <div className="btns">
              <a className="btn" href={LINKS.email}>{EMAIL}</a>
              <a className="btn" href={LINKS.resume}>Résumé</a>
              <a className="btn" href={LINKS.github}>GitHub</a>
              <a className="btn" href={LINKS.linkedin}>LinkedIn</a>
            </div>
          </div>
        </section>

        <section id="sources" className="sec" aria-labelledby="sources-h">
          <h2 id="sources-h">Sources</h2>
          <div className="sec-body">
            <Sources items={SOURCES} />
          </div>
        </section>

        <footer className="site">
          <span>© 2026 Siddharth Bhatt</span>
        </footer>
      </main>
    </>
  );
}
