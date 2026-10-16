# Cosmic Empire Productions — SEO & marketing guide

**Goal:** more discovery and hire inquiries for Thomas Harris / Cosmic Empire Productions  
**Audience:** game studios and film / video producers (equal priority)  
**Site:** https://cosmicempireproduction.com  
**Repo:** https://github.com/CosmicEmpirePro/cep-website  
**Last updated:** 2026-10-16

---

## 1. What you already have

You are not starting from zero. The live site already includes:

- [x] Clear service offering (composition, arrangement, orchestration, notation)
- [x] Meta descriptions on each page
- [x] Author metadata (`Thomas Harris`) and publication date
- [x] Open Graph + Twitter Card tags and a branded share image (`og-share.jpg`)
- [x] Portfolio with real audio (high-quality listening experience)
- [x] About page with studio story and composer credit
- [x] Contact path (form → email draft + direct mailto)
- [x] Custom domain with HTTPS
- [x] Mobile-friendly static layout
- [x] `robots.txt` + `sitemap.xml` (shipped 2026-10-16)
- [x] Canonical URLs on all public pages (shipped 2026-10-16)
- [x] Google-eligible PNG favicons + Apple touch icon (shipped 2026-10-16)
- [x] Organization + WebSite JSON-LD on the home page, including logo (shipped 2026-10-16)

**Implication:** the next wins are mostly *discoverability* (search + directories + social) and *proof* (credits / case studies), not rebuilding the site.

---

## 2. On-site SEO / data

Prioritized for a small static composer site. Higher items unlock the ones below.

### P0 — Technical foundation (do first)

| Item | Status | Notes |
|------|--------|-------|
| `robots.txt` | Done | Allows all public pages; points to sitemap |
| `sitemap.xml` | Done | Home, about, services, portfolio, contact |
| Canonical URLs | Done | Preferred form per page (home = `/`, others = `*.html`) |
| Google Search Console | Manual | Verify property, then submit `https://cosmicempireproduction.com/sitemap.xml` |
| Bing Webmaster Tools | Manual | Same sitemap URL after verification |
| Search result favicon | Done (awaiting crawl) | PNG 48 + 192 (Google does not use SVG for SERP icons). Request homepage indexing after deploy |

### P1 — Stronger “hire me” signals in page data

| Item | Status | Notes |
|------|--------|-------|
| Title tag patterns | Not started | Aim for intent + brand, e.g. `Game & Film Composer \| Cosmic Empire Productions` — keep under ~60 characters where possible |
| Meta descriptions with hire language | Not started | Include phrases clients actually search: *game composer*, *film score*, *orchestration*, *notation*, *for hire* / *available for* — without stuffing |
| JSON-LD structured data | Partial | Home has `Organization` + `WebSite` (+ founder Person). Still useful later: fuller `Person`, optional `Service` for the four offerings |
| FAQ section (Services or About) | Not started | Can win FAQ-style results; answers buyer questions |

### P2 — Content that ranks and converts

Tags alone do not book gigs. Content that matches client intent does.

| Item | Why it helps | Notes |
|------|----------------|-------|
| Credits / Selected projects page | Proof for producers and studios | Even 3–6 short entries: project type (game/film), role, year, 1–2 sentence outcome + link to listen |
| Portfolio copy upgrades | Context around cues | Pack/track blurbs: mood, use-case (“boss fight”, “open world explore”, “trailer”) — helps SEO and hiring decisions |
| Internal linking | Spreads authority and guides clients | From Home → Portfolio + Services; from Services → Contact; from Portfolio → Contact; About → Contact |
| Blog *only if* you will maintain it | Long-form can rank, but empty blogs hurt | Prefer a Credits page first; add articles later (e.g. “How we deliver stems for Unity”) |

### P3 — Measurement & polish

| Item | Why it helps | Notes |
|------|----------------|-------|
| Privacy-friendly analytics (Plausible) or GA4 | Know what pages get traffic and if Contact is used | Measure before major redesigns |
| Page speed | Ranking + first impression | You already use static hosting; watch large hero images and WAV loads (lazy-load images; audio on demand is fine) |
| Accessibility basics | Broader audience + quality signal | Alt text on images, keyboard-friendly player, readable contrast (mostly already in place) |

### On-site keyword themes (use naturally)

**Game:** game composer, adaptive music, soundtrack for indie game, RPG score, interactive music  
**Film / video:** film composer, original score, trailer music, orchestration for film, scoring to picture  
**Craft:** arrangement, orchestration, notation, scores and parts, stems delivery  

Use these in titles, headings, About/Services copy, and credit blurbs — not as keyword spam.

---

## 3. Off-site checklist (outside the repo)

Do these in parallel with (or right after) P0 technical SEO.

### Search & identity

- [ ] Google Search Console verified for `cosmicempireproduction.com`
- [ ] Bing Webmaster Tools verified
- [ ] After deploy: URL Inspection → request indexing for homepage (speeds favicon / sitemap pickup)
- [ ] Consistent public name: **Thomas Harris** + **Cosmic Empire Productions** everywhere
- [ ] Same bio short paragraph on site, LinkedIn, directories (one source of truth)

### Social (equal game + film)

- [ ] LinkedIn personal profile (composer) + optional company page — Featured link = website
- [ ] Instagram (or equivalent) link in bio → website
- [ ] YouTube channel for cues / process shorts (Shorts help discovery)
- [ ] Optional TikTok for short cue hooks if you will post consistently
- [ ] Pin one “best of” portfolio link in profiles

### Listening platforms

- [ ] SoundCloud, Bandcamp, and/or YouTube uploads of portfolio cues
- [ ] Each upload description: 1-line pitch + link to https://cosmicempireproduction.com
- [ ] Keep masters private for clients; public pages can stay full quality if that is your choice

### Directories & industry presence

**Film / video leaning**

- [ ] ProductionHub / Mandy / Stage 32 (as relevant to your region)
- [ ] IMDb credit page when you have eligible credits

**Game leaning**

- [ ] Marmoset (composer marketplace / portfolio)
- [ ] itch.io / Discord communities / Reddit (r/gamedev, r/INAT) — share value, not spam
- [ ] Game audio Discords and job boards (follow rules; prefer relationship over blasts)

**Cross-cutting**

- [ ] One-sheet / press kit PDF: photo, bio, selected credits, genres, contact, site URL
- [ ] Store press kit in Google Drive/Dropbox; link from About or Contact later if desired

### Outreach (highest hire ROI for composers)

- [ ] Build a short list: 20 indie games in production + 20 video/film producers or editors
- [ ] Personalized email: who you are, 1–2 specific cue links, one sentence fit for *their* project, site + Contact
- [ ] Follow up once after ~7–10 days
- [ ] Track responses in a simple spreadsheet (name, project, date, status)

### Collaboration & proof

- [ ] Collect 2–3 more testimonials (game *and* film if possible)
- [ ] Ask finished clients for credit wording they approve publicly
- [ ] Cross-link when collaborators mention you

---

## 4. 30 / 60 / 90 day order

### Days 1–30 — Foundation

1. ~~Add `robots.txt` + `sitemap.xml`~~ **Done**
2. Verify Search Console + Bing; submit sitemap *(manual — still open)*
3. Align LinkedIn + one listening platform with site link and bio
4. Draft a one-page press kit (even rough)
5. List 10 target contacts (5 game, 5 film/video)

### Days 31–60 — Proof + distribution

1. Publish a Credits / Selected work section or page
2. Improve Portfolio/Services copy with hire-intent language
3. Expand JSON-LD (`Person` detail + optional `Service`) — Organization/WebSite already on home
4. Post weekly cue clips (YouTube Shorts / Instagram) linking to site
5. Send first 10 personalized outreach emails

### Days 61–90 — Compound

1. Review Search Console queries and top pages
2. Add FAQ based on real questions from outreach
3. Expand directories (Marmoset + one film directory)
4. Second outreach wave (next 10 contacts)
5. Add analytics if not already; note Contact clicks / referrals

Repeat the 60–90 pattern quarterly: content proof → distribute → outreach → measure.

---

## 5. What not to waste time on

- Buying backlinks or “guaranteed #1 SEO” services  
- Keyword stuffing titles/descriptions until they sound robotic  
- Building a huge blog you will not update  
- Obsessing over hiding WAV downloads (if the browser can play it, it can be saved)  
- Redesigning the whole site before measuring traffic and inquiries  
- Posting the same “hire me” blast in every Discord/Reddit without context  
- Chasing every social network; better to be consistent on 1–2  

---

## Quick reference — site URLs to promote

| Page | URL |
|------|-----|
| Home | https://cosmicempireproduction.com/ |
| About | https://cosmicempireproduction.com/about.html |
| Services | https://cosmicempireproduction.com/services.html |
| Portfolio | https://cosmicempireproduction.com/portfolio.html |
| Contact | https://cosmicempireproduction.com/contact.html |
| Sitemap | https://cosmicempireproduction.com/sitemap.xml |
| Favicon (Google) | https://cosmicempireproduction.com/assets/images/favicon-192.png |

**Contact email:** cosmicempireproductions@gmail.com

---

## Note on Google Search “image”

The small icon beside your URL in Google results is the **favicon**, not the Open Graph share image.  
`og-share.jpg` controls previews when someone pastes a link on social apps.  
Google can take days to weeks to replace the default globe after a favicon change — use Search Console → URL Inspection → Request indexing on the homepage to nudge it.
