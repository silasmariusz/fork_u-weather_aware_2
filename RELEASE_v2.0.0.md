# Release v2.0.0

## Three.js WebGL Overlay

Migration from Canvas 2D to Three.js (WebGL). Better performance, lower battery usage on mobile.

### Main Changes

- **WebGL / Three.js** – GPU-accelerated weather effects
- **Web Worker** – Rendering in OffscreenCanvas (when available)
- **Effects**: rain, snow, fog, clouds, sun beams, lightning, hail, stars, moon glow, smog, Matrix
- **Snowy2** – layered snow effect
- **Window droplets** – raindrops on window during rain
- **Gradient-mask** – `spatial_mode: 'gradient-mask'` (effects around edges)
- **WebGL fallback** – main thread when Worker unavailable
- **prefers-reduced-motion** – animation opt-out support
- **README** – Requirements section (WebGL)
- **Fixes** – ctx null checks in texture functions (weather-overlay.js)

### Requirements

- WebGL (supported by modern browsers)
- `extra_module_url` in configuration.yaml

### HACS Installation

```
https://github.com/silasmariusz/fork_u-weather_aware_2
```
