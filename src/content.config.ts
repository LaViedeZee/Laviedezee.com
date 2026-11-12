import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		// Plain string, not image(): hero images live in public/images/
		// (localized from WordPress) and are referenced by path. image()
		// would make Vite try to resolve the public-dir path as an
		// importable asset and fail the build.
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		wpId: z.number().optional(),
		// WordPress taxonomy, from the Nov 9 wp-export + the live tag
		// list (wp-json/wp/v2/tags). Drives the article class attribute
		// (category-*/tag-*) and the post-cats link, exactly as live.
		categories: z.array(z.string()).default([]),
		tags: z.array(z.string()).default([]),
		// Sticky posts (BE guide 6271, Padel 2190, Trisha 2137) bubble to
		// the top of the homepage loop, in date order. Verified from the
		// live homepage Nov 10 — the wp-export does not carry sticky.
		sticky: z.boolean().default(false),
		// Exact WordPress timestamps with the site's ET offset, for the
		// <time datetime> attributes (pubDate/updatedDate are date-only).
		datePublished: z.string().optional(),
		dateModified: z.string().optional(),
		// Display size of the featured image at the theme's 900px-wide
		// single-post size (scaled from the local file, ratio preserved).
		heroWidth: z.number().optional(),
		heroHeight: z.number().optional(),
		// Center-cropped square variants of the hero, generated to match
		// the live Photon crops (400x400 list thumbs, 150x150 post-nav).
		thumb400: z.string().optional(),
		thumb150: z.string().optional(),
		// Four posts have a manual excerpt that already contains the
		// read-more link (the excerpt field in WordPress holds
		// "…text<a class="read-more" …/>Continue reading</a>"), so
		// live renders the link INSIDE the excerpt <p>, glued to the
		// last word with no space — verified on cilantro; the other
		// three show the same glued "Continue reading" in the stored
		// excerpt. All other posts get the link after </p>.
		excerptLinkInside: z.boolean().optional(),
	}),
});

// WordPress pages, converted to Markdown. Served at the same root slugs
// they had on WordPress (see src/pages/[...slug].astro). The Blog page
// (wpId 283) is served at /blog/ from src/content/pages/blog.md.
const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		pubDate: z.coerce.date().optional(),
		updatedDate: z.coerce.date().optional(),
		wpId: z.number().optional(),
		// Featured image for pages that have one (the five BE Miami
		// guides: 2400x600 banners, shown 900x225 like live).
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		// Exact document <title>, when Rank Math overrides the
		// default "{title} – La Vie de Zee". Only the Miami Fitness
		// Guide has one on live: its title is just
		// "The Definitive Miami Fitness Guide | BE by La Vie de Zee"
		// with no site-name suffix (verified Nov 10).
		seoTitle: z.string().optional(),
	}),
});

// Cooked recipe posts (custom post type cp_recipe), served at
// /recipes/<slug>/. Same fields as blog posts, minus categories/tags:
// recipes have an empty post-cats div and no entry-meta on live.
const recipes = defineCollection({
	loader: glob({ base: './src/content/recipes', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		heroAlt: z.string().optional(),
		wpId: z.number().optional(),
		datePublished: z.string().optional(),
		dateModified: z.string().optional(),
		heroWidth: z.number().optional(),
		heroHeight: z.number().optional(),
		thumb150: z.string().optional(),
		// Cooked recipe-category term (cp_recipe_category), from the
		// info card on the live single page: breakfast-recipes (1884)
		// or dinner-recipes (1164, 330, 190). Drives the archive at
		// /recipe-category/<slug>/ and the article class there.
		recipeCategory: z.string().optional(),
		// The recipe's excerpt as the live archive loop shows it
		// (the stored content's first <h2>, verbatim HTML) — used
		// only by the recipe-category archives. NOTE: this is NOT
		// the meta description; Rank Math's meta description lives
		// in `description` and usually differs.
		archiveExcerpt: z.string().optional(),
		// Center-cropped 400x400 variant of the hero, for the
		// recipe-category archive list thumbs (same Photon crop
		// convention as the blog posts' thumb400).
		thumb400: z.string().optional(),
	}),
});

export const collections = { blog, pages, recipes };
