# Pedantigo Documentation Site

Documentation website for [Pedantigo](https://github.com/SmrutAI/pedantigo).

Built with [Docusaurus](https://docusaurus.io/) | Live at [pedantigo.dev](https://pedantigo.dev)

## Architecture

```
pedantigo-docs/
├── pedantigo/          # Git submodule → SmrutAI/pedantigo
│   └── docs/           # Documentation markdown files
├── src/                # React components, custom pages
├── static/             # Static assets (logo, favicon)
└── docusaurus.config.ts
```

**Documentation lives in the main pedantigo repo** (`pedantigo/docs/`), making it easy to update docs alongside code changes.

## Quick Start

```bash
# Clone with submodule
git clone --recurse-submodules git@github.com:SmrutAI/pedantigo-docs.git
cd pedantigo-docs

# Or if already cloned
git submodule update --init --recursive

# Install and run
npm install
npm start
```

Open http://localhost:3000

## Updating Documentation

### For doc content changes (in pedantigo repo):
1. Edit files in `pedantigo/docs/`
2. Commit and push to pedantigo repo
3. In pedantigo-docs: `git submodule update --remote`
4. Commit submodule update

### For site changes (styling, components):
1. Edit files in `src/` or config files
2. Commit and push to pedantigo-docs repo

## Versioning (Semantic Versioning)

When releasing a new version of Pedantigo:

### 1. Create a version snapshot
```bash
npm run docusaurus docs:version X.Y.Z
```

This creates:
- `versioned_docs/version-X.Y.Z/` - Frozen copy of docs
- `versioned_sidebars/version-X.Y.Z-sidebars.json` - Frozen sidebar

### 2. Version naming convention
- **Major (X.0.0)**: Breaking changes
- **Minor (X.Y.0)**: New features, backward compatible
- **Patch (X.Y.Z)**: Bug fixes only

### 3. Complete release workflow
```bash
# 1. Ensure submodule is at release commit
cd pedantigo
git checkout vX.Y.Z  # or the release commit
cd ..

# 2. Create versioned docs
npm run docusaurus docs:version X.Y.Z

# 3. Commit version snapshot
git add .
git commit -m "docs: add version X.Y.Z documentation"
git push
```

### 4. Managing versions
Edit `versions.json` to control which versions appear in dropdown.

## Refreshing Docs from pedantigo

```bash
# Pull latest docs from pedantigo main branch
git submodule update --remote pedantigo

# Verify changes
npm start

# Commit if satisfied
git add pedantigo
git commit -m "docs: update to latest pedantigo docs"
git push
```

## Deployment

Automatic via GitHub Actions on push to `main`:
1. Builds Docusaurus site
2. Deploys to GitHub Pages
3. Live at https://pedantigo.dev

Manual trigger: Actions → "Deploy to GitHub Pages" → Run workflow

## File Reference

| File | Purpose |
|------|---------|
| `docusaurus.config.ts` | Site config, navbar, footer |
| `sidebars.ts` | Sidebar structure |
| `src/css/custom.css` | Theme colors |
| `src/pages/index.tsx` | Landing page |
| `static/CNAME` | Custom domain |
| `pedantigo/docs/` | Documentation content (submodule) |

## Links

- [Pedantigo Library](https://github.com/SmrutAI/pedantigo)
- [Go Reference](https://pkg.go.dev/github.com/SmrutAI/pedantigo)
- [Docusaurus Documentation](https://docusaurus.io/docs)
