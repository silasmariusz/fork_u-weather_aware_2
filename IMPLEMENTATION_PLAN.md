# Implementation and Fix Plan – Fork U Weather Aware

## Done in this session

1. **Bubble mode – z-index 3** ✓  
   - `getSpatialZIndex()`: bubble = 3, background = -1  
   - Editor fix: "z-index -3" → "z-index 3"

2. **Moon glow** ✓  
   - Reduced size from 0.45 to 0.35 to avoid clipping

3. **Smog from bottom** ✓  
   - vMask: smog dense at bottom, fades toward top  
   - Animation: `uv` offset upward (0.06 * uTime on Y)

---

## Done (earlier sessions)

- **Wind** ✓ – windBearing, windSpeedKmh, rainMaxTiltDeg, windSwayFactor → rain/snow tilt
- **Sun beams** ✓ – sunAzimuth, sunElevation, uvIndex → position and UV colors
- **Lightning** ✓ – lightning_counter, lightning_distance, max 1/20s, thunder delay
- **Window droplets** ✓ – specular highlight (raindrops.js style)

---

## To do

### 1. Raindrops on window (raindrops.js style – extension)

**Goal:** Droplets sliding down the screen with refraction/reflection like [Gist raindrops](https://gist.github.com/silasmariusz/6d0aa431b15a43bda7ee97f773f3660b).

**Notes:**
- Gist uses `raindrops.js` (WebGL) in iframe
- Need to implement similar effect in Three.js / WebGL overlay
- Droplets with light reflection, background refraction
- Optionally: separate layer above current overlay

**Steps (estimated):**
- Either: Canvas 2D layer with droplets (simpler)
- Or: Three.js shader with background texture + distortion
- Consider integration with `windowDroplets` or separate "screen droplets" layer

---

## Configuration (already existing)

- `wind_speed_entity`, `wind_direction_entity`
- `rain_max_tilt_deg`, `wind_sway_factor`
- `uv_index_entity`
- `lightning_counter_entity`, `lightning_distance_entity`
- `sun_entity`

---

## Files to modify

| Task             | Files                                                        |
|------------------|--------------------------------------------------------------|
| Wind             | `weather-overlay-three.js`, `weather-effects-core.js`, worker |
| Sun              | `weather-overlay-three.js`, `weather-effects-core.js`        |
| Lightning        | `weather-overlay-three.js`, `weather-effects-core.js`        |
| Raindrops.js style | new module + `weather-overlay-three.js`                     |

---

## Editor gaps (README vs editor) – post-audit status

| Option | In README | In editor | Status |
|--------|-----------|-----------|--------|
| `rain_max_tilt_deg` | ✓ | ✓ | In Wind section |
| `rain_wind_min_kmh` | ✓ | ✓ | In Wind section |
| `theme_mode` | ✓ | ✓ | Override Auto/Light/Dark |
| `gaming_mode_entity` | binary_sensor | ✓ | + binary_sensor |
| `precipitation_entity` | ✓ | ✓ | Used for rain speed |
| `cloud_coverage_entity` | ✓ | ✓ | Used for cloud/fog density |
| `cloud_speed_multiplier` | ✓ | ✓ | Used in createCloudEffect |
| `snowy_variant` | ✓ | ✓ | In config.js |
| `TOGGLE_ENTITY`, `ENABLED_DASHBOARDS` | in examples | ❌ | Constants in code (intentional) |

---

## Done: Sensor audit (2025-02)

| Sensor | Before | Now | Notes |
|--------|--------|-----|-------|
| `cloud_coverage_entity` | ❌ | ✓ | Cloud and fog density (0–100%) |
| `cloud_speed_multiplier` | ❌ | ✓ | Cloud animation speed |
| `precipitation_entity` | ❌ | ✓ | Rain speed multiplier (mm/h) |
| `theme_mode` | auto | ✓ | Override light/dark; snow brighter on light |
| `rain_max_tilt_deg` | ❌ | ✓ | In editor |
| `rain_wind_min_kmh` | ❌ | ✓ | In editor |
| `gaming_mode_entity` | input_boolean | ✓ | + binary_sensor |

---

## Plan: Aurora (Northern Lights)

**Source:** [Beautiful Aurora Footer Lights](https://gist.github.com/silasmariusz/c71fba0b6769a69984bad32f9789fa47), [CodePen](https://codepen.io/silasmariusz/pen/raLbbzv).

**Goal:** Same aurora effect – but in the **header** of the screen (top), not in the footer.

### Aurora integration (NOAA Aurora Forecast)

- `sensor.aurora_60_1` / `sensor.aurora_visibility` – % (0–100) visibility chance
- `binary_sensor.aurora_visibility_alert` – on = high chance (optional shortcut)
- Updates roughly every ~5 min

### Display logic (Visibility Score)

**Formula:**
```
Visibility Score = Aurora Chance × Sky Clarity × Darkness Factor
```

- **Aurora Chance** – `sensor.aurora_60_1` / 100 (or `sensor.aurora_visibility` / 100)
- **Sky Clarity** – `1 - (cloud_coverage / 100)` – sky clarity
- **Darkness Factor** – `max(0, min(1, 1 - (sun.elevation + 6) / 6))` – night (elevation < 0 → full darkness)

**JS implementation:**
```js
const auroraChance = (states.aurora_60_1 || 0) / 100;
const skyClarity = 1 - ((cloudCoverage ?? 0) / 100);
const elevation = sun?.attributes?.elevation ?? 0;
const darkness = Math.max(0, Math.min(1, 1 - (elevation + 6) / 6));
const visibilityScore = auroraChance * skyClarity * darkness;
```

- **Visibility Score** 0–1 → aurora effect intensity (opacity/animation speed)
- Minimum threshold (e.g. 0.15) to show the effect

### New config fields

- `aurora_chance_entity` – sensor (e.g. `sensor.aurora_60_1`, `sensor.aurora_visibility`)
- `aurora_visibility_alert_entity` – binary_sensor (optional shortcut)
- `aurora_visibility_min` – min Visibility Score 0–1 (default 0.15)
- `cloud_coverage_entity` – already exists, used for Sky Clarity
- `sun_entity` – already exists, used for Darkness Factor
- `enable_aurora_effect` – enable/disable

### Optional: AUS DOM Space Weather

For regions where auroras are rarer (photography vs observation):

- `sensor.k_index_<location>` – K-index (0–9), useful for activity assessment
- `binary_sensor.aurora_alert`, `aurora_watch`, `aurora_outlook`
- `sensor.dst_index` – Dst (magnetic storms)

**Decision:** NOAA sensors suffice for start. AUS DOM can be added later as an extension.

### Effect implementation

1. `createAuroraEffect(ctx)` – 5 bands (as in Gist) with animated `box-shadow` in GLSL
2. Position: `top: -60px` → header (mirror of footer)
3. Gist colors: #473C78↔#F72A3B, #18C499↔#D8F05E, #FFDD00↔#3E33FF, #781848↔#F2BBE9, #42F2A1↔#F4F6AD
4. Condition: `clear-night` + aurora active + low cloud coverage

---

## Optional improvements (suggestions)

| Idea | Description | Priority |
|------|-------------|----------|
| **Snow × precipitation** | Snow speed multiplier from `precipitation_entity` (like rain) | low |
| **README – sensors** | Section "Sensors and their impact" – sensor → effect table | low |
| **Aurora – debug mode** | `debug_aurora_score` to force effect in dev mode | with Aurora |
