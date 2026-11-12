# Deploy — laviedezee.com (Astro, fully static)

**Status: ready to deploy. NOT deployed — the cutover needs the owner's
go-ahead (see checklist below).**

## Recommendation: Netlify

Both hosts are free at this size and both read `public/_redirects` for
real 301s. Netlify is the pick because:

- `_redirects` is Netlify's native format — splats and percent-encoded
  paths (the emoji-slug redirect) are handled exactly as written.
- Deploy Previews: every pull request gets a live preview URL, so Kennedy
  can review the design before anything goes live.
- No per-file size limits that matter here (largest image is 8.4 MB).
- Build minutes on the free tier (300/mo) are far above what this site
  uses (~3 s per build).

Cloudflare Pages works too (unlimited bandwidth, no build-minute cap) and
needs no extra config — the same repo, same build command, same output
directory. Its `_redirects` support is good, but encoded-path matching is
less predictable, so the emoji-slug redirect would need a live check
there. Keep it as the fallback.

## Settings (either host)

| | Netlify | Cloudflare Pages |
|---|---|---|
| Build command | `npm run build` | `npm run build` |
| Output directory | `dist` | `dist` |
| Node version | 22 (set in `netlify.toml`) | 22 (set in dashboard) |
| Redirects | `public/_redirects` | `public/_redirects` |
| Headers | `public/_headers` | `public/_headers` |

## Cutover checklist (owner go-ahead required)

1. **Pick the host** (recommendation: Netlify).
2. **Connect the repo** (GitHub import into Replit first, or push this
   folder to GitHub and connect from there). Verify the Deploy Preview
   looks right — homepage, a post, `/shop/`, the badge at
   `/as-featured-in-badge.png`.
3. **Point DNS at the new host** — the host gives exact records at setup
   (Netlify: A record for the apex + CNAME for www, or Netlify DNS;
   Cloudflare: CNAME to the `*.pages.dev` address). Change DNS only —
   do NOT cancel or change anything at Bluehost.
4. **Do NOT cancel Bluehost yet.** `admin@laviedezee.com` (her send-as
   address and calendar-invite sender) lives there. Email moves
   separately, after the site is stable on the new host.
5. **Verify live redirects** — `curl -I` each old URL on the live host
   and confirm 301s, especially:
   - `/the-nest-by-la-vie-de-zee-%F0%9F%AA%BA/` → `/the-nest-by-la-vie-de-zee/`
   - `/wellness-shop/` → `/shop/`
   - `/category/fitness/` → `/blog/`
   - `/furtuna-skin-promo-code/` → `/clean-skincare-that-remains-in-the-rotation/`
   - `/the-hot-girl-walk-tiktoks-best-new-fitness-trend/` → `/gabriela-ayala/`
6. **Verify live assets** — homepage, a post with images, `robots.txt`,
   `llms.txt`, `/sitemap-index.xml`, the badge, `/shop/`.
7. **Re-run Ahrefs** after cutover to measure (Nov 7 baseline: health
   83, 54 errors, 132 warnings, 112 notices).
8. **Retire WordPress only after 1–2 weeks stable** on the new host —
   and only after the email question is settled.

## What is NOT in this deploy

- No AdSense (deliberately absent — she is not reactivating it).
- No paywall logic (lives on Substack; the site only links out).
- The shop is a stub until she makes the ShopMy call.
- The badge file is as-is; the font tweak is still hers to specify.
