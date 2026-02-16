# Release v2.0.4

## Aurora (Northern Lights) effect

Aurora bands in the **header** on clear nights when visibility score exceeds threshold.

### New features

- **Aurora overlay** – 5 animated color bands (Gist style) at top of screen on `clear-night`
- **Visibility Score** – `Aurora Chance × Sky Clarity × Darkness Factor` (optional K-index boost)
- **Config**: `aurora_chance_entity`, `aurora_visibility_alert_entity`, `aurora_visibility_min`, `k_index_entity`, `enable_aurora_effect`
- **Dev mode** – `debug_aurora_score` (0–1) to force effect for testing
- **Editor** – Aurora panel with entity pickers and options

### Integrations

- NOAA Aurora Forecast (`sensor.aurora_60_1`, `sensor.aurora_visibility`)
- NOAA Space Weather – `sensor.planetary_k_index` (global Kp, recommended for Europe/Poland)
- BOM Space Weather – K-index (Australia region)
- Uses existing `cloud_coverage_entity`, `sun_entity`

### Upgrade

1. Update via HACS (or redownload)
2. Restart Home Assistant or hard-refresh (Ctrl+F5)
3. Add Aurora sensors in editor if desired; effect shows when score &gt; 0.15
