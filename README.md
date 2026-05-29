# Bexovar Website

Custom software & process automation studio — [bexovar.io](https://bexovar.io)

## Structure

```
├── index.html          # Homepage (static, deployable as-is)
├── site.css            # Global styles
├── site.js             # Global scripts
├── i18n.js             # Language switcher (EN/ES)
├── services/           # Service detail pages
│   ├── consulting.html
│   ├── custom-software.html
│   ├── integrations.html
│   └── rpa-agents.html
├── assets/             # Images, icons, demo SVGs
│   ├── favicon.svg
│   └── demos/
├── brand/              # Logo exports (SVG, PNG at multiple sizes)
└── web/                # Next.js app (future, i18n-ready)
    ├── src/
    └── package.json
```

## Deploy (static site)

The root `index.html` + `services/` folder is a fully self-contained static site. Deploy with:

- **GitHub Pages:** Settings → Pages → Source: branch `master`, folder `/`
- **Netlify:** Connect repo, publish directory: `/`
- **Any static host:** Upload the root folder

## Development (Next.js app)

```bash
cd web
npm install
npm run dev
```

Opens at `http://localhost:3000`. Supports English and Spanish locales.
