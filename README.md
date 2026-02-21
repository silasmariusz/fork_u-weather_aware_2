Fork U – Weather Aware for Home Assistant 🌦️
============================================

<img width="3776" height="1928" alt="merged_horizontal" src="https://github.com/user-attachments/assets/af0a654f-fec1-41b4-88a0-7b1987b2f728" />

Fullscreen, anime‑style weather overlay that reacts to **real weather, air quality and lightning sensors** while staying gentle and readable over your dashboards.

> ⚠️ Epilepsy / Photosensitivity warning  
> This card can show **flashes, strobes and fast motion**, especially during storms and with Gaming/Matrix mode enabled. If you or someone using your dashboard is prone to photosensitive epilepsy or migraines, **use this card with caution**:
> - keep lightning effects and Gaming mode OFF, or  
> - use **low speed factors** and **Mobile / Spatial awareness** modes that keep effects away from the main content.

What makes this card different?
-------------------------------

Most “live weather wallpapers” just play a looping animation behind your UI.  
**Fork U – Weather Aware** tries to be _spatially and context aware_:

- **Peripheral first**: important content (cards) stays readable; most energy is pushed to **edges / background / below overlays**.
- **Spatial modes** (see below) choose _where_ effects live:
  - behind everything,  
  - under Bubble card backdrops,  
  - only around the edges via a **gradient mask**,  
  - or full foreground.
- **Sensor‑driven**:
  - rain/snow speed from **precipitation**,
  - direction from **wind bearing**,
  - sun glow from **UV index**,
  - **smog alert** from PM2.5/PM4/PM10,
  - lightning flashes timed from **distance and strike counter**.
- **Theme‑aware colors**:
  - on **light themes** snow becomes nearly pure white to punch through cards,
  - rain/hail/smog/fog adapt contrast so they are visible on white or pastel backgrounds,
  - on **dark themes** everything is softer and more atmospheric.

For details of the philosophy, see the “Spatial awareness” and “Epilepsy warning” sections.

Features
--------

- **Weather effects**
  - 🌧️ Rain / drizzle (tilt & speed from wind + precipitation)
  - 🌧️🌨️ Snowy‑rainy (mixed particles + lighter `snowy2` overlay)
  - ☁️ Cloudy / partly cloudy (drifting cloud puffs)
  - 🌫️ Fog (horizontal bands; density from coverage / sensors)
  - 🌁 Smog alert (PM2.5 / PM4 / PM10 – fog from the bottom)
  - ❄️ Snowy (classic particles) and **Snowy2** (layered, mobile‑aware)
  - 🌙 Clear night (stars + moon glow from moon sensors)
  - ☀️ Sunny / UV aware sun glow (color & intensity from UV index)
  - ⛈️ Lightning & lightning‑rainy (strike-counter triggered flashes with distance-aware delay)
  - 🧊 Hail (rarer, “meteor‑like” impacts)

- **Gaming / Matrix mode**
  - Dedicated **gaming_mode_entity** (`binary_sensor` / `input_boolean`).
  - Option **“Matrix only (no weather background)”** for pure ambient cyberpunk layer.

- **Per-effect speed factors**
  - `speed_factor_rain`, `speed_factor_snow`, `speed_factor_clouds`, `speed_factor_fog`, `speed_factor_smog`, `speed_factor_hail`, `speed_factor_lightning`, `speed_factor_stars`, `speed_factor_matrix`
  - Spatial-aware behavior is preserved across `background`, `bubble`, `gradient-mask`, and `foreground` modes.

- **Mobile & performance options**
  - Limit canvas DPR on mobile,
  - reduce particle counts,
  - lighten `snowy2` on phones,
  - simpler smog drawing,
  - optional **30 FPS cap**.

- **Theme‑aware rendering**
  - `getThemeMode()` detects **light / dark** from the active HA theme.
  - Snow, mixed precip, rain, hail, fog, smog adapt brightness/contrast per theme.

Spatial awareness modes
-----------------------

Configured via `spatial_mode` and the **Spatial awareness** panel in the card editor:

- **`background`** – overlay behind everything (`z-index: -1`).
- **`bubble`** – *Bubble aware* mode:
  - overlay sits **under Bubble card backdrops** (which use around `z-index: 5`),
  - we use approx. `z-index: 3` so Bubble popups still stand out while keeping weather in the scene.
- **`gradient-mask`** – **Gradient mask** mode:
  - effects are drawn normally but then a radial mask cuts out the **central area** of the screen,
  - you get motion mostly in peripheral vision (around card edges), center stays calm.
- **`foreground`** – classic “live wallpaper”:
  - overlay in front of dashboard content with click‑through.

This is the heart of **Spatial Aware** behaviour: you decide if effects are pure background, living under Bubble overlays, wrapped around the content with a mask, or full foreground.

Requirements
------------

- **WebGL** – The overlay uses **Three.js (WebGL)** for smooth, GPU‑accelerated effects. Modern browsers support WebGL; if unavailable or disabled, the card falls back to a simpler main‑thread renderer.
- **JavaScript modules** – The card loads as an ES module; `extra_module_url` in `configuration.yaml` is required.

Installation
------------

### 1. Install via HACS (recommended)

1. In Home Assistant, go to **HACS → Frontend → ⋮ (three dots) → Custom repositories**.
2. Add repository URL:  
   `https://github.com/silasmariusz/fork_u-weather_aware_2`
3. Category: **Frontend**.
4. Install **Fork U – Weather Aware** from the HACS Frontend list.
5. Ensure it installs into something like:  
   `config/www/community/fork_u_weather_aware_2/`
6. Restart Home Assistant.

> If HACS installs it into `ha_weather_overlay` instead, remove that entry and re‑add this repo URL.

### 2. Load JS module

In `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /hacsfiles/fork_u_weather_aware_2/fork_u-weather_aware.js  # HACS path
    # - /local/fork_u-weather_aware.js                           # manual install
```

Restart HA after changes.

Adding the card
---------------

### Basic YAML

```yaml
type: custom:fork-u-weather-aware-card
enabled: true
weather_entity: weather.home
```

Then use the **UI editor** to fine‑tune options.

Example – Sandbox / Development (UI Editor)
-------------------------------------------

This preset forces a heavy rain test effect with debug data, ideal to check performance and look & feel:

```yaml
type: custom:fork-u-weather-aware-card
enabled: true
weather_entity: weather.home
development_mode: true
test_effect: rainy

# Debug weather overrides (sandbox mode)
debug_precipitation: heavy
debug_wind_speed: strong
debug_wind_direction: W
debug_lightning_distance: "3"
debug_lightning_counter: "60"
debug_cloud_coverage: "80"

# Rain / wind behaviour
cloud_speed_multiplier: 1
rain_max_tilt_deg: 30
rain_wind_min_kmh: 3
wind_sway_factor: 0.7

# Theme (usually left null → auto)
theme_mode: null

# Drizzle vs rain
drizzle_precipitation_max: 2.5

# Effect speed factors (1 = default)
speed_factor_rain: 3       # 300% vertical rain speed
speed_factor_snow: 1
speed_factor_clouds: 1
speed_factor_fog: 1
speed_factor_smog: 1
speed_factor_hail: 1
speed_factor_lightning: 1
speed_factor_stars: 1
speed_factor_matrix: 1

# Mobile & Gaming
mobile_limit_dpr: true
mobile_reduce_particles: true
mobile_snowy2_light: true
mobile_smog_simple: false
mobile_30fps: false
gaming_matrix_only: true
snowy_variant: snowy2
spatial_mode: gradient-mask  # or background / bubble / foreground
```

**Standalone test platform:** Run `npm run serve` and open http://localhost:5173 to switch effects and take screenshots without Home Assistant.

- Switch `spatial_mode` to **`bubble`** to test Bubble‑aware backdrop integration.
- Use `gaming_matrix_only: true` to see pure Matrix effect during sandbox testing.
- Use debug controls for wind direction/speed, lightning distance/counter, and all speed factors.
- **Lightning / burza:** Wybierz efekt **Lightning** lub **Lightning-rainy** / **Storm**, ustaw **Odległość burzy (km)** i kliknij **+1 wyładowanie** – błysk natychmiast + opóźniony strobe (~2,9 s/km). Działające parametry: `debug_lightning_distance`, `debug_lightning_counter`, przycisk zwiększa licznik i wywołuje błysk.
- Use scenario presets (`near-storm`, `far-storm`, `blizzard`, `fast-fog`) for quick regression checks.

Example – Real live weather setup (UI Editor)
---------------------------------------------

This example uses OpenWeatherMap + Google Air Quality + moon/wind/lightning sensors.

```yaml
type: custom:fork-u-weather-aware-card

enabled: true
weather_entity: weather.openweathermap
sun_entity: sun.sun

# Moon & UV
moon_phase_entity: sensor.moon_phase
uv_index_entity: sensor.google_home_weather_uv_index
moon_position_entity: null
moon_azimuth_entity: sensor.mycity_moon_azimuth
moon_altitude_entity: sensor.mycity_moon_altitude
moon_distance_entity: sensor.mycity_moon_distance

# Gaming / ambient mode
gaming_mode_entity: binary_sensor.helper_gaming_mode  # off / on

# Smog alert (Google Air Quality)
pm25_entity: sensor.home_pm2_5       # PM2.5 (Google AQI free API)
pm4_entity: null
pm10_entity: sensor.home_pm10        # PM10 (Google AQI free API)

# Alert thresholds (WHO / EPA / EU – adjust for your city)
smog_threshold_pm25: 25
smog_threshold_pm4: 25
smog_threshold_pm10: 25

# Wind & clouds
cloud_coverage_entity: sensor.openweathermap_cloud_coverage
wind_speed_entity: sensor.openweathermap_wind_speed
wind_direction_entity: sensor.openweathermap_wind_directions

# Precipitation kind / intensity
precipitation_entity: sensor.openweathermap_precipitation_kind

# Lightning sensors
lightning_counter_entity: sensor.dom_lightning_counter
lightning_distance_entity: sensor.dom_lightning_distance

# Optional tuning (defaults shown)
drizzle_precipitation_max: 2.5
wind_sway_factor: 0.7
speed_factor_rain: 1
speed_factor_snow: 1
speed_factor_clouds: 1
speed_factor_fog: 1
speed_factor_smog: 1
speed_factor_hail: 1
speed_factor_lightning: 1
speed_factor_stars: 1
speed_factor_matrix: 1
mobile_limit_dpr: true
mobile_reduce_particles: true
mobile_snowy2_light: true
mobile_smog_simple: false
mobile_30fps: false
gaming_matrix_only: false
snowy_variant: snowy2
spatial_mode: bubble  # great default for Bubble cards
```

Optional sensors & integrations
-------------------------------

These are optional but unlock more advanced behaviour:

- **Sun sensor** (default: `sun.sun`) – used for sun position (left = sunrise, right = sunset) and to hide sun glow when `below_horizon`.
- **Moon phase entity** (default: `sensor.moon_phase`) – used for moon‑aware effects. Custom components (e.g. Moon Phase, Moon Astro) may add `altitude`, `distance`, `illumination` attributes, which are used for moon glow position and intensity when available.
- **UV index entity** (default: `sensor.uv_index`) – high UV (6+) gives a deep orange sun glow; normal UV gives a gentle yellow glow. Falls back to weather entity `uv_index` attribute if available.
- **Moon position entity** (optional) – single sensor with attributes: `azimuth`, `elevation`/`altitude`, `distance`. Use with Moon Astro or similar. If not available, use Lunar Phase sensors below.
- **Lunar Phase (3 sensors)** – for the Lunar Phase integration: enter **Moon Azimuth**, **Moon Altitude**, and **Moon Distance**.
- **Gaming mode** (`input_boolean` or `binary_sensor`) – when ON, displays a Matrix‑style cyberpunk overlay (falling characters).
- **Smog alert** – when PM2.5 or PM4 (µg/m³) exceed thresholds, fog rises from the bottom. Uses Google Air Quality API sensors. PM4 is important for Cystic Fibrosis awareness. Effect is drawn on top of all others, does not block clicks.
- **Lightning data** – distance and strike count for immediate flash + delayed strobe timing (`delay = distance_km × 1000/343`, about `2.915 s/km`).
- **Aurora (Northern Lights)** – on **clear-night**, aurora in the header when visibility score exceeds threshold. Two styles: **Bands** (colored header stripes) or **Bubble Northern Gradients** (soft flowing curtains, [CodePen inspiration](https://codepen.io/silasmariusz/pen/YPWMMow)). Uses NOAA Aurora Forecast (`aurora_chance_entity`), optional `aurora_visibility_alert_entity`, `cloud_coverage_entity`, `sun_entity`, and optionally `k_index_entity` (planetary Kp). Visibility Score = Aurora Chance × Sky Clarity × Darkness Factor × (optional K-index boost).

### Sensors and their impact

| Sensor | Effect / use |
|--------|---------------|
| `cloud_coverage_entity` | Cloud & fog density (0–100%); aurora sky clarity |
| `cloud_speed_multiplier` | Cloud animation speed |
| `precipitation_entity` | Rain speed multiplier (mm/h) |
| `wind_speed_entity` | Rain/snow tilt and fall-rate multiplier, cloud drift (hail direction excluded) |
| `wind_direction_entity` | Rain/snow bearing, wind sway |
| `rain_max_tilt_deg` | Max rain tilt from wind (default 30°) |
| `rain_wind_min_kmh` | Wind speed threshold for tilt (default 3 km/h) |
| `uv_index_entity` | Sun glow color (6+ → orange) |
| `pm25_entity`, `pm4_entity`, `pm10_entity` | Smog fog when above thresholds |
| `lightning_counter_entity`, `lightning_distance_entity` | Lightning trigger (`+1` counter) and delayed strobe timing (~`2.915 s/km`) |
| `aurora_chance_entity` | Aurora visibility chance (0–100%), header effect on clear-night |
| `aurora_variant` | `bands` (stripes) or `northern-gradients` (Bubble Northern Gradients) |
| `aurora_visibility_alert_entity` | Optional shortcut: ON = high chance |
| `k_index_entity` | Planetary Kp (0–9), boosts aurora intensity; use `sensor.planetary_k_index` from NOAA Space Weather for Europe/Poland |

### Example – Full sensor setup (all optional sensors)

Extended configuration with weather, moon, UV, smog, wind, precipitation, lightning, and aurora sensors. Replace entity IDs with your own.

```yaml
type: custom:fork-u-weather-aware-card
enabled: true
weather_entity: weather.openweathermap
sun_entity: sun.sun

# Moon & UV (sun position, moon glow, UV sun color)
moon_phase_entity: sensor.moon_phase
uv_index_entity: sensor.uv_index
moon_azimuth_entity: sensor.moon_azimuth
moon_altitude_entity: sensor.moon_altitude
moon_distance_entity: sensor.moon_distance

# Gaming / Matrix (when ON → cyberpunk overlay)
gaming_mode_entity: binary_sensor.gaming_mode

# Smog (PM µg/m³ → fog from bottom when above threshold)
pm25_entity: sensor.pm25
pm10_entity: sensor.pm10
smog_threshold_pm25: 35
smog_threshold_pm10: 50

# Wind & clouds (direction, tilt, cloud density & speed)
cloud_coverage_entity: sensor.cloud_coverage
cloud_speed_multiplier: 1
wind_speed_entity: sensor.wind_speed
wind_direction_entity: sensor.wind_direction
rain_max_tilt_deg: 30
rain_wind_min_kmh: 3
wind_sway_factor: 0.7

# Precipitation (rain speed multiplier)
precipitation_entity: sensor.precipitation

# Lightning (distance & count → flash timing)
lightning_counter_entity: sensor.lightning_strikes
lightning_distance_entity: sensor.lightning_distance

# Aurora (clear-night – NOAA Aurora + optional K-index)
enable_aurora_effect: true
aurora_variant: northern-gradients  # bands | northern-gradients (Bubble Northern Gradients)
aurora_chance_entity: sensor.aurora_60_1
aurora_visibility_alert_entity: binary_sensor.aurora_visibility_alert
aurora_visibility_min: 0.15
k_index_entity: sensor.planetary_k_index  # NOAA Space Weather; global, works in Europe/Poland

# Tuning
theme_mode: null
drizzle_precipitation_max: 2.5
snowy_variant: snowy2
spatial_mode: bubble
```

**Integrations used in this example:** OpenWeatherMap (weather, clouds, wind, precip), Moon Phase / Moon Astro (moon), NOAA Aurora Forecast (aurora chance), NOAA Space Weather (planetary K-index), Google Air Quality or similar (PM sensors), DOM or Blitzortung (lightning).

Recommended sensors:

- **Wind direction** and **wind speed** – for cloud/particle direction and intensity.
- **UV index** – for sun/glow intensity and future safety‑related behaviour.

Troubleshooting
---------------

### 404 main.js / Failed to load resource

If you see `GET .../src/main.js 404 (Not Found)`, the card needs the built bundle. Either:

1. **Update via HACS** – Ensure you have the latest version (the repo should include the built file).
2. **Manual build** – If you have Node.js installed:
   ```bash
   cd fork_u-weather_aware_2
   npm install
   npm run build:hacs
   # Then copy the built fork_u-weather_aware.js to your HACS folder
   ```
3. **Download artifact** – Go to [Actions](https://github.com/silasmariusz/fork_u-weather_aware_2/actions), open the latest **Build** run, download the **hacs-bundle** artifact, and replace `fork_u-weather_aware.js` in your HACS install folder.

- Overlay not visible?  
  - Check the browser console for errors.  
  - Verify the card `type` is `custom:fork-u-weather-aware-card`.  
  - Make sure `enabled: true` is set.
- Some effects not showing?  
  - Confirm that your weather entity actually enters those states (`snowy`, `hail`, etc.).  
  - Try Development mode with `test_effect` to force them.
- Performance issues on mobile?  
  - Enable **Mobile** options in the editor: limit DPR, fewer particles, lighter `snowy2`, 30 FPS.  
  - Use **Spatial awareness → background / gradient-mask** to move motion away from the main cards.

