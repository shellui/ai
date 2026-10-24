# shellui.ai

The landing page coding agents read to start with Shellui.

[![CI](https://github.com/shellui/ai/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/shellui/ai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Tell your agent `fetch https://shellui.ai`. The page walks it through installing the [Shellui skills](https://github.com/shellui/skills), the CLI and the first project. This repo is the source of [shellui.ai](https://shellui.ai), built with [Eleventy](https://www.11ty.dev/).

## Get started

```bash
git clone https://github.com/shellui/ai.git
cd ai
npm install
npm run dev
```

`npm run build` writes the static site. Every push to `main` deploys it to GitHub Pages on the `shellui.ai` domain.

## Documentation

- [shellui.ai](https://shellui.ai), the published page
- [Shellui Skills](https://github.com/shellui/skills) and [skills.sh](https://skills.sh/shellui/skills/shellui)
- [docs.shellui.com](https://docs.shellui.com) and the [writing guide](https://shellui.com/guidelines/writing/)
- [CHANGELOG.md](CHANGELOG.md)

## Contributing

Open an issue or a pull request against `main`. Coding agents start with [AGENTS.md](AGENTS.md).

## Shellui projects

| Project | What it does |
| --- | --- |
| [shellui](https://github.com/shellui/shellui) | The shell, CLI and SDK |
| [admin](https://github.com/shellui/admin) | Administration app inside the shell |
| [files](https://github.com/shellui/files) | File explorer for storage-service |
| [identity-service](https://github.com/shellui/identity-service) | Sign-in, companies and tokens |
| [storage-service](https://github.com/shellui/storage-service) | File storage |
| [hosting-service](https://github.com/shellui/hosting-service) | Deploys and serves Shellui apps |
| [email-service](https://github.com/shellui/email-service) | Templates and sends email |
| [skills](https://github.com/shellui/skills) | Agent Skills for coding agents |
| [playground](https://github.com/shellui/playground) | Live demo of the shell |

## License

[MIT](LICENSE)
