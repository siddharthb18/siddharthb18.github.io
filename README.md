# siddharthb18.github.io

Personal site of Siddharth Bhatt: a short landing page plus one case-study page per featured project.
Static Next.js export, deployed to GitHub Pages by `.github/workflows/deploy.yml`.

## Where things live

- `src/app/page.tsx`: landing page (About, Selected work, Experience, Education & recognition, Contact, Sources)
- `src/app/work/<slug>/page.tsx`: case studies (`cohortex`, `cache-replacement`, `movie-reviews`)
- `src/lib/site.ts`: email and links used everywhere
- `public/Bhatt_Siddharth.pdf`: the résumé; the site's facts come from it, the notes Siddharth gave, and the public Cohortex repo
- `CONTENT-TODO.md`: claims that still need evidence or confirmation (not published)

Every figure on a page carries a small footnote number that links to the Sources list at the bottom of that page.
When you add a number, add its source.

## Run locally

    npm install
    npm run dev        # http://localhost:3000
    npm run build      # static site in out/

## Deploy

Push to `main`. GitHub Pages must be set to Settings > Pages > Source: GitHub Actions.
