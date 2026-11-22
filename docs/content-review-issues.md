# Release content review

Status as of 2026-11-22. This repository-local record accompanies PR #27 and the remote launch roadmap in issue #26.

## Resolved for the current public build

- The Community page records the three 2026 events; the site owner confirmed that all three entries are events the Fellowship attended.
- Invented volunteer profiles, testimonials, event statistics, author biographies, sponsor claims and participant quotes are no longer in the public build. The old journal articles remain in source as drafts.
- The old project case studies and the LED-flasher and audio-amplifier builds are drafts. The LED-flasher schematic had an incorrect timer circuit and timing explanation; the audio build also had an incomplete schematic. Their links are removed from the published catalog.
- Unverified workshop capacities, packages, service regions, equipment counts, certifications, background-check promises, donation tiers and response-time promises were removed from public pages.
- Direct email CTAs are removed until the owner confirms which inboxes are monitored. The Contact page explains the status and links to published site resources.
- The through-hole and SMD lessons now direct joint acceptance and rework to the instructor and project criteria. They do not use surface gloss alone as a pass/fail rule or give general-purpose cleaning or jumper-repair instructions. The through-hole interactive quiz now reinforces project-specific station settings and symptom-based visual checks rather than fixed temperature or shine rules.
- The listed GitHub and Twitter profile URLs returned 404 during a read-only check. Those profile links and account metadata are removed from the public site.
- The project index no longer contains unrelated web-development boilerplate. The Get Involved and workshop information pages now state what is being confirmed.
- Equipment budget estimates and price claims were removed; the lab-planning guide now directs readers to current manufacturer or authorized-supplier information.
- The through-hole and SMD lessons defer station settings, material-specific handling, acceptance criteria and rework decisions to the instructor and equipment/project instructions. Food and drinks stay out of work areas and handwashing follows soldering regardless of solder alloy. The tools guide defers flux cleanup to its maker and does not recommend a general-purpose fan. The standalone safety guide remains a draft pending instructor review.

## Owner or specialist review required before launch

- Confirm the monitored public inboxes. Until then, all public mailto links remain absent by design.
- Confirm photo ownership/permission and event source records for the 2026 dates and locations. The owner-specified first-lesson comparison needs three matching close-up photos of real joints; the existing photos do not show diagnostic joint details, so new bench photos and instructor-reviewed captions are still required.
- The standalone soldering safety guide is kept in draft until a qualified instructor reviews its ventilation, PPE, fire and first-aid claims. Have an instructor review both published technical lessons and approve the visual joint criteria and comparison figure, including lead handling, station settings, component values, procedures and venue-specific extraction. A model review is not expert sign-off.
- Confirm organization location and service availability before restoring geographic claims or accepting workshop requests.
- Review the draft journal and project content before any item is published; restore only verified names, citations, dates, partners, numbers and technical instructions.
- Confirm any public social account URLs before restoring profile links.

## Release tracking

- Local branch: `redesign/workshop-field-guide`.
- Draft PR: [#27 — Redesign as a soldering field guide](https://github.com/carlfugate/fellowshipoftheflux/pull/27). The updated site source is pushed to `redesign/workshop-field-guide`. Actions run [45072851464](https://github.com/carlfugate/fellowshipoftheflux/actions/runs/45072851464) passed validation on site source commit `eef75a6`; subsequent run [45073178418](https://github.com/carlfugate/fellowshipoftheflux/actions/runs/45073178418) passed on the release-tracking update at `5f2451e`. Both used Hugo 0.157.0 and Ubuntu 24.04 and passed production build, route/template validation, npm audit, smoke tests and Playwright critical journeys. Separate build, test and deploy jobs are skipped for PRs.
- Local checks on the same site source passed `npm test`, `npm run check:links` (50 generated HTML files) and `npm run test:journeys` (48 route/view checks, including both tutorials and both indexes) on 2026-11-22. GitHub issue #26 is the roadmap; updates were also logged to #13 and #16. PR #27 remains a draft. Do not merge or deploy until the owner and instructor checks above are complete.
