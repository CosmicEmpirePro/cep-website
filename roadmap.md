# Cosmic Empire Productions — Launch roadmap

**Status:** Live on GitHub Pages at **https://CosmicEmpireProduction.com**

How to run / update: see `how-to-run.md`  
DNS reference: see `GODADDY-DNS.md`  
Repo: https://github.com/CosmicEmpirePro/cep-website

---

## Done

| Step | Task |
|------|------|
| 1 | Host on GitHub Pages (`main` / root) |
| 2 | Custom domain `CosmicEmpireProduction.com` |
| 3 | GoDaddy A + www CNAME records |
| 4 | Site pages + portfolio player + contact mailto |

---

## Still worth checking

- [ ] **Enforce HTTPS** in GitHub Pages (when certificate is ready)
- [ ] Padlock on https://CosmicEmpireProduction.com and www
- [ ] Portfolio play / pause / prev / next / volume / exit
- [ ] Music continues across soft page navigations; reload stops player
- [ ] Contact opens mail to `cosmicempireproductions@gmail.com`
- [ ] Mobile layout looks correct

---

## How updates work

```text
Edit locally
→ test with START-PREVIEW.bat (http://127.0.0.1:8770)
→ commit + push to GitHub main
→ Pages redeploys
→ confirm on CosmicEmpireProduction.com
```

Local zip backups: `Website-Backups` (and optional copy on `D:\CEP-Website-Backups`).

---

## What you do not need

- WordPress / Wix / custom backend / database
- Paid hosting for the current static site
