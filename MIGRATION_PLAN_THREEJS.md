# Migration Plan: Canvas 2D → Three.js (WebGL)

**Fork U - Weather Aware 2**  
Goal: Better performance, lower battery usage on mobile.

## Implementation Status

| Component | Status |
|-----------|--------|
| Vite + Three.js | ✓ |
| Worker (OffscreenCanvas) | ✓ |
| Rain, snow, fog, clouds | ✓ |
| Sun beams, lightning, hail | ✓ |
| Stars + moon glow | ✓ |
| Smog (PM2.5/PM10) | ✓ |
| Wind → clouds | ✓ |
| WebGL detect + fallback | ✓ |
| prefers-reduced-motion | ✓ |
| gaming_matrix_only | ✓ (effect=none) |
| Matrix rain | ✓ |
| Snowy2 layers | ✓ |
| Window droplets | ✓ |
| Gradient-mask (spatial_mode) | ✓ |

**Build:** `npm run build` or `npm run build:hacs`

---

## Table of Contents

1. [Phase 0: Preparation](#phase-0-preparation)
2. [Phase 1: Three.js Foundation](#phase-1-threejs-foundation)
3. [Phase 2: Effect Migration](#phase-2-effect-migration)
4. [Phase 3: Web Worker](#phase-3-web-worker)
5. [Phase 4: Mobile Optimizations](#phase-4-mobile-optimizations)
6. [Phase 5: Fallback and Tests](#phase-5-fallback-and-tests)
7. [Target File Structure](#target-file-structure)
8. [Time Estimate](#time-estimate)

---

## Phase 0: Preparation

### 0.1 Decision: Bundler vs CDN

| Option | Pros | Cons |
|--------|------|------|
| **CDN** (script in HTML) | Quick start, no build changes | Three.js ~600KB, no tree-shaking, network dependency |
| **Vite/Rollup** | Tree-shaking (smaller bundle), modularity | Requires changing HA card build process |

**Recommendation:** Bundler (Vite). Most modern HA cards already use a bundler. Three.js with `import` yields ~150–200 KB gzip after tree-shake.

### 0.2 Installation (if Vite)

```bash
npm create vite@latest . -- --template vanilla
npm install three
```

### 0.3 HACS Output Configuration

- Build should produce a single `.js` file (e.g. `fork_u-weather_aware.js`) loaded by Lovelace.
- In `vite.config.js` set `output.format: 'iife'` and `output.file` to the target name.

---

## Phase 1: Three.js Foundation

### 1.1 New Module Structure

```
weather-overlay.js (or weather-overlay.ts)
├── initThreeRenderer()
├── resize()
├── destroy()
└── setEffect(effectType)
```

### 1.2 Implementation Steps

1. **Scene creation**
   - `THREE.Scene()`
   - `THREE.OrthographicCamera()` – 2D view (like Canvas)
   - `THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })`

2. **Canvas mounting**
   - Renderer creates its own `<canvas>`
   - Place in the same container as the current one (e.g. `document.body` or overlay layer)

3. **Render loop**
   - Replace `requestAnimationFrame` + `ctx.clearRect` + drawing with `renderer.render(scene, camera)`
   - Keep existing flow: `updateWeather()` → `animate()` → effect update

4. **Card-compatible API**
   - `window.ForkUWeatherAwareConfig` – no changes
   - Logic for `getWeatherState()`, `isOverlayEnabled()`, `isOnEnabledDashboard()` – no changes
   - Only the drawing layer (Canvas → Three.js) is replaced

### 1.3 Weather State → Effect Mapping

Preserve existing mapping, e.g.:

| Weather state | Effect (Three.js) |
|---------------|-------------------|
| sunny | sun_beams |
| sunny2 | sun_beams |
| cloudy / partlycloudy | clouds |
| fog | fog_light / fog_dense |
| rainy / pouring / rainy-drizzle | rain / rain_storm / rain_drizzle |
| snowy | snow_gentle |
| snowy2 / snowy-rainy | snow_gentle + layers |
| lightning / lightning-rainy | lightning / rain_storm |
| hail | hail |
| clear-night | stars (+ moon_glow) |
| windy | wind (optional) |

---

## Phase 2: Effect Migration

### Order and Details

#### 2.1 Sun Beams (simple)
- **Implementation:** `createSunBeamEffect()`
- Fullscreen PlaneGeometry + ShaderMaterial
- Vertex: pass-through UV/position
- Fragment: rays from `vec2(1.1, 1.05)` with `sin(angle * 18 + uTime)` + smoothstep

#### 2.2 Clouds
- **Implementation:** `createCloudEffect()`
- PlaneGeometry (e.g. 60% height), position at top
- Shader: FBM (fractal Brownian motion) noise, `smoothstep(0.2, 0.7, f)`
- Used: `uTime`, `uOpacity`, `uScale` (mobile), `uCloudColor`, `uCloudShadow`

#### 2.3 Fog (light/dense)
- **Implementation:** `createFogEffect()` + `getFogSettings()`
- Several PlaneGeometry layers with ShaderMaterial
- Shader: hash + noise + fbm, `smoothstep(uLow, uHigh, density)`
- Parameters: scale, speed, flow, low, high, contrast, color

#### 2.4 Rain
- **Implementation:** `createRainEffect()`
- InstancedBufferGeometry: many rain "lines" in one draw call
- Attributes: instanceOffset, instanceSpeed, instanceLength, instanceSway, instancePhase
- Vertex shader: `progress = fract(uTime * speed + phase)`, Y position
- Fragment shader: alpha from `vAlpha * uOpacity`
- For rain_storm: lightning overlay

#### 2.5 Snow
- **Implementation:** `createSnowEffect()`
- BufferGeometry + Points (position), PointsMaterial with "flake" texture
- JS loop in `update()`: update position array, `needsUpdate = true`
- Optional: snow accumulation (shader top/bottom of screen)

#### 2.6 Lightning
- **Implementation:** (in rain_storm or separate `createLightningEffect()`)
- Fullscreen PlaneGeometry + ShaderMaterial (jagged line in fragment)
- JS timer: random interval, trigger flash, fade out
- `uFlash`, `uOrigin`, `uTime` in shader

#### 2.7 Hail
- **Implementation:** `createHailEffect()`
- InstancedBufferGeometry, small squares (PlaneGeometry 0.25×0.25)
- Vertex: rotation + fall down, no sway
- Fragment: white icy colors

#### 2.8 Stars
- BufferGeometry (position), Points, star texture
- Or simple circles/cross in PointsMaterial
- Twinkle logic in `update()`: phase, opacity

#### 2.9 Moon Glow
- Similar to sun beams: radial gradient (plane or shader)
- Position from `getMoonPosition()`, size/intensity from distance

#### 2.10 Matrix (gaming)
- **Complexity:** high
- Option A: many PlaneGeometry with Texture (character atlas), animation in JS
- Option B: sprite-based
- Characters: texture per character or atlas

#### 2.11 Smog
- Similar to fog: shader layers or particles (Points)
- Grey-brown colors, upward motion

#### 2.12 Snowy2 (layers)
- Several Points layers (different sizes, speeds, blur)
- "Pile" (accumulation) logic – can simplify or skip initially

#### 2.13 Window droplets
- **Complexity:** high (physics, overlap)
- Can keep in Canvas 2D initially or do simple sprites in Three.js

---

## Phase 3: Web Worker

### 3.1 Requirements

- `OffscreenCanvas` – support in major browsers
- `transferControlToOffscreen()` on `<canvas>`
- Worker: import same Three.js code (or separate worker bundle)

### 3.2 Architecture

```
Main thread:
  - WeatherEffectsEngine
  - Creates Worker
  - postMessage: INIT (canvas, viewport), START (effect, opacity), RESIZE, STOP, DISPOSE
  - onmessage: READY, ERROR

Worker:
  - dynamic-weather-worker.js
  - Imports WeatherEffectsCore (Three.js)
  - Handles messages, runs render loop inside worker
```

### 3.3 Fallback

If `Worker` or `OffscreenCanvas` unavailable → run Three.js in main thread (no worker). Works, but main thread is busy.

---

## Phase 4: Mobile Optimizations

| Optimization | Implementation |
|--------------|----------------|
| DPR cap | `Math.min(devicePixelRatio, 2)` on mobile |
| Fewer particles | `isMobile ? 0.6 * count : count` for rain, snow, clouds |
| Simpler shaders | Fewer FBM iterations, lower noise resolution |
| 30 FPS | Throttle `requestAnimationFrame` to ~33 ms |
| Disable antialiasing | `antialias: !isMobile` in WebGLRenderer |
| Snowy2 light | Fewer layers, fewer flakes (already in config) |

---

## Phase 5: Fallback and Tests

### 5.1 WebGL Detection

```javascript
function isWebGLSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}
```

### 5.2 Fallback Strategy

1. No WebGL → hide overlay, show message (optional)
2. Three.js init fails → fallback to old Canvas 2D (if kept)
3. Worker fails to start → Three.js in main thread

### 5.3 Tests

- [ ] Chrome, Firefox, Safari (desktop + mobile)
- [ ] Android (Chrome, possibly Kiwi/Firefox)
- [ ] iOS Safari
- [ ] Various DPR (1, 2, 3)
- [ ] `prefers-reduced-motion: reduce` – animation stops
- [ ] Dashboard in edit mode (preview)
- [ ] All weather states + development_mode (test_effect)

---

## Target File Structure

```
fork_u-weather_aware_2/
├── src/
│   ├── weather-effects-core.js      # Three.js effect logic
│   ├── weather-effects-engine.js    # Main/worker orchestration
│   ├── weather-worker-messages.js   # Message types
│   ├── workers/
│   │   └── dynamic-weather-worker.js # Worker
│   └── weather-overlay.js           # Entry: config, getWeatherState, init, update loop
├── fork_u-weather_aware.js          # Card loader (no or minimal changes)
├── fork_u-weather_aware-editor.js   # Editor (no changes)
├── vite.config.js
├── package.json
└── MIGRATION_PLAN_THREEJS.md        # This document
```

After build: single `fork_u-weather_aware.js` (or several chunks if code-splitting).

---

## Time Estimate

| Phase | Time (approx.) |
|-------|----------------|
| Phase 0: Preparation | 0.5–1 day |
| Phase 1: Foundation | 1–2 days |
| Phase 2: Effects (all) | 5–10 days |
| Phase 3: Web Worker | 1–2 days |
| Phase 4: Mobile | 0.5 day |
| Phase 5: Fallback + tests | 1–2 days |
| **Total** | **~2–3 weeks** |

---

## References

- [Three.js docs](https://threejs.org/docs/)
- [OffscreenCanvas – MDN](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
