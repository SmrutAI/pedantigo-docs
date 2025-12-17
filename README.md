# Pedantigo Documentation

Documentation website for [Pedantigo](https://github.com/smrutai/pedantigo) - Pydantic-inspired validation for Go.

Built with [Docusaurus](https://docusaurus.io/).

## Quick Start

```bash
npm install
npm start
```

Open http://localhost:3000

## Daily Maintenance

### Adding a New Doc Page

1. Create a new `.md` file in the appropriate `docs/` folder
2. Add frontmatter at the top:

```markdown
---
sidebar_position: 1
---

# Page Title

Content here...
```

3. Save - the site auto-reloads

### Creating a New Section

1. Create a folder in `docs/` (e.g., `docs/advanced/`)
2. Add `_category_.json`:

```json
{
  "label": "Advanced",
  "position": 7,
  "collapsed": true
}
```

3. Add `.md` files with `sidebar_position` frontmatter

### Sidebar Ordering

- **Folders**: Use `position` in `_category_.json`
- **Files**: Use `sidebar_position` in frontmatter
- Lower numbers = higher in sidebar

## File Structure

```
docs/
├── intro.md              # Welcome page (position: 1)
├── getting-started/      # Installation, quickstart (position: 2)
├── concepts/             # Core concepts (position: 3)
├── constraints/          # Constraints reference (position: 4)
├── api/                  # API reference (position: 5)
├── examples/             # Example code (position: 6)
└── changelog.md          # Version history (position: 100)
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm run serve` | Serve built site locally |
| `npm run clear` | Clear cache |

## Versioning Documentation

To create a versioned snapshot (e.g., for v1.0.0):

```bash
npm run docusaurus docs:version 1.0.0
```

This creates:
- `versioned_docs/version-1.0.0/` - Frozen copy of docs
- `versioned_sidebars/version-1.0.0-sidebars.json` - Frozen sidebar

## Deployment

### Automatic (GitHub Pages)

Deployment happens automatically when you push to `main`:

1. GitHub Actions builds the site
2. Deploys to GitHub Pages
3. Live at https://pedantigo.dev

To trigger manually: Go to Actions → "Deploy to GitHub Pages" → Run workflow

### Manual / Other Hosting

```bash
npm run build
# Upload contents of `build/` to your host
```

## Customization

| File | Purpose |
|------|---------|
| `docusaurus.config.ts` | Site config, navbar, footer |
| `sidebars.ts` | Sidebar configuration |
| `src/css/custom.css` | Theme colors |
| `src/pages/index.tsx` | Homepage |
| `static/img/` | Logo, favicon, images |

## Reference

Default Docusaurus tutorials are preserved in `_reference/` (gitignored) for learning purposes.

## Links

- [Pedantigo Library](https://github.com/smrutai/pedantigo)
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Go Reference](https://pkg.go.dev/github.com/smrutai/pedantigo)
