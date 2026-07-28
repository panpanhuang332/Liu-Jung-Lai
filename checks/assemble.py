#!/usr/bin/env python3
"""Assemble zh/ section files into output/論文全文_繁體中文.md (title page + note + body)."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
mapping = json.loads((ROOT / "source/sections/mapping.json").read_text())

NOTE = ("> 本文為英文原稿之中文譯本，原文標題：*When Enablement Narratives Backfire: "
        "Recursive Sensemaking and Modes of Adoption Response in Generative AI "
        "Implementation*。原稿目前為投稿中之手稿（manuscript under review）。")

parts = []
for e in mapping:
    p = ROOT / e["zh_path"]
    text = p.read_text().rstrip() + "\n"
    parts.append(text)
    if e["num"] == "0010":
        parts.append(NOTE + "\n")

out = ROOT / "output/論文全文_繁體中文.md"
out.write_text("\n".join(parts))
body = out.read_text()
cjk = sum(1 for ch in body if "一" <= ch <= "鿿")
print(f"written {out} — {len(body)} chars total, {cjk} CJK chars, {len(mapping)} sections")
