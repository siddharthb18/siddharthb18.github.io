import type { Metadata } from "next";
import { Cite } from "@/components/Cite";
import CaseStudy from "@/components/CaseStudy";
import { EnsembleDiagram } from "@/components/Diagrams";
import { LINKS, type Source } from "@/lib/site";

export const metadata: Metadata = {
  title: "Emotion-based movie review analysis",
  description: "Case study: sentiment classification on 50,000 IMDb reviews with eight models and a majority-vote ensemble, served through a Flask app.",
};

const SOURCES: Source[] = [
  { label: "Course report (PDF)", href: LINKS.movieReport },
  { label: "Résumé (PDF)", href: LINKS.resume },
];

export default function Page() {
  return (
    <CaseStudy
      kind="Course project · Big Data Analytics, IIT Guwahati · Fall 2023"
      title="Emotion-based movie review analysis"
      dek="Sentiment classification on 50,000 IMDb reviews with eight models from two toolkits, combined into one ensemble and served through a small movie recommendation app."
      artifact={<EnsembleDiagram />}
      caption={<>The pipeline as described in my résumé; the full write-up is in the course report.<Cite n={2} /></>}
      links={[{ href: LINKS.movieReport, label: "Course report (PDF)" }]}
      role={
        <p>
          I trained and compared the models, added the DistilBERT features and the majority-vote ensemble, and served the
          result through a Flask app with search and recommendations.<Cite n={2} /> It was coursework for Big Data
          Analytics at IIT Guwahati.
        </p>
      }
      sections={[
        {
          id: "problem", label: "Problem", title: "Problem",
          body: (
            <p>
              Classify the sentiment of movie reviews at a scale where Spark is worth using, and put the result behind
              something a person can use: search for a movie, see how reviewers felt about it, and get recommendations.
            </p>
          ),
        },
        {
          id: "constraints", label: "Constraints", title: "Data and constraints",
          body: (
            <ul>
              <li>50,000 IMDb reviews.<Cite n={2} /></li>
              <li>Classic models ran on Hadoop and PySpark MLlib.<Cite n={2} /></li>
              <li>Deep models in TensorFlow, trained alongside them for comparison.</li>
            </ul>
          ),
        },
        {
          id: "decisions", label: "Key decisions", title: "Key decisions",
          body: (
            <ol>
              <li><strong>Many models, not one.</strong> Five MLlib models (XGBoost, SVM, logistic regression, random forest and naive Bayes) and three TensorFlow networks (CNN, LSTM and feed-forward).<Cite n={2} /></li>
              <li><strong>Better text features.</strong> DistilBERT sentence embeddings added to the pipeline.<Cite n={2} /></li>
              <li><strong>A simple ensemble.</strong> A majority vote across the models, which needs no extra training data.<Cite n={2} /></li>
            </ol>
          ),
        },
        {
          id: "tradeoffs", label: "Tradeoffs", title: "Tradeoffs",
          body: (
            <ul>
              <li>The ensemble runs every model for each review, a large serving cost for a one-point gain.</li>
              <li>A majority vote treats every model as equally reliable, even when some are clearly weaker.</li>
            </ul>
          ),
        },
        {
          id: "evaluation", label: "Evaluation", title: "How I evaluated it",
          body: (
            <div className="eval-grid">
              <div>
                <h3>What I measured</h3>
                <p>Classification accuracy. The majority-vote ensemble reached 93.4%.<Cite n={2} /></p>
              </div>
              <div>
                <h3>Baseline</h3>
                <p>The best single model, an LSTM, at 92.4%.<Cite n={2} /></p>
              </div>
              <div>
                <h3>What it doesn’t show</h3>
                <p>Accuracy alone hides which kinds of reviews fail. It is one dataset, and without variance across runs a one-point gain may not hold on a different split.</p>
              </div>
            </div>
          ),
        },
      ]}
      sources={SOURCES}
    />
  );
}
