/* eslint-disable @next/next/no-img-element */
import { Cite, Sources } from "@/components/Cite";
import { EnsembleDiagram, SetDuelingDiagram } from "@/components/Diagrams";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import Rail from "@/components/Rail";
import { EMAIL, LINKS, type Source } from "@/lib/site";

// Footnote numbers below point into this list, in order.
const SOURCES: Source[] = [
  { label: "Cohortex recorded demo run", href: LINKS.cohortexDemo, note: "(public; a recording of a real run, not a live service)" },
  { label: "Cohortex repository, README and architecture decisions", href: LINKS.cohortexRepo },
  { label: "Résumé (PDF)", href: LINKS.resume, note: "(Walmart figures are self-reported; the systems are internal)" },
  { label: "Movie review analysis, course report (PDF)", href: LINKS.movieReport, note: "(the full write-up; the accuracy figures are also on the résumé)" },
];

const PROJECTS: Project[] = [
  {
    slug: "cohortex",
    title: "Cohortex",
    kind: "Personal project, prototype",
    when: "Oct 2026 to now",
    what: "An agent system that answers questions about hard-drive failures across 32M drive-days of Backblaze data, and checks every number in its report before showing it.",
    owned: <>The design, the specs, every architecture decision and code review, and the evaluation set. Claude coding agents wrote much of the code from my specs.<Cite n={2} /></>,
    evidence: <>In the first real run, the worst drive model of Q2 2026 failed at 9.75% a year, 5.6 times the fleet rate, and all 8 of the report’s claims passed the number check.<Cite n={1} /></>,
    preview: "The model never writes SQL. It can only call typed, read-only tools, so a whole class of wrong or unsafe queries can’t happen.",
    artifact: <img src="/media/cohortex-report.webp" width={945} height={933} alt="A Cohortex report: summary and findings, with each number marked by a link to the tool call it came from" />,
    extraLink: { href: LINKS.cohortexDemo, label: "Recorded demo" },
  },
  {
    slug: "cache-replacement",
    title: "Cache replacement policies in ChampSim",
    kind: "Course project, CSCE 614",
    when: "Fall 2026",
    what: "Three insertion policies for the last-level cache (LIP, BIP and DIP), written as C++ modules for the ChampSim simulator.",
    owned: <>I implemented the three policies and ran the comparison against LRU.<Cite n={3} /></>,
    evidence: <>Benchmarked against LRU on five SPEC CPU 2017 workloads, 20 runs each, comparing IPC, read-miss MPKI and geometric-mean speedup.<Cite n={3} /></>,
    preview: "DIP lets 32 sample sets of each policy compete and uses a 10-bit counter to decide which one the rest of the cache follows.",
    artifact: <SetDuelingDiagram />,
  },
  {
    slug: "movie-reviews",
    title: "Emotion-based movie review analysis",
    kind: "Course project, IIT Guwahati",
    when: "Fall 2023",
    what: "Classifies the sentiment in 50,000 IMDb reviews with eight models and an ensemble, and serves movie recommendations through a small Flask app.",
    owned: <>Training and comparing the models, the DistilBERT features and ensemble, and the Flask app.<Cite n={3} /></>,
    evidence: <>The majority-vote ensemble reached 93.4% accuracy, against 92.4% for the best single model (an LSTM).<Cite n={4} /></>,
    preview: "Five classic models on Spark MLlib and three TensorFlow networks, combined by a simple majority vote.",
    artifact: <EnsembleDiagram />,
    extraLink: { href: LINKS.movieReport, label: "Report (PDF)" },
  },
];

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Selected work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education & recognition" },
  { id: "contact", label: "Contact" },
  { id: "sources", label: "Sources" },
];

function Head({ n, id, children }: { n: number; id: string; children: React.ReactNode }) {
  return (
    <div className="sec-head">
      <span className="mark" aria-hidden="true">{String(n).padStart(2, "0")}</span>
      <h2 id={`${id}-h`}>{children}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="frame">
      <Rail items={SECTIONS} />
      <main id="main">
        <section id="about" className="about" aria-label="About">
          <h1>Siddharth Bhatt</h1>
          <p className="role">Software engineer · MS Computer Engineering, Texas A&amp;M</p>
          <p className="lede">
            I build backend services and the AI tooling around them. For two years I worked on Scintilla, a data
            analytics platform at Walmart Global Tech, writing microservices and APIs in Java and Spring Boot. Now I’m
            doing my master’s at Texas A&amp;M and building Cohortex, an agent system that has to show its evidence for
            every number it reports.
          </p>
          <p>Outside of work I like maths and physics, football, travel and books.</p>
          <p className="status">Looking for Summer 2027 internships in software, AI or ML engineering</p>
          <p className="links">
            <a className="primary" href="#work">Selected work ↓</a>
            <a href={LINKS.resume}>Résumé (PDF)</a>
            <a href={LINKS.email}>Email</a>
            <a href={LINKS.github}>GitHub</a>
            <a href={LINKS.linkedin}>LinkedIn</a>
          </p>
        </section>

        <section id="work" className="sec" aria-labelledby="work-h">
          <Head n={2} id="work">Selected work</Head>
          {PROJECTS.map((p, i) => <ProjectCard key={p.slug} p={p} index={i + 1} />)}
          <div className="also">
            <h3>Also built</h3>
            <ul>
              <li><span className="when">Fall 2026</span><span>SRAM design: a 256K × 8 SRAM in Verilog, simulated in Synopsys VCS, synthesized with Design Vision, with gate-level simulation (ECEN 719).</span></li>
              <li><span className="when">Fall 2023</span><span>A GAN that brightens and color-corrects dark underwater photos; a five-person team project. <a href={LINKS.ganReport}>Report (PDF)</a></span></li>
              <li><span className="when">2023 to 2024</span><span>BTech thesis: molecular dynamics of ion diffusion with LAMMPS, with my own C++ analysis over millions of atoms. <a href={LINKS.thesisReport}>Report (PDF)</a></span></li>
              <li><span className="when">2023</span><span>Agro Drone: an autonomous seeding and spraying drone for the Aeromodelling Club; I wrote its OpenCV terrain and soil-moisture pipeline.</span></li>
            </ul>
          </div>
        </section>

        <section id="experience" className="sec" aria-labelledby="experience-h">
          <Head n={3} id="experience">Experience</Head>
          <ol className="entries">
            <li className="entry">
              <span className="when">Jul 2024 to<br />Aug 2026</span>
              <div>
                <h3>Software Developer <span className="org">· Walmart Global Tech, Bengaluru</span></h3>
                <p>
                  On Scintilla, a data analytics and insights platform, I built and maintained three microservices from
                  scratch during the move off a monolith, using domain-driven design to set their boundaries. All three ran
                  at 100% uptime with P99 API latency under 15 ms.<Cite n={3} /> I also wrote the core authentication and
                  session APIs (Java, Spring Boot, MySQL) for the web app.
                </p>
                <p className="team">
                  With the team: a multi-tenant setup where a new site is added through configuration flags, and a Slack
                  agent, built with Code Puppy, that reads failed CI/CD pipeline logs and posts the likely cause. It was
                  released to the team’s roughly 150 developers.<Cite n={3} />
                </p>
              </div>
            </li>
            <li className="entry">
              <span className="when">Feb 2024 to<br />Aug 2024</span>
              <div>
                <h3>Software Developer <span className="org">· Stello, remote</span></h3>
                <p>Built the real-time chat feature end to end (React, TypeScript, Node.js, Firebase) and wrote the ERD, architecture diagrams and SRS for the platform.</p>
              </div>
            </li>
            <li className="entry">
              <span className="when">May 2023 to<br />Aug 2023</span>
              <div>
                <h3>Software Development Intern <span className="org">· Walmart Global Tech, Bengaluru</span></h3>
                <p>Backend work in Java and Spring Boot on Marketplace seller flows, with JUnit and Mockito tests for seller login.</p>
              </div>
            </li>
          </ol>
        </section>

        <section id="education" className="sec" aria-labelledby="education-h">
          <Head n={4} id="education">Education &amp; recognition</Head>
          <ol className="entries">
            <li className="entry">
              <span className="when">2026 to 2028</span>
              <div>
                <h3>MS, Computer Engineering <span className="org">· Texas A&amp;M University</span></h3>
                <p>Expected May 2028. Computer Architecture, Analysis of Algorithms, Advanced Logic Design.</p>
              </div>
            </li>
            <li className="entry">
              <span className="when">2020 to 2024</span>
              <div>
                <h3>BTech, Engineering Physics <span className="org">· IIT Guwahati</span></h3>
                <p>CGPA 8.49/10.<Cite n={3} /> Thesis advised by Prof. Padma Kumar Padmanabhan. Core team of the Aeromodelling and Astronomy clubs.</p>
              </div>
            </li>
            <li className="entry">
              <span className="when">Award</span>
              <div>
                <h3>JEE Advanced <span className="org">· All India Rank 5013</span></h3>
                <p>99.5 percentile in India’s entrance exam for the IITs.<Cite n={3} /></p>
              </div>
            </li>
          </ol>
        </section>

        <section id="contact" className="sec" aria-labelledby="contact-h">
          <Head n={5} id="contact">Contact</Head>
          <p style={{ marginBottom: 18 }}>Email is the quickest way to reach me.</p>
          <ul className="contact-list">
            <li><span className="k">Email</span><a href={LINKS.email}>{EMAIL}</a></li>
            <li><span className="k">Résumé</span><a href={LINKS.resume}>Bhatt_Siddharth.pdf</a></li>
            <li><span className="k">GitHub</span><a href={LINKS.github}>github.com/siddharthb18</a></li>
            <li><span className="k">LinkedIn</span><a href={LINKS.linkedin}>linkedin.com/in/siddharth-bhatt-024133212</a></li>
            <li><span className="k">Based in</span><span>College Station, Texas</span></li>
          </ul>
        </section>

        <section id="sources" className="sec" aria-labelledby="sources-h">
          <Head n={6} id="sources">Sources</Head>
          <p style={{ marginBottom: 14, fontSize: 15, color: "var(--muted)" }}>The small numbers next to figures on this page point here.</p>
          <Sources items={SOURCES} />
        </section>

        <footer className="site">
          <span>© 2026 Siddharth Bhatt</span>
          <span>Static site, built with Next.js</span>
        </footer>
      </main>
    </div>
  );
}
