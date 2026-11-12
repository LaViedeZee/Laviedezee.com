// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://laviedezee.com',
	// WordPress URLs all end with a trailing slash; keep them identical.
	trailingSlash: 'always',
	// Replit serves the dev preview through a *.replit.dev host, which
	// Vite blocks by default. Allow it (dev server only; no effect on
	// the production build).
	vite: {
		server: {
			allowedHosts: ['.replit.dev'],
		},
	},
	integrations: [mdx(), sitemap()],
	// Remote hero images still live on the WordPress uploads host until
	// they are downloaded into public/ (see HANDOFF.md).
	image: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'laviedezee.com' },
			{ protocol: 'https', hostname: 'i0.wp.com' },
		],
	},
	// 301s for WordPress URLs that do not survive the move.
	// NOTE: on a purely static host these are emitted as meta-refresh pages,
	// not true 301s. public/_redirects carries the same mappings for
	// Netlify/Cloudflare-style hosts, which do serve real 301s.
	// 301s for WordPress URLs that do not survive the move. Only
	// live-verified mappings live here (checked Nov 10, 2026):
	//  - /wellness-shop/ 301s to /shop/ on live.
	//  - /the-nest-by-la-vie-de-zee/ 301s to the emoji URL on live; the
	//    page itself is served at the emoji slug.
	//  - /tickets-order/ and /tickets-checkout/ return 200 on live but
	//    need the Events Calendar backend, which has no static
	//    equivalent — they fall back to the homepage (flagged in
	//    HANDOFF.md).
	// Everything else 404s on live exactly as it 404s here: the old
	// /category/*, /recipes/* and dead-post redirects were removed Nov 10
	// after live checks showed the targets exist (archives, recipes) or
	// 404 on live too (deleted posts).
	// NOTE: on a purely static host these are emitted as meta-refresh pages,
	// not true 301s. public/_redirects carries the same mappings for
	// Netlify/Cloudflare-style hosts, which do serve real 301s.
	redirects: {
		'/wellness-shop/': '/shop/',
		// NOTE: the target must be the literal emoji here, NOT the
		// percent-encoded form — Astro percent-encodes the target
		// again when it emits the meta-refresh page, so an encoded
		// target came out double-encoded (%25F0%259F%25AA%25BA) and
		// the redirect landed on a 404. The literal emoji encodes
		// exactly once, to %F0%9F%AA%BA, matching live's 301.
		'/the-nest-by-la-vie-de-zee/': '/the-nest-by-la-vie-de-zee-🪺/',
		'/tickets-order/': '/',
 
		'/tickets-checkout/': '/', 
	}
	// NOTE: fonts are self-hosted @font-face rules in public/css/fonts.css
	// (Aleo / Cormorant Garamond / Inter / Roboto / Roboto Slab / fontello),
	// taken from the live site's own OMGF + Google Fonts files. No runtime
	// font dependency and no build-time font download.
});
