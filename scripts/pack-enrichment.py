#!/usr/bin/env python3
"""Pack fancy-world plogs / mottos / comics / scenery into dos-quiz."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FW = Path("/Users/answerchen/MyApp/fancy-world/application")
MP = ROOT / "miniprogram"
UTILS = MP / "utils"
ASSETS = MP / "assets"
CLOUD = ROOT / "upload-to-cloud" / "quiz"

CHAR_BOOK = {
    "raskolnikov": "crime-and-punishment",
    "sonya": "crime-and-punishment",
    "svidrigailov": "crime-and-punishment",
    "razumikhin": "crime-and-punishment",
    "ivan-karamazov": "the-brothers-karamazov",
    "alyosha-karamazov": "the-brothers-karamazov",
    "dmitry-karamazov": "the-brothers-karamazov",
    "grushenka": "the-brothers-karamazov",
    "fyodor-karamazov": "the-brothers-karamazov",
    "prince-myshkin": "the-idiot",
    "nastasya": "the-idiot",
    "rogozhin": "the-idiot",
    "underground-man": "notes-from-underground",
    "stavrogin": "demons",
    "dreamer": "white-nights",
    "arkady": "the-adolescent",
    "netochka": "netochka-nezvanova",
    "yefimov": "netochka-nezvanova",
}

BOOK_TITLE = {
    "crime-and-punishment": "罪与罚",
    "the-brothers-karamazov": "卡拉马佐夫兄弟",
    "the-idiot": "白痴",
    "notes-from-underground": "地下室手记",
    "demons": "群魔",
    "white-nights": "白夜",
    "the-adolescent": "少年",
    "netochka-nezvanova": "涅托奇卡·涅兹瓦诺娃",
}

MOTTOS = [
    "dostoevsky-man-is-a-mystery",
    "beauty-will-save-world-dostoevsky",
    "dostoevsky-love-abuse-right",
]


def sips_jpeg(src: Path, dest: Path, size: int, quality: int = 70) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["sips", "-s", "format", "jpeg", "-Z", str(size), str(src), "--out", str(dest)],
        check=True,
        capture_output=True,
    )
    subprocess.run(
        ["sips", "-s", "formatOptions", str(quality), str(dest)],
        check=False,
        capture_output=True,
    )


def clean_md(text: str) -> str:
    text = re.sub(r"==([^=]+)==", r"\1", text)
    text = text.replace("\\", "")
    return text.strip()


def parse_cards(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    lines = raw.splitlines()
    title = ""
    cover_hook = ""
    slides = []
    i = 0
    while i < len(lines):
        line = lines[i].rstrip()
        if line.startswith("# ") and not line.startswith("## "):
            title = clean_md(line[2:])
            i += 1
            while i < len(lines) and not lines[i].strip():
                i += 1
            if i < len(lines) and lines[i].lstrip().startswith(">"):
                cover_hook = clean_md(lines[i].lstrip()[1:].strip())
                i += 1
            continue
        if line.startswith("## "):
            sec_title = clean_md(line[3:])
            i += 1
            hook = ""
            while i < len(lines) and not lines[i].strip():
                i += 1
            if i < len(lines) and lines[i].lstrip().startswith(">"):
                hook = clean_md(lines[i].lstrip()[1:].strip())
                i += 1
            body_lines = []
            while i < len(lines) and not lines[i].startswith("## ") and not (
                lines[i].startswith("# ") and not lines[i].startswith("## ")
            ):
                if lines[i].strip() and not lines[i].startswith("<!--"):
                    body_lines.append(lines[i])
                i += 1
            body = clean_md("".join(body_lines) if len("".join(body_lines)) < 80 else "\n".join(body_lines))
            # keep short body snippet
            body = re.sub(r"\s+", " ", body).strip()
            if len(body) > 120:
                body = body[:118] + "…"
            slides.append({"title": sec_title, "hook": hook, "body": body})
            continue
        i += 1
    return {"title": title, "hook": cover_hook, "slides": slides}


def write_js_module(path: Path, data) -> None:
    path.write_text(
        "module.exports = " + json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def pack_plogs() -> dict:
    out = {}
    for cid, book in CHAR_BOOK.items():
        ch_dir = FW / book / cid
        cards_path = ch_dir / f"{cid}.cards.md"
        parsed = parse_cards(cards_path) if cards_path.exists() else {"title": cid, "hook": "", "slides": []}
        plog_files = sorted(ch_dir.glob(f"{cid}-p*.png"), key=lambda p: p.name)
        slides = []
        for idx, sec in enumerate(parsed["slides"]):
            img_name = f"p{idx + 1}.jpg"
            cloud_rel = f"plogs/{cid}/{img_name}"
            if idx < len(plog_files):
                src = plog_files[idx]
                sips_jpeg(src, CLOUD / "plogs" / cid / img_name, 1080, 78)
                # 大图仅上云，避免撑破小程序主包
            slides.append(
                {
                    "title": sec["title"],
                    "hook": sec["hook"],
                    "body": sec.get("body") or "",
                    "image": f"plogs/{cid}/{img_name}",
                }
            )
        out[cid] = {
            "id": cid,
            "bookSlug": book,
            "bookTitle": BOOK_TITLE.get(book, ""),
            "title": parsed["title"],
            "hook": parsed["hook"],
            "slides": slides,
        }
        print(f"plog {cid}: {len(slides)} slides")
    return out


def pack_mottos() -> list:
    items = []
    for slug in MOTTOS:
        plan_path = FW / "_mottos" / slug / "motto_plan.json"
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
        person = (plan.get("people") or [{}])[0]
        hooks = []
        for h in plan.get("hookTitles") or []:
            hooks.extend(h.get("titles") or [])
        src = FW / "_mottos" / slug / "generated" / "dostoevsky-comic.png"
        if not src.exists():
            src = FW / "_mottos" / slug / "comic-version.png"
        img_name = f"{slug}.jpg"
        if src.exists():
            sips_jpeg(src, ASSETS / "mottos" / img_name, 720, 65)
            sips_jpeg(src, CLOUD / "mottos" / img_name, 1080, 80)
        items.append(
            {
                "id": slug,
                "topic": plan.get("topic") or "",
                "quote": person.get("quote") or "",
                "author": person.get("name") or "陀思妥耶夫斯基",
                "hooks": hooks[:10],
                "image": f"mottos/{img_name}",
            }
        )
        print(f"motto {slug}")
    return items


def pack_comics() -> dict:
    out = {}
    books = sorted(set(CHAR_BOOK.values()))
    for book in books:
        plan_path = FW / book / "_comic" / "comic_plan_v2.json"
        pages_dir = FW / book / "_comic" / "pages"
        if not plan_path.exists() or not pages_dir.exists():
            print(f"comic skip {book}")
            continue
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
        pages = []
        # skip title page-00, take next 4 story pages
        story = [p for p in plan.get("pages") or [] if p.get("pageId") != "page-00"]
        for page in story[:4]:
            pid = page.get("pageId")
            src = pages_dir / f"{pid}.png"
            if not src.exists():
                continue
            img_name = f"{pid}.jpg"
            sips_jpeg(src, CLOUD / "comics" / book / img_name, 1080, 78)
            # 漫画页仅上云
            pages.append(
                {
                    "id": pid,
                    "narration": (page.get("narration") or "").strip(),
                    "image": f"comics/{book}/{img_name}",
                }
            )
        out[book] = {
            "bookSlug": book,
            "bookTitle": BOOK_TITLE.get(book, book),
            "pages": pages,
        }
        print(f"comic {book}: {len(pages)} pages")
    return out


def pack_scenery() -> dict:
    src = FW / "banner-petersburg-snow.png"
    if not src.exists():
        src = FW / "_scenery" / "dostoevsky-st-petersburg-snow" / "st-petersburg-snow.png"
    dest_name = "petersburg-snow.jpg"
    if src.exists():
        sips_jpeg(src, ASSETS / "scenery" / dest_name, 900, 55)
        sips_jpeg(src, CLOUD / "scenery" / dest_name, 1400, 80)
        print("scenery ok")
    return {"snow": f"scenery/{dest_name}"}


def main() -> None:
    comics = pack_comics()
    scenery = pack_scenery()
    write_js_module(UTILS / "comics-data.js", comics)
    write_js_module(UTILS / "scenery-data.js", scenery)
    meta = {
        "characterBook": CHAR_BOOK,
        "bookTitle": BOOK_TITLE,
    }
    write_js_module(UTILS / "enrichment-meta.js", meta)
    print("done")


if __name__ == "__main__":
    main()
