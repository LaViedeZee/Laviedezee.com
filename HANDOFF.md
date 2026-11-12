# HANDOFF — Astro like-for-like redo of laviedezee.com

**Status:** Production build passes. **80 pages** built. Verified against the live
WordPress site (token-level diff + full-body diff + internal-link check + dev-server
spot-check). Nothing deployed, no DNS changed, Bluehost untouched, nothing pushed
to GitHub or Replit. Deploy is parked — nothing goes live without Azeezah's go-ahead.

**Directory:** `~/workspace/goals/nyc-events-newsletter-weekly-draft/files/astro-like-for-like/`
(first-pass build at `../astro-first-pass/` untouched; its HANDOFF.md describes the
55-page first pass, not this redo.)

## What this is

A strict like-for-like port of the live WordPress site (theme **Elfie**, Elementor Kit 153)
— same design, layout, fonts, colors, spacing, images, content. No redesign, no visual
"improvements." The first-pass build (Nov 9) was 55 pages and looked "neat but a bit
different"; the redo audits every page against live and matches it exactly where
possible. The page count grew to **80** because the first pass omitted live routes that
are linked from posts: category archives (8), author archive (4), recipes (7),
recipe-category archives (2), the Elementor landing page (1).

## Page inventory (80)

- 36 blog posts · 17 pages (incl. the Blog page at its slug URL
  `/la-vie-de-zee-blog-posts-health-wellness-spirituality-lifestyle/` — live `/blog/`
  404s, so no `/blog/` route exists) · 4 home-loop pages · 8 category archives
  (food-and-nutrition has p.2) · 4 author archives · 7 recipes (`/recipes/<slug>/`)
  · 2 recipe-category archives (breakfast, dinner) · 1 Elementor landing page
  (`/event-partnership-advisory-services/`, bare canvas, no site chrome) · 1 shop stub
- Plus `rss.xml`, `sitemap.xml`, and 4 redirect stubs (meta-refresh pages on a purely
  static host; `public/_redirects` carries the same mappings as true 301s for
  Netlify/Cloudflare-style hosts).

## Live-site facts the build reproduces

- Body: Georgia/Times serif, 18px, line-height 1.8, #404040. Headings: Aleo 300 italic.
  Accent #fe7b7b. Site title 120px desktop. Logo `L.png` (500×500, max-width 100px).
- Header: skip-link, top-bar (visible Instagram icon), empty header-image div (home-loop
  pages), empty `#featured-boxes` div (homepage p1 only), masthead, menu
  (About / BE by LVDZ Guides → Miami → Fitness, Nutrition, Clean Beauty, Recovery,
  Wellness / T & C / Contact), back-to-top div after the footer. Site title is `<h1>` on
  home-loop pages, `<p>` elsewhere.
- Homepage loop: 10 posts/page, sticky-first (**BE guide 6271, Padel 2190, Trisha 2137**),
  then date-desc; first post full-width (900×1200 thumb), rest list-style (400×400
  thumbs); numbered pagination (`paginate_links`, mid_size 1, end_size 1). Paged loop
  pages do NOT feature their first item.
- Category/author archives: same loop, pure date order (sticky does NOT bubble),
  Older/Newer posts-navigation (not numbered). Page-header above #content
  ("Category: …" / "Author: …" + bio). Spirituality (0 posts) shows "Nothing Found."
- Single posts: author bio box, no related posts, no comments; Shared Counts block as
  the FIRST child of `.entry-content`; post-nav (prev = older, next = newer, 150×150
  thumbs). Entry-meta shows published + `.updated` time.
- Pages: no Shared Counts, no entry-meta. Guides have entry-headers + 900×225 banner
  thumbnails. OS pages have an EMPTY entry-header and document title literally
  "– La Vie de Zee". Landing page is a bare Elementor canvas.
- Recipes (Cooked plugin, custom post type `cp_recipe`): info card, ingredients/
  directions, fullscreen modal, Recipe JSON-LD; article class carries
  `cp_recipe_category-{cat}`.
- Footer: live is **white-on-white** (bg #ffffff, text stays #fff) with the
  "Proudly powered by WordPress | Theme: Elfie" credit. **Changed Nov 10 at
  Azeezah's direction** (the WordPress credit is inaccurate now that the site
  is Astro): the Astro build's footer reads "© 2026 La Vie de Zee" in visible
  #404040 text instead (`src/components/Footer.astro`). Live WordPress site
  keeps its original footer.
- Fonts self-hosted from `public/css/fonts.css` + `public/css/omgf-136.css` (Aleo,
  Cormorant, Inter, Roboto, Roboto Slab, Work Sans, fontello). No runtime font dependency.
- 163+ images localized to `public/images/` (197 MB). 4 recipe-gallery images that the
  first pass missed were downloaded Nov 10 (DSC00790, DSC00904, DSC01206, DSC02153).

## Redirects (live-verified Nov 10 — only these)

- `/wellness-shop/` → `/shop/` (live 301)
- `/the-nest-by-la-vie-de-zee/` → `/the-nest-by-la-vie-de-zee-%F0%9F%AA%BA/` (live 301;
  the page itself is served at the emoji URL)
- `/tickets-order/` → `/`, `/tickets-checkout/` → `/` (live 200s but needs the Events
  Calendar backend — fallback to home)
- Everything else 404s on live exactly as it 404s here (old /category/*, /recipes/*,
  /product/*, dead-post redirects were removed Nov 10 after live checks).

## Fixes applied in the redo (final state)

- Paged loops don't feature their first item; recipe singles carry their category class.
- Blank-line Markdown bug fixed in `tools/fix-md-html-blocks.py` (script-tag state bug +
  nested-script blank lines) — **no `astro-code` blocks and no `<p>` inside any
  `<style>`/`<svg>` anywhere in dist**.
- Excerpt "Continue reading" un-glued from 4 descriptions; link renders inside the
  `<p>` where live has it (`excerptLinkInside` frontmatter).
- Guide banner image loading attributes aligned with live (first image: no `loading`,
  no `fetchpriority`; later images: `loading="lazy"`).
- Body-class order on paged archives (WP core order: `paged` after context classes,
  `paged-N` / `category-paged-N` / `author-paged-N` after `wp-embed-responsive`).
- Category meta descriptions: only clean-beauty and laviedezee-home have one on live;
  the other five emit NO tag (now matched). Recipe-category descriptions too
  (dinner: "Savory recipients fit for a sit-down meal." — the typo is live's).
- Fitness guide document title has no "– La Vie de Zee" suffix (Rank Math override,
  via `seoTitle`).
- Full chrome added: `#page` wrapper, skip-link, top-bar, header-image, featured-boxes,
  back-to-top, logo `sizes`, logo `fetchpriority` (everywhere except the front page),
  menu current-item/ancestor/parent classes + `aria-current="page"` on the current
  menu link (attribute order matches live: `href` first, then `aria-current`).
- Logo `aria-current`/`fetchpriority` keyed to the **front page** (`/`), not home-loop
  pages (live has `fetchpriority` on `/page/2/` but not on `/`).
- `.updated` time renders whenever a modified timestamp exists (fixes elementor-1534,
  whose modified date is the same day as its published date).
- NEST redirect: target must be the **literal emoji** in `astro.config.mjs` (Astro
  re-encodes the target; an encoded target came out double-encoded `%25F0…` and
  404'd). Now emits the single-encoded `%F0%9F%AA%BA`, matching live's 301.
  (`public/_redirects` keeps the encoded form, which is correct there.)

## Verification (final run, Nov 10)

- **Build:** `80 page(s) built`, no errors. 84 `index.html` files in `dist/` (80 pages +
  4 redirect stubs). `/blog/` does NOT exist; NEST emoji URL exists.
- **Full-body diff** (8 representative pages, header/sidebar/footer included):
  home **0** non-known diffs · home-p2 **0** · cat-fitness **0** · about **0** ·
  os-draft **0** · padel **1** (X path, byte-level only — see Flags) ·
  guide-wellness/fitness **1 each** (redundant style block — see Flags).
- **`<main>` diff** (`tools/diff.py`, 38 pairs): every page reduces to the known patterns
  (gravatar → local avatar, `/wp-content/uploads/` → `/images/`, read-more `/>` vs `>`,
  `&ndash;`/`&#8217;` entities vs literals, `<br />` vs `<br>`, `<input />` vs `<input>`).
  About page is **0 opcodes** (perfect). Landing page 0 opcodes. Token counts now
  match live exactly on home-p2 (557), cat-home (421), author-p2 (549).
- **Internal-link check** (4,042 links): 38 "broken" paths, all accounted for — see Flags.
  The 4 recipe-gallery images and the NEST redirect were fixed in this pass.
- **Dev-server spot-check** (`astro dev --background`, localhost:4321): 11/11 pages 200
  with correct titles (home, Padel, Miami Wellness Guide, OS landing + draft, Blog page,
  category-fitness, a recipe, landing page, NEST emoji URL, shop). Homepage loop order
  6271 → 2190 → 2137 (sticky-first) and numbered pagination confirmed. Guide centered-
  buttons block renders; recipe JSON-LD present; landing page has no `#page` chrome.

## Flags — couldn't be matched exactly (page + detail)

- **Padel (and every post): X/Twitter Shared Counts icon.** Live `<path d="…" />`
  (self-closing); dist `<path d="…"></path>`. The `d` attribute is byte-identical
  (283 chars). Astro normalizes self-closing `<path />` to open/close form in its
  output. DOM-identical; do not chase.
- **All 5 guides: `core-block-supports-inline-css`.** Live injects
  `<style id="core-block-supports-inline-css">.wp-container-core-buttons-is-layout-fe48e5de{justify-content:center;}</style>`
  at the end of `<body>`. Redundant: `block-library.min.css` already has
  `.is-content-justification-center{justify-content:center}` and the guides' buttons
  block carries that class, so the button is centered in dist too. No visual effect.
- **Category YouTube archive excerpt (quarantine-doula post).** Live `/category/youtube/`
  shows the LONG auto-excerpt as bare text with no `<p>` wrapper; the Nov 9 export AND
  11 other live archive renderings show the SHORT manual excerpt. Suspected stale page
  cache on that one low-traffic live page. Dist keeps the short excerpt (matches export
  + majority).
- **`loading="lazy"` on paged loop thumbnails.** Live is inconsistent with itself (same
  image has it on one archive page and not another). Almost certainly a WP render-time/
  cache artifact. Dist uses a consistent rule (featured 900px image: no loading attr;
  list 400×400 thumbs: `loading="lazy"`), matching live's homepage and category/author
  p1 pages. Invisible loading hint only.
- **Logo `fetchpriority="high"`.** Live has it on ~30 of 41 pages; absent on homepage,
  author p1, category clean-beauty/fitness/general/spirituality/youtube p1, category-food
  p2, and both recipe-category archives. Same cache-artifact inconsistency. Dist rule
  (everywhere except the front page) matches the homepage exactly and the majority
  elsewhere. Invisible.
- **Shop stub (intentional).** Live `/shop/` is a WooCommerce archive showing one product
  category ("Uncategorized", placeholder image), title "Page not found – La Vie de Zee".
  Dist is the intentional custom "Shop Wellness / coming soon" stub (per instruction).
  Consequence: **24 `/product/*` links in post bodies** (WooCommerce product pages)
  404 in the static build. They are verbatim post content; the product pages aren't
  part of the build while the shop is a stub.
- **Rank Math meta descriptions not reproduced for posts/pages/guides/OS pages** (custom
  fields not in the Nov 9 export; invisible SEO metadata). Category + recipe-category
  descriptions ARE reproduced. Examples: Padel live "A style guide for Padel, the
  popular social-forward leisure sport that is gaining popularity in The United States."
  vs dist's excerpt; about live ends "Our mission is to" (truncated Rank Math text).
- **Footer:** live is white-on-white ("Proudly powered by WordPress | Theme:
  Elfie"). **Changed Nov 10 at Azeezah's direction:** the Astro build's footer
  now reads "© 2026 La Vie de Zee" in visible #404040 text — the WordPress
  credit is inaccurate for an Astro site.
- **Byte-level only, DOM-identical (do not chase):** read-more links live `<a …/>` vs
  dist `<a …>`; void elements live `<input … />` vs dist `<input …>`; title entities
  live `Can&#8217;t` / `&ndash;` vs dist literal `Can’t` / `–`; `<br />` vs `<br>`;
  recipe-cat-breakfast meta tag live `<meta name="description" content="">` vs dist
  `<meta name="description" content>` (Astro renders an empty-string attribute bare).
- **Dead links in verbatim content (404 on live too, left as-is):** 6 deleted-post URLs
  linked from other posts (`/furtuna-skin-luxury-clean-skincare-sourced-from-sicily/`,
  `/furtuna-skin-promo-code/`, `/i-tried-the-aloe-vera-mask-for-hair-growth-all-over-tiktok-right-now/`,
  `/quarantine-wellness-reiki-and-meditation/`, `/sakara-life-10-day-reset-reveiw-promo-code-recipe-coupon-cde/`,
  `/the-hot-girl-walk-tiktoks-best-new-fitness-trend/`); `/recipes` (no trailing slash,
  live 404s it); `/miami-pilates-company/embed/` (oEmbed URL in the pilates post body);
  `/wp-admin/post.php?post=1177&action=edit` (an accidental admin-edit link in the
  Padel post body — it's on live too).
- **Known gaps carried from the first pass (unchanged):** Sidebar Substack card is a
  static Nov 10 snapshot (3 issues); live updates when new issues publish. Sidebar OS
  image served at full 1545×2000 instead of live's 791×1024 variant (same display size).
  Search forms post to `/?s=…` with no backend (matches live's form; static site has no
  search). Tickets pages redirect to home (live 200s, needs plugin backend). Wellness OS
  page titles remain slugs in frontmatter (hidden via `hideTitle`; document title is
  "– La Vie de Zee" as live). `/wellness-shop/` (Elementor page 894) is NOT in the build;
  live 301s it to `/shop/`. The 2 dead images stay referenced (404 live too):
  DSC00845-1024x683.jpg (turmeric post) and Furtuna-Skin-banner-ad-pdf-1024x512.jpg
  (greenwashing post) — both are Jetpack Photon URLs, identical to live. Homepage/
  category/author archive links use absolute `https://laviedezee.com/…` (matches live;
  in a dev preview they jump to the live site). JSON-LD org-node logo URL keeps the
  live `/wp-content/uploads/2020/08/L.png` path (won't exist on the static host —
  deploy-time decision). Guide image `srcset` dropped (live serves Photon srcsets; dist
  serves one local file per image — build convention).
- **Deliberately left remote:** ShareASale gif in 5 posts (Jetpack Photon URL), Mailchimp
  branding SVG in `miami-events-newsletter.md`, external PDF link in the library page.

## How to work here

- Build: `./node_modules/.bin/astro build` (from this directory). Expect 80 pages.
- Preview: `astro dev --background` (per `AGENTS.md`); manage with `astro dev stop` /
  `status` / `logs`. Dev server injects `data-astro-source-*` attributes — dev HTML is
  larger than `dist/`; that's normal.
- Verify: `python3 tools/diff.py` (38 `<main>` pairs) + the full-body diff snippet in
  this handoff's Verification section. Live snapshots live in `tools/live-audit/`.
- Deploy (when she gives the go-ahead): Netlify recommended (first-pass HANDOFF has the
  reasoning); Cloudflare Pages is the fallback. Do NOT cancel anything at Bluehost until
  `admin@laviedezee.com` is sorted. The badge at `/as-featured-in-badge.png` goes live
  with the deploy; her font tweak is parked.
