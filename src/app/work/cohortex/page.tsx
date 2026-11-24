/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Cite } from "@/components/Cite";
import CaseStudy from "@/components/CaseStudy";
import { LINKS, type Source } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cohortex",
  description: "Case study: an agent system for hard-drive failure analysis where every number in a report is checked against the data it came from.",
};

const SOURCES: Source[] = [
  { label: "Cohortex recorded demo run", href: LINKS.cohortexDemo, note: "(a recording of a real run on Backblaze Q2 2026 data)" },
  { label: "Cohortex README, “How this was built”", href: LINKS.cohortexRepo },
  { label: "Cohortex architecture decision records (ADR 001 to 013)", href: LINKS.cohortexAdrs },
  { label: "Résumé (PDF)", href: LINKS.resume },
  { label: "Backblaze ai-agent-demo, a text-to-SQL agent over the same data", href: LINKS.backblazeDemo },
];

export default function Page() {
  return (
    <CaseStudy
      title="Cohortex"
      dek="A personal project I’ve been building since October 2026: an agent that investigates hard-drive failures in public data, where every number in its report has to point back to the tool call it came from. It’s a working prototype, not a product."
      artifact={<img src="/media/cohortex-report.webp" width={945} height={933} alt="A Cohortex report with a summary, findings and hypotheses; each number is marked with a link to its evidence" />}
      caption={<>A report from the recorded demo. Each highlighted number opens the tool result it came from.<Cite n={1} /></>}
      links={[
        { href: LINKS.cohortexDemo, label: "Recorded demo" },
        { href: LINKS.cohortexRepo, label: "Repository" },
        { href: LINKS.cohortexAdrs, label: "Architecture decisions" },
        { href: LINKS.cohortexDesign, label: "Design document" },
      ]}
      role={
        <>
          <p>
            Solo project. I designed the system, wrote and reviewed the specifications, accepted or rejected each
            architecture decision, reviewed every change, labeled the evaluation data and ran the error analysis. Claude
            coding agents wrote much of the code from those specs.<Cite n={2} />
          </p>
          <p>
            Status: it runs end to end, and the public demo replays a recorded run. It is not a hosted service, and the
            evaluation set is still under review.
          </p>
        </>
      }
      sections={[
        {
          id: "problem", label: "Problem", title: "Problem",
          body: (
            <>
              <p>
                A question like “why did this drive model’s failure rate jump last quarter?” takes several queries, some
                statistics with honest uncertainty, and a write-up. An LLM agent can draft all of that in minutes. It can
                also produce confident numbers that are simply wrong, and a reader has no easy way to tell.
              </p>
              <p>
                Backblaze, who publish the Drive Stats data, have a demo agent that lets the model write SQL over it.<Cite n={5} />{" "}
                I wanted to see how far an agent gets when the model never writes a query at all, and every figure it
                reports is checked by code.
              </p>
            </>
          ),
        },
        {
          id: "constraints", label: "Constraints", title: "Constraints",
          body: (
            <ul>
              <li><strong>No budget.</strong> The models had to cost nothing, so the agent runs on the open-weight gpt-oss-20b through free endpoints or a local Ollama.<Cite n={3} /></li>
              <li><strong>Public data only:</strong> Backblaze Drive Stats for hard drives and Alibaba’s published SSD SMART logs.</li>
              <li><strong>Runs on a laptop.</strong> The whole stack comes up with Docker Compose, nine services in all.<Cite n={4} /></li>
              <li><strong>Auditable.</strong> Anyone reading a report must be able to trace every number to where it came from.</li>
            </ul>
          ),
        },
        {
          id: "decisions", label: "Key decisions", title: "Key decisions",
          body: (
            <ol>
              <li>
                <strong>The model never writes SQL.</strong> It calls typed, parameterized, read-only tools over MCP, and
                the tool schemas never accept SQL, URLs or file paths. I rejected text-to-SQL with a query checker.{" "}
                <span className="adr">ADR 001</span><Cite n={3} />
              </li>
              <li>
                <strong>Tools go through an API, never the database.</strong> The MCP tools call a Java and Spring Boot
                fleet API, which owns all queries. <span className="adr">ADR 002, 011</span><Cite n={3} />
              </li>
              <li>
                <strong>Claims carry evidence.</strong> Every claim lists the evidence it rests on, and code checks the
                numbers before any LLM-based check, because code is cheap and deterministic.{" "}
                <span className="adr">ADR 008</span><Cite n={3} />
              </li>
              <li>
                <strong>Uncertainty is shown, not hidden.</strong> Failure rates use Backblaze’s formula with exact
                Poisson 95% intervals, implemented in both Java and Python and required to agree to 1e-9.{" "}
                <span className="adr">ADR 007</span><Cite n={3} />
              </li>
              <li>
                <strong>Grading uses a separate copy of the truth.</strong> Expected answers are computed from a
                Parquet and DuckDB raw layer, not from the serving database the agent reads, so grading is a real cross
                check. <span className="adr">ADR 004</span><Cite n={3} />
              </li>
              <li>
                <strong>One agent or a small team.</strong> The same LangGraph interface runs a single agent or a planner
                that hands tasks to up to three parallel workers, and each run stops at set limits on tokens, tool calls
                and time.<Cite n={4} />
              </li>
            </ol>
          ),
        },
        {
          id: "tradeoffs", label: "Tradeoffs", title: "Tradeoffs",
          body: (
            <ul>
              <li>Typed tools are safer but narrower. A new kind of question needs a new tool parameter, not just a new prompt.</li>
              <li>Requiring structured number references makes the drafting prompts stricter and the model’s job harder.</li>
              <li>A free open-weight model keeps the cost at zero but is slower: the recorded run took 4 min 12 s end to end.<Cite n={1} /></li>
              <li>Keeping a second copy of the data for grading means two copies to keep consistent; the loader reconciles counts against the raw files to guard that.<Cite n={4} /></li>
            </ul>
          ),
        },
        {
          id: "evaluation", label: "Evaluation", title: "Evaluation",
          body: (
            <div className="eval-grid">
              <div>
                <h3>What I measured</h3>
                <p>
                  In the recorded run the agent made four tool calls and drafted 8 claims citing 13 numbers. The code
                  check passed all 8 claims and flagged none. The answer: ST10000NM0086 failed at 9.75% a year (95%
                  interval 6.18 to 14.63%) against 1.74% for the whole fleet, a rate ratio of 5.61.<Cite n={1} /> About
                  470 automated tests run in GitHub Actions.<Cite n={4} />
                </p>
              </div>
              <div>
                <h3>Baseline</h3>
                <p>
                  None yet for answer quality. The planned comparison is each answer against truth computed on the
                  separate raw-data path, using 30 golden questions and 7 adversarial ones, which are still under
                  review.<Cite n={4} />
                </p>
              </div>
              <div>
                <h3>What it doesn’t show</h3>
                <p>
                  One run is not an accuracy rate. The number check confirms that cited figures match tool results; it
                  does not confirm that the reasoning or the conclusion is right. I haven’t tested other models, and the
                  public demo replays a recording rather than running live.
                </p>
              </div>
            </div>
          ),
        },
      ]}
      sources={SOURCES}
    />
  );
}
