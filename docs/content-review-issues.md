# Content Accuracy Review — Issues to Resolve

Every item below contains content that was AI-generated without verified facts. Each needs your input to confirm, correct, or remove.

---

## 🔴 CRITICAL — Fabricated People, Quotes & Events

### Issue 1: Fake volunteer profiles on Community page
**File:** `content/community.md`
- "Sarah Chen" — Lead Instructor, Electronics Engineer, 5 years
- "Marcus Rodriguez" — Equipment Manager, Retired Technician, 3 years
- **Action needed:** Replace with real volunteers (with permission) or remove the section entirely

### Issue 2: Fake testimonials on Services page
**File:** `content/services.md`
- "The Fellowship of the Flux team made our BSides KC soldering village a huge success..." — BSides KC Organizer
- "Our students were completely engaged..." — STEM Program Director
- **Action needed:** Get real quotes or remove

### Issue 3: Fake testimonial on Homepage
**File:** `layouts/index.html`
- "I went from being intimidated by electronics to building my own LED badge in just 2 hours!" — Sarah M., First-Time Maker
- **Action needed:** Real quote or remove

### Issue 4: Fake author names on blog posts
**Files:** `content/posts/`
- "Marcus Rodriguez" on BSides KC recap
- "Dr. Jennifer Walsh" on education impact post
- "Sarah Chen" on soldering techniques post
- "Development Team" on building platforms post
- **Action needed:** Attribute to real authors or use "Fellowship Team"

### Issue 5: Fabricated BSides KC 2023 stats on Community page
**File:** `content/community.md`
- "150+ Participants Taught"
- "25 Volunteer Instructors"
- "Zero Safety Incidents"
- **Action needed:** Verify actual numbers or remove

---

## 🟡 IMPORTANT — Unverified Numbers & Claims

### Issue 6: Impact statistics used across multiple pages
**Files:** `content/about.md`, `content/community.md`, `layouts/index.html`
- 500+ People Taught
- 25+ Events Supported
- 30+ Volunteers Trained
- 20+ Partner Organizations
- 100+ Active Volunteers (homepage still says this)
- **Action needed:** What are the real numbers? They don't need to be exact — ballpark is fine

### Issue 7: BSides KC 2024 recap post claims "180+ participants"
**File:** `content/posts/bsides-kc-2024-recap.md`
- Title says "Record-Breaking Soldering Village"
- Description claims "180+ participants"
- **Action needed:** Verify. Did this event happen? What were actual numbers?

### Issue 8: Organization founded date
**File:** `config.yaml`
- `founded: "2020"`
- **Action needed:** Is this correct?

### Issue 9: Equipment specifics
**Files:** `content/about.md`, `content/services.md`, `content/lab-setup.md`
- "20+ Hakko FX-888 stations" — Is this the right model? Right quantity?
- "Custom 3D-printed organizers" — Do these exist?
- **Action needed:** Confirm equipment details

### Issue 10: Lab setup budget numbers
**File:** `content/lab-setup.md`
- 10x Hakko FX-888D at $1,100
- Tools & accessories at $600
- Total $2,600 for 10-station lab
- Individual tool prices (Xuron 410 at $8-12, etc.)
- **Action needed:** Are these prices/recommendations accurate to your experience?

---

## 🟠 MODERATE — Unverified Programs & Offerings

### Issue 11: Workshop packages on Services page
**File:** `content/services.md`
- "Basic" (2-3 hours, up to 20 participants)
- "Advanced" (3-4 hours, SMD, up to 15 participants)
- "Custom" (flexible)
- **Action needed:** Do you actually offer these tiers? What do you really offer?

### Issue 12: Geographic coverage claims
**File:** `content/services.md`
- Primary: Kansas City metro
- Extended: Missouri, Kansas, Iowa, Nebraska, Oklahoma
- Special arrangements for outside area
- **Action needed:** Where do you actually serve?

### Issue 13: Upcoming events are stale/fake
**File:** `content/community.md`
- "MARCH 15-16, 2024" BSides Kansas City
- "JUNE 22-23, 2024" MakerFaire KC
- Both dates are in the past and may not be accurate
- **Action needed:** Replace with actual upcoming events or remove section

### Issue 14: Volunteer training program details
**File:** `content/get-involved.md`
- "4-6 hours initial certification"
- "Monthly training sessions"
- "Background check" process
- "Safety certification"
- **Action needed:** Is there a formal training program? What does it actually look like?

### Issue 15: Donation tiers
**File:** `content/get-involved.md`
- $25 supplies for one participant
- $50 complete tool set
- $500 complete workstation
- $1,000 sponsor full workshop
- **Action needed:** Are you set up to accept donations? Are these amounts accurate?

### Issue 16: Email addresses — do they all work?
**Files:** Multiple
- info@fellowshipoftheflux.com
- workshops@fellowshipoftheflux.com
- volunteers@fellowshipoftheflux.com
- services@fellowshipoftheflux.com
- community@fellowshipoftheflux.com
- instruction@fellowshipoftheflux.com
- events@fellowshipoftheflux.com
- equipment@fellowshipoftheflux.com
- content@fellowshipoftheflux.com
- outreach@fellowshipoftheflux.com
- partnerships@fellowshipoftheflux.com
- education@fellowshipoftheflux.com
- support@fellowshipoftheflux.com
- **Action needed:** Which of these actually exist? Remove the rest.

---

## 🔵 LOWER PRIORITY — Content That Needs Rewriting

### Issue 17: Blog posts are largely AI-generated content
**Files:** All posts in `content/posts/`
- `bsides-kc-2024-recap.md` — Detailed event recap that may not match reality
- `soldering-education-impact.md` — Cites "research" and "studies" without sources, attributed to "Dr. Jennifer Walsh"
- `tailwind-css-tips.md` — Soldering techniques post (filename still says tailwind)
- `building-with-hugo.md` — Education platform post
- `welcome-to-fellowship.md` — Intro post
- **Action needed:** Rewrite with real stories, or mark as draft until you can

### Issue 18: Learn section tutorials/guides/projects
**Files:** `content/learn/tutorials/`, `content/learn/guides/`, `content/learn/projects/`
- Through-hole soldering tutorial
- SMD soldering tutorial
- Safety guide
- Tools guide
- LED flasher project
- Audio amplifier project
- **Action needed:** Are these technically accurate? Review for correctness. The technical content may be mostly fine but should be verified by someone who teaches this.

### Issue 19: Projects section still has web dev boilerplate
**File:** `content/projects/_index.md`
- "contributions to the open-source community. Each project demonstrates different aspects of modern web development"
- **Action needed:** Rewrite to match org focus

### Issue 20: Discord server link is a dead `#` link
**File:** `content/community.md`
- "Join Discord →" links to `#`
- **Action needed:** Add real link or remove

### Issue 21: Social media links may not exist
**File:** `config.yaml`
- GitHub: `fellowshipoftheflux`
- Twitter: `fluxfellowship`
- **Action needed:** Do these accounts exist?

---

## How to Work Through This

I'd suggest going in order:
1. **Red items first** — fake people/quotes are the most damaging to credibility
2. **Yellow items** — get the real numbers in place
3. **Orange items** — confirm what you actually offer
4. **Blue items** — clean up as time allows

For each issue, just tell me:
- **Correct info** to replace it with, OR
- **Remove it** if it's not real, OR
- **Mark as draft** if you want to come back to it later

We can batch the updates once you've gone through the list.
