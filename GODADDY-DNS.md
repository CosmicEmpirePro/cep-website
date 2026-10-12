# GoDaddy DNS — final step for CosmicEmpireProduction.com

Hosting is already set up on GitHub Pages.

Temporary live site (works now):
https://cosmicempirepro.github.io/cep-website/index.html

To finish your custom domain today, update DNS in GoDaddy.

---

## Exact records to add in GoDaddy

Go to: **GoDaddy → Domains → CosmicEmpireProduction.com → DNS**

### 1) Root domain (`@` / CosmicEmpireProduction.com)

Add these **A** records (GitHub Pages):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 600 seconds / 1 Hour |
| A | `@` | `185.199.109.153` | 600 seconds / 1 Hour |
| A | `@` | `185.199.110.153` | 600 seconds / 1 Hour |
| A | `@` | `185.199.111.153` | 600 seconds / 1 Hour |

### 2) www subdomain

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `cosmicempirepro.github.io` | 600 seconds / 1 Hour |

---

## Cleanup first (important)

In GoDaddy DNS / domain settings, remove or disable:

- Website forwarding / masking
- Parking page
- Old A/CNAME records that conflict with the ones above
- Any “GoDaddy Website Builder” connection

Keep only the records needed for email (MX) if you use GoDaddy email.

---

## After saving DNS

1. Wait 15–60 minutes (sometimes up to 24 hours).
2. Visit:
   - https://CosmicEmpireProduction.com
   - https://www.CosmicEmpireProduction.com
3. In GitHub repo → Settings → Pages, confirm domain shows as verified.
4. Enable **Enforce HTTPS** if GitHub shows that button.

---

## Done when

`https://CosmicEmpireProduction.com` loads the Cosmic Empire site with a padlock.
