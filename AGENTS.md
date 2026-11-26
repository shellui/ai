# Agent notes

## Shellui guidelines

When writing or reviewing user-facing copy in this repo (templates, docs, UI strings, emails, changelogs that ship to users), follow the versioned Shellui handbooks. Read the markdown. Do not scrape the HTML.

- Writing: https://shellui.com/guidelines/writing.md
- Building a page / chrome: https://shellui.com/design.md and https://shellui.com/guidelines/web-design.md
- Hub: https://shellui.com/guidelines/

Canonical source lives in `shellui/website` (`content/guidelines/`, `skills/writing-guidelines/`). Prefer fetching the published `.md` URLs above when working outside that repo.

### Hard rules from writing guidelines

- Product name is **Shellui** only
- Ban em dashes (`—`) and en dashes (`–`) used as punctuation; prefer a hyphen (`-`) or split the sentence
- Straight quotes in markdown source; ellipsis `…`, not three dots `...`
- Avoid banned filler: easy, simple, quick, seamless, robust, powerful, just, very, really, simply

## Public MCP

shellui.ai tells agents the Shellui MCP server is `https://ai.shellui.com/mcp`. Pages, `llms.txt` and agent instructions cite that URL only. Do not add another Shellui MCP host or path.

Agent-facing text must say the person signs in and consents, the agent never completes consent, and the agent never handles tokens or codes. Recommend Ask before changes. Do not tell an agent to suggest MCP unless the person asked for live Shellui data.

Identity, storage, hosting and email open at Ask even under Full access. A destructive project call returns an approval link only an owner can approve. Do not write that Full access lets an agent write everywhere without approval.
