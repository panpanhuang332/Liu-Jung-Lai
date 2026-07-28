# Subset fonts

`noto-serif-tc-{400,700}-subset.woff2` are Noto Serif TC subsets containing
exactly the characters used on this site (1,180 glyphs), built with pyftsubset.
Two single files replace Google Fonts' ~120 unicode-range slices — one
font-load event per weight instead of a style-recalc storm on the long
full-paper page.

**If site text changes and introduces new characters**, regenerate:

```bash
# 1. collect characters (writes /tmp/subset-chars.txt)
python3 - <<'EOF'
import glob
chars = set()
for pat in ['content/zh/paper.mdx','content/glossary.json','lib/**/*.ts','app/**/*.tsx','components/**/*.tsx']:
    for f in glob.glob(pat, recursive=True):
        chars.update(open(f, encoding='utf8').read())
cjk = [c for c in chars if '⺀' <= c <= '鿿' or '豈' <= c <= '﫿' or '　' <= c <= '〿' or '＀' <= c <= '￯' or c in '‧—–「」『』…・']
extra = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,;:!?()[]{}<>%&+-=/\\\'"§°·×→↑↓*#@|~^ '
open('/tmp/subset-chars.txt','w').write(''.join(sorted(set(''.join(cjk) + extra))))
EOF

# 2. download full TTFs (legacy-UA css2 gives non-sliced files) and subset
pip install fonttools brotli
curl -s -A "Mozilla/5.0 (Windows NT 6.1)" \
  "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700" | grep -o 'https://[^)]*'
# download the two URLs printed above, then per weight:
pyftsubset nstc-400.ttf --text-file=/tmp/subset-chars.txt --flavor=woff2 \
  --layout-features='*' --output-file=assets/fonts/noto-serif-tc-400-subset.woff2
```

Characters missing from the subset fall back to the system serif per glyph —
harmless, but regenerate for visual consistency.
