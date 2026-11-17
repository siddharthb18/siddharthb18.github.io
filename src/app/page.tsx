/* eslint-disable @next/next/no-img-element */
import HeroArt from "@/components/HeroArt";
import Motion from "@/components/Motion";
import WalmartStory from "@/components/WalmartStory";
import GL from "@/components/three/GL";
import { ExternalLink, FileText, Github, Linkedin, Mail, MapPin } from "./icons";

// Everything on this page comes from the resume in public/Bhatt_Siddharth.pdf. Keep the two in sync.
const LINKS = {
  email: "mailto:sid.bhatt@tamu.edu",
  github: "https://github.com/siddharthb18",
  linkedin: "https://www.linkedin.com/in/siddharth-bhatt-024133212",
  resume: "/Bhatt_Siddharth.pdf",
  cohortexRepo: "https://github.com/siddharthb18/cohortex",
  cohortexDemo: "https://siddharthb18.github.io/cohortex/",
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
          I spent two years on production backend services at Walmart Global Tech, working with REST APIs, microservices,
          Kafka and Kubernetes. I’m now doing my master’s at Texas A&amp;M and building an AI agent that analyzes real
          hard-drive failure data.
        </p>
        <p className="looking">Looking for a Summer 2027 software or AI engineering internship</p>
        <nav className="links" aria-label="Contact">
          <a href={LINKS.email}><Mail />sid.bhatt@tamu.edu</a>
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
            <li>Developed the platform’s core REST APIs for authentication and session management, designed to an OpenAPI specification and used by both web and mobile clients.</li>
            <li>Automated recurring team workflows with AI agents built on LangChain and LangGraph, connected to internal systems through MCP servers.</li>
            <li>Worked in an Agile/Scrum team across design, code review, testing and release.</li>
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
            <li>Built the real-time chat feature end to end: React and TypeScript front end, message handling in Node.js, and Firebase with Google Authentication for storage and identity.</li>
            <li>Wrote the ERD, system architecture and process flow diagrams, and the SRS the team used to plan features.</li>
            <li>Wrote Selenium automation scripts to keep the product stable through fast iteration.</li>
          </ul>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Software Development Intern, Walmart Global Tech</h3>
            <span className="when">May 2023 to Aug 2023</span>
          </div>
          <p className="sub">Marketplace, the seller marketplace platform · Bengaluru, India</p>
          <ul>
            <li>Developed and maintained backend functionality in Java and Spring Boot for seller flows.</li>
            <li>Wrote JUnit and Mockito tests for the seller login flow and refactored REST APIs for performance.</li>
          </ul>
        </article>
      </section>

      <section aria-labelledby="proj">
        <h2 className="reveal" id="proj">Projects</h2>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Cohortex: AI agent for hard-drive failure analysis</h3>
            <span className="when">Oct 2026 to present</span>
          </div>
          <ul>
            <li>An AI agent that answers questions about drive failures using 32M drive-days of Backblaze’s public data. It reads the data only through purpose-built MCP tools, so it never writes its own SQL.</li>
            <li>Every number in its report links to the tool call it came from, and code re-checks those numbers before the report is shown. Its first real run found the worst drive model of Q2 2026 failing at 9.75% a year, 5.6 times the fleet average.</li>
            <li>Data API in Java and Spring Boot, data loader in Python, React front end. Docker Compose and GitHub Actions run about 470 tests. Runs on open-weight models at no cost.</li>
            <li>In progress: a 30-question test set to measure how often the agent’s answers are right.</li>
          </ul>
          <p className="stack">Python, Java, Spring Boot, LangGraph, MCP, PostgreSQL, React</p>
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
            <h3>Emotion-based movie review analysis and recommendations</h3>
            <span className="when">Fall 2023</span>
          </div>
          <p className="sub">Big Data Analytics course, IIT Guwahati</p>
          <ul>
            <li>Classified 50,000 IMDb reviews with five PySpark MLlib models and three TensorFlow networks (CNN, LSTM, feed-forward).</li>
            <li>Added DistilBERT sentence embeddings and a majority-vote ensemble, reaching 93.4% accuracy; the best single model (LSTM) scored 92.4%.</li>
            <li>Served it through a Flask web app with movie search and recommendations.</li>
          </ul>
          <p className="stack">Hadoop, PySpark MLlib, TensorFlow, DistilBERT, Flask</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Underwater night-time image enhancement with a GAN</h3>
            <span className="when">IIT Guwahati</span>
          </div>
          <p className="sub">Team project, five members</p>
          <ul>
            <li>Designed a GAN with an encoder-decoder generator (skip connections) to brighten and colour-correct dark underwater photos, trained on the LSUI dataset.</li>
            <li>On darker images it beat the U-shaped Transformer baseline on PSNR in several cases, at 0.10 s per image versus 0.07 s. An ablation over MAE, MSE and RMSE losses showed MAE worked best.</li>
          </ul>
          <p className="stack">Python, deep learning, GANs, computer vision</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Agro Drone: autonomous agricultural drone</h3>
          </div>
          <ul>
            <li>Designed and built an Octo-H frame drone for autonomous seeding and spraying, with a Raspberry Pi running the navigation and flight-control stack.</li>
            <li>Wrote the OpenCV pipeline for texture-based terrain assessment, field mapping and soil-moisture analysis.</li>
          </ul>
          <p className="stack">Python, OpenCV, Raspberry Pi</p>
        </article>

        <article className="entry reveal">
          <div className="entry-head">
            <h3>Molecular dynamics simulation of ion diffusion</h3>
            <span className="when">BTech thesis, IIT Guwahati</span>
          </div>
          <ul>
            <li>Simulated ion diffusion in solid-electrolyte lattices with LAMMPS and analyzed the trajectories in Python.</li>
          </ul>
        </article>
      </section>

      <section aria-labelledby="edu">
        <h2 className="reveal" id="edu">Education</h2>
        <article className="entry reveal">
          <div className="entry-head">
            <h3>Texas A&amp;M University, MS in Computer Engineering</h3>
            <span className="when">Aug 2026 to May 2028 (expected)</span>
          </div>
          <p className="sub">Computer Architecture (CSCE 614), Analysis of Algorithms (CSCE 629), Advanced Logic Design (ECEN 468/719)</p>
        </article>
        <article className="entry reveal">
          <div className="entry-head">
            <h3>IIT Guwahati, BTech in Engineering Physics</h3>
            <span className="when">2020 to 2024</span>
          </div>
          <p className="sub">CGPA 8.49/10. Deep Learning, Big Data Analytics, Linear Algebra, Probability and Statistics, Numerical Methods, Digital Electronics and Microprocessors</p>
        </article>
      </section>

      <section aria-labelledby="skills">
        <h2 className="reveal" id="skills">Skills</h2>
        <dl className="skills reveal">
          <dt>Languages</dt><dd>Java, Python, TypeScript, JavaScript, SQL, C, C++, MATLAB</dd>
          <dt>Backend</dt><dd>Spring Boot, Node.js, Express, FastAPI, REST, OpenAPI, microservices, domain-driven design, Kafka</dd>
          <dt>AI and LLMs</dt><dd>LangGraph, LangChain, MCP, tool calling, structured outputs, LLM evaluation, PyTorch, OpenCV</dd>
          <dt>Data</dt><dd>PostgreSQL, DuckDB, Parquet, MongoDB, Azure SQL, Firebase, Hadoop, PySpark, Pandas, NumPy</dd>
          <dt>Frontend</dt><dd>React, TypeScript, HTML, CSS, Vite</dd>
          <dt>DevOps</dt><dd>Docker, Docker Compose, Kubernetes, GitHub Actions, Flyway</dd>
          <dt>Testing</dt><dd>JUnit, Mockito, Testcontainers, pytest, Playwright, Selenium</dd>
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
        <span>Siddharth Bhatt · <a href={LINKS.email}>sid.bhatt@tamu.edu</a></span>
        <span>Last updated November 2026</span>
      </footer>
    </main>
  );
}
