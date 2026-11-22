# Redesign validation

The homepage leads directly to the first lesson. The library supports topic search and skill-level filtering. Lesson pages expose materials, bookmarks, completion and a keyboard-operable quiz. Hosts can compare the three workshop packages or email the team from the introduction. The community calendar labels dates by year. Site navigation, articles, resource indexes and information pages share a local design system.

The Community page groups its three confirmed 2026 events under an annual history, with date markers, city labels and a compact soldering-village format label. It does not add attendance figures or quotes. Desktop and mobile screenshots are included below.

## Browser evidence

| View | Before | After |
|---|---|---|
| Home · desktop | [Before](before-home-desktop.jpg) | [After](after-home-desktop.jpg) |
| Home · tablet | [Before](before-home-tablet.jpg) | [After](after-home-tablet.jpg) |
| Home · mobile | [Before](before-home-mobile.jpg) | [After](after-home-mobile.jpg) |
| Learn · desktop | [Before](before-learn-desktop.jpg) | [After](after-learn-desktop.jpg) |
| Learn · tablet | [Before](before-learn-tablet.jpg) | [After](after-learn-tablet.jpg) |
| Learn · mobile | [Before](before-learn-mobile.jpg) | [After](after-learn-mobile.jpg) |
| Host · desktop | [Before](before-host-desktop.jpg) | [After](after-host-desktop.jpg) |
| Host · tablet | [Before](before-host-tablet.jpg) | [After](after-host-tablet.jpg) |
| Host · mobile | [Before](before-host-mobile.jpg) | [After](after-host-mobile.jpg) |
| Community · desktop | — | [After](after-community-desktop.jpg) |
| Community · mobile | — | [After](after-community-mobile.jpg) |

## Validation

- Production build, repository smoke tests and Hugo route/template validation passed on local Hugo 0.170.1. Hugo reported existing deprecated config keys and unused templates. Pages CI pins 0.157.0; hosted CI was not rerun.
- The local link checker verified all 123 generated HTML files, their internal links, fragment targets and referenced local assets.
- Playwright with Firefox completed skip navigation, mobile menu keyboard behavior and resize closing, mailto handoffs, supplies disclosure, persistent bookmarks and completion, quiz submission/retake/focus/backdrop handling, code copying, event history, catalog search and filters, theme persistence, and no-JavaScript navigation. No uncaught page errors. CLS was 0.000 on mobile, with no horizontal overflow at 39 route/view combinations.
- axe-core reported zero WCAG A/AA violations across 13 routes at 1440 × 900, 820 × 1024 and 390 × 844 (39 route/view checks). The earlier baseline recorded 36 violating scans across its 36 checks. Automated checks do not establish full accessibility conformance.
- HTML/CSS validation did not run because the machine has no Java runtime for vnu-jar.
- The rendered review led to replacing a sideways About photograph, prioritizing the featured lesson photograph, collapsing lengthy mobile outlines, simplifying package markup, and giving the scrollable equipment table keyboard focus and a name.

## Lighthouse

The baseline and redesign were tested as local production builds. Current figures are medians of three desktop Lighthouse runs on each of ten routes. Lighthouse executed with Chrome after an escalated run outside the workspace sandbox; launching Chrome inside the sandbox repeatedly failed. These are lab measurements, not field data. Current results include the About page's large photography payload, which remains an optimization opportunity.

| Metric | Before | After |
|---|---:|---:|
| Route | Performance | Accessibility | Best practices | SEO | LCP | Transfer | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 | 1.50 s | 248 KB | 0.000 |
| About | 99 | 100 | 100 | 100 | 1.95 s | 2,240 KB | 0.000 |
| Posts | 100 | 100 | 100 | 100 | 0.90 s | 39 KB | 0.000 |
| Projects | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Services | 100 | 100 | 100 | 100 | 1.65 s | 122 KB | 0.000 |
| Contact | 100 | 100 | 100 | 100 | 0.90 s | 39 KB | 0.000 |
| Learn | 100 | 100 | 100 | 100 | 1.80 s | 129 KB | 0.000 |
| Tutorials index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Guides index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Projects index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |

The baseline Lighthouse accessibility engine could not parse an OKLCH color, so its accessibility score is unavailable. Lighthouse CI was configured to upload reports to temporary public storage during the first completed run; the config now writes reports to local filesystem only. Reports from that run were uploaded by LHCI and their temporary report links were emitted in the command output. No production deployment, field performance data, screen-reader user study or external inbox delivery verification was performed. Tool licenses and dependency status are recorded in [tooling and cost](tooling.md).
