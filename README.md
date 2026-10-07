# Saeed Ud Din Ahmad — Portfolio

Personal portfolio built with Next.js App Router, React, Tailwind CSS, and
shadcn/ui. The production build is exported as static files for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production and deployment

```bash
npm run build
npm run deploy
```

`npm run build` generates the static site in `out/`. `npm run deploy` builds
the current branch and publishes `out/` to the repository's `gh-pages` branch.
GitHub Pages should use the `gh-pages` branch and `/ (root)` folder.
