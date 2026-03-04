# Fellowship of the Flux - Technical Notes

## Architecture Decisions

### Static CSS instead of Hugo Pipes (2026-02-28)
- Hugo 0.157.0 has stricter resource caching; `resources.PostProcess` causes cache errors
- CSS is served from `/static/css/` as pre-built files
- `main.css` is built via PostCSS (`npm run build:css`), `custom.css` is hand-written
- Cache busting uses `?v={{ now.Unix }}` query strings (per-build, not per-file-change)

### Goldmark `unsafe: true` required (2026-03-02)
- Content pages (about, services, community, lab-setup, contact) use inline HTML extensively
- Setting `unsafe: false` in production would break all these pages
- Both base and production configs now set `unsafe: true`

### Text-only brand name, no logo (2026-03-03)
- Logo SVG file was missing/broken and never displayed correctly
- Removed all logo `<img>` references from nav, footer, and head preload
- Config `brand.logo` set to empty string
- Site uses text wordmark "FELLOWSHIP OF THE FLUX" in nav and footer

### RSS and 404 pages enabled in production (2026-03-02)
- Production config previously disabled RSS and 404 via `disableKinds`
- Footer links to `/index.xml` (RSS), so disabling it caused 404s
- Both are now enabled in all environments

## Issues & Fixes Log

### 2026-03-02: Site Review Fixes

1. **Contact page was placeholder** — Rewrote with real Fellowship emails and workshop CTA
2. **Logo path wrong** — `config.yaml` referenced nonexistent `fellowship-logo.svg`; changed to `site-logo.svg`, later removed entirely
3. **GitHub Actions missing production config** — Build step now uses `--config config.yaml,config.production.yaml`
4. **Production disabled RSS/404** — Removed `disableKinds` from production config
5. **Inconsistent stats** — Aligned community page numbers with about page (30+ volunteers, 25+ events)
6. **Hardcoded workshop date** — Replaced "March 15th - 3 spots left" with evergreen text
7. **Posts index boilerplate** — Replaced web dev description with Fellowship-specific text
8. **Malformed Alpine.js link tag** — Had two `rel` attributes; fixed to single `rel="preload"`
9. **Missing canonical URL** — Added `<link rel="canonical">` to head partial
10. **14 broken featured_image references** — Removed from all content front matter (image files never existed)
11. **Dead theme copy** — Removed `themes/tailbliss-full` directory
12. **Stale disabled workflow** — Removed `.github/workflows/deploy.yml.disabled`

### 2026-02-28: Initial Setup Fixes

1. **Hugo version mismatch** — Standardized all workflows to Hugo 0.157.0
2. **Deprecated cache configs** — Removed `getcsv`/`getjson` cache types (removed in Hugo 0.157.0)
3. **Theme duplicate markup key** — Fixed in theme submodule commit f27ce79b
4. **PostCSS resource processing** — Switched to static CSS files
5. **Template variable shadowing** — Changed `:=` to `=` for reassignment in head.html
6. **Unprocessed @import in custom.css** — Removed Tailwind @import statements; Tailwind already in main.css

## Pre-Commit Hook

Location: `.git/hooks/pre-commit`

Runs `npm test` before every commit, which:
- Builds the site with Hugo
- Checks critical files exist
- Validates homepage content
- Checks git cleanliness

Bypass with `git commit --no-verify` if needed.

## Build & Deploy

- Local dev: `npm run dev` (port 1313)
- Production build: `npm run build` (uses PostCSS + Hugo with minification)
- Deploy: Push to `master` → GitHub Actions builds with production config → GitHub Pages
- Post-deploy test: `scripts/test-deployment.sh` runs automatically in CI
