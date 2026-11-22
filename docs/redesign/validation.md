# Redesign validation

The homepage leads directly to the first lesson. The library supports topic search and skill-level filtering. Lesson pages expose materials, bookmarks, completion and a keyboard-operable quiz. Hosts can compare the three workshop packages or email the team from the introduction. The community calendar labels dates by year. Site navigation, articles, resource indexes and information pages share a local design system.

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

## Validation

- Production build and repository smoke tests passed on local Hugo 0.170.1. Pages CI pins 0.157.0. The hosted workflow was not run.
- The generated-site crawl verified all 123 HTML files, internal links, fragment targets and referenced local assets in the crawl. Every baseline HTML route exists.
- Playwright completed keyboard skip navigation, menu open and Escape, workshop and volunteer mailto handoffs, supplies disclosure, persistent bookmarks and completion, quiz submission and retake, search empty state and recovery, legacy level query, dark-mode persistence and mobile navigation without JavaScript. No uncaught page errors in those journeys. No email was sent.
- Each version was scanned with axe-core on 12 routes at 1440 × 900, 820 × 1024 and 390 × 844. Scans reporting a WCAG A/AA violation fell from 36 to 0 of 36. Page-level horizontal overflow fell from 12 to 0 of 36. Automated checks do not establish full accessibility conformance.
- The rendered review led to replacing a sideways About photograph, prioritizing the featured lesson photograph, collapsing lengthy mobile outlines, simplifying package markup, and giving the scrollable equipment table keyboard focus and a name.

## Lighthouse

One mobile simulation per version on the same machine against locally served production builds. These are lab measurements. The baseline retained its external script request. Local hosting can affect timing and how the old site handles absolute production links.

| Metric | Before | After |
|---|---:|---:|
| Performance | 58 | 95 |
| Accessibility | Unavailable | 100 |
| Best-Practices | 100 | 100 |
| Seo | 100 | 100 |
| Largest contentful paint | 9.44 s | 1.81 s |
| Transferred bytes | 2,547,541 | 340,034 |
| Cumulative layout shift | 0.000 | 0.120 |

The bundled Lighthouse accessibility engine could not parse a baseline OKLCH color, so the baseline accessibility score is unavailable. No production deployment, field performance data, screen-reader user study or external inbox delivery verification was performed. The existing toolchain advisories are recorded in [tooling and cost](tooling.md).
