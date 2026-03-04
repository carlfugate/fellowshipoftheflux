# Project Context — Fellowship of the Flux

## What This Is

A Hugo static site for **Fellowship of the Flux**, a Kansas City-based volunteer organization that teaches soldering through community workshops, portable labs, and educational resources. The live site is at **https://fellowshipoftheflux.com**.

## Tech Stack

- **Hugo** (v0.157.0, extended) — static site generator
- **Tailbliss** theme — Git submodule at `themes/tailbliss/`
- **Tailwind CSS 3** — built via PostCSS, served as static files from `/static/css/`
- **Alpine.js** — loaded from CDN for interactive components (nav, dark mode)
- **GitHub Actions** → **GitHub Pages** — auto-deploys on push to `master`
- **Node.js 18+** — build tooling only

## Key Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev server on port 1313 (with drafts) |
| `npm run build` | Production build (PostCSS + Hugo minify) |
| `npm run build:css` | Rebuild Tailwind CSS only |
| `npm test` | Runs validation suite (also runs as pre-commit hook) |
| `npm run test:deployment` | Verify live site after deploy |

## Important Architecture Decisions

1. **Static CSS, not Hugo Pipes** — Hugo 0.157.0 broke `resources.PostProcess`. CSS lives in `/static/css/` as pre-built files. `main.css` is built via PostCSS; `custom.css` is hand-written.

2. **`unsafe: true` in Goldmark** — Required in ALL environments. Content pages (about, services, community, lab-setup, contact) are almost entirely inline HTML in markdown files. Setting `unsafe: false` breaks them.

3. **Text-only brand, no logo** — Logo SVG was broken and removed. Nav and footer show text wordmark only. `config.yaml` has `brand.logo: ""`.

4. **Pre-commit hook** — `.git/hooks/pre-commit` runs `npm test` before every commit. Bypass with `--no-verify`.

5. **Config splitting** — `config.yaml` (base) + `config.dev.yaml` or `config.production.yaml`. GitHub Actions uses `--config config.yaml,config.production.yaml`.

## Content Structure

```
content/
├── _index.md              # Homepage content (layout in layouts/index.html)
├── about.md               # Inline HTML — org story, mission, impact stats, values
├── contact.md             # Inline HTML — email contacts, location, workshop CTA
├── services.md            # Inline HTML — portable lab workshop offerings
├── lab-setup.md           # Inline HTML — guide to building your own lab
├── community.md           # Inline HTML — community stats, events, volunteer spotlights
├── get-involved.md        # Markdown — volunteer opportunities
├── posts/                 # Blog posts (news, recaps, stories)
├── projects/              # Hands-on build projects
└── learn/
    ├── _index.md          # Learn hub (custom layout: learn-hub)
    ├── tutorials/         # Step-by-step learning modules
    ├── guides/            # Reference materials
    └── projects/          # Project-based learning
```

## Layout Structure

```
layouts/
├── index.html             # Homepage — hero, 3-column CTAs, testimonial, journey steps, stats
├── _default/
│   ├── baseof.html        # Base template (minimal)
│   ├── single.html        # Default single page
│   └── list.html          # Default list page
├── partials/
│   ├── head.html          # Meta, CSS, dark mode script, canonical URL
│   ├── nav.html           # Sticky nav with Alpine.js mobile menu + dark mode toggle
│   ├── footer.html        # 4-column footer with social links
│   ├── meta.html          # OG/Twitter meta tags, JSON-LD
│   └── scripts.html       # JS loading
├── posts/                 # Blog single + list
├── projects/              # Project single + list
├── learn/                 # Learn hub + search
├── tutorials/             # Tutorial single + list
└── guides/                # Guide single
```

## Known Issues & Backlog

### Needs Attention
- **No real photography** — All visual anchors are emoji icons. Real workshop/project photos would dramatically improve engagement.
- **No contact form** — Contact page has email links only. A Formspree/Google Forms embed would reduce friction.
- **No upcoming events section** — Community org with no way to show where they'll be next.
- **Blog posts off-brand** — "Tailwind CSS Tips" and "Building with Hugo" are about web dev, not soldering. Should be reframed or replaced.
- **Stat counter animations not wired up** — CSS `animate-count` and `IntersectionObserver` exist but stats are static HTML.
- **No active page indicator in nav** — Can't tell which page you're on.
- **Learn section is a flat list** — Would benefit from a visual skill tree / progress path.
- **Content pages are visually monotonous** — Same card-grid pattern on every page. Needs alternating layouts, photo breaks, pull quotes.

### Recently Fixed (2026-03-02 through 2026-03-04)
- Placeholder contact page replaced with real content
- Broken logo references removed
- GitHub Actions now uses production config
- RSS and 404 pages re-enabled in production
- Stats reconciled across pages
- Hardcoded workshop date removed
- Canonical URL tag added
- Dead theme copy and disabled workflow removed
- Broken featured_image references stripped from all content
- Alpine.js preload link fixed
- All documentation updated

## Project Documentation Map

| Document | Location | What's In It |
|----------|----------|-------------|
| README | `README.md` | Setup, scripts, content structure, deployment, contributing |
| Brand Guidelines | `docs/brand-guidelines.md` | Colors, typography, tone, imagery, content strategy |
| Technical Notes | `TECHNICAL_NOTES.md` | Architecture decisions, fix log, build/deploy notes |
| Requirements | `.kiro/specs/.../requirements.md` | 4 user stories with acceptance criteria |
| Design Doc | `.kiro/specs/.../design.md` | Architecture, components, data models, testing strategy |
| Tasks | `.kiro/specs/.../tasks.md` | 11 implementation tasks (all complete) |
| This File | `.kiro/project-context.md` | Agent onboarding — you are here |

## Working With This Project

- Always run `npm test` or let the pre-commit hook catch issues before pushing
- The site builds in ~80ms locally — iterate fast
- Content pages use raw HTML in markdown — edit carefully, Hugo won't catch HTML errors
- Theme is a submodule — don't edit files in `themes/tailbliss/` directly
- Deploy is automatic on push to `master` — post-deploy tests run in CI
