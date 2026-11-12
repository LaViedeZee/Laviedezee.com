#!/usr/bin/env python3
"""Token-based diff of the built dist/ HTML against live WordPress HTML
snapshots in tools/live-audit/.

Normalization (so the diff shows real differences, not delivery
artifacts): HTML comments stripped, whitespace collapsed, hosts
normalized (laviedezee.com / i0.wp.com removed), query strings
stripped, srcset attributes dropped. Image URLs are expected to
differ in their path prefix (/wp-content/uploads/ vs /images/) — those
show up as `replace` opcodes on <img> tags and are the known
localization difference, not a layout difference.

Run from the astro-like-for-like directory:
    python3 tools/diff.py [name ...]
With no args, diffs every pair in PAIRS. With args, only those names.
"""
import re
import pathlib
import difflib
import sys

LIVE = pathlib.Path('tools/live-audit')
DIST = pathlib.Path('dist')

# (name, live file, dist path)
PAIRS = [
    ('home', 'home.html', 'index.html'),
    ('home-p2', 'home-page-2.html', 'page/2/index.html'),
    ('home-p3', 'home-page-3.html', 'page/3/index.html'),
    ('home-p4', 'home-page-4.html', 'page/4/index.html'),
    ('about', 'about-me.html', 'about-me/index.html'),
    ('padel', 'padel-a-beginners-style-guide.html', 'padel-a-beginners-style-guide/index.html'),
    ('guide-wellness', 'miami-wellness-guide.html', 'miami-wellness-guide/index.html'),
    ('guide-fitness', 'miami-fitness-guide-wellness.html', 'miami-fitness-guide-wellness/index.html'),
    ('guide-nutrition', 'miami-nutrition-guide-wellness.html', 'miami-nutrition-guide-wellness/index.html'),
    ('guide-recovery', 'miami-recovery-guide-wellness.html', 'miami-recovery-guide-wellness/index.html'),
    ('guide-clean-beauty', 'miami-clean-beauty-guide-wellness.html', 'miami-clean-beauty-guide-wellness/index.html'),
    ('os-landing', 'wellness-operating-system-landing-page.html', 'wellness-operating-system-landing-page/index.html'),
    ('os-draft', 'wellness-os-page-draft.html', 'wellness-os-page-draft/index.html'),
    ('os-confirm', 'wellness-os-confirmation-page.html', 'wellness-os-confirmation-page/index.html'),
    ('blog', 'blog-slug.html', 'la-vie-de-zee-blog-posts-health-wellness-spirituality-lifestyle/index.html'),
    ('landing', 'check2-event-partnership-advisory-services.html', 'event-partnership-advisory-services/index.html'),
    ('shop', 'shop.html', 'shop/index.html'),
    ('cat-fitness', 'category-fitness.html', 'category/fitness/index.html'),
    ('cat-food', 'category-food.html', 'category/food-and-nutrition/index.html'),
    ('cat-food-p2', 'category-food-page-2.html', 'category/food-and-nutrition/page/2/index.html'),
    ('cat-general', 'category-general.html', 'category/general/index.html'),
    ('cat-clean-beauty', 'category-clean-beauty.html', 'category/clean-beauty/index.html'),
    ('cat-youtube', 'category-youtube.html', 'category/youtube/index.html'),
    ('cat-home', 'category-laviedezee-home.html', 'category/laviedezee-home/index.html'),
    ('cat-spirituality', 'category-spirituality.html', 'category/spirituality/index.html'),
    ('author', 'author-laviedezee.html', 'author/laviedezee/index.html'),
    ('author-p2', 'author-page-2.html', 'author/laviedezee/page/2/index.html'),
    ('author-p3', 'author-page-3.html', 'author/laviedezee/page/3/index.html'),
    ('author-p4', 'author-page-4.html', 'author/laviedezee/page/4/index.html'),
    ('recipe-turmeric', 'check2-recipes-turmeric-cashew-cream-roasted-cauliflower-steak-recipe.html', 'recipes/turmeric-cashew-cream-roasted-cauliflower-steak-recipe/index.html'),
    ('recipe-cant-beet', 'check2-recipes-cant-beet-this-juice.html', 'recipes/cant-beet-this-juice/index.html'),
    ('recipe-protein-bowl', 'recipe-chocolate-peanut-butter-protein-bowl.html', 'recipes/chocolate-peanut-butter-protein-bowl/index.html'),
    ('recipe-oats', 'recipe-fall-inspired-overnight-oats.html', 'recipes/fall-inspired-overnight-oats/index.html'),
    ('recipe-orzo', 'recipe-springtime-orzo-salad.html', 'recipes/springtime-orzo-salad/index.html'),
    ('recipe-green-juice', 'recipe-the-green-juice-goddess.html', 'recipes/the-green-juice-goddess/index.html'),
    ('recipe-spicy-feta', 'recipe-spicy-feta-stuffed-banana-peppers.html', 'recipes/spicy-feta-stuffed-banana-peppers/index.html'),
    ('recipe-cat-breakfast', 'recipe-category-breakfast.html', 'recipe-category/breakfast-recipes/index.html'),
    ('recipe-cat-dinner', 'recipe-category-dinner.html', 'recipe-category/dinner-recipes/index.html'),
]


def tokens(html):
    html = re.sub(r'<!--.*?-->', '', html, flags=re.S)
    html = re.sub(r'>\s+<', '><', html)
    html = re.sub(r'\s+', ' ', html)
    html = re.sub(r'https://i0\.wp\.com/laviedezee\.com', '', html)
    html = re.sub(r'https://laviedezee\.com', '', html)
    html = re.sub(r'\?[^"\' ]*', '', html)
    html = re.sub(r'&amp;|&#038;', '&', html)
    html = re.sub(r'\s+srcset="[^"]*"', '', html)
    return [p.strip() for p in re.split(r'(<[^>]+>)', html) if p.strip()]


def region(html, a, b):
    m = re.search(a, html)
    if not m:
        return ''
    n = re.search(b, html[m.end():])
    return html[m.start():m.end() + (n.start() if n else 0)]


def head_title_desc(html):
    t = re.search(r'<title>(.*?)</title>', html, re.S)
    d = re.search(r'<meta name="description" content(?:="([^"]*)")?', html)
    return (t.group(1).strip() if t else '(none)',
            (d.group(1) if d and d.group(1) else ('(empty)' if d else '(none)')))


def body_class(html):
    m = re.search(r'<body class="([^"]*)"', html)
    return m.group(1) if m else '(none)'


def main():
    wanted = set(sys.argv[1:]) or None
    for name, lf, df in PAIRS:
        if wanted and name not in wanted:
            continue
        live = (LIVE / lf).read_text(errors='replace')
        dist = (DIST / df).read_text(errors='replace')
        lt = tokens(region(live, r'<main[^>]*>', r'</main>'))
        dt = tokens(region(dist, r'<main[^>]*>', r'</main>'))
        ops = [o for o in difflib.SequenceMatcher(
            None, lt, dt, autojunk=False).get_opcodes() if o[0] != 'equal']
        print(f'{name}: live={len(lt)} dist={len(dt)} diff-opcodes={len(ops)}')
        for tag, i1, i2, j1, j2 in ops[:4]:
            print(f'  {tag} live: {" ".join(lt[i1:i2])[:160]}')
            print(f'       dist: {" ".join(dt[j1:j2])[:160]}')
        # head + body class, shown once per pair (cheap sanity)
        lt2, ld2 = head_title_desc(live)
        dt2, dd2 = head_title_desc(dist)
        if lt2 != dt2:
            print(f'  TITLE live: {lt2}')
            print(f'  TITLE dist: {dt2}')
        if ld2 != dd2:
            print(f'  DESC live: {ld2[:120]}')
            print(f'  DESC dist: {dd2[:120]}')
        lbc, dbc = body_class(live), body_class(dist)
        if lbc != dbc:
            print(f'  BODYCLASS live: {lbc}')
            print(f'  BODYCLASS dist: {dbc}')


if __name__ == '__main__':
    main()
