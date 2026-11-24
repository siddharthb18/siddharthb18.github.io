# Things to confirm or fill in

Private notes for Siddharth. This file is in the repo but is **not** published: the site is built from
`src/` and `public/` only. Nothing below is on the live pages until you confirm it.

## Fix on the résumé so it matches the site

1. **"consumed by both web and mobile clients"** (Walmart auth APIs). You said Scintilla only had a web app,
   so the site says "for the web app". Update the résumé to match.
2. **"Co-built a Slack triage agent (Code Puppy)"** reads as if the agent was called Code Puppy. Your notes say
   the agent was built *with* Code Puppy. The site says "a Slack agent, built with Code Puppy". Pick one wording
   and use it in both places.
3. **Cohortex authorship.** The résumé says "Wrote the data API … the data loader … and a React front end". The
   Cohortex README says Claude coding agents wrote much of the code from your specs, and you designed, reviewed
   and evaluated it. The site follows the README. Make the résumé consistent, since an interviewer may read both.

## Left off the site because there's no evidence yet

4. **Braze email system "improving engagement and delivery reliability".** There's no number or source, so the
   site doesn't mention it. If you have a figure (open rate, delivery rate, bounce rate), add it with its source.
5. **ChampSim results.** The case study describes the setup and metrics but no results. To add them, provide the
   IPC / MPKI / geometric-mean speedup numbers per policy (a small table is ideal), and say whether the
   code or report can be linked.
6. **Cohortex accuracy.** Once the 30 golden + 7 adversarial questions are reviewed and run, add the pass rate
   and what it was compared against to the Evaluation section of `/work/cohortex/`.

## Please confirm

7. **Solo or team?** The site doesn't say either way for the ChampSim project and the movie review project.
   If either was a team project, say who did what and I'll label it.
8. **Movie review pipeline.** The diagram shows DistilBERT embeddings as one input feeding the majority vote.
   Confirm how the embeddings were actually used (as features for one of the models, or as a separate classifier).
9. **DIP pair.** The ChampSim page says DIP chooses between LRU-style insertion and BIP, as in the original paper.
   Confirm that is what you implemented, not LIP vs BIP.
10. **Walmart multi-tenant work** ("a new site is added through configuration flags") comes from your notes, not
    the résumé. Confirm you're happy for it to be public. The internal tool name is deliberately left out.
11. **Self-reported Walmart figures** (100% uptime, P99 under 15 ms, about 150 developers) are labeled as
    self-reported in the Sources list. Be ready to explain how each was measured. The 150 is the team the agent
    was released to, not a count of active users.
12. **Google Drive report links** (movie review, GAN, thesis): check each is shared as "Anyone with the link".

## ECEN 719 hardware project (added from the course lab page)

15. The "Also built" list now shows the Canny edge detector system (Labs 4, 5, 10 and 11) instead of the SRAM lab.
    Confirm you completed those labs, and if your designs hit the 98% image-match target, I can add the number.
    The bus arbiter, SRAM model and testbench were provided by the course; the site credits you with the detector
    and the bus wrapper only. Consider updating the résumé's SRAM project the same way.

## Palette test

16. A "Palette" button (bottom-left on desktop, bottom-right on phones) switches between Tea (cream and oolong
    amber) and Aura (near-black with orange, pink and indigo). Once you pick one, tell me and I'll make it the only
    palette and remove the button, so it doesn't ship to visitors.

## Optional

13. A photo, if you want one, in `public/media/` and the About section.
14. Repos or demos for the GAN, Agro Drone or Canny edge detector projects, if any exist.
