// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'La Vie de Zee';
export const SITE_DESCRIPTION =
	'Christian wellness coaching for women. Curate your own wellness lifestyle — your wellness, held in faith.';
export const SITE_URL = 'https://laviedezee.com';
export const SUBSTACK_URL = 'https://laviedezee.substack.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/laviedezee/';
export const PINTEREST_URL = 'https://www.pinterest.com/laviedezee/';
export const TIKTOK_URL = 'https://www.tiktok.com/@laviedezee';

// WordPress category slug -> display name, as the live site shows them
// in post-cats links and the Blog page's Categories section.
export const CATEGORY_NAMES: Record<string, string> = {
	'laviedezee-home': 'Home',
	'food-and-nutrition': 'Food and Nutrition',
	'clean-beauty': 'Clean Beauty',
	general: 'General',
	fitness: 'Fitness',
	youtube: 'YouTube',
	spirituality: 'Spirituality',
};

// WordPress category slug -> term id (for the archive body class).
export const CATEGORY_IDS: Record<string, number> = {
	'laviedezee-home': 1,
	'food-and-nutrition': 19,
	'clean-beauty': 26,
	general: 106,
	fitness: 125,
	youtube: 126,
	spirituality: 37,
};

// WordPress category slug -> Rank Math term meta description, verbatim
// from the live archive pages. Only two categories have one
// (clean-beauty, laviedezee-home); the other five emit NO meta
// description tag at all on live — so this map is intentionally
// partial, and a missing key means "omit the tag", not "empty".
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
	'clean-beauty': 'Beauty products formulated without harmful synthetic chemicals.',
	'laviedezee-home':
		'Tips for creating a beautiful home using clean and natural products. Product suggestions, techniques, reviews and more specific to the home.',
};

// Cooked recipe-category slug -> display name, term id, and archive
// description (verbatim from the live /recipe-category/<slug>/ pages).
// Only breakfast and dinner exist; the other three recipes are
// uncategorized. Dinner's description is Rank Math's term description
// ("Savory recipients fit for a sit-down meal." — the typo is live's).
export const RECIPE_CATEGORY_NAMES: Record<string, string> = {
	'breakfast-recipes': 'Breakfast Recipes',
	'dinner-recipes': 'Dinner Recipes',
};
export const RECIPE_CATEGORY_IDS: Record<string, number> = {
	'breakfast-recipes': 178,
	'dinner-recipes': 116,
};
export const RECIPE_CATEGORY_DESCRIPTIONS: Record<string, string> = {
	'dinner-recipes':
		'<p>Savory recipients fit for a sit-down meal.</p>',
};

// The author archive's page-header bio, verbatim from the live
// /author/laviedezee/ page (plain text inside .archive-description,
// not wrapped in <p>).
export const AUTHOR_DESCRIPTION_HTML =
	'Azeezah Goodwin is the Editor &amp; Founder of La Vie de Zee as well as the Founder of The Miami Events Newsletter &amp; The NYC Events Newsletter. She travels frequently between Miami &amp; NYC. Azeezah is a University of Southern California, University of Virginia School of Law and Sciences Po Paris alum. She enjoys Reformer Pilates, Padel, beach days, shopping and spending time with good friends and family. \n\nFollow her on TikTok: @azeezahgoodwin\nFollow her on Instagram: @azeezahgoodwin';
