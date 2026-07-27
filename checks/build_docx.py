#!/usr/bin/env python3
"""Build output/論文全文_繁體中文.docx via pandoc, then patch styles for
標楷體 (DFKai-SB), 12pt, 1.5 line spacing, A4 with 2.54 cm margins."""

import re
import shutil
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MD = ROOT / "output/論文全文_繁體中文.md"
DOCX = ROOT / "output/論文全文_繁體中文.docx"

subprocess.run(
    ["pandoc", str(MD), "-o", str(DOCX), "--from", "markdown", "--standalone",
     "--resource-path", str(ROOT / "source/media")],
    check=True, cwd=ROOT,
)

tmp = ROOT / "output/_docx_tmp"
if tmp.exists():
    shutil.rmtree(tmp)
with zipfile.ZipFile(DOCX) as z:
    z.extractall(tmp)

styles = tmp / "word/styles.xml"
s = styles.read_text(encoding="utf-8")

# Normal style: 標楷體 for East Asian text, 12pt, 1.5 line spacing
normal = re.search(r'<w:style [^>]*w:styleId="Normal".*?</w:style>', s, re.S).group(0)
new_normal = normal
rpr_font = '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:eastAsia="標楷體"/><w:sz w:val="24"/><w:szCs w:val="24"/>'
if "<w:rPr>" in new_normal:
    new_normal = re.sub(r"<w:rPr>.*?</w:rPr>", f"<w:rPr>{rpr_font}</w:rPr>", new_normal, flags=re.S)
else:
    new_normal = new_normal.replace("</w:style>", f"<w:rPr>{rpr_font}</w:rPr></w:style>")
spacing = '<w:spacing w:line="360" w:lineRule="auto"/>'
if "<w:pPr>" in new_normal:
    if "<w:spacing" in new_normal:
        new_normal = re.sub(r"<w:spacing[^/]*/>", spacing, new_normal)
    else:
        new_normal = new_normal.replace("<w:pPr>", f"<w:pPr>{spacing}")
else:
    new_normal = new_normal.replace("</w:style>", f"<w:pPr>{spacing}</w:pPr></w:style>")
s = s.replace(normal, new_normal)

# Heading styles: keep serif East Asian font as 標楷體 too
s = re.sub(r'(<w:style [^>]*w:styleId="Heading\d".*?)</w:style>',
           lambda m: (re.sub(r'w:eastAsia="[^"]*"', 'w:eastAsia="標楷體"', m.group(1))
                      if 'w:eastAsia="' in m.group(1)
                      else m.group(1).replace("<w:rPr>", '<w:rPr><w:rFonts w:eastAsia="標楷體"/>', 1)
                      ) + "</w:style>",
           s, flags=re.S)
styles.write_text(s, encoding="utf-8")

# Page geometry: A4, 2.54 cm (=1440 twips) margins, on every sectPr
doc = tmp / "word/document.xml"
d = doc.read_text(encoding="utf-8")
d = re.sub(r"<w:pgSz[^/]*/>", '<w:pgSz w:w="11906" w:h="16838"/>', d)
d = re.sub(r"<w:pgMar[^/]*/>",
           '<w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" '
           'w:header="720" w:footer="720" w:gutter="0"/>', d)
doc.write_text(d, encoding="utf-8")

DOCX.unlink()
with zipfile.ZipFile(DOCX, "w", zipfile.ZIP_DEFLATED) as z:
    for f in sorted(tmp.rglob("*")):
        if f.is_file():
            z.write(f, f.relative_to(tmp))
shutil.rmtree(tmp)
print("docx built:", DOCX)
