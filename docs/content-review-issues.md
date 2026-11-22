# Release content review

Status as of 2026-11-22. This repository-local record accompanies PR #27 and the remote launch roadmap in issue #26.

## Resolved for the current public build

- The Community page records the three 2026 events; the site owner confirmed that all three entries are events the Fellowship attended.
- Invented volunteer profiles, testimonials, event statistics, author biographies, sponsor claims and participant quotes are no longer in the public build. The old journal articles remain in source as drafts.
- The old project case studies and the LED-flasher and audio-amplifier builds are drafts. The LED-flasher schematic had an incorrect timer circuit and timing explanation; the audio build also had an incomplete schematic. Their links are removed from the published catalog.
- Unverified workshop capacities, packages, service regions, equipment counts, certifications, background-check promises, donation tiers and response-time promises were removed from public pages.
- Direct email CTAs are removed until the owner confirms which inboxes are monitored. The Contact page explains the status and links to published site resources.
- The public through-hole lesson no longer treats a shiny finish, fixed lead-trim length or fixed cool-down time as universal criteria. It directs learners to instructor-approved inspection and repair; its basic joint check references NASA's hand-soldering handbook.
- The listed GitHub and Twitter profile URLs returned 404 during a read-only check. Those profile links and account metadata are removed from the public site.
- The project index no longer contains unrelated web-development boilerplate. The Get Involved and workshop information pages now state what is being confirmed.
- Equipment budget estimates and price claims were removed; the lab-planning guide now directs readers to current manufacturer or authorized-supplier information.
- Public lessons now defer station settings, lead handling, lead trimming and cool-down timing to an instructor and equipment/project instructions. The basic visual check no longer equates a shiny finish with a sound joint; it cites NASA hand-soldering guidance. The tools guide defers flux cleanup to its maker and does not recommend a general-purpose fan. The standalone safety guide remains a draft pending instructor review.

## Owner or specialist review required before launch

- Confirm the monitored public inboxes. Until then, all public mailto links remain absent by design.
- Confirm photo ownership/permission and event source records for the 2026 dates and locations. The owner-specified first-lesson comparison needs three matching close-up photos of real joints; the existing photos do not show diagnostic joint details, so new bench photos and instructor-reviewed captions are still required.
- The standalone soldering safety guide is kept in draft until a qualified instructor reviews its ventilation, PPE, fire and first-aid claims. Have an instructor review the published technical lessons and approve the visual joint criteria and comparison figure, including lead handling, station settings, component values, procedures and venue-specific extraction. A model review is not expert sign-off.
- Confirm organization location and service availability before restoring geographic claims or accepting workshop requests.
- Review the draft journal and project content before any item is published; restore only verified names, citations, dates, partners, numbers and technical instructions.
- Confirm any public social account URLs before restoring profile links.

## Release tracking

- Local branch: `redesign/workshop-field-guide`.
- Draft PR: [#27 — Redesign as a soldering field guide](https://github.com/carlfugate/fellowshipoftheflux/pull/27). CI passed on commit `a7dfb37` with Hugo 0.157.0 and Ubuntu 24.04. A later local content edit passed the production build, link check and responsive/a11y journeys; CI will rerun when it is pushed.
- GitHub issue updates and branch push are pending owner-account authentication. The active `gh` account cannot comment on this repository, and switching to the stored owner login failed because the macOS Keychain rejected the token change. Do not merge or deploy until owner authentication and the content/instructor checks above are complete.
