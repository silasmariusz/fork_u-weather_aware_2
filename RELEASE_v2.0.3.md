# Release v2.0.3

## Fix: 404 main.js – HACS bundle

This release fixes the "Failed to load resource: 404 (Not Found)" error for `src/main.js`. The problem was that the repo contained the source entry file (with `import './src/main.js'`) instead of the built bundle.

### Changes

- **Build workflow** – GitHub Action builds the bundle (`npm run build:hacs`) and commits the built `fork_u-weather_aware.js` to the repo
- **CI fixes** – `npm install` (no lock file), add-and-commit for push
- After this release, HACS installations will serve the bundled file; no more 404 errors

### Upgrade

1. Update via HACS (or redownload the integration)
2. Restart Home Assistant or hard-refresh the browser (Ctrl+F5)
