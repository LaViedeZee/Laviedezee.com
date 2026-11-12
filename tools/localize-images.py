#!/usr/bin/env python3
"""Localize images for the La Vie de Zee Astro migration.

Scans src/content, src/pages, src/layouts, src/components for remote image
URLs (Jetpack Photon i0.wp.com proxies and direct laviedezee.com uploads),
downloads each unique image from its public origin URL, saves it under
public/images/ (preserving the WP uploads year/month structure), and
rewrites every literal occurrence in the source files to the local path.

Skipped (left remote, recorded in the map): tracking pixels (gopjn/pntra),
the Mailchimp branding SVG (eep.io), the ShareASale ad banner (its
affiliate attribution lives in the link, not the image).

Failed downloads are NOT rewritten — the original URL stays in place and
the failure is recorded, so posts stay intact and the dead images can be
decided on later.

Usage: python3 tools/localize-images.py [--dry-run]
Writes: tools/image-map.json, tools/image-localization-report.md
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIRS = ["src/content", "src/pages", "src/layouts", "src/components"]
EXTS = (".md", ".mdx", ".astro", ".ts", ".js")
UA = {"User-Agent": "Mozilla/5.0 (compatible; LaVieDeZee-migration/1.0)"}

# Hosts whose images we localize; everything else is left alone.
LOCALIZE_HOSTS = {"i0.wp.com", "laviedezee.com", "box5886.temp.domains", "cdn.shopify.com"}
SKIP_HOSTS = {"www.gopjn.com", "www.pntra.com", "eep.io", "static.shareasale.com"}

URL_RE = re.compile(
    r"(?:https?:)?//[A-Za-z0-9.\-~]+(?:/[^\s\"'<>)\]]*)?",
    re.IGNORECASE,
)

IMAGE_EXT = re.compile(r"\.(jpe?g|png|gif|webp|svg|avif)(\?|%3F|$)", re.IGNORECASE)


def canonical(url):
    """Return (origin_url, local_rel_path) or None if not localizable."""
    if url.startswith("//"):
        url = "https:" + url
    p = urllib.parse.urlparse(url)
    host = p.netloc.lower()
    if host in SKIP_HOSTS:
        return ("skip", url, None)
    if host not in LOCALIZE_HOSTS:
        return None
    path = urllib.parse.unquote(p.path)
    if host == "i0.wp.com":
        # /<origin-host>/<origin-path>
        parts = path.lstrip("/").split("/", 1)
        if len(parts) < 2:
            return None
        host, path = parts[0].lower(), "/" + parts[1]
        if host in SKIP_HOSTS:
            return ("skip", url, None)
        if host not in LOCALIZE_HOSTS:
            return None
    if host == "box5886.temp.domains":
        # Staging copy of the same uploads tree; prefer the live host.
        path = path.replace("/~laviedez/wp-content/uploads/", "/wp-content/uploads/")
        host = "laviedezee.com"
    if host == "cdn.shopify.com":
        local = "images/external/" + os.path.basename(path)
        return ("ok", "https://cdn.shopify.com" + path, local)
    if host == "laviedezee.com" and path.startswith("/wp-content/uploads/"):
        local = "images/" + path[len("/wp-content/uploads/"):]
        return ("ok", "https://laviedezee.com" + path, local)
    return None


def scan_files():
    files = []
    for d in SRC_DIRS:
        for base, _, names in os.walk(os.path.join(ROOT, d)):
            for n in names:
                if n.endswith(EXTS):
                    files.append(os.path.join(base, n))
    return files


def main():
    dry = "--dry-run" in sys.argv
    files = scan_files()
    # literal URL string -> canonical key
    variants = {}  # literal -> (status, origin_or_url, local)
    for f in files:
        text = open(f, encoding="utf-8").read()
        for m in URL_RE.finditer(text):
            lit = m.group(0)
            if not IMAGE_EXT.search(lit):
                continue
            if lit in variants:
                continue
            c = canonical(lit)
            if c is None:
                continue
            variants[lit] = c
    # group literals by canonical origin
    origins = {}  # origin_url -> {"local": ..., "literals": set, "status": ...}
    skipped = []
    for lit, (status, origin, local) in variants.items():
        if status == "skip":
            skipped.append(lit)
            continue
        o = origins.setdefault(origin, {"local": local, "literals": set()})
        o["literals"].add(lit)
    print(f"files scanned: {len(files)}")
    print(f"distinct image URL literals: {len(variants)}")
    print(f"unique origins to fetch: {len(origins)}  (skipped {len(skipped)})")

    def fetch(item):
        origin, info = item
        dest = os.path.join(ROOT, "public", info["local"])
        if os.path.exists(dest) and os.path.getsize(dest) > 0:
            return origin, ("cached", os.path.getsize(dest))
        candidates = [origin]
        # Photon fallback: the proxy may serve from cache even if origin 404s.
        if "laviedezee.com/wp-content/uploads/" in origin:
            candidates.append(
                "https://i0.wp.com/" + origin[len("https://"):] + "?ssl=1"
            )
        for cand in candidates:
            try:
                req = urllib.request.Request(cand, headers=UA)
                with urllib.request.urlopen(req, timeout=30) as r:
                    if r.status != 200:
                        continue
                    ctype = r.headers.get("Content-Type", "")
                    if not ctype.startswith("image/"):
                        continue
                    data = r.read()
                    if not data:
                        continue
                    os.makedirs(os.path.dirname(dest), exist_ok=True)
                    with open(dest, "wb") as fh:
                        fh.write(data)
                    return origin, ("ok", len(data), cand)
            except Exception as e:
                last = str(e)
                continue
        return origin, ("failed", last)

    results = {}
    if not dry:
        with ThreadPoolExecutor(max_workers=8) as ex:
            for origin, res in ex.map(fetch, origins.items()):
                results[origin] = res
    else:
        results = {o: ("dry-run", 0) for o in origins}

    # Rewrite: only URLs whose download succeeded (or was cached).
    ok_origins = {o for o, r in results.items() if r[0] in ("ok", "cached")}
    replaced_files = 0
    replaced_count = 0
    failed = []
    for origin, res in results.items():
        if res[0] not in ("ok", "cached"):
            failed.append((origin, res))
    for f in files:
        text = open(f, encoding="utf-8").read()
        new = text
        # Longest literals first: a short URL can be a prefix of a longer
        # variant (same image, different query string).
        for lit, (status, origin, local) in sorted(
            variants.items(), key=lambda kv: -len(kv[0])
        ):
            if status != "ok":
                continue
            if origin not in ok_origins:
                continue
            if lit in new:
                new = new.replace(lit, "/" + local)
        if new != text:
            if not dry:
                open(f, "w", encoding="utf-8").write(new)
            replaced_files += 1
    # count actual replacements
    replaced_count = 0
    for lit, (status, origin, local) in variants.items():
        if status == "ok" and origin in ok_origins:
            for f in files:
                replaced_count += open(f, encoding="utf-8").read().count("/" + local)

    ok = [o for o, r in results.items() if r[0] == "ok"]
    cached = [o for o, r in results.items() if r[0] == "cached"]
    print(f"downloaded: {len(ok)}  cached: {len(cached)}  failed: {len(failed)}")
    print(f"files rewritten: {replaced_files}  literal replacements now pointing local: {replaced_count}")
    for origin, res in sorted(failed):
        print("FAILED:", origin, res)

    report = {
        "downloaded": len(ok),
        "cached": len(cached),
        "failed": [{"url": o, "error": str(r)} for o, r in sorted(failed)],
        "skipped_remote": sorted(set(skipped)),
        "mapping": {
            o: {"local": "/" + info["local"], "status": results[o][0]}
            for o, info in sorted(origins.items())
        },
    }
    with open(os.path.join(ROOT, "tools", "image-map.json"), "w") as fh:
        json.dump(report, fh, indent=2)
    lines = ["# Image localization report\n",
             f"- Downloaded: {len(ok)}, cached: {len(cached)}, failed: {len(failed)}\n",
             f"- Files rewritten: {replaced_files}\n",
             "\n## Failed downloads (left pointing at the original remote URL)\n"]
    for o, r in sorted(failed):
        lines.append(f"- `{o}` — {r}\n")
    lines.append("\n## Deliberately left remote\n")
    for s in sorted(set(skipped)):
        lines.append(f"- `{s}`\n")
    with open(os.path.join(ROOT, "tools", "image-localization-report.md"), "w") as fh:
        fh.writelines(lines)
    print("wrote tools/image-map.json and tools/image-localization-report.md")


if __name__ == "__main__":
    main()
