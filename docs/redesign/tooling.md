# Tools, licenses and cost

No new subscription, API purchase, or marketplace component was introduced. AI inference used existing provider allowances; model inference limits are separate from third-party tooling costs.

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
| Agy configured-default model (model not reported) | One independent read-only review of the through-hole inspection edits | No separate tool license surfaced in the connected environment; model service terms apply | No separate purchase; 56,482 reported input and output tokens from the user's existing provider allowance | The run did not report a model identifier, so it is not attributed to Gemini or another provider. Reviewer was asked not to edit files, access GitHub, or deploy. |
| Agy with Gemini 4 Neon High | Read-only review of the soldering lessons, interactive quiz and test/documentation coverage | No separate tool license surfaced in the connected environment; model service terms apply | No separate purchase; 95,492 reported input and output tokens from the user's existing provider allowance | Model was explicitly selected and reported by Agy; quota limits apply. Reviewer was asked not to edit files, access GitHub, or deploy. |
| Connected web research | Checked soldering safety guidance from EPA, RPI EHS, NASA and equipment documentation | The connected tool did not expose a separate license; account service terms apply | No additional charge surfaced | Read-only research through the existing account; not a repository dependency. |
| Git, GitHub CLI, curl | Repository, CI and upstream metadata inspection; attempted release issue tracking | GPL-2.0, MIT, curl license | $0 | GitHub API rate limits apply. Issue comments were rejected because the active account lacks access; switching to the stored owner login failed at macOS Keychain. No issue comments or remote branch updates were made in this session. |

`npm audit --audit-level=high` reports zero vulnerabilities after removing unused/abandoned packages, updating the PostCSS stack and Lighthouse CI, and overriding the vulnerable transitive selector parser. No new frontend framework or component library was introduced. 21st.dev was not used.

Sources: [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [Impeccable](https://github.com/pbakaus/impeccable), [Hugo](https://github.com/gohugoio/hugo), [Playwright](https://github.com/microsoft/playwright), [axe-core](https://github.com/dequelabs/axe-core), [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci), [validator.nu](https://github.com/validator/validator).
