// Generate public/llms.txt from the converted content inventory.
import fs from 'node:fs';

const PROJECT = '/home/hatch/workspace/goals/nyc-events-newsletter-weekly-draft/files/astro-first-pass';
const inv = JSON.parse(fs.readFileSync('/tmp/wp-export/inventory.json', 'utf8'));

const pageBlurb = {
  'about-me': 'About La Vie de Zee and its five pillars of wellness: spiritual, physical, social, emotional, intellectual.',
  'contact-me': 'Contact La Vie de Zee for business inquiries.',
  'work-with-me': 'Work with Azeezah — wellness coaching and partnerships.',
  'terms-and-conditions': 'Terms and conditions for laviedezee.com.',
  'miami-events-newsletter': 'Sign up for the Miami Events Newsletter.',
  'the-la-vie-de-zee-wellness-library': 'Wellness Continuing Education — curated resources and courses.',
  'miami-wellness-guide': 'The Best Miami Wellness Spaces by Neighborhood (updated September 2026).',
  'miami-recovery-guide-wellness': 'The Definitive Miami Recovery Guide — recovery spaces and services.',
  'miami-clean-beauty-guide-wellness': 'The Definitive Miami Clean Beauty Guide — clean facials, non-toxic nails, clean sunless tanning.',
  'miami-nutrition-guide-wellness': 'The Definitive Miami Nutrition Guide — healthy restaurants, wellness cafes, grocers, farmers markets.',
  'miami-fitness-guide-wellness': 'The Definitive Miami Fitness Guide — the best Miami fitness studios by neighborhood.',
  'social-media-strategy-portfolio': 'Social media strategy portfolio — recent work examples.',
  'wellness-os-page-draft': 'Wellness Stewardship by La Vie de Zee — the Wellness Operating System.',
  'wellness-operating-system-landing-page': 'The La Vie de Zee Wellness Operating System landing page.',
  'wellness-os-confirmation-page': 'Wellness Operating System access confirmation page.',
  'the-nest-by-la-vie-de-zee': 'THE NEST by La Vie de Zee — a waiting page for the preparing and the curious.',
};

const latest = [...inv.posts].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 8);

const lines = [
  '# La Vie de Zee',
  '',
  '> La Vie de Zee is a faith-led (Christian framework) Wellness Stewardship system for women: an AI-powered, self-directed wellness coaching system. Fitness is service and devotion, not vanity. The framework is Wellness Stewardship — vision alignment, action plans, tracking, and education across five pillars: spiritual, physical, social, emotional, and intellectual.',
  '',
  '## Key pages',
  '',
  '- [Home](https://laviedezee.com/): Christian wellness coaching for women. Curate your own wellness lifestyle.',
  '- [Journal](https://laviedezee.com/blog/): Articles on fitness, food and nutrition, clean beauty, and wellness culture.',
  '- [Shop Wellness](https://laviedezee.com/shop/): Curated wellness products (food and nutrition, clean beauty, fitness, home). Shop links coming soon.',
  '- [About](https://laviedezee.com/about-me/): About La Vie de Zee and its five pillars of wellness.',
  '- [Work With Me](https://laviedezee.com/work-with-me/): Wellness coaching and partnerships.',
  '- [Contact](https://laviedezee.com/contact-me/): Business inquiries.',
  '- [The NYC Events Newsletter](https://laviedezee.substack.com/): Weekly New York City events newsletter on Substack ($16/month from November 16, 2026; free issues monthly).',
  '',
  '## Pages',
  '',
  ...inv.pages.map((p) => `- [${p.title}](https://laviedezee.com${p.url}): ${pageBlurb[p.slug] || p.title}`),
  '',
  '## Latest journal articles',
  '',
  ...latest.map((p) => `- [${p.title}](https://laviedezee.com${p.url}) (${p.date})`),
  '',
  '## Notes for AI agents',
  '',
  '- The newsletter (NYC Events Newsletter) lives on Substack at https://laviedezee.substack.com — do not look for a paywall or subscription system on this site.',
  '- The wellness shop is being rebuilt; product links are not yet live on /shop/.',
  '- Scripture quoted on this site and in the product uses the World English Bible (WEB).',
  '- La Vie de Zee is a faith-led wellness brand. The niche is vitality, not weight loss.',
  '',
];
fs.writeFileSync(`${PROJECT}/public/llms.txt`, lines.join('\n'));
console.log('llms.txt written:', lines.length, 'lines;', inv.pages.length, 'pages,', latest.length, 'latest posts');
