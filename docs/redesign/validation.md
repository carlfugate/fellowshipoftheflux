# Redesign validation

The homepage leads directly to the first lesson. The library supports topic search and skill-level filtering. Lesson pages expose materials, bookmarks, completion and a keyboard-operable quiz. Workshop details and volunteer opportunities explain which facts and contact routes are still being confirmed. The community page records the three confirmed 2026 events. Site navigation, resource indexes and information pages share a local design system.

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
- The local link checker verified all 50 generated HTML files, their internal links, fragment targets and referenced local assets. The production build contains 53 pages; unsupported posts, projects and the unreviewed safety guide are excluded as drafts.
- Playwright with a separate headless Firefox process completed skip navigation, mobile menu keyboard behavior and resize closing, supplies disclosure, persistent bookmarks and completion, quiz submission/retake/focus/backdrop handling, event history, catalog search and filters, theme persistence, the contact placeholder, and no-JavaScript navigation. It confirmed that the unreviewed safety guide and unsupported projects return 404, and there are no direct email CTAs in the tested public routes. No uncaught page errors. CLS was 0.000 on mobile; no horizontal overflow was found at the tested viewport sizes.
- axe-core reported zero WCAG A/AA violations across 13 routes at 1440 × 900, 820 × 1024 and 390 × 844 (39 route/view checks). The earlier baseline recorded 36 violating scans across its 36 checks. Automated checks do not establish full accessibility conformance.
- HTML/CSS validation did not run because the machine has no Java runtime for vnu-jar.
- The rendered review led to replacing a sideways About photograph, prioritizing the featured lesson photograph, collapsing lengthy mobile outlines, simplifying package markup, and giving the scrollable equipment table keyboard focus and a name. The About gallery was reduced from eight to two images; its Lighthouse transfer fell from about 2.24 MB to 390 KB.

## Lighthouse

The redesign was tested as a local production build with Lighthouse 13.6.0 mobile emulation, three runs on each of ten routes. Lighthouse executed with Chrome outside the workspace sandbox after its launch failed inside the sandbox. These are lab measurements, not field data.

| Route | Performance | Accessibility | Best practices | SEO | LCP | Transfer | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 100 | 100 | 100 | 100 | 1.50 s | 226 KB | 0.000 |
| About | 100 | 100 | 100 | 100 | 1.73 s | 390 KB | 0.000 |
| Posts | 100 | 100 | 100 | 100 | 0.90 s | 39 KB | 0.000 |
| Projects | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Services | 100 | 100 | 100 | 100 | 1.65 s | 121 KB | 0.000 |
| Contact | 100 | 100 | 100 | 100 | 1.80 s | 155 KB | 0.000 |
| Learn | 100 | 100 | 100 | 100 | 1.80 s | 129 KB | 0.000 |
| Tutorials index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Guides index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |
| Projects index | 100 | 100 | 100 | 100 | 0.90 s | 43 KB | 0.000 |

The earlier baseline recorded 58 performance, 9.44 s LCP, 2,547,541 transferred bytes and 0.000 CLS for Home. Its Lighthouse 10.1.0 accessibility engine could not parse an OKLCH color. The current Home run recorded 100 performance, 1.50 s LCP, 225,553 bytes and 0.000 CLS. Lighthouse versions differ, so treat the score comparison as indicative. Lighthouse CI uploaded reports to temporary public storage on the first completed run; its config now writes local reports only. No production deployment, field performance data, screen-reader user study or external inbox delivery check was performed. Tool licenses and dependency status are recorded in [tooling and cost](tooling.md).
