#!/usr/bin/env python3
"""Mechanical verification of the zh translation against the English source.

Checks per section pair (source/sections/NNNN.md vs zh/NNNN_*.md):
  1. Paragraph-count equality (tables excluded, compared separately) -> FAIL
  2. Sentence-count difference > 15% -> WARN (approximate: EN abbreviations inflate)
  3. Length ratio zh-CJK-chars / en-words outside 1.5-2.1 (hard bounds 1.35/2.4) -> WARN
  4. Table dimensions (rows x cols) mismatch -> FAIL
  5. Citation completeness: every (Surname, YYYY) / Surname (YYYY) in EN must
     appear (surname verbatim + year) in the zh section -> FAIL per missing pair
  6. Glossary consistency (global): en term frequency vs zh term frequency -> WARN;
     known forbidden variant translations -> FAIL
  7. Non-Taiwan vocabulary scan -> WARN

Output: checks/report.md
"""

import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
mapping = json.loads((ROOT / "source/sections/mapping.json").read_text())

SKIP_CONTENT_CHECKS = {"0550"}  # references copied verbatim
TITLE_SECTION = "0010"

PRC_TERMS = [
    "信息", "软件", "軟件", "网络", "網絡", "算法", "視頻", "视频",
    "智能手機", "數據庫", "数据库", "缺省", "用戶", "用户", "質量",
    "遞歸", "递归", "數據", "计算机", "計算機",
]
# terms whose presence indicates a second translation for a fixed glossary term
FORBIDDEN_VARIANTS = {
    "意會": "sensemaking 應譯「意義建構」",
    "意義生成": "sensemaking 應譯「意義建構」",
    "使能敘事": "enablement narrative 應譯「賦能敘事」",
    "賦權敘事": "enablement narrative 應譯「賦能敘事」",
    "防禦性採用": "defensive adoption 應譯「防衛性採用」",
    "純順從性使用": "compliance-only use 應譯「純遵從性使用」",
    "真實整合": "genuine integration 應譯「真正整合」",
    "意義給予": "sensegiving 應譯「意義賦予」",
    "機器啟發式": "machine heuristic 應譯「機器捷思」",
    "工作重塑": "job crafting 應譯「工作形塑」",
    "工作塑造": "job crafting 應譯「工作形塑」",
    "角色重塑": "role reinvention 應譯「角色再造」",
    "應對資源": "coping resources 應譯「因應資源」",
    "評價理論": "appraisal theory 應譯「評估理論」",
}


def strip_tables_en(text: str):
    """Remove pandoc grid-table regions; return (clean_text, [(rows, cols)])."""
    lines = text.split("\n")
    out, tables = [], []
    i = 0
    while i < len(lines):
        if re.match(r"^\s*-{20,}\s*$", lines[i]):
            j = i + 1
            block = []
            while j < len(lines) and not re.match(r"^\s*-{20,}\s*$", lines[j]):
                block.append(lines[j])
                j += 1
            # separator line with dash groups defines the column count
            cols = 0
            for bl in block:
                if re.match(r"^\s*-+(\s+-+)+\s*$", bl):
                    cols = len(re.findall(r"-+", bl))
                    break
            # rows = blank-line-separated groups of non-separator lines
            groups, cur = [], []
            for bl in block:
                if re.match(r"^\s*-+(\s+-+)+\s*$", bl) or bl.strip() == "":
                    # the header/body separator line is also a row boundary
                    if cur:
                        groups.append(cur)
                        cur = []
                    continue
                cur.append(bl)
            if cur:
                groups.append(cur)
            tables.append((len(groups), cols))
            i = j + 1
        else:
            out.append(lines[i])
            i += 1
    return "\n".join(out), tables


def strip_tables_zh(text: str):
    lines = text.split("\n")
    out, cur_rows, tables = [], 0, []
    cols = 0
    for l in lines:
        if l.lstrip().startswith("|"):
            cells = [c for c in l.strip().strip("|").split("|")]
            if re.match(r"^\s*\|?[\s:|-]+\|?\s*$", l):
                continue  # separator row
            cur_rows += 1
            cols = max(cols, len(cells))
        else:
            if cur_rows:
                tables.append((cur_rows, cols))
                cur_rows, cols = 0, 0
            out.append(l)
    if cur_rows:
        tables.append((cur_rows, cols))
    return "\n".join(out), tables


def paragraphs(text: str):
    # drop the image line and heading attribute noise, keep real paragraphs
    blocks = [b.strip() for b in re.split(r"\n\s*\n", text) if b.strip()]
    return [b for b in blocks if not b.startswith("#")]


def en_sentences(text: str) -> int:
    t = re.sub(r"\b(e\.g|i\.e|et al|cf|vs|etc|U\.S|Vol|pp|St)\.", r"\1", text)
    return len(re.findall(r"[.!?](?=\s|\"|\)|$)", t))


def zh_sentences(text: str) -> int:
    return len(re.findall(r"[。！？]", text))


def cjk_len(text: str) -> int:
    return sum(1 for ch in text if unicodedata.east_asian_width(ch) in ("W", "F")
               and not unicodedata.category(ch).startswith("P"))


def en_words(text: str) -> int:
    return len(re.findall(r"[A-Za-z0-9''\-]+", text))


def citations(text: str):
    pairs = set()
    # narrative: Surname (1995) / Surname et al. (2014) / Surname and Surname (1994)
    for m in re.finditer(r"([A-Z][A-Za-z''\-]+)(?:\s+(?:and|&)\s+([A-Z][A-Za-z''\-]+))?(?:['']s)?(?:\s+et al\.)?\s*\((\d{4})\)", text):
        year = m.group(3)
        pairs.add((re.sub(r"[''’]s$", "", m.group(1)), year))
        if m.group(2):
            pairs.add((re.sub(r"[''’]s$", "", m.group(2)), year))
    # parenthetical blocks
    for m in re.finditer(r"\(([^()]*\b\d{4}[a-z]?\b[^()]*)\)", text):
        inner = m.group(1)
        for part in inner.split(";"):
            ym = re.search(r"\b(\d{4})[a-z]?\b", part)
            if not ym:
                continue
            year = ym.group(1)
            for sm in re.finditer(r"([A-Z][A-Za-z''\-]{2,})", part[: ym.start()]):
                w = sm.group(1)
                if w in ("See", "Also", "Eds", "Ed", "In", "The", "Section", "Sections",
                         "Table", "Figure", "Proposition", "Vol", "Paper", "Article"):
                    continue
                pairs.add((w, year))
    return pairs


STOP_SURNAMES = {"AI", "STARA", "MAIN", "CASA", "P1", "RQ1"}

report = ["# 翻譯驗證報表", ""]
fail_count = warn_count = 0
summary_rows = []

en_full = (ROOT / "source/en_full.md").read_text()

for entry in mapping:
    num = entry["num"]
    en_path = ROOT / entry["en_path"]
    zh_path = ROOT / entry["zh_path"]
    issues = []
    if not zh_path.exists():
        report.append(f"## {num} {entry['zh_title']}\n\n- FAIL: 譯檔不存在 {entry['zh_path']}\n")
        fail_count += 1
        summary_rows.append((num, "MISSING", "-", "-", "-"))
        continue
    en_text = en_path.read_text()
    zh_text = zh_path.read_text()

    en_clean, en_tables = strip_tables_en(en_text)
    zh_clean, zh_tables = strip_tables_zh(zh_text)

    ep, zp = paragraphs(en_clean), paragraphs(zh_clean)
    ratio = None
    if num not in SKIP_CONTENT_CHECKS:
        if len(ep) != len(zp):
            issues.append(("FAIL", f"段落數不符：英 {len(ep)} 段 vs 中 {len(zp)} 段"))
        es, zs = en_sentences(" ".join(ep)), zh_sentences(" ".join(zp))
        if es > 3 and abs(es - zs) / max(es, 1) > 0.15:
            issues.append(("WARN", f"句數差異 >15%：英 ~{es} 句 vs 中 {zs} 句（英文句數為近似值）"))
        ew, zc = en_words(" ".join(ep)), cjk_len(" ".join(zp))
        if ew > 30:
            ratio = zc / ew
            if ratio < 1.35:
                issues.append(("WARN", f"篇幅比 {ratio:.2f} < 1.35，高度懷疑壓縮"))
            elif ratio > 2.4:
                issues.append(("WARN", f"篇幅比 {ratio:.2f} > 2.4，懷疑贅譯"))
            elif not (1.5 <= ratio <= 2.1):
                issues.append(("WARN", f"篇幅比 {ratio:.2f} 略出常態區間 1.5–2.1"))
        if len(en_tables) != len(zh_tables):
            issues.append(("FAIL", f"表格數不符：英 {len(en_tables)} vs 中 {len(zh_tables)}"))
        else:
            for t_i, ((er, ec), (zr, zc2)) in enumerate(zip(en_tables, zh_tables), 1):
                if er != zr or ec != zc2:
                    issues.append(("FAIL", f"表 {t_i} 尺寸不符：英 {er}×{ec} vs 中 {zr}×{zc2}"))
        # citations
        missing = []
        for surname, year in sorted(citations(en_text)):
            if surname in STOP_SURNAMES:
                continue
            if surname not in zh_text or year not in zh_text:
                missing.append(f"{surname} ({year})")
        if missing:
            issues.append(("FAIL", "引註缺漏：" + "、".join(missing)))
    # PRC vocabulary (算法 must not match inside 演算法)
    hits = [t for t in PRC_TERMS
            if (re.search(r"(?<!演)算法", zh_text) if t == "算法" else t in zh_text)]
    if hits:
        issues.append(("WARN", "疑似非臺灣用語：" + "、".join(sorted(set(hits)))))
    for variant, msg in FORBIDDEN_VARIANTS.items():
        if variant in zh_text:
            issues.append(("FAIL", f"術語變體「{variant}」：{msg}"))

    status = "PASS"
    if any(s == "FAIL" for s, _ in issues):
        status = "FAIL"
    elif issues:
        status = "WARN"
    fail_count += sum(1 for s, _ in issues if s == "FAIL")
    warn_count += sum(1 for s, _ in issues if s == "WARN")
    summary_rows.append((num, status, f"{len(ep)}/{len(zp)}",
                         f"{ratio:.2f}" if ratio else "-", str(len(issues))))
    if issues:
        report.append(f"## {num} {entry['zh_title']}")
        report.append("")
        for s, msg in issues:
            report.append(f"- **{s}**: {msg}")
        report.append("")

# global glossary consistency
report.append("## 全域術語一致性（terms.tsv）")
report.append("")
zh_all = "".join((ROOT / e["zh_path"]).read_text()
                 for e in mapping if (ROOT / e["zh_path"]).exists()
                 and e["num"] not in SKIP_CONTENT_CHECKS)
en_norm = en_full.replace("---", "—").replace("--", "-").lower()
gloss_warns = []
for line in (ROOT / "glossary/terms.tsv").read_text().splitlines()[1:]:
    cols = line.split("\t")
    if len(cols) < 2:
        continue
    en_term, zh_term = cols[0], cols[1]
    keys = [k.strip().lower().replace("–", "-") for k in re.split(r"[/;]", en_term) if k.strip()]
    en_count = sum(len(re.findall(re.escape(k), en_norm)) for k in keys if len(k) > 3)
    zh_variants = [v for v in re.split(r"[／;；]", re.sub(r"（[^）]*）", "", zh_term)) if v]
    zh_count = sum(zh_all.count(v) for v in zh_variants)
    if en_count >= 3 and zh_count < en_count * 0.4:
        gloss_warns.append(f"- WARN: 「{en_term}」英文出現約 {en_count} 次，譯名「{zh_term}」僅出現 {zh_count} 次")
if gloss_warns:
    report.extend(gloss_warns)
    warn_count += len(gloss_warns)
else:
    report.append("- 未發現顯著落差。")
report.append("")

# summary table at top
head = [
    "# 翻譯驗證報表", "",
    f"**FAIL 總數：{fail_count}　WARN 總數：{warn_count}**", "",
    "| 檔 | 狀態 | 段落(英/中) | 篇幅比 | 問題數 |",
    "|---|---|---|---|---|",
]
head += [f"| {n} | {s} | {p} | {r} | {c} |" for n, s, p, r, c in summary_rows]
head.append("")
final = "\n".join(head + report[2:])
(ROOT / "checks/report.md").write_text(final)
print(f"FAIL={fail_count} WARN={warn_count}")
print("report written to checks/report.md")
