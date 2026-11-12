// Convert the live WordPress export (posts.json / pages.json / media.json)
// into Astro content-collection Markdown. Run from /tmp/wp-export.
// Output: <project>/src/content/blog/<slug>.md and <project>/src/content/pages/<slug>.md
import fs from 'node:fs';
import path from 'node:path';
import TurndownService from 'turndown';

const PROJECT = '/home/hatch/workspace/goals/nyc-events-newsletter-weekly-draft/files/astro-first-pass';
const OUT_BLOG = path.join(PROJECT, 'src/content/blog');
const OUT_PAGES = path.join(PROJECT, 'src/content/pages');
fs.mkdirSync(OUT_BLOG, { recursive: true });
fs.mkdirSync(OUT_PAGES, { recursive: true });

const posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
const pages = JSON.parse(fs.readFileSync('pages.json', 'utf8'));
const media = JSON.parse(fs.readFileSync('media.json', 'utf8'));
const mediaById = Object.fromEntries(media.map((m) => [m.id, m]));

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '_',
  bulletListMarker: '-',
});
turndown.remove(['script', 'style', 'noscript']);
// Keep video embeds as raw HTML so they survive the move.
turndown.addRule('iframe', {
  filter: 'iframe',
  replacement: (content, node) => `\n\n${node.outerHTML}\n\n`,
});

const decode = (s) =>
  (s || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ');

const stripTags = (s) => decode(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// All preserved root slugs (posts + pages), for internal-link rewriting.
const allSlugs = new Set([
  ...posts.map((p) => p.slug),
  ...pages.map((p) => p.slug),
  'the-nest-by-la-vie-de-zee', // emoji slug renamed (see below)
]);

function rewriteLinks(md) {
  return md.replace(
    /https:\/\/laviedezee\.com\/([^)\s"']*)/g,
    (m, rest) => {
      const [pathPart, ...anchorParts] = rest.split('#');
      const clean = decodeURIComponent(pathPart).replace(/\/$/, '');
      const anchor = anchorParts.length ? `#${anchorParts.join('#')}` : '';
      if (clean === '') return `/${anchor}`;
      if (allSlugs.has(clean)) return `/${clean}/${anchor}`;
      return m; // external to the preserved set: leave absolute
    }
  );
}

function cleanMd(md) {
  return rewriteLinks(md)
    .replace(/\[caption[^\]]*\]/g, '')
    .replace(/\[\/caption\]/g, '')
    .replace(/\[gallery[^\]]*\]/g, '')
    // Bare & is valid in Markdown; &amp; inside image/link URLs breaks
    // Astro's image reference parser at build time.
    .replace(/&amp;/g, '&')
    // Emit body images as raw HTML <img> tags. Astro's Markdown image
    // pipeline fetches every image to infer dimensions, and any dead
    // image (several WP uploads now 404) fails the whole build. Raw HTML
    // passes through untouched, so a dead image degrades to a broken
    // image in the browser — exactly like the live WordPress site today.
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g,
      (m, alt, src) => `<img src="${src}" alt="${alt.replace(/"/g, '&quot;')}" loading="lazy" />`
    )
    .replace(/&nbsp;/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function escYaml(s) {
  return JSON.stringify(s);
}

const inventory = { posts: [], pages: [], excluded: [] };

// ---- POSTS ----
for (const p of posts) {
  const title = decode(stripTags(p.title.rendered));
  let desc = stripTags(p.excerpt.rendered);
  if (!desc) desc = stripTags(p.content.rendered).slice(0, 155);
  desc = desc.slice(0, 155);
  const hero = mediaById[p.featured_media];
  const md = cleanMd(turndown.turndown(p.content.rendered));
  const fm = [
    '---',
    `title: ${escYaml(title)}`,
    `description: ${escYaml(desc)}`,
    `pubDate: ${p.date.slice(0, 10)}`,
    ...(p.modified.slice(0, 10) !== p.date.slice(0, 10) ? [`updatedDate: ${p.modified.slice(0, 10)}`] : []),
    ...(hero ? [`heroImage: ${escYaml(hero.source_url)}`, `heroAlt: ${escYaml(decode(hero.alt_text || title))}`] : []),
    `wpId: ${p.id}`,
    '---',
    '',
    md,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT_BLOG, `${p.slug}.md`), fm);
  inventory.posts.push({ slug: p.slug, title, date: p.date.slice(0, 10), url: `/${p.slug}/` });
}

// ---- PAGES ----
const SKIP_PAGES = new Set([
  'tickets-order', // Tribe Tickets shortcode page, no content
  'tickets-checkout', // Tribe Tickets shortcode page, no content
  'wellness-shop', // duplicate of /shop/; redirects to /shop/
  'la-vie-de-zee-blog-posts-health-wellness-spirituality-lifestyle', // WP blog index; Astro /blog/ replaces it
  'shop', // replaced by the minimal /shop/ stub (see src/pages/shop.astro)
]);
const RENAME = { 'the-nest-by-la-vie-de-zee-%f0%9f%aa%ba': 'the-nest-by-la-vie-de-zee' };

for (const p of pages) {
  if (SKIP_PAGES.has(p.slug)) {
    inventory.excluded.push({ slug: p.slug, reason: SKIP_PAGES.has(p.slug) ? 'see HANDOFF.md' : '' });
    continue;
  }
  const slug = RENAME[p.slug] || p.slug;
  const title = decode(stripTags(p.title.rendered)) || slug;
  let desc = stripTags(p.content.rendered).slice(0, 155);
  const md = cleanMd(turndown.turndown(p.content.rendered));
  const fm = [
    '---',
    `title: ${escYaml(title)}`,
    `description: ${escYaml(desc)}`,
    `pubDate: ${p.date.slice(0, 10)}`,
    ...(p.modified.slice(0, 10) !== p.date.slice(0, 10) ? [`updatedDate: ${p.modified.slice(0, 10)}`] : []),
    `wpId: ${p.id}`,
    '---',
    '',
    md,
    '',
  ].join('\n');
  fs.writeFileSync(path.join(OUT_PAGES, `${slug}.md`), fm);
  inventory.pages.push({ slug, title, url: `/${slug}/`, wpSlug: p.slug });
}

fs.writeFileSync('inventory.json', JSON.stringify(inventory, null, 2));
console.log(`posts: ${inventory.posts.length}, pages: ${inventory.pages.length}, excluded: ${inventory.excluded.length}`);
console.log('excluded:', inventory.excluded.map((e) => e.slug).join(', '));
console.log('renamed:', JSON.stringify(RENAME));
