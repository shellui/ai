#!/usr/bin/env python3
"""Allowlist every Shellui MCP-like URL in the site and its sources."""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENDPOINT = "https://ai.shellui.com/mcp"
ALLOW = {
    ENDPOINT,
    "https://shellui.com/mcp/",
    "https://docs.shellui.com/ai/mcp-device-login/#global-mcp-shellui-account",
}
FILES = [
    "_site/index.html",
    "_site/llms.txt",
    "src/index.njk",
    "src/llms.txt.njk",
    "src/_includes/agent-instructions.txt",
    "src/_data/site.json",
    "src/_includes/nav.njk",
    "src/_includes/footer.njk",
    "README.md",
    "CHANGELOG.md",
    "AGENTS.md",
]
# Host contains "shellui", path contains "mcp". Stops before quotes, markup, and prose punctuation.
URL_RE = re.compile(
    r"https?://[A-Za-z0-9.-]*shellui[A-Za-z0-9.-]*/[^\s\"'`<>)]*mcp[^\s\"'`<>).,;:!?]*"
)


def urls_in(text: str) -> set[str]:
    return {match.group(0) for match in URL_RE.finditer(text)}


def problems(paths: list[Path], site_mcp: str) -> list[str]:
    found: list[str] = []
    if site_mcp != ENDPOINT:
        found.append(f"site.mcp is {site_mcp!r}, expected {ENDPOINT}")
    for path in paths:
        text = path.read_text()
        if "/c/" in text:
            found.append(f"/c/ in {path}")
        for url in sorted(urls_in(text)):
            if url not in ALLOW:
                found.append(f"{path}: {url}")
    return found


def main() -> int:
    site = json.loads((ROOT / "src/_data/site.json").read_text())
    paths = [ROOT / rel for rel in FILES]
    missing = [str(path) for path in paths if not path.is_file()]
    if missing:
        print("Missing files:\n" + "\n".join(missing), file=sys.stderr)
        return 1
    found = problems(paths, str(site.get("mcp") or ""))
    index = (ROOT / "_site/index.html").read_text()
    llms = (ROOT / "_site/llms.txt").read_text()
    if 'data-copy="https://ai.shellui.com/mcp"' not in index:
        found.append("built page is missing data-copy for https://ai.shellui.com/mcp")
    if ENDPOINT not in llms:
        found.append("llms.txt is missing https://ai.shellui.com/mcp")
    if found:
        print("Unexpected MCP URL:", file=sys.stderr)
        print("\n".join(found), file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
