# Redesign validation

The homepage leads directly to the first lesson. The library supports topic search and skill-level filtering. Lesson pages expose materials, bookmarks and completion; the through-hole lesson includes a keyboard-operable quiz. Workshop details and volunteer opportunities explain which facts and contact routes are still being confirmed. The community page records the three confirmed 2026 events. Site navigation, resource indexes and information pages share a local design system.

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
| Through-hole lesson · desktop | — | [After](after-lesson-desktop.jpg) |
| Through-hole lesson · mobile | — | [After](after-lesson-mobile.jpg) |
| SMD lesson · desktop | — | [After](after-smd-lesson-desktop.jpg) |
| SMD lesson · mobile | — | [After](after-smd-lesson-mobile.jpg) |

## Validation

- On 2026-11-22, after the latest lesson and interactive-quiz edits, `npm test` passed, `npm run check:links` built 53 pages and verified all 50 generated HTML files, and `npm run test:journeys` passed. Local Hugo was 0.170.1; it reported existing deprecated config keys. Actions run [45072851464](https://github.com/carlfugate/fellowshipoftheflux/actions/runs/45072851464) then passed its validate job on pushed commit `eef75a6`, using deployment-pinned Hugo 0.157.0 and Ubuntu 24.04. It covered production build, route/template validation, npm audit, smoke checks and Playwright critical journeys; separate build, test and deploy jobs are skipped for pull requests.
- On 2026-11-22, after pushed commit `e90b980`, `npm test` passed, `npm run check:links` verified all 50 generated HTML files, and `npm run test:journeys -- --capture-lessons` passed all 48 route/view checks and generated the four lesson screenshots above against the local production output. A repeat after rebuilding local production output could not start Firefox (`SIGABRT`), so the current journey evidence is the successful pre-rebuild run; CI remains the authoritative fresh-build check.
- The production link checker verified all generated HTML files, internal links, fragment targets and referenced local assets. Unsupported posts, projects and the unreviewed safety guide remain excluded as drafts.
- The link checker runs offline and does not validate external URLs. Safety references were read during source review, but this release pass did not run a systematic live-link check against every external destination.
- Playwright with a separate headless Firefox process completed skip navigation, mobile-menu keyboard behavior and resize closing, supplies disclosure, persistent bookmarks and completion, quiz submission/retake/focus/backdrop handling, quiz prompt and correct-answer checks, a 3/3 quiz score, event history, catalog search and filters, theme persistence, contact and workshop placeholder copy, and no-JavaScript navigation. It confirmed that the unreviewed safety guide and unsupported projects return 404, and there are no direct email CTAs or horizontal overflow across 16 routes at three viewports (48 route/view checks). No uncaught page errors. CLS was measured on the homepage at mobile width only.
- axe-core reported zero WCAG A/AA violations across 16 routes at 1440 × 900, 820 × 1024 and 390 × 844 (48 route/view checks), including both published soldering lessons and the tutorial and guide indexes. The earlier baseline recorded 36 violating scans across its 36 checks. Automated checks do not establish full accessibility conformance or replace manual screen-reader review.
- HTML/CSS validation did not run because the machine has no Java runtime for vnu-jar.
- Existing before/after screenshots document the broader Home, Learn, Host and Community redesign, and the current lesson screenshots document both published lessons on desktop and mobile. Six local macOS crash reports identify Playwright's cached Nightly process (`org.mozilla.nightly`) aborting with `SIGABRT` during `_RegisterApplication` / `TransformProcessType`, before page-level testing. The latest report names Node as the parent process. A similar app-registration signature is documented for sandbox-launched Chrome and LibreOffice in [openai/codex issue #30043](https://github.com/openai/codex/issues/30043); that is supporting context, not proof of a Firefox-specific root cause. No further local browser launches will be used for this release pass; GitHub Actions passed the fresh-build journey suite on the current commit. No visible browser window was closed or changed.
- The rendered review led to replacing a sideways About photograph, prioritizing the featured lesson photograph, simplifying package markup, and giving the scrollable equipment table keyboard focus and a name. The About gallery was reduced from eight to two images; its Lighthouse transfer fell from about 2.24 MB to 390 KB. The lesson screenshots show that the expanded mobile contents outline still adds substantial length before the lesson begins; collapsing it on small screens remains a potential refinement.
- Read-only Agy reviews identified unverified soldering temperatures, incomplete lead-hygiene reminders, a misleading generic-fan ventilation suggestion, and overbroad claims about public lesson content. The through-hole and SMD lesson copy now defers project acceptance and repair to instructors, removes several unverified numeric or material-specific directions, and treats surface gloss as an unreliable stand-alone check. Basic food-area and handwashing reminders apply across the published soldering lessons and tools guide. Gemini 4 Neon High review found stale interactive quiz answers, test gaps and an unsafe sequence for fine-pitch IC alignment; the quiz, route coverage and sequence were updated. Its reconciliation found no remaining high-severity findings; the last medium sequencing finding was corrected, but technical content still requires qualified instructor review. The owner-specified first-lesson figure is not yet implemented: existing photos lack diagnostic joint close-ups, and new matched bench photos plus instructor-reviewed captions are required. The standalone safety guide remains draft; qualified instructor review is still required before launch.

## Lighthouse

The redesign was tested as a local production build with Lighthouse 13.6.0 mobile emulation, three runs on each of ten routes. Lighthouse executed with Chrome outside the workspace sandbox after its launch failed inside the sandbox. These are lab measurements, not field data. The scores below predate the latest lesson copy, quiz and test-coverage updates; CSS and image assets did not change, but the latest text and interactive copy can affect route weight or rendering. Treat these measurements as an earlier baseline, not as post-update results.

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
