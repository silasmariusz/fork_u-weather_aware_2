# Release v3.0.0

## Three.js renderer with performance optimisations

This release migrates the entire rendering stack to **Three.js (WebGL)** and applies
significant GPU shader optimisations to the cloud, fog and smog effects.

### Performance improvements

- **Clouds** – FBM octaves reduced from 6 → 4; domain-warp chain simplified from
  5 FBM calls to 3 (~2.5× GPU speedup, ~30 → 12 noise samples per fragment)
- **Fog** – FBM octaves reduced from 5 → 3
- **Smog overlay** – FBM octaves reduced from 4 → 3

### Moon fixes

- **Duplicate glow removed** – `createStarsEffect` previously rendered two overlapping
  glow meshes for the moon; the redundant full-screen edge-glow plane is removed
- **Distance-based angular size** – when `moon_distance_entity` is configured the moon
  disc scales proportionally to `384 400 km / actual distance` (clamped ±20%), making
  it visibly larger at perigee and smaller at apogee

### Code quality

- `getMoonPosition()` now reads `moon_distance_entity` and returns `distanceKm`
- `init()` refactored – removed ~65 lines of duplicated `updateWeather()` logic
- Dead config option `stars_require_moon` removed

### Upgrade

1. Update via HACS (or re-download `fork_u-weather_aware.js`)
2. Restart Home Assistant or hard-refresh (Ctrl+F5)
3. Optionally add `moon_distance_entity` in the editor for dynamic moon sizing
