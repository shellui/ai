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

## [0.3.1] - 2026-11-27

### 🚨 Changed

- Install commands pin skills to 1.9.0 and `@shellui/cli` to 0.8.6, and drop `--yes`.
- Agent instructions tell the agent to show the commands and ask before installing.

## [0.3.0] - 2026-11-26

### ✨ Feature

- Homepage, agent instructions and llms.txt present the Shellui MCP at `https://ai.shellui.com/mcp`: sign-in and consent in the browser, Ask before changes as the default access level, and approval links for destructive actions.
- Agent instructions tell agents to suggest MCP only when asked for live Shellui data, and to leave sign-in, consent and approvals to the person.

### 🚨 Changed

- shellui.ai serves `/llms.txt`. The footer links to it instead of the docs map.

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
