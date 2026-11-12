#!/usr/bin/env python3
"""Remove blank lines that fall INSIDE an HTML element in the .md
content files, and dedent lines indented >= 4 spaces (outside
<pre>/<script>).

Why: in Markdown, a blank line ends an HTML block (CommonMark type 6).
WordPress HTML is full of blank lines *inside* elements (<div>,
<svg>, <style>, <figure>, <details>...). After a blank line, the
rest of the element is parsed as Markdown: wrapped in <p> tags,
smart-quoted, or turned into a code block. That silently breaks
inline <style> CSS (rules dropped) and inline <svg> graphics (text
nodes moved inside <p>). Removing the blank lines keeps the whole
element inside one raw HTML block; blank lines *between* top-level
blocks are untouched, and CSS/JS text is unaffected (blank lines are
insignificant there).

Two special cases: <pre> regions are left alone (blank lines are
content there). <script> regions are left alone when top-level
(CommonMark type-1 blocks survive blank lines), but blank lines
inside a <script> nested in another element ARE removed — a nested
script sits in a type-6 block, where a blank line ends the block
and indented JS becomes a code block.

Run from the astro-like-for-like directory. Idempotent.
"""
import re
import pathlib
import sys

VOID = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'source', 'track', 'wbr',
}
TAG_RE = re.compile(
    r'<!--.*?-->|<(/?)([a-zA-Z][a-zA-Z0-9]*)((?:\s[^>]*?)?)(/?)>', re.S
)


def process(text):
    lines = text.splitlines(keepends=True)
    out = []
    depth = 0
    in_pre = False
    in_script = False
    # True when the current <script> opened while nested inside another
    # HTML element (depth > 0). A top-level <script> is a CommonMark
    # type-1 HTML block: blank lines inside it do NOT end the block,
    # so they are left alone (protects multi-line string literals). A
    # nested <script> sits inside a type-6 block, where a blank line
    # DOES end the block — the rest of the script is then parsed as
    # Markdown and indented JS becomes a code block. So blank lines
    # inside a nested <script> are removed (JS ignores blank lines;
    # the one nested script in the corpus — the Wellness OS draft —
    # has no template literals, verified Nov 10).
    script_nested = False
    removed_blank = 0
    dedented = 0
    for line in lines:
        low = line.lower()
        if in_script:
            if not line.strip() and script_nested:
                removed_blank += 1
                continue
            out.append(line)
            if '</script' in low:
                in_script = False
                script_nested = False
                depth = max(0, depth - 1)
            continue
        if in_pre:
            out.append(line)
            if '</pre' in low:
                in_pre = False
                depth = max(0, depth - 1)
            continue
        stripped = line.lstrip()
        indent = len(line) - len(stripped)
        if not stripped.strip():
            # Blank line: drop it only while inside an HTML element.
            if depth > 0:
                removed_blank += 1
                continue
            out.append(line)
            continue
        # Dedent lines indented >= 4 spaces (they would become
        # indented code blocks in Markdown).
        if indent >= 4:
            line = stripped
            dedented += 1
        out.append(line)
        for m in TAG_RE.finditer(line):
            if m.group(0).startswith('<!--'):
                continue
            closing, tag, _attrs, selfclose = (
                m.group(1), m.group(2).lower(), m.group(3), m.group(4)
            )
            # A <script>/<pre> that opens AND closes on the same line
            # (e.g. the Instagram embed.js loader) must not leave the
            # tracker stuck inside the region — that bug skipped every
            # later blank-line fix in the file. Set the flag from the
            # LAST script/pre tag seen on the line.
            if tag == 'script' and not selfclose:
                in_script = not closing
                if in_script:
                    script_nested = depth > 0
            if tag == 'pre' and not selfclose:
                in_pre = not closing
            if tag in VOID or selfclose:
                continue
            if closing:
                depth = max(0, depth - 1)
            else:
                depth += 1
    return ''.join(out), removed_blank, dedented


def main():
    root = pathlib.Path('src/content')
    total_blank = 0
    total_dedent = 0
    for f in sorted(root.rglob('*.md')):
        text = f.read_text()
        parts = text.split('---', 2)
        if len(parts) == 3:
            head, fm, body = parts[0], parts[1], parts[2]
            new_body, nb, nd = process(body)
            if nb or nd:
                f.write_text(head + '---' + fm + '---' + new_body)
                print(f'{f.name}: removed {nb} blank lines, dedented {nd}')
                total_blank += nb
                total_dedent += nd
        else:
            new_text, nb, nd = process(text)
            if nb or nd:
                f.write_text(new_text)
                print(f'{f.name}: removed {nb} blank lines, dedented {nd}')
                total_blank += nb
                total_dedent += nd
    print(f'TOTAL: {total_blank} blank lines removed, {total_dedent} lines dedented')


if __name__ == '__main__':
    main()
