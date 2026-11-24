// Shared links. Every fact on the site comes from the résumé (public/Bhatt_Siddharth.pdf),
// Siddharth's own notes, or the public Cohortex repo and demo. Items still needing evidence
// live in CONTENT-TODO.md at the repo root, never on the public pages.

export const EMAIL = "sbhatt.career@gmail.com";

export const LINKS = {
  email: `mailto:${EMAIL}`,
  resume: "/Bhatt_Siddharth.pdf",
  github: "https://github.com/siddharthb18",
  linkedin: "https://www.linkedin.com/in/siddharth-bhatt-024133212/",
  cohortexRepo: "https://github.com/siddharthb18/cohortex",
  cohortexDemo: "https://siddharthb18.github.io/cohortex/",
  cohortexAdrs: "https://github.com/siddharthb18/cohortex/tree/main/docs/adr",
  cohortexDesign: "https://github.com/siddharthb18/cohortex/blob/main/docs/specs/design.md",
  movieReport: "https://drive.google.com/file/d/1dkyfCqhyu-W7GwmCQPGAX-ACw8aona3B/view?usp=sharing",
  ganReport: "https://drive.google.com/file/d/15_SmZZ-Tz7OZXqFq0UHOT45MjF_DHbK0/view?usp=sharing",
  thesisReport: "https://drive.google.com/file/d/1qv-L4ZHVXq4tGl3smo5GLvP-uHjmCztJ/view?usp=sharing",
  dipPaper: "https://doi.org/10.1145/1250662.1250709",
  backblazeDemo: "https://github.com/backblaze-b2-samples/ai-agent-demo",
};

export type Source = { label: string; href: string; note?: string };
