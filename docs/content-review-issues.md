# Release content review

Status as of 2026-11-22. This repository-local record accompanies PR #27 and the remote launch roadmap in issue #26.

## Resolved for the current public build

- The Community page records the three 2026 events; the site owner confirmed that all three entries are events the Fellowship attended.
- Invented volunteer profiles, testimonials, event statistics, author biographies, sponsor claims and participant quotes are no longer in the public build. The old journal articles remain in source as drafts.
- The old project case studies and the LED-flasher and audio-amplifier builds are drafts. The LED-flasher schematic had an incorrect timer circuit and timing explanation; the audio build also had an incomplete schematic. Their links are removed from the published catalog.
- Unverified workshop capacities, packages, service regions, equipment counts, certifications, background-check promises, donation tiers and response-time promises were removed from public pages.
- The owner confirmed `carl@fellowshipoftheflux.com` as the public contact inbox. Contact, volunteer, workshop and project inquiry links use that address; no other public email address is used.
- The through-hole and SMD lessons now direct joint acceptance and rework to the instructor and project criteria. They do not use surface gloss alone as a pass/fail rule or give general-purpose cleaning or jumper-repair instructions. The through-hole interactive quiz now reinforces project-specific station settings and symptom-based visual checks rather than fixed temperature or shine rules.
- The listed GitHub and Twitter profile URLs returned 404 during a read-only check. Those profile links and account metadata are removed from the public site.
- The project index no longer contains unrelated web-development boilerplate. The Get Involved and workshop pages now offer the confirmed contact route while keeping role availability, workshop format and travel details case-specific.
- Equipment budget estimates and price claims were removed; the lab-planning guide now directs readers to current manufacturer or authorized-supplier information.
- The through-hole and SMD lessons defer station settings, material-specific handling, acceptance criteria and rework decisions to the instructor and equipment/project instructions. Food and drinks stay out of work areas and handwashing follows soldering regardless of solder alloy. The tools guide defers flux cleanup to its maker and does not recommend a general-purpose fan. The standalone safety guide remains a draft pending instructor review.

## Owner or specialist review required before launch

- The owner confirmed publication rights for the current photo set and confirmed source records for the three 2026 event entries. The first-lesson comparison still needs three matching close-up photos of real joints; existing photos do not show diagnostic joint details, so new bench photos and instructor-reviewed captions are required.
- The standalone soldering safety guide is kept in draft until a qualified instructor reviews its ventilation, PPE, fire and first-aid claims. Have an instructor review both published technical lessons and approve the visual joint criteria and comparison figure, including lead handling, station settings, component values, procedures and venue-specific extraction. A model review is not expert sign-off.
- Keep organization location and service availability claims unpublished until verified; current workshop information stays case-specific.
- Review the draft journal and project content before any item is published; restore only verified names, citations, dates, partners, numbers and technical instructions.
- Confirm any public social account URLs before restoring profile links.

## Release tracking

- Local branch: `redesign/workshop-field-guide`.
- Draft PR: [#27 — Redesign as a soldering field guide](https://github.com/carlfugate/fellowshipoftheflux/pull/27). Latest pushed commit: `fb5cd67`.
- Actions run [45080946628](https://github.com/carlfugate/fellowshipoftheflux/actions/runs/45080946628) passed on the latest commit. The validate job used Hugo 0.157.0 and Ubuntu 24.04 and passed production build, route/template validation, npm audit, smoke tests and critical Playwright journeys. The journey suite verified the confirmed inbox and direct-contact paths across 48 route/view checks. Separate build, test and deploy jobs are skipped for PRs.
- Local `npm test` and `npm run check:links` passed after the contact update; the link checker verified all 50 generated HTML files. No local browser launch was used for this update.
- Owner waived manual screen-reader review on 2026-11-22. Automated axe-core and keyboard journey checks remain documented; no manual screen-reader result is claimed.
- Owner confirmed current photo publication rights and event source records, and approved merge/deploy after the remaining gates clear. PR #27 remains a draft until technical review and the requested original joint photos are complete; no production deployment occurred.
