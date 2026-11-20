/* eslint-disable @next/next/no-img-element */
import HeroArt from "@/components/HeroArt";
import Motion from "@/components/Motion";
import WalmartStory from "@/components/WalmartStory";
import GL from "@/components/three/GL";
import { ExternalLink, FileText, Github, Linkedin, Mail, MapPin } from "./icons";

// Everything on this page comes from the resume in public/Bhatt_Siddharth.pdf. Keep the two in sync.
const EMAIL = "sbhatt.career@gmail.com";
const LINKS = {
  email: `mailto:${EMAIL}`,
  github: "https://github.com/siddharthb18",
  linkedin: "https://www.linkedin.com/in/siddharth-bhatt-024133212",
  resume: "/Bhatt_Siddharth.pdf",
  cohortexRepo: "https://github.com/siddharthb18/cohortex",
  cohortexDemo: "https://siddharthb18.github.io/cohortex/",
  movieReport: "https://drive.google.com/file/d/1dkyfCqhyu-W7GwmCQPGAX-ACw8aona3B/view?usp=sharing",
  ganReport: "https://drive.google.com/file/d/15_SmZZ-Tz7OZXqFq0UHOT45MjF_DHbK0/view?usp=sharing",
  thesisReport: "https://drive.google.com/file/d/1qv-L4ZHVXq4tGl3smo5GLvP-uHjmCztJ/view?usp=sharing",
};

export default function Home() {
  return (
    <main className="page">
      <GL />
      <Motion />
      <div className="hero">
      <header className="top">
        <h1>Siddharth Bhatt</h1>
        <p className="role">Software engineer · MS Computer Engineering, Texas A&amp;M</p>
        <p className="summary">
          I spent two years at Walmart Global Tech building distributed services, the APIs and databases behind them, and AI
          tools for other engineers. I write production code in Java and Python, use C++ for systems work, and I’m currently
          building Cohortex, a multi-agent system that analyzes 32M drive-days of hard-drive failure data.
        </p>
        <p className="looking">Looking for a Summer 2027 software or AI engineering internship</p>
        <nav className="links" aria-label="Contact">
          <a href={LINKS.email}><Mail />{EMAIL}</a>
          <a href={LINKS.linkedin}><Linkedin />LinkedIn</a>
          <a href={LINKS.github}><Github />GitHub</a>
          <a href={LINKS.resume}><FileText />Resume (PDF)</a>
          <span><MapPin />College Station, TX</span>
        </nav>
      </header>
      <HeroArt />
      </div>

      <section aria-labelledby="exp">
        <h2 className="reveal" id="exp">Experience</h2>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Software Developer, Walmart Global Tech</h3>
            <span className="when">Jul 2024 to Aug 2026</span>
          </div>
          <p className="sub">Scintilla, a data analytics and insights platform · Bengaluru, India</p>
          <ul>
            <li>Developed the platform’s core REST APIs for authentication and session management on MySQL, designed to an OpenAPI specification and used by both web and mobile clients; used Azure SDKs to connect our services to Azure storage.</li>
            <li>Co-built Code Puppy, a Slack triage agent for CI/CD failures. When a Looper (Jenkins-based) or Concord pipeline failed, it opened the job and its logs, traced the error through the codebase, and posted the likely cause in Slack. Released to the Scintilla team’s 150 developers.</li>
            <li>Wrote much of the prompt engineering for the AI-driven service template used in the migration: engineers write the OpenAPI spec first, then AI agents generate the controller, service and repository layers following domain-driven design.</li>
            <li>Automated recurring team workflows with AI agents built on LangChain and LangGraph, connected to internal systems through MCP servers; proposed a RAG agent over Scintilla’s knowledge base at an internal hackathon.</li>
            <li>With my team, set up unit, API performance and end-to-end functional tests to run on every build in our CI pipeline, and worked on test case generation for them, in an Agile/Scrum team.</li>
          </ul>
          <p className="story-hint">The rest of my Scintilla work, step by step as you scroll:</p>
        </article>
        <WalmartStory />

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Software Developer, Stello</h3>
            <span className="when">Feb 2024 to Aug 2024</span>
          </div>
          <p className="sub">Compensation management platform · Remote</p>
          <ul>
            <li>Built the real-time chat feature end to end: React and TypeScript front end, backend message handling in Node.js, and Firebase with Google Authentication for secure message storage and user identity.</li>
            <li>Authored the platform’s ERD, architecture and process flow diagrams, and SRS documentation, and wrote Selenium automation scripts that kept the product stable through rapid iteration.</li>
          </ul>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Software Development Intern, Walmart Global Tech</h3>
            <span className="when">May 2023 to Aug 2023</span>
          </div>
          <p className="sub">Marketplace, the seller marketplace platform · Bengaluru, India</p>
          <ul>
            <li>Developed and maintained backend functionality in Java and Spring Boot for critical marketplace seller flows.</li>
            <li>Wrote JUnit and Mockito tests for the seller login flow and refactored REST APIs for performance.</li>
          </ul>
        </article>
      </section>

      <section aria-labelledby="proj">
        <h2 className="reveal" id="proj">Projects</h2>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Cohortex: multi-agent system for hard-drive failure analysis</h3>
            <span className="when">Oct 2026 to present</span>
          </div>
          <ul>
            <li>An AI system that answers questions about drive failures using 32M drive-days of Backblaze’s public data, either as a single agent or as a planner that hands tasks to up to three parallel workers. The agents read the data only through purpose-built MCP tools, so they never write their own SQL.</li>
            <li>Every number in a report links to the tool call it came from, and code re-checks those numbers before the report is shown. The first real run found the worst drive model of Q2 2026 failing at 9.75% a year, 5.6 times the fleet average.</li>
            <li>I wrote the data API in Java and Spring Boot, the data loader in Python (it reconciles counts against the raw files), and a React front end. Each run logs tokens and latency and stops at set limits on tokens, tool calls and time.</li>
            <li>Nine Docker Compose services and about 470 tests in GitHub Actions, built with AI coding agents (Claude) from a written spec. An evaluation set of 30 golden and 7 adversarial questions is under review.</li>
          </ul>
          <p className="stack">Python, Java, Spring Boot, LangGraph, MCP, PostgreSQL, React, Docker, GitHub Actions</p>
          <div className="entry-links">
            <a href={LINKS.cohortexDemo}><ExternalLink />Recorded demo</a>
            <a href={LINKS.cohortexRepo}><Github />Source code</a>
          </div>
          <div className="shot">
            <img src="/media/cohortex-report.webp" width={1600} height={933} loading="lazy" alt="A Cohortex report from the recorded demo, with each number linked to its source" />
          </div>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Cache replacement policies in ChampSim</h3>
            <span className="when">Fall 2026</span>
          </div>
          <p className="sub">Computer Architecture (CSCE 614), Texas A&amp;M</p>
          <ul>
            <li>Implemented three last-level cache replacement policies as C++ modules in ChampSim: LRU insertion (LIP), bimodal insertion (BIP, ε = 1/32), and dynamic insertion (DIP) using set dueling with 32 dedicated sets per policy and a 10-bit saturating counter.</li>
            <li>Benchmarked them against LRU on five SPEC CPU 2017 workloads (gcc, wrf, cam4, roms, xz) with a 2MB LLC, 25M-instruction warmup and 100M measured instructions (20 runs), comparing IPC, read-miss MPKI and geometric-mean speedup.</li>
          </ul>
          <p className="stack">C++, ChampSim, SPEC CPU 2017</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>SRAM design and synthesis</h3>
            <span className="when">Fall 2026</span>
          </div>
          <p className="sub">Advanced Logic Design (ECEN 719), Texas A&amp;M</p>
          <ul>
            <li>Designed a 256K x 8 SRAM array in Verilog, simulated it in Synopsys VCS, synthesized it with Design Vision, and ran gate-level simulation with SDF back-annotation.</li>
          </ul>
          <p className="stack">Verilog, Synopsys VCS, Design Vision</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Emotion-based movie review analysis and recommendations</h3>
            <span className="when">Fall 2023</span>
          </div>
          <p className="sub">Big Data Analytics course, IIT Guwahati</p>
          <ul>
            <li>Classified 50,000 IMDb reviews with five PySpark MLlib models (XGBoost, SVM, logistic regression, random forest, naive Bayes) and three TensorFlow networks (CNN, LSTM, feed-forward).</li>
            <li>Added DistilBERT sentence embeddings and a majority-vote ensemble across the models, reaching 93.4% accuracy (best single model: LSTM, 92.4%), served through a Flask web app with search and recommendations.</li>
          </ul>
          <p className="stack">Hadoop, PySpark MLlib, TensorFlow, DistilBERT, Flask</p>
          <div className="entry-links"><a href={LINKS.movieReport}><FileText />Report (PDF)</a></div>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Underwater night-time image enhancement with a GAN</h3>
            <span className="when">Fall 2023</span>
          </div>
          <p className="sub">Team project (five members), IIT Guwahati</p>
          <ul>
            <li>Designed a GAN with an encoder-decoder generator (skip connections) to brighten and color-correct dark underwater photos (LSUI dataset); on darker images it beat a U-shaped Transformer baseline on PSNR in several cases.</li>
          </ul>
          <p className="stack">Python, deep learning, GANs, computer vision</p>
          <div className="entry-links"><a href={LINKS.ganReport}><FileText />Report (PDF)</a></div>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Agro Drone: autonomous agricultural drone</h3>
            <span className="when">Feb 2023 to Nov 2023</span>
          </div>
          <p className="sub">Aeromodelling Club, IIT Guwahati</p>
          <ul>
            <li>Designed and built an Octo-H frame agricultural drone for autonomous seeding and spraying, with Raspberry Pi onboard compute running the navigation and flight-control stack.</li>
            <li>Wrote the OpenCV computer-vision pipeline for texture-based terrain assessment, field mapping and soil-moisture analysis.</li>
          </ul>
          <p className="stack">Python, OpenCV, Raspberry Pi, embedded systems</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Molecular dynamics simulation of ion diffusion (BTech thesis)</h3>
            <span className="when">Aug 2023 to May 2024</span>
          </div>
          <p className="sub">Advised by Prof. Padma Kumar Padmanabhan, IIT Guwahati</p>
          <ul>
            <li>Simulated ion diffusion in solid-electrolyte lattices with LAMMPS and wrote C++ analysis code to compute mean squared displacement (MSD) and other metrics over trajectories with millions of atoms.</li>
          </ul>
          <p className="stack">LAMMPS, C++, Python, scientific computing</p>
          <div className="entry-links"><a href={LINKS.thesisReport}><FileText />Report (PDF)</a></div>
        </article>
      </section>

      <section aria-labelledby="edu">
        <h2 className="reveal" id="edu">Education</h2>
        <article className="entry reveal">
          <div className="entry-head">
            <h3>Texas A&amp;M University, MS in Computer Engineering</h3>
            <span className="when">Aug 2026 to May 2028 (expected)</span>
          </div>
          <p className="sub">Computer Architecture (CSCE 614), Analysis of Algorithms (CSCE 629), Advanced Logic Design (ECEN 719)</p>
        </article>
        <article className="entry reveal">
          <div className="entry-head">
            <h3>IIT Guwahati, BTech in Engineering Physics</h3>
            <span className="when">Nov 2020 to Jul 2024</span>
          </div>
          <p className="sub">CGPA 8.49/10. Deep Learning, Big Data Analytics, Linear Algebra, Probability and Statistics, Numerical Methods, Digital Electronics and Microprocessors</p>
        </article>
      </section>

      <section aria-labelledby="skills">
        <h2 className="reveal" id="skills">Skills</h2>
        <dl className="skills reveal">
          <dt>Languages</dt><dd>Java, Python, C++, TypeScript, JavaScript, SQL, Bash, C, Verilog, SystemC, MATLAB</dd>
          <dt>AI and LLMs</dt><dd>LLM agents, agentic workflows, LangGraph, LangChain, MCP, tool calling, structured outputs, LLM evaluation, prompt-injection testing, AI-assisted development (Claude, Code Puppy), PyTorch, OpenCV</dd>
          <dt>Backend and web</dt><dd>Spring Boot, Node.js, Express.js, FastAPI, REST APIs, OpenAPI, microservices, domain-driven design, Apache Kafka, server-sent events; React, HTML, CSS, Vite</dd>
          <dt>Data</dt><dd>PostgreSQL, MySQL, DuckDB, Parquet, MongoDB, Azure SQL and Storage, Firebase, Hadoop, PySpark, Pandas, NumPy</dd>
          <dt>Architecture and hardware</dt><dd>ChampSim, cache replacement policies, SPEC CPU 2017, IPC/MPKI analysis, SRAM design, Synopsys VCS, Design Vision</dd>
          <dt>DevOps</dt><dd>Linux, Docker, Docker Compose, Kubernetes, GitHub Actions, Jenkins/Looper and Concord (CI/CD), Flyway, shell scripting, production monitoring and alerting</dd>
          <dt>Testing</dt><dd>Unit, API performance and end-to-end testing in CI; JUnit, Mockito, Testcontainers, pytest, Playwright, Selenium; Git, Agile/Scrum</dd>
          <dt>Math and statistics</dt><dd>Linear algebra, probability and statistics, hypothesis testing, confidence intervals, numerical methods</dd>
        </dl>
      </section>

      <section aria-labelledby="other">
        <h2 className="reveal" id="other">Other</h2>
        <ul className="plain reveal">
          <li>JEE Advanced: All India Rank 5013 (99.5 percentile).</li>
          <li>Core team member, Aeromodelling Club and Astronomy Club, IIT Guwahati.</li>
        </ul>
      </section>

      <footer>
        <span>Siddharth Bhatt · <a href={LINKS.email}>{EMAIL}</a></span>
        <span>Last updated November 2026</span>
      </footer>
    </main>
  );
}
