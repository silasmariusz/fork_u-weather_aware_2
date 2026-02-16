/**
 * Weather Overlay - Three.js (WebGL) version
 * Replaces Canvas 2D rendering with WeatherEffectsCore
 */
import { WeatherEffectsEngine } from './utils/weather-effects-engine.js';
import { mapWeatherStateToEffect } from './utils/weather-condition-mapper.js';

const UPDATE_INTERVAL = 5000;
const ENABLED_DASHBOARDS = [];
const TOGGLE_ENTITY = '';
const RAIN_SENSOR_ENTITY = '';
const REQUIRE_RAIN_CONFIRMATION = false;
const DEBUG_MODE = false;

function log(msg, data = null) {
  if (DEBUG_MODE) console.log('[Weather Overlay]', msg, data ?? '');
}
function warn(msg, data = null) {
  console.warn('[Weather Overlay] ⚠️', msg, data ?? '');
}
function error(msg, data = null) {
  console.error('[Weather Overlay] ❌', msg, data ?? '');
}

function getHomeAssistant() {
  const ha = document.querySelector('home-assistant');
  return ha?.hass ? ha : null;
}

function getWeatherEntityId() {
  return (window.ForkUWeatherAwareConfig || {}).weather_entity || 'weather.openweathermap';
}

function getWeatherState() {
  try {
    const ha = getHomeAssistant();
    if (!ha) return null;

    const cfg = window.ForkUWeatherAwareConfig || {};
    const WEATHER_ENTITY = getWeatherEntityId();

    if (cfg.development_mode && cfg.test_effect && cfg.test_effect !== 'Use Real Weather') {
      let devState = cfg.test_effect;
      if (devState === 'snowy' && cfg.snowy_variant === 'snowy2') devState = 'snowy2';
      log('Using DEVELOPMENT weather:', devState);
      return devState;
    }

    const weatherEntity = ha.hass.states[WEATHER_ENTITY];
    if (!weatherEntity) {
      error(`Weather entity '${WEATHER_ENTITY}' not found`);
      return null;
    }

    let weatherState = (weatherEntity.state || '').toLowerCase().replace(/_/g, '-');

    const drizzleMax = parseFloat(cfg.drizzle_precipitation_max) || 2.5;
    if (weatherState === 'rainy') {
      const precip =
        weatherEntity.attributes?.precipitation != null
          ? parseFloat(weatherEntity.attributes.precipitation)
          : weatherEntity.attributes?.precipitation_1h != null
            ? parseFloat(weatherEntity.attributes.precipitation_1h)
            : NaN;
      if (!isNaN(precip) && precip > 0 && precip <= drizzleMax) {
        weatherState = 'rainy-drizzle';
      }
    }

    if (RAIN_SENSOR_ENTITY && REQUIRE_RAIN_CONFIRMATION && (weatherState === 'rainy' || weatherState === 'pouring')) {
      const rainSensor = ha.hass.states[RAIN_SENSOR_ENTITY];
      if (rainSensor) {
        const rainRate = parseFloat(rainSensor.state);
        if (isNaN(rainRate) || rainRate <= 0) weatherState = 'cloudy';
      }
    }

    return weatherState;
  } catch (err) {
    error('Error getting weather state:', err);
    return null;
  }
}

function isOverlayEnabled() {
  try {
    const cfg = window.ForkUWeatherAwareConfig || {};
    if (cfg.enabled === false) return false;
    if (!TOGGLE_ENTITY) return true;
    const ha = getHomeAssistant();
    if (!ha) return true;
    const toggle = ha.hass.states[TOGGLE_ENTITY];
    if (!toggle) return true;
    return toggle.state === 'on';
  } catch (err) {
    error('Error checking overlay:', err);
    return true;
  }
}

function isOnEnabledDashboard() {
  if (!ENABLED_DASHBOARDS?.length) return true;
  const path = window.location.pathname;
  const parts = path.split('/').filter(Boolean);
  if (parts.length === 0) return ENABLED_DASHBOARDS.includes('lovelace') || ENABLED_DASHBOARDS.includes('home');
  if (parts[0] === 'lovelace') {
    const dash = parts.length === 1 ? 'lovelace' : parts[1];
    return ENABLED_DASHBOARDS.includes(dash);
  }
  for (const part of parts) {
    if (ENABLED_DASHBOARDS.includes(part)) return true;
  }
  return ENABLED_DASHBOARDS.includes(parts[parts.length - 1]);
}

function isMobileDevice() {
  return window.innerWidth < 600 || 'ontouchstart' in window;
}

function isWebGLSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

function getEffectiveDpr() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  let dpr = window.devicePixelRatio || 1;
  if (isMobileDevice() && cfg.mobile_limit_dpr) dpr = Math.min(dpr, 2);
  return dpr;
}

function isSmogAlertActive() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const pm25Id = cfg.pm25_entity;
  const pm4Id = cfg.pm4_entity;
  const pm10Id = cfg.pm10_entity;
  const thresh25 = cfg.smog_threshold_pm25 ?? 35;
  const thresh4 = cfg.smog_threshold_pm4 ?? 50;
  const thresh10 = cfg.smog_threshold_pm10 ?? 50;
  const ha = getHomeAssistant();
  if (!ha?.hass) return false;
  if (pm25Id) {
    const e = ha.hass.states[pm25Id];
    if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v) && v >= thresh25) return true;
    }
  }
  if (pm4Id) {
    const e = ha.hass.states[pm4Id];
    if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v) && v >= thresh4) return true;
    }
  }
  if (pm10Id) {
    const e = ha.hass.states[pm10Id];
    if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v) && v >= thresh10) return true;
    }
  }
  return false;
}

function isEffectEnabled(key) {
  const cfg = window.ForkUWeatherAwareConfig || {};
  return cfg[key] !== false;
}

function isGamingModeActive() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const eid = cfg.gaming_mode_entity;
  if (!eid || typeof eid !== 'string' || !eid.trim()) return false;
  const ha = getHomeAssistant();
  if (!ha?.hass?.states) return false;
  const ent = ha.hass.states[eid];
  return !!(ent && String(ent.state).toLowerCase() === 'on');
}

let cachedMoonPosition = null;
let sensorCacheTime = 0;
const SENSOR_CACHE_MS = 3000;

function getMoonPosition() {
  const now = Date.now();
  if (now - sensorCacheTime < SENSOR_CACHE_MS && cachedMoonPosition) return cachedMoonPosition;
  sensorCacheTime = now;
  try {
    const cfg = window.ForkUWeatherAwareConfig || {};
    const ha = getHomeAssistant();
    if (!ha?.hass) return { x: 0.75, y: 0.12 };

    const moonPosId = cfg.moon_position_entity;
    const moonPhaseId = cfg.moon_phase_entity;
    const moonAzId = cfg.moon_azimuth_entity;
    const moonAltId = cfg.moon_altitude_entity;
    let moonPos = { x: 0.75, y: 0.12 };

    for (const eid of [moonPosId, moonPhaseId].filter(Boolean)) {
      const ent = ha.hass.states[eid];
      if (!ent?.attributes) continue;
      const attrs = ent.attributes;
      const azimuth = parseFloat(attrs.azimuth ?? attrs.moon_azimuth_deg);
      const elev = parseFloat(attrs.elevation ?? attrs.altitude ?? attrs.moon_altitude_deg);
      if (!isNaN(azimuth) && !isNaN(elev) && elev > 0) {
        moonPos.x = Math.max(0, Math.min(1, (azimuth - 90) / 180));
        moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
        break;
      }
    }
    if (moonAzId || moonAltId) {
      const azEnt = moonAzId ? ha.hass.states[moonAzId] : null;
      const altEnt = moonAltId ? ha.hass.states[moonAltId] : null;
      const azimuth = azEnt ? parseFloat(azEnt.state) : NaN;
      const elev = altEnt ? parseFloat(altEnt.state) : NaN;
      if (!isNaN(azimuth) && !isNaN(elev) && elev > 0) {
        moonPos.x = Math.max(0, Math.min(1, (azimuth - 90) / 180));
        moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
      }
    }
    cachedMoonPosition = moonPos;
    return moonPos;
  } catch (e) {
    return cachedMoonPosition || { x: 0.75, y: 0.12 };
  }
}

const BEARING_MAP = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };

let lastLightningCount = -1;

function getLightningData() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  let count = 0;
  let distanceKm = 0;

  if (cfg.development_mode && (cfg.debug_lightning_counter != null || cfg.debug_lightning_distance != null)) {
    count = cfg.debug_lightning_counter != null && cfg.debug_lightning_counter !== ''
      ? parseInt(cfg.debug_lightning_counter, 10) || 0
      : (lastLightningCount >= 0 ? lastLightningCount : 0);
    distanceKm = cfg.debug_lightning_distance != null && cfg.debug_lightning_distance !== ''
      ? parseFloat(cfg.debug_lightning_distance) || 0
      : 5;
    if (cfg.debug_lightning_counter != null && cfg.debug_lightning_counter !== '') {
      lastLightningCount = count;
    }
  } else if (ha?.hass?.states) {
    const counterId = cfg.lightning_counter_entity;
    const distId = cfg.lightning_distance_entity;
    if (counterId) {
      const e = ha.hass.states[counterId];
      if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
        const v = parseInt(e.state, 10);
        if (!isNaN(v)) count = v;
      }
    }
    if (distId) {
      const e = ha.hass.states[distId];
      if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v) && v >= 0) distanceKm = v;
      }
    }
    if (lastLightningCount < 0) lastLightningCount = count;
  }

  const strikesToTrigger = count > lastLightningCount ? Math.min(count - lastLightningCount, 5) : 0;
  if (strikesToTrigger > 0) lastLightningCount = count;

  return { count, distanceKm, strikesToTrigger };
}

function getCloudCoverage() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  const WEATHER_ENTITY = getWeatherEntityId();
  if (cfg.development_mode && cfg.debug_cloud_coverage != null && String(cfg.debug_cloud_coverage).trim() !== '') {
    const v = parseFloat(cfg.debug_cloud_coverage);
    if (!isNaN(v)) return Math.max(0, Math.min(100, v));
  }
  if (!ha?.hass) return null;
  if (cfg.cloud_coverage_entity) {
    const e = ha.hass.states[cfg.cloud_coverage_entity];
    if (e?.state && e.state !== 'unavailable' && e.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v)) return Math.max(0, Math.min(100, v));
    }
  }
  const we = ha.hass.states[WEATHER_ENTITY];
  if (we?.attributes?.cloud_coverage != null) {
    const v = parseFloat(we.attributes.cloud_coverage);
    if (!isNaN(v)) return Math.max(0, Math.min(100, v));
  }
  return null;
}

function getPrecipitationMultiplier() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  const WEATHER_ENTITY = getWeatherEntityId();
  if (cfg.development_mode && cfg.debug_precipitation && cfg.debug_precipitation !== 'Use sensors') {
    const m = { light: 0.35, medium: 0.65, heavy: 1.2 }[cfg.debug_precipitation];
    if (m !== undefined) return m;
  }
  if (!ha?.hass) return 1;
  if (cfg.precipitation_entity) {
    const e = ha.hass.states[cfg.precipitation_entity];
    if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v)) return Math.max(0.2, Math.min(1.5, 0.2 + (v / 10)));
    }
  }
  const we = ha.hass.states[WEATHER_ENTITY];
  if (!we?.attributes) return 1;
  const precip = we.attributes.precipitation ?? we.attributes.precipitation_1h ?? we.attributes.precipitation_probability;
  if (precip == null) return 1;
  const v = parseFloat(precip);
  if (isNaN(v)) return 1;
  return Math.max(0.2, Math.min(1.5, 0.2 + (v / 10)));
}

function getAuroraChance() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  if (!ha?.hass?.states) return 0;
  const eid = cfg.aurora_chance_entity;
  if (!eid) return 0;
  const e = ha.hass.states[eid];
  if (!e?.state || e.state === 'unavailable' || e.state === 'unknown') return 0;
  const v = parseFloat(e.state);
  return isNaN(v) ? 0 : Math.max(0, Math.min(100, v)) / 100;
}

function getKIndex() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  if (!ha?.hass?.states) return null;
  const eid = cfg.k_index_entity;
  if (!eid) return null;
  const e = ha.hass.states[eid];
  if (!e?.state || e.state === 'unavailable' || e.state === 'unknown') return null;
  const v = parseFloat(e.state);
  return isNaN(v) ? null : Math.max(0, Math.min(9, v));
}

function isAuroraVisibilityAlertActive() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const eid = cfg.aurora_visibility_alert_entity;
  if (!eid) return false;
  const ha = getHomeAssistant();
  if (!ha?.hass?.states) return false;
  const e = ha.hass.states[eid];
  return !!(e && String(e.state).toLowerCase() === 'on');
}

function getAuroraVisibilityScore() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  if (!isEffectEnabled('enable_aurora_effect')) return 0;
  if (cfg.development_mode && cfg.debug_aurora_score != null && String(cfg.debug_aurora_score).trim() !== '') {
    const v = parseFloat(cfg.debug_aurora_score);
    if (!isNaN(v)) return Math.max(0, Math.min(1, v));
  }
  const auroraChance = getAuroraChance() || (isAuroraVisibilityAlertActive() ? 0.7 : 0);
  const cloudCoverage = getCloudCoverage();
  const skyClarity = 1 - ((cloudCoverage ?? 50) / 100);
  const sunPos = getSunPosition();
  const elevation = sunPos?.elevation ?? 0;
  const darkness = Math.max(0, Math.min(1, 1 - (elevation + 6) / 6));
  let score = auroraChance * skyClarity * darkness;
  const kIndex = getKIndex();
  if (kIndex != null && kIndex >= 0) {
    score *= Math.min(1.5, 1 + 0.05 * kIndex);
  }
  const minScore = (cfg.aurora_visibility_min != null && !isNaN(parseFloat(cfg.aurora_visibility_min)))
    ? Math.max(0, Math.min(1, parseFloat(cfg.aurora_visibility_min)))
    : 0.15;
  return score >= minScore ? score : 0;
}

function getThemeMode() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  if (cfg.theme_mode === 'dark' || cfg.theme_mode === 'light') return cfg.theme_mode;
  const root = document.documentElement;
  if (root?.classList && (root.classList.contains('dark') || root.getAttribute('theme') === 'dark')) return 'dark';
  if (root?.classList?.contains('light')) return 'light';
  if (typeof window.matchMedia !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
}

function getSunPosition() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const ha = getHomeAssistant();
  const SUN_ENTITY = cfg.sun_entity || 'sun.sun';
  let azimuth = 180;
  let elevation = 45;
  let uvIndex = 3;

  if (ha?.hass?.states) {
    const sun = ha.hass.states[SUN_ENTITY];
    if (sun?.attributes) {
      const a = sun.attributes;
      azimuth = parseFloat(a.azimuth) || 180;
      elevation = parseFloat(a.elevation) || 45;
    }
    if (cfg.uv_index_entity) {
      const uv = ha.hass.states[cfg.uv_index_entity];
      if (uv?.state !== 'unavailable' && uv?.state !== 'unknown') {
        const v = parseFloat(uv.state);
        if (!isNaN(v) && v >= 0) uvIndex = v;
      }
    } else {
      const we = ha.hass.states[getWeatherEntityId()];
      if (we?.attributes?.uv_index != null) uvIndex = parseFloat(we.attributes.uv_index) || 3;
    }
  }

  return { azimuth, elevation, uvIndex };
}

function getWindData() {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const WEATHER_ENTITY = getWeatherEntityId();
  if (cfg.development_mode && (cfg.debug_wind_speed || cfg.debug_wind_direction)) {
    let spd = 5;
    if (cfg.debug_wind_speed && cfg.debug_wind_speed !== 'Use sensors') {
      spd = { none: 0, light: 10, medium: 25, strong: 45 }[cfg.debug_wind_speed] ?? 5;
    } else {
      const ha = getHomeAssistant();
      if (ha?.hass && cfg.wind_speed_entity) {
        const e = ha.hass.states[cfg.wind_speed_entity];
        if (e?.state !== 'unavailable') spd = parseFloat(e.state) || 5;
      }
    }
    let brg = 270;
    if (cfg.debug_wind_direction && cfg.debug_wind_direction !== 'Use sensors') {
      const d = cfg.debug_wind_direction;
      brg = (BEARING_MAP[d] ?? parseFloat(d)) || 270;
    } else {
      const ha = getHomeAssistant();
      if (ha?.hass && cfg.wind_direction_entity) {
        const e = ha.hass.states[cfg.wind_direction_entity];
        if (e?.state !== 'unavailable') brg = parseFloat(e.state) || 270;
      }
    }
    return { speed: spd, bearing: brg };
  }
  const ha = getHomeAssistant();
  if (!ha?.hass) return { speed: 5, bearing: 270 };
  let speed = 5;
  let bearing = 270;
  if (cfg.wind_speed_entity) {
    const e = ha.hass.states[cfg.wind_speed_entity];
    if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v)) speed = v;
    }
  }
  if (speed === 5) {
    const we = ha.hass.states[WEATHER_ENTITY];
    const v = we?.attributes?.wind_speed != null ? parseFloat(we.attributes.wind_speed) : NaN;
    if (!isNaN(v)) speed = v;
  }
  if (cfg.wind_direction_entity) {
    const e = ha.hass.states[cfg.wind_direction_entity];
    if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
      const v = parseFloat(e.state);
      if (!isNaN(v)) bearing = v;
      else if (typeof e.state === 'string' && BEARING_MAP[e.state] != null) bearing = BEARING_MAP[e.state];
    }
  }
  if (bearing === 270) {
    const we = ha.hass.states[WEATHER_ENTITY];
    const v = we?.attributes?.wind_bearing != null ? parseFloat(we.attributes.wind_bearing) : NaN;
    if (!isNaN(v)) bearing = v;
  }
  return { speed, bearing };
}

function getSpatialZIndex() {
  const mode = (window.ForkUWeatherAwareConfig || {}).spatial_mode || 'foreground';
  const z = { foreground: 9998, background: -1, bubble: 3, 'gradient-mask': 9997 }[mode];
  return z ?? 9998;
}

function filterEffectByConfig(effect) {
  const cfg = window.ForkUWeatherAwareConfig || {};
  const toggle = {
    rain: cfg.enable_rain,
    rain_storm: cfg.enable_rain && cfg.enable_lightning_effect,
    rain_drizzle: cfg.enable_rain,
    snow_gentle: cfg.enable_snow,
    snow_storm: cfg.enable_snow,
    snow_layered: cfg.enable_snow,
    fog_light: cfg.enable_fog,
    fog_dense: cfg.enable_fog,
    sun_beams: cfg.enable_sun_glow,
    clouds: cfg.enable_clouds,
    hail: cfg.enable_hail,
    lightning: cfg.enable_lightning_effect,
    stars: cfg.enable_stars,
    matrix: cfg.enable_matrix,
  };
  if (effect && effect !== 'none' && toggle[effect] === false) return 'none';
  return effect;
}

let engine = null;
let container = null;
let currentWeather = null;
let lastUpdateTime = 0;
let lastPath = window.location.pathname;

function applySpatialStyle() {
  if (!container) return;
  container.style.setProperty('--weather-overlay-z', String(getSpatialZIndex()));
}

function updateWeather() {
  const now = Date.now();
  if (now - lastUpdateTime < 1000) return;

  const enabled = isOverlayEnabled();
  const onDashboard = isOnEnabledDashboard();

  if (!enabled || !onDashboard) {
    if (engine) engine.stop();
    if (container) container.style.display = 'none';
    return;
  }

  lastUpdateTime = now;
  if (container) container.style.display = 'block';

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
    if (engine) engine.stop();
    if (container) container.style.display = 'none';
    return;
  }

  const cfg = window.ForkUWeatherAwareConfig || {};
  const matrixOnly = cfg.gaming_matrix_only && isGamingModeActive() && isEffectEnabled('enable_matrix');
  const newWeather = matrixOnly ? null : getWeatherState();
  const effect = matrixOnly ? 'matrix' : filterEffectByConfig(mapWeatherStateToEffect(newWeather));

  if (newWeather !== currentWeather || !engine) {
    currentWeather = newWeather;
    log('Weather:', newWeather, '→ Effect:', effect);
  }

  const smogActive = isEffectEnabled('enable_smog_effect') && isSmogAlertActive();
  const moonPosition = effect === 'stars' && isEffectEnabled('enable_moon_glow') ? getMoonPosition() : null;
  const auroraVisibilityScore = effect === 'stars' ? getAuroraVisibilityScore() : 0;
  const auroraOverlay = effect === 'stars' && auroraVisibilityScore > 0;
  const rainEffects = ['rain', 'rain_storm', 'rain_drizzle', 'snow_storm'];
  const windowDroplets = rainEffects.includes(effect) && isEffectEnabled('enable_window_droplets');
  const spatialMode = (window.ForkUWeatherAwareConfig || {}).spatial_mode || 'foreground';
  const { speed: windSpeedKmh, bearing: windBearing } = getWindData();
  const windSwayFactor = (cfg.wind_sway_factor != null && !isNaN(parseFloat(cfg.wind_sway_factor)))
    ? Math.max(0, Math.min(2, parseFloat(cfg.wind_sway_factor))) : 0.7;
  const rainMaxTiltDeg = (cfg.rain_max_tilt_deg != null && !isNaN(parseFloat(cfg.rain_max_tilt_deg)))
    ? parseFloat(cfg.rain_max_tilt_deg) : 30;
  const rainWindMinKmh = (cfg.rain_wind_min_kmh != null && !isNaN(parseFloat(cfg.rain_wind_min_kmh)))
    ? parseFloat(cfg.rain_wind_min_kmh) : 3;
  const lightningData = (effect === 'lightning' || effect === 'rain_storm') ? getLightningData() : null;
  const lightningOverlay = effect === 'rain_storm' ? lightningData : null;
  const sunPosition = effect === 'sun_beams' ? getSunPosition() : null;
  const speedFactorLightning = (cfg.speed_factor_lightning != null && !isNaN(parseFloat(cfg.speed_factor_lightning)))
    ? parseFloat(cfg.speed_factor_lightning) : 1;
  const cloudCoverage = getCloudCoverage();
  const precipitationMultiplier = getPrecipitationMultiplier();
  const themeMode = getThemeMode();
  const cloudSpeedMult = (cfg.cloud_speed_multiplier != null && !isNaN(parseFloat(cfg.cloud_speed_multiplier)))
    ? Math.max(0.1, Math.min(3, parseFloat(cfg.cloud_speed_multiplier))) : 1;
  if (engine) {
    engine.start(effect, 100, {
      smogActive,
      moonPosition,
      windowDroplets,
      spatialMode,
      windBearing,
      windSpeedKmh,
      windSwayFactor,
      rainMaxTiltDeg,
      rainWindMinKmh,
      lightningData,
      lightningOverlay,
      sunPosition,
      speed_factor_lightning: speedFactorLightning,
      cloudCoverage,
      precipitationMultiplier,
      themeMode,
      cloudSpeedMultiplier: cloudSpeedMult,
      auroraOverlay,
      auroraVisibilityScore,
    });
  }
}

function handleResize() {
  if (!engine) return;
  engine.resize({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    isMobile: isMobileDevice(),
    devicePixelRatio: getEffectiveDpr(),
  });
}

function init() {
  if (container) return;

  log('Initializing Three.js Weather Overlay...');

  if (!isWebGLSupported()) {
    warn('WebGL not supported - weather overlay disabled');
    return;
  }

  container = document.createElement('div');
  container.id = 'fork-u-weather-overlay';
  container.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);';
  applySpatialStyle();
  document.body.appendChild(container);

  try {
    engine = new WeatherEffectsEngine(container, {
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      isMobile: isMobileDevice(),
      devicePixelRatio: getEffectiveDpr(),
    });

    if (!isOverlayEnabled() || !isOnEnabledDashboard()) {
      container.style.display = 'none';
    } else {
      const weather = getWeatherState();
      const effect = filterEffectByConfig(mapWeatherStateToEffect(weather));
      currentWeather = weather;
    const smogActive = isEffectEnabled('enable_smog_effect') && isSmogAlertActive();
    const moonPosition = effect === 'stars' && isEffectEnabled('enable_moon_glow') ? getMoonPosition() : null;
    const auroraVisibilityScore = effect === 'stars' ? getAuroraVisibilityScore() : 0;
    const auroraOverlay = effect === 'stars' && auroraVisibilityScore > 0;
    const rainEffects = ['rain', 'rain_storm', 'rain_drizzle', 'snow_storm'];
    const windowDroplets = rainEffects.includes(effect) && isEffectEnabled('enable_window_droplets');
    const spatialMode = (window.ForkUWeatherAwareConfig || {}).spatial_mode || 'foreground';
    const { speed: windSpeedKmh, bearing: windBearing } = getWindData();
    const initCfg = window.ForkUWeatherAwareConfig || {};
    const windSwayFactor = (initCfg.wind_sway_factor != null && !isNaN(parseFloat(initCfg.wind_sway_factor)))
      ? Math.max(0, Math.min(2, parseFloat(initCfg.wind_sway_factor))) : 0.7;
    const rainMaxTiltDeg = (initCfg.rain_max_tilt_deg != null && !isNaN(parseFloat(initCfg.rain_max_tilt_deg)))
      ? parseFloat(initCfg.rain_max_tilt_deg) : 30;
    const rainWindMinKmh = (initCfg.rain_wind_min_kmh != null && !isNaN(parseFloat(initCfg.rain_wind_min_kmh)))
      ? parseFloat(initCfg.rain_wind_min_kmh) : 3;
    const initLightning = (effect === 'lightning' || effect === 'rain_storm') ? getLightningData() : null;
    const initSun = effect === 'sun_beams' ? getSunPosition() : null;
    engine.start(effect, 100, {
      smogActive,
      moonPosition,
      windowDroplets,
      spatialMode,
      windBearing,
      windSpeedKmh,
      windSwayFactor,
      rainMaxTiltDeg,
      rainWindMinKmh,
      lightningData: initLightning,
      lightningOverlay: effect === 'rain_storm' ? initLightning : null,
      sunPosition: initSun,
      speed_factor_lightning: (initCfg.speed_factor_lightning != null && !isNaN(parseFloat(initCfg.speed_factor_lightning))) ? parseFloat(initCfg.speed_factor_lightning) : 1,
      cloudCoverage: getCloudCoverage(),
      precipitationMultiplier: getPrecipitationMultiplier(),
      themeMode: getThemeMode(),
      cloudSpeedMultiplier: (initCfg.cloud_speed_multiplier != null && !isNaN(parseFloat(initCfg.cloud_speed_multiplier))) ? Math.max(0.1, Math.min(3, parseFloat(initCfg.cloud_speed_multiplier))) : 1,
      auroraOverlay: effect === 'stars' && getAuroraVisibilityScore() > 0,
      auroraVisibilityScore: effect === 'stars' ? getAuroraVisibilityScore() : 0,
    });
  }
  } catch (err) {
    error('Weather overlay init failed:', err);
    if (container?.parentNode) container.parentNode.removeChild(container);
    return;
  }

  setInterval(updateWeather, 1000);
  window.addEventListener('resize', handleResize);

  setInterval(() => {
    if (window.location.pathname !== lastPath) {
      lastPath = window.location.pathname;
      lastUpdateTime = 0;
      updateWeather();
    }
  }, 500);

  log('Three.js overlay ready');
}

function waitForHomeAssistant() {
  let attempts = 0;
  const check = setInterval(() => {
    attempts++;
    if (getHomeAssistant()) {
      clearInterval(check);
      init();
    } else if (attempts >= 60) {
      clearInterval(check);
      error('Home Assistant not found after 30s');
    }
  }, 500);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', waitForHomeAssistant);
} else {
  waitForHomeAssistant();
}
