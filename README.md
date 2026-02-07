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
  - ⛈️ Lightning & lightning‑rainy (distance‑aware flashes)
  - 🧊 Hail (rarer, “meteor‑like” impacts)

- **Gaming / Matrix mode**
  - Dedicated **gaming_mode_entity** (`binary_sensor` / `input_boolean`).
  - Option **“Matrix only (no weather background)”** for pure ambient cyberpunk layer.

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
  - overlay sits **under Bubble card backdrops** (which use around `z-index: -5`),
  - we use approx. `z-index: -3` so Bubble popups still stand out while keeping weather in the scene.
- **`gradient-mask`** – **Gradient mask** mode:
  - effects are drawn normally but then a radial mask cuts out the **central area** of the screen,
  - you get motion mostly in peripheral vision (around card edges), center stays calm.
- **`foreground`** – classic “live wallpaper”:
  - overlay in front of dashboard content with click‑through.

This is the heart of **Spatial Aware** behaviour: you decide if effects are pure background, living under Bubble overlays, wrapped around the content with a mask, or full foreground.

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

- Switch `spatial_mode` to **`bubble`** to test Bubble‑aware backdrop integration.
- Use `gaming_matrix_only: true` to see pure Matrix effect during sandbox testing.

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
- **Lightning data** – distance and strike count for timed strobes and distance‑based strength.

Recommended sensors:

- **Wind direction** and **wind speed** – for cloud/particle direction and intensity.
- **UV index** – for sun/glow intensity and future safety‑related behaviour.

Troubleshooting
---------------

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

