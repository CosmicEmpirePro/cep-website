# GoDaddy DNS — CosmicEmpireProduction.com

Hosting: **GitHub Pages** (`CosmicEmpirePro/cep-website`, branch `main`).  
Live: https://CosmicEmpireProduction.com

Keep these records in GoDaddy → Domains → CosmicEmpireProduction.com → DNS.

---

## Root domain (`@`)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 1 Hour |
| A | `@` | `185.199.109.153` | 1 Hour |
| A | `@` | `185.199.110.153` | 1 Hour |
| A | `@` | `185.199.111.153` | 1 Hour |

## www

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `cosmicempirepro.github.io` | 1 Hour |

---

## Do not re-enable

- Website forwarding / masking
- Parking page
- GoDaddy Website Builder connection
- Extra A/CNAME records that conflict with the ones above

Keep MX records if you use GoDaddy email.

---

## HTTPS

In GitHub → repo → **Settings → Pages**:

1. Confirm custom domain `cosmicempireproduction.com` is verified.
2. Enable **Enforce HTTPS** once the certificate is ready.

If the PC cannot resolve the domain but a phone can, the local DNS (router) may be stale — use `8.8.8.8` / `1.1.1.1` or wait for propagation.
