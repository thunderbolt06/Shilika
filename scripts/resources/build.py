#!/usr/bin/env python3
"""Build the free downloadable resources served from /resources.

Usage (from the repo root):
    python3 scripts/resources/build.py            # build everything
    python3 scripts/resources/build.py pdf        # PDFs only
    python3 scripts/resources/build.py xlsx       # spreadsheets only
    python3 scripts/resources/build.py checklist  # PDFs whose name contains "checklist"

PDFs: every scripts/resources/src/<name>.html (files starting with "_" are
partials) is rendered with headless Chrome to public/resources/<name>.pdf.
The marker <!--CTA--> is replaced with src/_cta.html before printing.

Spreadsheets: generated with openpyxl by scripts/resources/xlsx.py.

Requirements: Google Chrome (set CHROME=/path/to/chrome to override),
python3 with openpyxl (pip install openpyxl).
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
SRC = HERE / "src"
ROOT = HERE.parent.parent
OUT = ROOT / "public" / "resources"

CHROME = os.environ.get(
    "CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)

PDF_SOURCES = [
    "startup-marketing-checklist",
    "20-marketing-channels-playbook",
    "ai-startup-gtm-canvas",
    "press-kit-and-launch-pr-template",
    "journalist-pitch-email-templates",
    "icp-and-positioning-worksheet",
    "product-launch-checklist",
    "30-day-founder-content-calendar",
    "geo-ai-search-checklist",
    "pr-agency-evaluation-scorecard",
]


def render_pdf(name: str) -> Path:
    src = SRC / f"{name}.html"
    html = src.read_text(encoding="utf-8")
    cta = (SRC / "_cta.html").read_text(encoding="utf-8")
    html = html.replace("<!--CTA-->", cta)
    tmp = SRC / f"_build_{name}.html"
    tmp.write_text(html, encoding="utf-8")
    out = OUT / f"{name}.pdf"
    try:
        cmd = [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            "--run-all-compositor-stages-before-draw",
            "--virtual-time-budget=15000",
            f"--print-to-pdf={out}",
            tmp.as_uri(),
        ]
        subprocess.run(cmd, check=True, capture_output=True, timeout=180)
    finally:
        tmp.unlink(missing_ok=True)
    return out


def main(argv: list[str]) -> int:
    OUT.mkdir(parents=True, exist_ok=True)
    mode = argv[1] if len(argv) > 1 else "all"
    if mode in ("all", "xlsx"):
        sys.path.insert(0, str(HERE))
        import xlsx  # noqa: E402

        for p in xlsx.build(OUT):
            print(f"xlsx  {p.relative_to(ROOT)}  {p.stat().st_size // 1024} KB")
    if mode != "xlsx":
        names = PDF_SOURCES if mode in ("all", "pdf") else [n for n in PDF_SOURCES if mode in n]
        for name in names:
            p = render_pdf(name)
            print(f"pdf   {p.relative_to(ROOT)}  {p.stat().st_size // 1024} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
