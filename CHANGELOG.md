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

## [0.1.1] - 2026-09-22

### 🛠 Improvements

- Align shellui.ai with the Shellui brand and shellui.com design tokens (gray canvas, honey gold primary, system typography).
- Sync logo sprites with shellui.com brand assets: wordmark (`h-5 w-auto`) in the header, mark (`size-8.5`) in the footer; no domain text beside either.
- Add Shellui Hosting links in nav, footer, and the humans band (`https://shellui.app`); order external links Website, Docs, Playground, GitHub, then Hosting last.
- Restore soft primary hero ambient and token utilities (`bg-background`, `text-muted-foreground`, `border-border`, and related classes).

### 📚 Documentation

- Add this changelog.

## [0.1.0] - 2026-09-12

### ✨ Feature

- First shellui.ai landing: agent fetch bootstrap with hidden `data-agent-instructions`, copy prompt, and CLI/skills happy path.

### 🛠 Improvements

- Match shellui.com theme toggle icon and circular View Transitions reveal.

### 🏗 Chore

- GitHub Actions for CI and GitHub Pages deploy.
