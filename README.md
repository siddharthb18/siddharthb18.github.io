# siddharthb18.github.io

Personal site of Siddharth Bhatt. One static page built with Next.js (static export). Two small 3D pieces (three.js) and light GSAP motion; both switch off for visitors who prefer reduced motion.
Everything on the page comes from the resume in `public/Bhatt_Siddharth.pdf`; update both together.

## Run locally

    npm install
    npm run dev        # http://localhost:3000
    npm run build      # static site in out/

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `out/` to GitHub Pages
(Settings > Pages > Source: GitHub Actions).
