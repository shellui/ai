# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

<!---
## [Unreleased] - yyyy-mm-dd

### ✨ Feature – for new features
### 🛠 Improvements – for general improvements
### 🚨 Changed – for changes in existing functionality
### ⚠️ Deprecated – for soon-to-be removed features
### 📚 Documentation – for documentation update
### 🗑 Removed – for removed features
### 🐛 Bug Fixes – for any bug fixes
### 🔒 Security – in case of vulnerabilities
### 🏗 Chore – for tidying code

See for sample https://raw.githubusercontent.com/favoloso/conventional-changelog-emoji/master/CHANGELOG.md
-->

## [0.3.0] - 2026-11-26

### ✨ Feature

- Landing page, agent instructions and llms.txt present the Shellui MCP at `https://ai.shellui.com/mcp`.
- Clients connect with OAuth, using dynamic client registration or device login. You sign in to Shellui in the browser and consent on ai.shellui.com.
- One connection covers every company and region the account can open.
- Access levels are read only, ask before changes (the default, where writes wait for approval), and full access. Full access runs non-destructive writes on the Shellui account without asking.
- Identity, storage, hosting and email open at Ask even under full access. A destructive project call returns an approval link only an owner can approve, including when the consent checkbox allows destructive actions.
- Agent instructions say the person signs in and consents, the agent never completes consent or handles tokens or codes, and the agent recommends Ask before changes. They tell the agent not to suggest MCP unless the person asked for live Shellui data.

## [0.2.0] - 2026-10-30

### ✨ Feature

- Sitemap, robots.txt pointing to it, and an IndexNow ping after each deploy.

### 🛠 Improvements

- Agent-first title, heading and description: AI agents in your web shell.
- New header and footer with clear links to the Shellui main site and docs.
- Refreshed page: prompt-first hero, step cards with copy buttons, link cards, CSS-only dots background, inlined CSS.
- JSON-LD describes Shellui on shellui.com, with no separate Organization.
- Includes the PR #5 changes: shellui.com linked as the main site.

## [0.1.0] - 2026-09-22

### ✨ Feature

- First shellui.ai landing: agent fetch bootstrap with hidden `data-agent-instructions`, copy prompt, and CLI/skills happy path.
