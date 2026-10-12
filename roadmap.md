# Cosmic Empire Productions — Launch Roadmap

Goal: get the current website live at **https://CosmicEmpireProduction.com**, with HTTPS, working pages, portfolio audio, and contact.

This site is static (HTML/CSS/JS + WAV files). You need two things:

1. **Domain** — `CosmicEmpireProduction.com` (GoDaddy)  
2. **Hosting** — a place that serves the website files (free options work)

Your GitHub backup repo is ready:  
`https://github.com/CosmicEmpirePro/cep-website`

---

## Launch path (do in this order)

| Step | Task | Status target |
|------|------|----------------|
| 1 | Pick a free static host | Host account created |
| 2 | Deploy the GitHub repo | Temporary HTTPS URL works |
| 3 | Connect your GoDaddy domain | Domain opens the site |
| 4 | Turn on HTTPS / confirm SSL | Padlock in browser |
| 5 | Full site QA | Ready to share |
| 6 | Soft launch | Domain shared with clients |

---

## Step 1 — Choose free hosting (required)

GoDaddy domain registration alone does **not** host website files. Point the domain at a static host.

**Recommended for this project:** Cloudflare Pages or Netlify  
**Also fine:** GitHub Pages

Why these:

- Free HTTPS
- Connect directly to your GitHub repo
- Auto-update when you push changes
- Custom domain support (your GoDaddy domain)

Pick one and stick with it for launch.

---

## Step 2 — Deploy the site from GitHub

### Cloudflare Pages / Netlify / Vercel

1. Create an account (use the same GitHub login if possible).
2. Choose **Import project from GitHub**.
3. Select `CosmicEmpirePro/cep-website`.
4. Build settings:
   - **Build command:** none / leave blank  
   - **Publish directory:** `/` (repository root)  
   - Framework preset: None / static
5. Deploy.
6. Open the temporary URL the host gives you (example: `something.netlify.app` or `something.pages.dev`).
7. Confirm Home loads before touching DNS.

### GitHub Pages alternative

1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Save and wait a few minutes
5. Open the GitHub Pages URL and confirm Home loads

At the end of Step 2 you should have a working temporary site URL.

---

## Step 3 — Connect your GoDaddy domain

Do this only after the temporary host URL works.

### 3A — Add the domain in your host dashboard

In Cloudflare Pages / Netlify / Vercel / GitHub Pages:

1. Open **Custom domains** (or Domain management).
2. Add both:
   - `CosmicEmpireProduction.com`
   - `www.CosmicEmpireProduction.com`
3. The host will show exact DNS records to create.
   - Usually a **CNAME** for `www`
   - And either an **A**, **ALIAS**, or **CNAME/flattened** record for the root/apex domain (`@`)
4. Copy those values exactly as shown by the host.

### 3B — Update DNS in GoDaddy

1. Log into GoDaddy.
2. Go to **My Products → Domains → your domain → DNS** (or DNS Management).
3. Important cleanup first:
   - Remove/disable GoDaddy **Website Builder**, **forwarding**, or parking page settings if enabled.
   - Those can override your real site.
4. Edit DNS records to match what your host asked for.
   - Do not invent values — use the host’s instructions.
5. Save DNS changes.

### 3C — Wait for DNS

- Often works in 15–60 minutes
- Can take up to 24–48 hours
- Check progress with your host’s domain status page

When ready, these should open your Cosmic Empire site:

- `https://CosmicEmpireProduction.com`
- `https://www.CosmicEmpireProduction.com`

---

## Step 4 — Confirm HTTPS

1. Visit `https://CosmicEmpireProduction.com`
2. Confirm the browser shows a lock / secure connection
3. Most hosts issue SSL automatically after DNS verifies
4. If HTTPS fails:
   - Wait longer for DNS
   - Recheck records in GoDaddy against host instructions
   - Ensure no conflicting A/CNAME records remain

---

## Step 5 — Launch QA checklist

Test on desktop and phone using `CosmicEmpireProduction.com`:

### Pages

- [ ] Home
- [ ] About
- [ ] Services
- [ ] Portfolio
- [ ] Contact

### Core features

- [ ] Navigation works
- [ ] Portfolio play button opens the bottom player
- [ ] Play / pause / previous / next / volume / exit work
- [ ] Music continues while moving between pages
- [ ] Browser reload hides/stops the player
- [ ] Contact form opens email to `cosmicempireproductions@gmail.com`

### Brand polish

- [ ] Copy proofread
- [ ] Business email monitored
- [ ] Site looks correct on mobile

### Audio expectation

Your portfolio uses high-resolution WAVs (96 kHz). That is quality-first, but first play can take a few seconds on slower connections. Acceptable for launch.

---

## Step 6 — Soft launch

1. Share the GoDaddy domain with 1–2 trusted people.
2. Ask them to test Portfolio playback + Contact.
3. Fix any issues locally.
4. Push updates to GitHub (`main`).
5. Confirm the host auto-redeployed.
6. Then share publicly / update old Wix links.

---

## After launch — how updates work

```text
Edit locally
→ test with START-PREVIEW.bat (http://127.0.0.1:8770)
→ commit + push to GitHub
→ host redeploys automatically
→ confirm on your GoDaddy domain
```

Local zip backups remain useful (`Website-Backups`), but GitHub + your host is the live pipeline.

---

## What you do not need for launch

- WordPress
- Wix
- A custom backend
- A database
- Paid hosting (optional; free static hosting is enough to start)
- Changing your WAV masters before launch

---

## Recommended final setup for you

1. Host on **Cloudflare Pages** or **Netlify** (free) from GitHub  
2. Point **CosmicEmpireProduction.com** DNS (GoDaddy) to that host  
3. Launch on `https://CosmicEmpireProduction.com`  
4. Later (optional): optimize web audio delivery if clients report slow loading  

---

## Launch definition (you’re done when…)

You can send someone this and it all works:

`https://CosmicEmpireProduction.com`

- Site loads over HTTPS  
- Portfolio music plays  
- Contact reaches your Gmail  
- No Wix dependency remains  

---

## If you get stuck

Most launch blockers are DNS-related:

- Wrong A/CNAME values in GoDaddy
- Old forwarding still enabled at GoDaddy
- DNS not finished propagating
- Host still “Pending DNS verification”

Fix those before changing site code.

When you’re ready to execute, start at **Step 1** (pick Cloudflare Pages or Netlify), then connect the GoDaddy domain in **Step 3**.
