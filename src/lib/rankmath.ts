// The Rank Math @graph JSON-LD emitted in <head> on the live site's
// archive and home pages, copied verbatim (Nov 10, 2026). The
// organization and WebSite nodes are identical on every page; the
// final node is per-page. Names carry Rank Math's literal "&ndash;"
// entities, and the Person node's image/sameAs URLs carry its literal
// "&amp;" entities — reproduced exactly as live emits them, not
// decoded. The logo URL keeps the live /wp-content/ path (flagged in
// HANDOFF.md: that path will not exist on the static host).

const ORGANIZATION = {
	'@type': 'HealthAndBeautyBusiness',
	'@id': 'https://laviedezee.com/#organization',
	name: 'Azeezah Goodwin',
	url: 'https://laviedezee.com',
	logo: {
		'@type': 'ImageObject',
		'@id': 'https://laviedezee.com/#logo',
		url: 'https://laviedezee.com/wp-content/uploads/2020/08/L.png',
		contentUrl: 'https://laviedezee.com/wp-content/uploads/2020/08/L.png',
		caption: 'La Vie de Zee',
		inLanguage: 'en-US',
		width: '500',
		height: '500',
	},
	openingHours: ['Mo,Tu,We,Th,Fr,Sa,Su 09:00-17:00'],
	image: { '@id': 'https://laviedezee.com/#logo' },
};

const WEBSITE_BASE = {
	'@type': 'WebSite',
	'@id': 'https://laviedezee.com/#website',
	url: 'https://laviedezee.com',
	name: 'La Vie de Zee',
	alternateName: 'LVDZ',
	publisher: { '@id': 'https://laviedezee.com/#organization' },
	inLanguage: 'en-US',
};

// The homepage (page 1 only) adds a SearchAction to the WebSite node.
const SEARCH_ACTION = {
	'@type': 'SearchAction',
	target: 'https://laviedezee.com/?s={search_term_string}',
	'query-input': 'required name=search_term_string',
};

function websiteNode(searchAction: boolean) {
	return searchAction
		? { ...WEBSITE_BASE, potentialAction: SEARCH_ACTION }
		: { ...WEBSITE_BASE };
}

function collectionPageNode(
	pageUrl: string,
	pageName: string,
	aboutOrg: boolean,
) {
	return {
		'@type': 'CollectionPage',
		'@id': `${pageUrl}#webpage`,
		url: pageUrl,
		name: pageName,
		...(aboutOrg
			? { about: { '@id': 'https://laviedezee.com/#organization' } }
			: {}),
		isPartOf: { '@id': 'https://laviedezee.com/#website' },
		inLanguage: 'en-US',
	};
}

// @graph for a CollectionPage archive or the homepage.
// pageName is Rank Math's title: "La Vie de Zee | Christian Wellness
// Coaching for Women" for the home loop, "{Name} Archives &ndash; La
// Vie de Zee" for an archive page 1, "{Name} Archives &ndash; Page N
// of T &ndash; La Vie de Zee" for a paged archive. The homepage (page
// 1) also gets the SearchAction and the "about" link on its
// CollectionPage node.
export function collectionGraph(
	pageUrl: string,
	pageName: string,
	opts: { searchAction?: boolean; aboutOrg?: boolean } = {},
) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			ORGANIZATION,
			websiteNode(opts.searchAction ?? false),
			collectionPageNode(pageUrl, pageName, opts.aboutOrg ?? false),
		],
	};
}

function personNode(pageUrl: string) {
	return {
		'@type': 'Person',
		'@id': 'https://laviedezee.com/author/laviedezee/',
		name: 'Azeezah Goodwin',
		description:
			'Azeezah Goodwin: Founder of La Vie de Zee, The Miami Events Newsletter, The NYC Events Newsletter and social media influencer (@azeezahgoodwin).',
		url: 'https://laviedezee.com/author/laviedezee/',
		image: {
			'@type': 'ImageObject',
			'@id':
				'https://secure.gravatar.com/avatar/143f716f7a89f146c0ce07a64c56058c642de78e9c405449d6bda9ed430ef966?s=96&amp;d=mm&amp;r=g',
			url: 'https://secure.gravatar.com/avatar/143f716f7a89f146c0ce07a64c56058c642de78e9c405449d6bda9ed430ef966?s=96&amp;d=mm&amp;r=g',
			caption: 'Azeezah Goodwin',
			inLanguage: 'en-US',
		},
		sameAs: [
			'https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=&amp;ved=2ahUKEwi30Of5jfqDAxXTfDABHecQABgQFnoECBUQAQ&amp;url=httpswww.pinterest.comlaviedezee&amp;usg=AOvVaw2Fv8tawbMflLCcXM6XwCtC&amp;opi=89978449',
			'https://www.instagram.com/azeezahgoodwin/',
		],
		worksFor: { '@id': 'https://laviedezee.com/#organization' },
		// Points at the current author-archive page (page 2's node
		// points at /author/laviedezee/page/2/#webpage, verified live).
		mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
	};
}

// @graph for the author archive (ProfilePage + Person). pageUrl is the
// current archive page URL (page 1 or /page/N/).
export function authorGraph(pageUrl: string) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			ORGANIZATION,
			websiteNode(false),
			{
				'@type': 'ProfilePage',
				'@id': `${pageUrl}#webpage`,
				url: pageUrl,
				name: 'Azeezah Goodwin',
				isPartOf: { '@id': 'https://laviedezee.com/#website' },
				inLanguage: 'en-US',
			},
			personNode(pageUrl),
		],
	};
}
