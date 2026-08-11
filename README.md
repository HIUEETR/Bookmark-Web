<p align="center">
  <img src="image/README/banner.svg" alt="Bookmark-Web" width="100%" />
</p>

<div align="center">

[English](README.md) · [简体中文](README.zh.md)

</div>

# Bookmark Web

> An offline bookmark manager — a pure static web app that keeps your data in the browser.

No extension installation needed; just open the page and use it. All data is stored in the browser's `localStorage` and is never uploaded to any server. It suits users who prefer not to install extensions or who use browsers without Chrome extension support (e.g., Safari and other browsers).

[Try it now](https://hiueetr.github.io/Bookmark-Web/)

## Features

### Browse & Navigate

- Multi-column bookmark folders, with add / remove column support
- Adjustable column widths and draggable column order
- Bookmark detail sidebar showing path, URL, added time, and URL copy support

![1786466271184](image/README/1786466271184.png)

### Organize

- Drag & drop bookmarks, with drop-to-position sorting
- Batch selection, batch move, and batch delete
- Move undo stack, supporting undo of single or batch moves
- Edit bookmark titles and URLs, rename folders
- Clean up empty folders with a safe "check to delete" flow
- Root folder protection (the default root folder cannot be deleted)

![1786466281361](image/README/1786466281361.gif)

### Search

- Global search across titles, URLs, and paths, with locate-to-folder support

### Check

- Duplicate bookmark scanning, grouped by normalized URL
- Manual link check for up to 50 targets, distinguishing valid, invalid, and unknown

### Data

- JSON and Netscape HTML bookmark import / export
- Trash backup — recoverable copies are kept before deletion
- First-run onboarding (import a file or load sample data)
- "Reset data" (clears all bookmarks from local storage; not undoable)

### Customization

- Theme switching (light / dark)
- Chinese & English UI

## Tech Stack

| Category   | Technology                                |
| ---------- | ----------------------------------------- |
| Framework  | React 18 + TypeScript 5                   |
| Build      | Vite 5 (sub-path deployment support)      |
| Deployment | GitHub Pages (GitHub Actions auto-deploy) |
| Testing    | Vitest 4                                  |
| Code style | ESLint 10                                 |

## Development

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run build
```

## Verification Commands

```powershell
npm run typecheck   # Type checking
npm run lint        # Lint
npm test            # Unit tests
npm run build       # Build
```

## Project Structure

```
Bookmark-Web/
├── src/
│   ├── components/         # React components (TreeView, Modals, WelcomeScreen, etc.)
│   ├── context/            # I18n and theme contexts
│   ├── i18n/               # Chinese & English translations
│   ├── lib/                # Core logic: bookmarks, storage, import/export, cleanup
│   ├── styles/             # CSS (app.css, themes.css)
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main app
│   ├── main.tsx            # Entry point
│   └── styles.css          # Global styles
├── public/icons/           # Icons
├── .github/workflows/      # GitHub Actions workflows
├── vite.config.ts          # VITE_BASE_PATH sub-path support
└── tsconfig.json
```

## Data Storage

Bookmark data is stored in the browser's `localStorage`:

| Key                      | Purpose          |
| ------------------------ | ---------------- |
| `bookmark-web-tree`    | Bookmark tree    |
| `bookmark-web-next-id` | Next bookmark ID |
| `bookmark-state`       | Column layout    |
| `bookmark-trash`       | Trash data       |
| `bookmark-theme`       | Theme setting    |
| `bookmark-locale`      | Language setting |

## Known Limitations

- Broken-link checks are affected by CORS, site policies, and network environment; "unknown" results need manual confirmation
- Trash restore tries to restore to the original parent folder; restore may fail if the parent folder no longer exists
- Large bookmark libraries are optimized with filtering, derived-data memoization, limited search results, and reduced full re-renders; no third-party virtual scrolling library is used yet
- A single browser's `localStorage` has limited capacity (usually 5–10 MB); very large bookmark libraries may hit storage limits

## Related Projects

- [Bookmark-Extension](https://github.com/HIUEETR/Bookmark-extension): the browser-extension version, directly managing native Chrome / Edge bookmarks via the `chrome.bookmarks` API, with native display in the browser bookmark bar

## License

Apache-2.0 license