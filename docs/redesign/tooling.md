# Tools, licenses and cost

No paid subscription, paid API, or marketplace component was used. AI inference uses the user's existing Codex allowance and is separate from third-party tooling costs.

| Tool | Purpose | License / terms | Added cost | Restrictions and notes |
|---|---|---|---:|---|
| Hugo Extended, Tailbliss | Static site build and image processing | Apache-2.0; theme LICENSE | $0 | Hugo version used locally: 0.170.1. CI remains pinned to 0.157.0. |
| Node.js, npm | Existing JavaScript tooling | MIT; Artistic-2.0 | $0 | Dependency installs used `--ignore-scripts`; Node engine is now >=22.19 for LHCI. |
| PostCSS, Tailwind CSS, Autoprefixer, cssnano | Existing CSS pipeline | MIT | $0 | No component marketplace or remote build service. |
| Playwright 1.60.0 | Firefox keyboard journeys, responsive checks, screenshots | Apache-2.0 | $0 | Local package and official browser download. No subscription or usage quota. Browser launch required execution outside the workspace sandbox. |
| Firefox for Playwright | Browser engine for journeys | MPL-2.0 and bundled third-party licenses | $0 | Local only; no browser binary is shipped with the site. |
| axe-core 4.14.1 | WCAG A/AA automated checks | MPL-2.0 | $0 | Local package; no hosted service or quota. |
| Lighthouse CI 0.16.1 and Lighthouse | Lab performance, accessibility, best-practice and SEO audits | Apache-2.0 | $0 | Local Chrome. LHCI initially uploaded reports to its configured temporary public storage; configuration is now filesystem-only. |
| vnu-jar 26.11.20 | HTML and CSS validation | MIT | $0 | Cannot run on this machine without Java. |
| Repository link checker | Local HTML link, fragment and asset crawl | Project-owned, no new dependency | $0 | Checks generated files offline; no external link requests. |
| UI UX Pro Max | Design-system exploration | MIT, upstream repository | $0 | Source guidance reviewed locally; no installed service. |
| Impeccable | Critique and refinement rubric | Apache-2.0, upstream repository | $0 | Written guidance used. Did not run its download/agent launcher or privileged live-editing. |
| Agy with Claude Sonnet 5.5 High | Two independent read-only content-risk reviews | No separate tool license surfaced in the connected environment; model service terms apply | No separate purchase; 190,006 model tokens across both reviews from the user's existing provider quota | Reviewers were asked not to edit files, access GitHub, or deploy. Model quota limits apply; no extra agent or model subscription was enabled. |
| Connected web research | Checked current soldering safety guidance from EPA, RPI EHS and equipment documentation | Service terms apply; no external repository dependency | $0 additional charge | Read-only research through the existing connected service; no separate subscription enabled. |
| Git, GitHub CLI, curl | Repository, CI and upstream metadata inspection; release issue/PR tracking | GPL-2.0, MIT, curl license | $0 | GitHub API rate limits apply. An already-authenticated owner account is available via per-command token; no credentials were written into the repository. |

`npm audit --audit-level=high` reports zero vulnerabilities after removing unused/abandoned packages, updating the PostCSS stack and Lighthouse CI, and overriding the vulnerable transitive selector parser. No new frontend framework or component library was introduced. 21st.dev was not used.

Sources: [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [Impeccable](https://github.com/pbakaus/impeccable), [Hugo](https://github.com/gohugoio/hugo), [Playwright](https://github.com/microsoft/playwright), [axe-core](https://github.com/dequelabs/axe-core), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci), [validator.nu](https://github.com/validator/validator).
