# yourDailyPhill.github.io

Personal resume and blog built with Angular 19, deployed to GitHub Pages at [https://yourDailyPhill.github.io](https://yourDailyPhill.github.io).

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Content

- **Resume** — edit [`src/assets/data/resume.json`](src/assets/data/resume.json)
- **Blog** — add markdown files under [`content/blog/`](content/blog/) with YAML frontmatter, then run `npm run generate:blog`

## Production build (GitHub Pages)

```bash
npm run build:gh-pages
```

Output: `dist/your-daily-phill.github.io/browser`

## Deploy

1. Create repo `yourDailyPhill.github.io` on GitHub
2. Enable **Settings → Pages → GitHub Actions**
3. Push to `main` — the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publishes the site
