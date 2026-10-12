# How to run — Cosmic Empire Productions website

Static site (HTML / CSS / JS + WAV audio). No install, no build step.

Live site: **https://CosmicEmpireProduction.com**  
Repo: https://github.com/CosmicEmpirePro/cep-website

---

## Option A — Open locally (quick look)

1. Open this folder.
2. Double-click `index.html`.

Pages and navigation work. **Portfolio audio may fail or stall** if you open files directly from disk — use Option B for music.

---

## Option B — Local preview server (recommended)

Needed for reliable Portfolio WAV playback (Range requests + concurrent streams).

1. Double-click `START-PREVIEW.bat`
2. Open: http://127.0.0.1:8770/
3. Portfolio: http://127.0.0.1:8770/portfolio.html
4. Stop the server with **Ctrl+C** in the terminal window (or close it).

Same thing from PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\start-preview.ps1
```

---

## Option C — Flash drive (offline copy)

1. Copy the **entire** `Website` folder onto the drive (keep `css/`, `js/`, `assets/` with the HTML).
2. On any PC: open the folder → double-click `index.html`.
3. For Portfolio audio on that PC: run `START-PREVIEW.bat` from the copied folder, then use http://127.0.0.1:8770/

Do not move `index.html` alone — styles, scripts, and audio must stay beside it.

---

## Option D — Live site (already hosted)

Hosting: **GitHub Pages** from branch `main` (repo root).  
Domain DNS: GoDaddy → GitHub Pages (see `GODADDY-DNS.md`).

### Update the live site

```text
Edit files locally
→ test with START-PREVIEW.bat
→ commit + push to main
→ GitHub Pages redeploys (usually 1–2 minutes)
→ check https://CosmicEmpireProduction.com
```

Hard-refresh the browser (Ctrl+F5) if an old page is cached.

---

## Contact form

Opens a draft in the PC’s email app to `cosmicempireproductions@gmail.com`.  
If no mail app is set up, use that address directly.

---

## Folder map

| Path | Purpose |
|------|---------|
| `index.html` | Home |
| `about.html` | About |
| `services.html` | Services |
| `portfolio.html` | Portfolio + players |
| `contact.html` | Contact |
| `css/` | Styles |
| `js/` | Soft nav + bottom music player |
| `assets/` | Logo, fonts, audio |
| `START-PREVIEW.bat` | Starts local preview server |
| `GODADDY-DNS.md` | Domain DNS records |
| `roadmap.md` | Launch notes / QA checklist |

---

## Backups

- **Digital:** GitHub `main` (source of truth)
- **Local zip:** `../Website-Backups/` and `D:\CEP-Website-Backups\`
- **Flash drive:** copy the full Website folder or a dated zip from Website-Backups
