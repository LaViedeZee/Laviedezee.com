// Shared ordering + body-class helpers for the loop pages, so the
// homepage, its /page/N/ siblings, and the archives all order posts
// the way WordPress does.
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export const PAGE_SIZE = 10;

const byDateDesc = (a: Post, b: Post) =>
	b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/** Homepage order: sticky posts first (date order among them), then the
 *  rest in date order. This is WordPress's sticky behavior on the home
 *  page — verified against the live homepage Nov 10. */
export function homeOrder(posts: Post[]): Post[] {
	const sticky = posts.filter((p) => p.data.sticky).sort(byDateDesc);
	const rest = posts.filter((p) => !p.data.sticky).sort(byDateDesc);
	return [...sticky, ...rest];
}

/** Archive order: pure date order. Sticky does NOT bubble on category
 *  or author archives — verified against the live fitness archive. */
export function dateOrder(posts: Post[]): Post[] {
	return [...posts].sort(byDateDesc);
}

export function pageOf(posts: Post[], n: number): Post[] {
	return posts.slice((n - 1) * PAGE_SIZE, n * PAGE_SIZE);
}

export function pageCount(posts: Post[]): number {
	return Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
}

// WordPress body_class() fragments, verbatim from the live site.
// Paged archives insert `paged` after the context classes and
// `paged-N` (+ `category-paged-N` / `author-paged-N`) after
// `wp-embed-responsive` — that is WP core's body_class() order,
// verified against live home /page/2/, category food /page/2/ and
// author /page/2/ Nov 10. The class SET is the same either way
// (order never affects rendering); this matches it exactly.
const WP_BASE =
	'wp-custom-logo wp-embed-responsive wp-theme-elfie theme-elfie woocommerce-no-js ehf-template-elfie ehf-stylesheet-elfie';
const WP_TAIL = 'woocommerce-active elementor-default elementor-kit-153';

const paged = (n: number) => (n > 1 ? ' paged' : '');
const pagedN = (n: number, extra = '') =>
	n > 1 ? ` paged-${n}${extra ? ` ${extra}` : ''}` : '';

export function homeBodyClass(page: number): string {
	return `home blog${paged(page)} wp-custom-logo wp-embed-responsive${pagedN(page)} wp-theme-elfie theme-elfie woocommerce-no-js ehf-template-elfie ehf-stylesheet-elfie hfeed layout-mixed ${WP_TAIL}`;
}

export function categoryBodyClass(slug: string, id: number, page: number): string {
	return `archive${paged(page)} category category-${slug} category-${id} wp-custom-logo wp-embed-responsive${pagedN(page, `category-paged-${page}`)} wp-theme-elfie theme-elfie woocommerce-no-js ehf-template-elfie ehf-stylesheet-elfie hfeed layout-mixed ${WP_TAIL}`;
}

export function authorBodyClass(page: number): string {
	return `archive${paged(page)} author author-laviedezee author-2 wp-custom-logo wp-embed-responsive${pagedN(page, `author-paged-${page}`)} wp-theme-elfie theme-elfie woocommerce-no-js ehf-template-elfie ehf-stylesheet-elfie hfeed layout-mixed ${WP_TAIL}`;
}

export function recipeCategoryBodyClass(slug: string, id: number): string {
	return `archive tax-cp_recipe_category term-${slug} term-${id} ${WP_BASE} hfeed layout-mixed ${WP_TAIL}`;
}
