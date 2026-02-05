// Weather Overlay for Home Assistant
// Fullscreen canvas weather animations based on weather entity state
// Version 2.0 - Improved defaults and debugging
(function() {
  'use strict';
  
  // ============================================
  // CONFIGURATION - Edit these values as needed
  // ============================================
  
  // Global config object that can be controlled by the
  // Fork U - Weather Aware Lovelace card editor.
  const DEFAULT_OVERLAY_CONFIG = {
    enabled:     true,
    weather_entity: 'weather.openweathermap',
    development_mode: false,
    test_effect: 'Use Real Weather',
    sun_entity: 'sun.sun',
    moon_phase_entity: null,
    uv_index_entity: null,
    moon_position_entity: null,  // Single entity with attributes (Moon Astro, etc.)
    moon_azimuth_entity: null,   // Lunar Phase: separate sensor (Moon Azimuth)
    moon_altitude_entity: null,  // Lunar Phase: separate sensor (Moon Altitude)
    moon_distance_entity: null,  // Lunar Phase: separate sensor (Moon Distance)
    gaming_mode_entity: null,    // input_boolean.gaming_mode – Gaming/Ambient Immersive
    pm25_entity: null,           // PM2.5 µg/m³ (Google Air Quality etc.)
    pm4_entity: null,            // PM4 µg/m³ (for Cystic Fibrosis awareness)
    pm10_entity: null,           // PM10 µg/m³
    smog_threshold_pm25: 35,     // µg/m³ – WHO/EPA unhealthy for sensitive (24h); trigger fog
    smog_threshold_pm4: 50,      // µg/m³ – no global standard; CF awareness
    smog_threshold_pm10: 50,     // µg/m³ – EU 24h limit / WHO guideline
    cloud_coverage_entity: null, // % – cloud/fog density
    wind_speed_entity: null,
    wind_direction_entity: null,
    precipitation_entity: null,  // mm – dynamic rain/snow speed
    lightning_counter_entity: null,
    lightning_distance_entity: null,
    debug_precipitation: null,    // 'light'|'medium'|'heavy' – mm/h equiv
    debug_wind_speed: null,       // 'none'|'light'|'medium'|'strong'
    debug_wind_direction: null,   // 0–360 or 'N','NE','E','SE','S','SW','W','NW'
    debug_lightning_distance: null, // km override
    debug_lightning_counter: null,  // strike count override
    debug_cloud_coverage: null,   // 0–100 % override
    cloud_speed_multiplier: 1,    // 0.5–2: manual cloud speed (1=default, wind still scales)
    rain_max_tilt_deg: 30,        // max rain tilt from wind (degrees); 0 = always vertical
    rain_wind_min_kmh: 3,         // min wind speed (km/h) to apply tilt; below = vertical
    theme_mode: null,             // 'light'|'dark' – set by card from HA theme; null = auto-detect
    drizzle_precipitation_max: 2.5, // mm – above this rainy is normal rain; below = drizzle (mży/kropi)
    speed_factor_rain: 1,
    speed_factor_snow: 1,
    speed_factor_clouds: 1,
    speed_factor_fog: 1,
    speed_factor_smog: 1,
    speed_factor_hail: 1,
    speed_factor_lightning: 1,
    speed_factor_stars: 1,
    speed_factor_matrix: 1,
    wind_sway_factor: 0.7,      // 0–2: how strongly wind bends rain/snow (default 0.7)
    spatial_mode: 'foreground', // 'background' | 'bubble' | 'gradient-mask' | 'foreground'
    // Mobile performance options (can be toggled in editor)
    mobile_limit_dpr: true,       // cap canvas DPR on phones (sharper vs performance)
    mobile_reduce_particles: true,// reduce particle counts on phones
    mobile_snowy2_light: true,    // lighter snowy2 layers on phones
    mobile_smog_simple: false,    // simpler smog rendering on phones
    mobile_30fps: false,          // cap animation to ~30 FPS on phones
    gaming_matrix_only: false     // when gaming ON: show only Matrix (no weather layer)
  };
  window.ForkUWeatherAwareConfig = Object.assign(
    {},
    DEFAULT_OVERLAY_CONFIG,
    window.ForkUWeatherAwareConfig || {}
  );
  window.ForkUWeatherAwareDefaultConfig = DEFAULT_OVERLAY_CONFIG;

  // Always announce presence in console (even when DEBUG_MODE is false)
  try {
    // Styled banner – easy to spot but not noisy
    console.log(
      '%cFork U – Weather Aware%c overlay loaded · spatial, theme & mobile aware',
      'background:#ffcc00;color:#000;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px;',
      'background:#1e1e1e;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;'
    );
  } catch (e) {
    // ignore
  }

  // Your weather entity (REQUIRED - change this to match your setup)
  // Examples: 'weather.home', 'weather.openweathermap', 'weather.accuweather'
  const WEATHER_ENTITY = window.ForkUWeatherAwareConfig.weather_entity;
  
  // Optional: Toggle to enable/disable overlay (set to '' to disable this feature)
  // Legacy helper toggle is no longer required. Enable/disable is now driven by card config.
  const TOGGLE_ENTITY = '';
  
  // Optional: Test selector for different weather states (set to '' to disable)
  // Legacy input_select is no longer required; development mode is now driven by card config.
  const TEST_ENTITY = '';
  
  // How often to check weather (in milliseconds)
  const UPDATE_INTERVAL = 5000;
  
  // Optional: Rain sensor for cross-checking (set to '' to disable)
  // If your weather service reports false rain, this sensor can verify
  const RAIN_SENSOR_ENTITY = ''; // e.g., 'sensor.rain_gauge' or 'sensor.hydrawise_rain'
  const REQUIRE_RAIN_CONFIRMATION = false; // Set to true to require rain sensor confirmation
  
  // Dashboard filtering
  // [] = Show on ALL dashboards (recommended for most users)
  // ['lovelace'] = Only on default dashboard
  // ['home', 'weather'] = Only on specific dashboards
  const ENABLED_DASHBOARDS = []; // Empty = ALL dashboards
  
  // Debug mode - set to true to see detailed logs in browser console
  // (kept off by default to avoid extra work on mobile; can be enabled via console)
  const DEBUG_MODE = false;

  function isMobileDevice() {
    return window.innerWidth < 600 || 'ontouchstart' in window;
  }

  function getMobilePerfConfig() {
    return window.ForkUWeatherAwareConfig || {};
  }

  function getEffectiveDpr() {
    const cfg = getMobilePerfConfig();
    let dpr = window.devicePixelRatio || 1;
    if (isMobileDevice() && cfg.mobile_limit_dpr) {
      dpr = Math.min(dpr, 2);
    }
    return dpr;
  }
  
  // ============================================
  // END CONFIGURATION
  // ============================================
  
  // Logging helper
  function log(message, data = null) {
    if (DEBUG_MODE) {
      if (data) {
        console.log(`[Weather Overlay] ${message}`, data);
      } else {
        console.log(`[Weather Overlay] ${message}`);
      }
    }
  }
  
  function warn(message, data = null) {
    if (data) {
      console.warn(`[Weather Overlay] ⚠️ ${message}`, data);
    } else {
      console.warn(`[Weather Overlay] ⚠️ ${message}`);
    }
  }
  
  function error(message, data = null) {
    if (data) {
      console.error(`[Weather Overlay] ❌ ${message}`, data);
    } else {
      console.error(`[Weather Overlay] ❌ ${message}`);
    }
  }
  
  let canvas = null;
  let ctx = null;
  let particles = [];
  let animationId = null;
  let currentWeather = null;
  let lastUpdateTime = 0;
  let lightningTimer = 0;
  let lightningInterval = 15000 + Math.random() * 25000;
  let lightningFirstBoltAt = 0;
  let lastLightningCounter = null;
  let showLightning = false;
  let lightningDuration = 0;
  let lightningBrightness = 0;
  let lightningFadeSpeed = 0;
  let lightningScheduledFlashAt = 0;
  let initializationComplete = false;
  let cachedSunPosition = null;
  let cachedMoonPosition = null;
  let cachedUvIndex = null;
  let sensorCacheTime = 0;
  const SENSOR_CACHE_MS = 3000;  // Refresh sun/moon/UV every 3 seconds
  let matrixCanvas = null;
  let matrixCtx = null;
  let matrixStreams = [];
  let matrixSpawnTimer = 0;
  let smogCanvas = null;
  let smogCtx = null;
  let smogParticles = [];
  let smogSpawnTimer = 0;
  let lastAnimateTime = 0;
  let meteorNextAt = 0;
  let meteorActive = null;
  let cachedPrecipMultiplier = 1;
  let cachedCloudCoverage = null;
  let cachedWindData = { speed: 5, bearing: 270 };
  let windowDroplets = [];
  let windowDropletSpawnTimer = 0;
  let windowDropletNextIntervalMs = 0;
  let snowy2Canvas = null;
  let snowy2Ctx = null;
  let snowy2Layers = null;
  const MATRIX_CHARS = ['園','迎','簡','益','大','诶','比','西','迪','伊','弗','吉','尺','杰','开','艾','勒','马','娜'];
  const MATRIX_GREEN = '#00ff41';
  const MATRIX_GREEN_DIM = '#00cc33';
  const MATRIX_MIN_STREAM_DIST = 85;

  // Refresh all sensor-derived data (sun, moon, UV) in one pass
  function refreshSensorCache() {
    const now = Date.now();
    if (now - sensorCacheTime < SENSOR_CACHE_MS) return;
    sensorCacheTime = now;
    try {
      const cfg = window.ForkUWeatherAwareConfig || {};
      const ha = getHomeAssistant();
      if (!ha || !ha.hass) {
        return;
      }

      // UV index
      const uvEntityId = cfg.uv_index_entity || 'sensor.uv_index';
      if (uvEntityId) {
        const uvEntity = ha.hass.states[uvEntityId];
        if (uvEntity && uvEntity.state !== 'unavailable' && uvEntity.state !== 'unknown') {
          const val = parseFloat(uvEntity.state);
          cachedUvIndex = isNaN(val) ? null : val;
        } else {
          cachedUvIndex = null;
        }
      } else {
        cachedUvIndex = null;
      }
      if (cachedUvIndex === undefined || cachedUvIndex === null) {
        const weatherEntity = ha.hass.states[cfg.weather_entity || WEATHER_ENTITY];
        if (weatherEntity?.attributes) {
          const uv = weatherEntity.attributes.uv_index ?? weatherEntity.attributes.uv;
          if (uv !== undefined) {
            const val = parseFloat(uv);
            if (!isNaN(val)) cachedUvIndex = val;
          }
        }
      }

      // Sun position
      const sunId = cfg.sun_entity || 'sun.sun';
      const sun = ha.hass.states[sunId];
      if (sun) {
        const aboveHorizon = sun.state === 'above_horizon';
        const elevation = parseFloat(sun.attributes?.elevation) || 0;
        const azimuth = parseFloat(sun.attributes?.azimuth);
        if (!isNaN(azimuth)) {
          let x = (azimuth - 90) / 180;
          x = Math.max(0, Math.min(1, x));
          const y = 0.08 + 0.22 * (1 - Math.max(0, elevation) / 90);
          cachedSunPosition = { x, y, aboveHorizon };
        } else {
          cachedSunPosition = aboveHorizon ? { x: 0.9, y: 0.1, aboveHorizon } : null;
        }
      } else {
        cachedSunPosition = null;
      }

      // Moon position and distance
      // 1) Single entity with attributes (Moon Astro, frlequ moon-phase): azimuth, elevation/altitude, distance
      // 2) Lunar Phase integration: 3 separate sensors (Moon Azimuth, Moon Altitude, Moon Distance) – state holds value
      const moonPosId = cfg.moon_position_entity;
      const moonPhaseId = cfg.moon_phase_entity;
      const moonAzId = cfg.moon_azimuth_entity;
      const moonAltId = cfg.moon_altitude_entity;
      const moonDistId = cfg.moon_distance_entity;
      let moonPos = { x: 0.75, y: 0.12, distance: null };

      for (const eid of [moonPosId, moonPhaseId].filter(Boolean)) {
        const ent = ha.hass.states[eid];
        if (!ent?.attributes) continue;
        const attrs = ent.attributes;
        const azimuth = parseFloat(attrs.azimuth ?? attrs.moon_azimuth_deg);
        const elev = parseFloat(attrs.elevation ?? attrs.altitude ?? attrs.moon_altitude_deg);
        const distKm = parseFloat(attrs.distance ?? attrs.moon_distance_km);
        if (!isNaN(azimuth) && !isNaN(elev) && elev > 0) {
          let x = (azimuth - 90) / 180;
          moonPos.x = Math.max(0, Math.min(1, x));
          moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
        } else if (!isNaN(elev) && elev > 0) {
          moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
        }
        if (!isNaN(distKm) && distKm > 0) moonPos.distance = distKm;
      }

      // Lunar Phase: read from 3 separate sensors (state = numeric value)
      if (moonAzId || moonAltId || moonDistId) {
        const azEnt = moonAzId ? ha.hass.states[moonAzId] : null;
        const altEnt = moonAltId ? ha.hass.states[moonAltId] : null;
        const distEnt = moonDistId ? ha.hass.states[moonDistId] : null;
        const azimuth = azEnt ? parseFloat(azEnt.state) : NaN;
        const elev = altEnt ? parseFloat(altEnt.state) : NaN;
        const distKm = distEnt ? parseFloat(distEnt.state) : NaN;
        if (!isNaN(azimuth) && !isNaN(elev) && elev > 0) {
          let x = (azimuth - 90) / 180;
          moonPos.x = Math.max(0, Math.min(1, x));
          moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
        } else if (!isNaN(elev) && elev > 0) {
          moonPos.y = 0.08 + 0.22 * (1 - Math.min(90, elev) / 90);
        }
        if (!isNaN(distKm) && distKm > 0) moonPos.distance = distKm;
      }

      cachedMoonPosition = moonPos;
    } catch (e) {
      // Keep previous cache on error
    }
  }
  
  // Weather particle configurations
  const weatherConfigs = {
    'rainy': {
      maxParticles: 50,
      color: 'rgba(174, 194, 224, 0.45)',
      speedMin: 0.8,
      speedMax: 1.5,
      sizeMin: 1,
      sizeMax: 2,
      swayAmount: 0.5,
      type: 'rain',
      rainLength: 14
    },
    'pouring': {
      maxParticles: 70,
      color: 'rgba(174, 194, 224, 0.5)',
      speedMin: 1,
      speedMax: 2,
      sizeMin: 1,
      sizeMax: 2,
      swayAmount: 0.6,
      type: 'rain',
      rainLength: 18
    },
    'cloudy': {
      maxParticles: 13,
      color: 'rgba(180, 180, 180, 0.10)',
      speedMin: 0.3,
      speedMax: 0.8,
      sizeMin: 80,
      sizeMax: 150,
      swayAmount: 0.5,
      type: 'clouds'
    },
    'partlycloudy': {
      maxParticles: 8,
      color: 'rgba(200, 200, 200, 0.08)',
      speedMin: 0.4,
      speedMax: 1,
      sizeMin: 70,
      sizeMax: 130,
      swayAmount: 0.6,
      type: 'clouds'
    },
    'fog': {
      maxParticles: 70,
      color: 'rgba(220, 220, 220, 0.05)',
      speedMin: 0.2,
      speedMax: 0.4,
      sizeMin: 1000,
      sizeMax: 2000,
      swayAmount: 0.5,
      type: 'fog'
    },
    'snowy': {
      maxParticles: 40,
      color: 'rgba(255, 255, 255, 0.4)',
      speedMin: 0.5,
      speedMax: 2,
      sizeMin: 2,
      sizeMax: 5,
      swayAmount: 1.5,
      type: 'snow'
    },
    'snowy-rainy': {
      maxParticles: 0, // handled by snowy2 overlay + window droplets
      color: 'rgba(210, 220, 240, 0.38)',
      speedMin: 0.5,
      speedMax: 1.2,
      sizeMin: 1.2,
      sizeMax: 3.5,
      swayAmount: 1.1,
      type: 'snow'
    },
    'lightning': {
      maxParticles: 0,
      type: 'lightning'
    },
    'lightning-rainy': {
      maxParticles: 50,
      color: 'rgba(174, 194, 224, 0.45)',
      speedMin: 0.8,
      speedMax: 1.5,
      sizeMin: 1,
      sizeMax: 2,
      swayAmount: 0.5,
      type: 'rain',
      rainLength: 14,
      hasLightning: true
    },
    'clear-night': {
      maxParticles: 36,
      type: 'stars'
    },
    'sunny': {
      maxParticles: 0,
      type: 'sunny'
    },
    'sunny2': {
      maxParticles: 0,
      type: 'sunny2'
    },
    'rainy-drizzle': {
      maxParticles: 28,
      color: 'rgba(174, 194, 224, 0.38)',
      speedMin: 0.35,
      speedMax: 0.65,
      sizeMin: 0.9,
      sizeMax: 1.5,
      swayAmount: 0.3,
      type: 'rain',
      rainLength: 9
    },
    // Additional states for compatibility
    'windy': {
      maxParticles: 8,
      color: 'rgba(200, 200, 200, 0.06)',
      speedMin: 2,
      speedMax: 4,
      sizeMin: 70,
      sizeMax: 130,
      swayAmount: 0.6,
      type: 'clouds'
    },
    'hail': {
      maxParticles: 4,
      color: 'rgba(242, 250, 255, 0.9)',
      speedMin: 5,   // szybki start
      speedMax: 9,   // bardzo gwałtowne uderzenia
      sizeMin: 4,
      sizeMax: 7,
      swayAmount: 0, // bez wpływu wiatru
      type: 'hail'
    },
    'exceptional': {
      maxParticles: 0,
      type: 'sunny'
    },
    'snowy2': {
      maxParticles: 0,
      type: 'snowy2'
    },
    'snowy3': {
      maxParticles: 0,
      type: 'snowy3'
    }
  };

  const SNOWY2_LAYERS = [
    { sizeMin: 24, sizeMax: 40, speedFactor: 0.12, swayAmpMin: 10, swayAmpMax: 30, opacity: 1, blur: 0, colorMin: 255, colorMax: 255 },
    { sizeMin: 20, sizeMax: 28, speedFactor: 0.09, swayAmpMin: 10, swayAmpMax: 25, opacity: 0.85, blur: 2, colorMin: 255, colorMax: 255 },
    { sizeMin: 16, sizeMax: 24, speedFactor: 0.07, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.75, blur: 4, colorMin: 255, colorMax: 255 },
    { sizeMin: 12, sizeMax: 18, speedFactor: 0.05, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.65, blur: 5, colorMin: 220, colorMax: 229 },
    { sizeMin: 10, sizeMax: 14, speedFactor: 0.03, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.55, blur: 7, colorMin: 210, colorMax: 219 },
    { sizeMin: 8, sizeMax: 12, speedFactor: 0.01, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.4, blur: 30, colorMin: 200, colorMax: 209 }
  ];
  
  // Particle class
  class Particle {
    constructor(config) {
      this.reset(config);
      if (config.type === 'stars') {
        this.y = Math.random() * (window.innerHeight * 0.5);
        this.twinkleSpeed = 0.02 + Math.random() * 0.03;
        this.twinklePhase = Math.random() * Math.PI * 2;
      } else {
        this.y = Math.random() * window.innerHeight;
      }
    }
    
    reset(config) {
      this.x = Math.random() * window.innerWidth;
      
      if (config.type === 'stars') {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * (window.innerHeight * 0.3);
        this.size = 1 + Math.random() * 1.5;
        this.phase = Math.random() * 6;
        this.cycleLength = 6;
        this.opacity = 0;
      } else {
        if (config.type === 'clouds') {
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * (window.innerHeight * 0.22);
        } else {
          this.y = -10;
        }
        
        this.speed = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
        this.size = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);
        this.sway = (Math.random() - 0.5) * config.swayAmount;
        this.opacity = 0.5 + Math.random() * 0.5;
        if (config.type === 'rain') {
          this.rainLength = (config.rainLength || 14) * (0.85 + Math.random() * 0.3);
        }
        if (config.type === 'hail') {
          this.rotation = Math.random() * Math.PI * 2;
        }
        if (config.type === 'clouds') {
          this.puffCount = 5 + Math.floor(Math.random() * 3);
          this.puffSizes = [];
          for (let i = 0; i < this.puffCount; i++) {
            this.puffSizes.push(0.4 + Math.random() * 0.3);
          }
        }
      }
      
      this.type = config.type;
    }
    
    update(config) {
      if (this.type === 'stars') {
        this.phase += 0.016 * getSpeedFactor('stars');
        
        if (this.phase >= this.cycleLength) {
          this.phase = 0;
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * (window.innerHeight * 0.3);
        }
        
        if (this.phase < 1) {
          this.opacity = this.phase;
        } else if (this.phase < 3) {
          this.opacity = 0.8 + Math.sin((this.phase - 1) * Math.PI) * 0.2;
        } else if (this.phase < 4) {
          this.opacity = 1 - (this.phase - 3);
        } else {
          this.opacity = 0;
        }
        
        return;
      }
      
      if (this.type === 'hail') {
        // Meteoroid-like fall: no wind sway, accelerating towards ground
        const hailFactor = getSpeedFactor('hail');
        const accel = 0.12 * hailFactor;
        this.speed += accel;
        this.y += this.speed * (deltaMs / 16) * hailFactor;
        if (this.y > window.innerHeight + this.size * 2) {
          this.reset(config);
          this.y = -10;
        }
        return;
      }
      
      if (this.type === 'clouds' || this.type === 'fog') {
        const windKmh = cachedWindData.speed;
        const windScale = Math.max(0.05, Math.min(1.2, windKmh / 35));
        const cfg = window.ForkUWeatherAwareConfig || {};
        const mult = (cfg.cloud_speed_multiplier != null && !isNaN(parseFloat(cfg.cloud_speed_multiplier))) ? parseFloat(cfg.cloud_speed_multiplier) : 1;
        const moveSpeed = (this.type === 'clouds' ? this.speed * windScale : this.speed * Math.max(0.03, windScale * 0.5)) * mult * getSpeedFactor(this.type);
        this.x += moveSpeed;
        if (this.type === 'clouds'){
          this.y += Math.sin(this.x * 0.01) * 0.2;
          this.y = Math.min(this.y, window.innerHeight * 0.22);
        } else{
          this.y += Math.sin(this.x * 0.01) * 0.02;
        }
        
        if (this.x > window.innerWidth + this.size) {
          this.x = -this.size;
          this.y = Math.random() * (window.innerHeight * (this.type === 'clouds' ? 0.22 : 1));
        }
        return;
      }
      
      const swayFactor = getWindSwayFactor();
      const windSway = -Math.sin(cachedWindData.bearing * Math.PI / 180) * cachedWindData.speed * 0.06 * swayFactor;
      const precipFactor = getSpeedFactor(this.type);
      // Vertical fall speed depends on rain/snow speed and wind speed, but NOT on swayFactor
      this.y += this.speed * cachedPrecipMultiplier * (1 + cachedWindData.speed * 0.03) * precipFactor;
      this.x += this.sway + windSway;
      if (this.type === 'hail') this.rotation += 0.18 * precipFactor;
      
      if (this.y > window.innerHeight) {
        this.reset(config);
      }
      
      if (this.x < 0 || this.x > window.innerWidth) {
        this.x = Math.random() * window.innerWidth;
      }
    }
    
    draw() {
      ctx.globalAlpha = this.opacity;
      
      if (this.type === 'stars') {
        if (this.opacity > 0) {
          ctx.globalAlpha = this.opacity * 0.7;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.shadowColor = 'rgba(200, 220, 255, 0.6)';
          ctx.shadowBlur = 4 + this.opacity * 3;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
      } else if (this.type === 'clouds') {
        const baseOpacity = this.opacity * 0.6;
        const baseColor = weatherConfigs[currentWeather]?.color || 'rgba(180, 180, 180, 0.10)';
        
        for (let i = 0; i < this.puffCount; i++) {
          const angle = (i / this.puffCount) * Math.PI * 2;
          const puffSize = this.size * this.puffSizes[i];
          const offsetX = Math.cos(angle) * this.size * 0.4;
          const offsetY = Math.sin(angle) * this.size * 0.25;
          
          const gradient = ctx.createRadialGradient(
            this.x + offsetX, this.y + offsetY, 0,
            this.x + offsetX, this.y + offsetY, puffSize
          );
          gradient.addColorStop(0, baseColor);
          gradient.addColorStop(0.6, baseColor.replace(/[\d.]+\)$/g, '0.02)'));
          gradient.addColorStop(1, 'rgba(180, 180, 180, 0)');
          
          ctx.globalAlpha = baseOpacity;
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x + offsetX, this.y + offsetY, puffSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        
      } else if (this.type === 'snow') {
        const theme = getThemeMode();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (theme === 'light') {
          // On light themes, use solid white snow so it stands out over cards
          ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
        } else {
          ctx.fillStyle = weatherConfigs[currentWeather]?.color || 'rgba(255, 255, 255, 0.4)';
        }
        ctx.fill();
      } else if (this.type === 'mixed') {
        const isMixed = Math.random() > 0.5;
        if (isMixed) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          const theme = getThemeMode();
          if (theme === 'light') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          } else {
            ctx.fillStyle = weatherConfigs[currentWeather]?.color || 'rgba(200, 210, 230, 0.35)';
          }
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x + this.sway, this.y + this.size * 4);
          const theme = getThemeMode();
          ctx.strokeStyle = theme === 'light'
            ? 'rgba(140, 160, 190, 0.9)'
            : (weatherConfigs[currentWeather]?.color || 'rgba(200, 210, 230, 0.35)');
          ctx.lineWidth = this.size * 0.7;
          ctx.stroke();
        }
      } else if (this.type === 'rain') {
        const config = weatherConfigs[currentWeather] || {};
        const cfg = window.ForkUWeatherAwareConfig || {};
        const len = this.rainLength != null ? this.rainLength : (this.size * 4);
        const halfW = Math.max(1.2, Math.min(2.5, len * 0.12));
        const maxTiltDeg = (cfg.rain_max_tilt_deg != null && !isNaN(parseFloat(cfg.rain_max_tilt_deg))) ? Math.abs(parseFloat(cfg.rain_max_tilt_deg)) : 30;
        const windMin = (cfg.rain_wind_min_kmh != null && !isNaN(parseFloat(cfg.rain_wind_min_kmh))) ? parseFloat(cfg.rain_wind_min_kmh) : 3;
        const windSpeed = cachedWindData.speed;
        const bearing = cachedWindData.bearing * Math.PI / 180;
        let tiltDeg = 0;
        if (windSpeed >= windMin && maxTiltDeg > 0) {
          const windDirX = -Math.sin(bearing);
          const magnitude = Math.min(maxTiltDeg, (windSpeed / 2));
          // Flip sign so the visible droplet shape leans in the same direction it moves
          tiltDeg = -Math.sign(windDirX) * magnitude;
        }
        const tiltRad = tiltDeg * Math.PI / 180;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(tiltRad);
        ctx.beginPath();
        ctx.moveTo(-halfW, 0);
        ctx.lineTo(0, -len);
        ctx.lineTo(halfW, 0);
        ctx.arc(0, 0, halfW, 0, Math.PI);
        ctx.closePath();
        const theme = getThemeMode();
        if (theme === 'light') {
          // Slightly darker, more visible on light themes
          ctx.fillStyle = 'rgba(120, 145, 170, 0.55)';
        } else {
          ctx.fillStyle = config.color || 'rgba(175, 195, 204, 0.35)';
        }
        ctx.fill();
        ctx.restore();
      } else if (this.type === 'fog') {
        const theme = getThemeMode();
        const grad = ctx.createLinearGradient(
            this.x - this.size, 0,
            this.x + this.size, 0
        );
        if (theme === 'light') {
          grad.addColorStop(0, 'rgba(200, 200, 200, 0)');
          grad.addColorStop(0.5, weatherConfigs[currentWeather].color || 'rgba(210,210,210,0.25)');
          grad.addColorStop(1, 'rgba(200, 200, 200, 0)');
        } else {
          grad.addColorStop(0, 'rgba(220, 220, 220, 0)');
          grad.addColorStop(0.5, weatherConfigs[currentWeather].color);
          grad.addColorStop(1, 'rgba(220, 220, 220, 0)');
        }
        
        ctx.globalAlpha = this.opacity * 0.2;
        ctx.fillStyle = grad;
        ctx.fillRect(this.x - this.size, this.y -15, this.size * 2000, 300);
        ctx.globalAlpha = 1;
        
      } else if (this.type === 'hail') {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation || 0);
        const s = (this.size || 4) * 1.2;
        const theme = getThemeMode();
        ctx.fillStyle = theme === 'light'
          ? 'rgba(90, 110, 135, 0.9)'
          : (weatherConfigs[currentWeather]?.color || 'rgba(242, 250, 255, 0.85)');
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.restore();
      } 


      
      ctx.globalAlpha = 1;
    }
  }
  
  // Initialize canvas
  function initCanvas() {
    if (canvas) {
      log('Canvas already exists, skipping initialization');
      return;
    }
    
    canvas = document.createElement('canvas');
    canvas.id = 'fork-u-weather-aware-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    
    const dpr = getEffectiveDpr();
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    log('Canvas initialized', {
      width: canvas.width,
      height: canvas.height,
      dpr: dpr
    });
    initOverlayCanvases();
    applySpatialZIndex();
  }

  // Initialize Matrix (gaming) and Smog overlay canvases
  function initOverlayCanvases() {
    const dpr = getEffectiveDpr();
    if (!matrixCanvas) {
      matrixCanvas = document.createElement('canvas');
      matrixCanvas.id = 'fork-u-weather-aware-matrix';
      matrixCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:10000;display:none';
      matrixCanvas.width = window.innerWidth * dpr;
      matrixCanvas.height = window.innerHeight * dpr;
      document.body.appendChild(matrixCanvas);
      matrixCtx = matrixCanvas.getContext('2d');
      matrixCtx.scale(dpr, dpr);
    }
    if (!smogCanvas) {
      smogCanvas = document.createElement('canvas');
      smogCanvas.id = 'fork-u-weather-aware-smog';
      smogCanvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:10001;display:none';
      smogCanvas.width = window.innerWidth * dpr;
      smogCanvas.height = window.innerHeight * dpr;
      document.body.appendChild(smogCanvas);
      smogCtx = smogCanvas.getContext('2d');
      smogCtx.scale(dpr, dpr);
    }
    if (!snowy2Canvas) {
      snowy2Canvas = document.createElement('canvas');
      snowy2Canvas.id = 'fork-u-weather-aware-snowy2';
      snowy2Canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;display:none';
      snowy2Canvas.width = window.innerWidth * dpr;
      snowy2Canvas.height = window.innerHeight * dpr;
      document.body.appendChild(snowy2Canvas);
      snowy2Ctx = snowy2Canvas.getContext('2d');
      snowy2Ctx.scale(dpr, dpr);
    }
    applySpatialZIndex();
  }

  function initSnowy2Layers() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const SEGMENT_WIDTH = 5;
    const cfg = getMobilePerfConfig();
    let totalFlakes = (isMobileDevice() && cfg.mobile_snowy2_light) ? 180 : 300;
    if (currentWeather === 'snowy-rainy') {
      totalFlakes = Math.round(totalFlakes * 0.5);
    }
    snowy2Layers = SNOWY2_LAYERS.map((lp, idx) => {
      const numFlakes = Math.floor(totalFlakes / SNOWY2_LAYERS.length);
      const snowflakes = [];
      for (let i = 0; i < numFlakes; i++) {
        const size = lp.sizeMin + Math.random() * (lp.sizeMax - lp.sizeMin);
        const fallSpeed = size * lp.speedFactor + Math.random() * 0.5;
        const swayAmp = lp.swayAmpMin + Math.random() * (lp.swayAmpMax - lp.swayAmpMin);
        const cv = lp.colorMin + Math.floor(Math.random() * (lp.colorMax - lp.colorMin + 1));
        snowflakes.push({
          x: Math.random() * W,
          y: Math.random() * -H,
          size, fallSpeed, swayAmp, swaySpeed: 0.01 + Math.random() * 0.02,
          swayOffset: Math.random() * Math.PI * 2,
          opacity: lp.opacity, blur: lp.blur,
          color: `rgba(${cv},${cv},${cv},${lp.opacity})`,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
      const NUM_SEG = Math.ceil(W / SEGMENT_WIDTH);
      const pileHeights = [];
      for (let j = 0; j < NUM_SEG; j++) {
        if (j === 0) pileHeights[j] = H - 30 + (Math.random() * 10 - 5);
        else {
          let h = pileHeights[j - 1] + (Math.random() * 10 - 5);
          pileHeights[j] = Math.max(H - 100, Math.min(H - 10, h));
        }
      }
      for (let iter = 0; iter < 2; iter++) {
        const t = [...pileHeights];
        for (let i = 1; i < NUM_SEG - 1; i++)
          t[i] = (pileHeights[i - 1] + pileHeights[i] + pileHeights[i + 1]) / 3;
        pileHeights.splice(0, pileHeights.length, ...t);
      }
      return { snowflakes, pileHeights, layerProps: lp, SEGMENT_WIDTH, NUM_SEG };
    });
  }

  function updateSnowy2Effect(deltaMs) {
    if (!snowy2Ctx || !snowy2Canvas || !snowy2Layers) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const d = Math.min(deltaMs, 50);
    const bearingRad = cachedWindData.bearing * Math.PI / 180;
    const windDirX = -Math.sin(bearingRad);
    const windMag = Math.min(1.5, (cachedWindData.speed / 30) * getWindSwayFactor());
    const windSpeed = windMag * windDirX;

    snowy2Ctx.clearRect(0, 0, W, H);
    for (const layer of snowy2Layers) {
      // Skip bottom snow pile for snowy-rainy variant – only falling snow
      if (currentWeather !== 'snowy-rainy') {
        snowy2Ctx.beginPath();
        snowy2Ctx.moveTo(0, layer.pileHeights[0]);
        for (let i = 1; i < layer.NUM_SEG; i++)
          snowy2Ctx.lineTo(i * layer.SEGMENT_WIDTH, layer.pileHeights[i]);
        snowy2Ctx.lineTo(W, layer.pileHeights[layer.NUM_SEG - 1]);
        snowy2Ctx.lineTo(W, H);
        snowy2Ctx.lineTo(0, H);
        snowy2Ctx.closePath();
        snowy2Ctx.fillStyle = `rgba(255,255,255,${layer.layerProps.opacity})`;
        snowy2Ctx.fill();
      }

      for (const flake of layer.snowflakes) {
        const swayX = Math.sin(flake.swayOffset) * flake.swayAmp;
        const wx = windSpeed * 15 * (d / 16);
        snowy2Ctx.save();
        snowy2Ctx.translate(flake.x + swayX + wx, flake.y);
        snowy2Ctx.rotate(flake.rotation);
        snowy2Ctx.font = `${flake.size}px sans-serif`;
        snowy2Ctx.fillStyle = flake.color;
        snowy2Ctx.shadowBlur = flake.blur;
        snowy2Ctx.shadowColor = flake.color;
        snowy2Ctx.textBaseline = 'middle';
        snowy2Ctx.textAlign = 'center';
        snowy2Ctx.fillText('•', 0, 0);
        snowy2Ctx.restore();

        flake.y += flake.fallSpeed * (d / 16);
        flake.x += wx * 0.5;
        flake.swayOffset += flake.swaySpeed;
        flake.rotation += flake.rotationSpeed;

        const idx = Math.floor((flake.x + swayX + wx) / layer.SEGMENT_WIDTH);
        const pileY = idx >= 0 && idx < layer.NUM_SEG ? layer.pileHeights[idx] : H;
        if (flake.y >= pileY - flake.size / 2) {
          if (idx >= 0 && idx < layer.NUM_SEG) {
            layer.pileHeights[idx] -= flake.size * 0.5;
            for (let s = 1; s <= 2; s++) {
              if (idx - s >= 0) layer.pileHeights[idx - s] -= flake.size * 0.05;
              if (idx + s < layer.NUM_SEG) layer.pileHeights[idx + s] -= flake.size * 0.05;
            }
            for (let i = -2; i <= 2; i++) {
              const ci = idx + i;
              if (ci >= 0 && ci < layer.NUM_SEG && layer.pileHeights[ci] < H - 100)
                layer.pileHeights[ci] = H - 100;
            }
            const t = [...layer.pileHeights];
            for (let i = 1; i < layer.NUM_SEG - 1; i++)
              t[i] = (layer.pileHeights[i - 1] + layer.pileHeights[i] + layer.pileHeights[i + 1]) / 3;
            layer.pileHeights.splice(0, layer.pileHeights.length, ...t);
          }
          const lp = layer.layerProps;
          flake.size = lp.sizeMin + Math.random() * (lp.sizeMax - lp.sizeMin);
          flake.fallSpeed = flake.size * lp.speedFactor + Math.random() * 0.5;
          flake.swayAmp = lp.swayAmpMin + Math.random() * (lp.swayAmpMax - lp.swayAmpMin);
          const cv = lp.colorMin + Math.floor(Math.random() * (lp.colorMax - lp.colorMin + 1));
          flake.color = `rgba(${cv},${cv},${cv},${lp.opacity})`;
          flake.y = Math.random() * -H;
          flake.x = Math.random() * W;
          flake.swayOffset = Math.random() * Math.PI * 2;
        }
        if (flake.x > W + 50) flake.x = -50;
        else if (flake.x < -50) flake.x = W + 50;
        if (flake.y > H + 50) {
          flake.y = Math.random() * -H;
          flake.x = Math.random() * W;
          flake.swayOffset = Math.random() * Math.PI * 2;
        }
      }
    }
  }

  // Draw Matrix effect – green, spawn only when one passed 1/3 descent, no overlap, minimal shadow
  function matrixStreamOverlaps(x) {
    for (let i = 0; i < matrixStreams.length; i++) {
      if (Math.abs(matrixStreams[i].x - x) < MATRIX_MIN_STREAM_DIST) return true;
    }
    return false;
  }

  function updateMatrixEffect(deltaMs) {
    if (!matrixCtx || !matrixCanvas) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const leftZone = W * 0.28;
    const rightZoneStart = W * 0.72;
    const oneThirdY = H / 3;
    matrixCtx.clearRect(0, 0, W, H);
    matrixSpawnTimer += Math.min(deltaMs, 50);

    const anyPastThird = matrixStreams.some(s => s.y > oneThirdY);
    const canSpawn = (matrixStreams.length === 0 || anyPastThird) && matrixSpawnTimer >= 800;
    if (canSpawn && matrixStreams.length < 6) {
      matrixSpawnTimer = 0;
      const side = Math.random() < 0.5 ? 'left' : 'right';
      let x;
      let tries = 15;
      do {
        x = side === 'left'
          ? 30 + Math.random() * (leftZone - 60)
          : rightZoneStart + 30 + Math.random() * (W - rightZoneStart - 60);
      } while (--tries > 0 && matrixStreamOverlaps(x));
      if (tries > 0) {
        const len = 4 + Math.floor(Math.random() * 8);
        const chars = [];
        for (let i = 0; i < len; i++) {
          chars.push(MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]);
        }
        matrixStreams.push({
          x,
          y: -80,
          chars,
          speed: 0.15 + Math.random() * 0.12
        });
      }
    }

    matrixCtx.font = '16px monospace';
    matrixCtx.textAlign = 'center';
    matrixCtx.textBaseline = 'top';
    const centerX = W / 2;
    const matrixFactor = getSpeedFactor('matrix');
    for (let i = matrixStreams.length - 1; i >= 0; i--) {
      const s = matrixStreams[i];
      s.y += s.speed * matrixFactor;
      if (s.y > H + 150) {
        matrixStreams.splice(i, 1);
        continue;
      }
      const distFromCenter = Math.abs(s.x - centerX);
      const centerOpacity = distFromCenter < W * 0.2 ? 0.5 + (distFromCenter / (W * 0.2)) * 0.4 : 0.9;
      for (let j = 0; j < s.chars.length; j++) {
        const trailAlpha = 1 - (j / s.chars.length) * 0.5;
        const alpha = trailAlpha * centerOpacity;
        const charX = s.x;
        const charY = s.y + j * 16;
        matrixCtx.globalAlpha = alpha;
        matrixCtx.fillStyle = j === 0 ? MATRIX_GREEN : MATRIX_GREEN_DIM;
        matrixCtx.shadowColor = 'rgba(0,0,0,0.4)';
        matrixCtx.shadowBlur = 3;
        matrixCtx.shadowOffsetY = 2;
        matrixCtx.fillText(s.chars[j], charX, charY);
      }
      matrixCtx.globalAlpha = 1;
      matrixCtx.shadowBlur = 0;
      matrixCtx.shadowOffsetY = 0;
    }
  }

  // Draw smog/fog rising from bottom – smooth continuous rise, visible on mobile, less blur
  function updateSmogEffect(deltaMs) {
    if (!smogCtx || !smogCanvas) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const isMobile = isMobileDevice();
    const cfg = getMobilePerfConfig();
    const simpleSmog = isMobile && cfg.mobile_smog_simple;

    smogSpawnTimer += Math.min(deltaMs, 50);
    if (smogSpawnTimer >= 350 + Math.random() * 250 && smogParticles.length < 45) {
      smogSpawnTimer = 0;
      const baseSize = isMobile ? 80 : 100;
      const size = baseSize + Math.random() * 80;
      smogParticles.push({
        x: Math.random() * (W + 100) - 50,
        y: H + size + Math.random() * 80,
        size,
        speedY: -3 - Math.random() * 5,
        speedX: (Math.random() - 0.5) * 2,
        life: 22000,
        startTime: Date.now(),
        opacity: 0.35 + Math.random() * 0.2
      });
    }

    smogCtx.clearRect(0, 0, W, H);
    const now = Date.now();
    const d = Math.min(deltaMs, 50);
    const smogFactor = getSpeedFactor('smog');
    for (let i = smogParticles.length - 1; i >= 0; i--) {
      const p = smogParticles[i];
      const age = now - p.startTime;
      p.y += (p.speedY * d) / 1000 * smogFactor;
      p.x += (p.speedX * d) / 1000 * smogFactor;

      if (age > p.life || p.y < -p.size - 50) {
        smogParticles.splice(i, 1);
        continue;
      }

      const frac = age / p.life;
      const fadeOut = frac > 0.75 ? Math.max(0, (1 - frac) / 0.25) : 1;
      const op = p.opacity * fadeOut * (isMobile ? 1.2 : 1);

      const r = p.size;
      const theme = getThemeMode();
      if (simpleSmog) {
        const baseAlpha = Math.min(0.3, op);
        const alpha = theme === 'light' ? baseAlpha * 1.2 : baseAlpha;
        smogCtx.fillStyle = `rgba(128,130,135,${alpha})`;
        smogCtx.beginPath();
        smogCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
        smogCtx.fill();
      } else {
        const grad = smogCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        const scale = theme === 'light' ? 1.2 : 1;
        grad.addColorStop(0, `rgba(138,140,145,${Math.min(0.42, op * 0.38 * scale)})`);
        grad.addColorStop(0.3, `rgba(128,130,135,${Math.min(0.28, op * 0.25 * scale)})`);
        grad.addColorStop(0.6, `rgba(118,120,125,${Math.min(0.12, op * 0.11 * scale)})`);
        grad.addColorStop(0.9, `rgba(108,110,115,${Math.min(0.04, op * 0.035 * scale)})`);
        grad.addColorStop(1, 'rgba(98,100,105,0)');
        smogCtx.fillStyle = grad;
        smogCtx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
      }
    }
  }

  // Initialize particles
  function initParticles(weather) {
    particles = [];
    const config = weatherConfigs[weather];
    if (config && config.maxParticles > 0) {
      const cfg = getMobilePerfConfig();
      let count = config.maxParticles;
      if (config.type === 'clouds' || config.type === 'fog') {
        const cov = getCloudCoverage();
        if (cov != null) count = Math.max(2, Math.round(count * (0.3 + cov / 100 * 0.7)));
      }
      if (isMobileDevice() && cfg.mobile_reduce_particles) {
        count = Math.max(2, Math.round(count * 0.6));
      }
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(config));
      }
    }
    log(`Initialized ${particles.length} particles for ${weather}`);
  }
  
  // Draw sunny ambient glow effect (position from sun sensor, color from UV index)
  function drawSunnyGlow() {
    const pos = getSunPosition();
    const cfg = window.ForkUWeatherAwareConfig || {};
    // Don't show sun glow when below horizon (e.g. at night), unless dev mode testing sunny
    const devOverride = cfg.development_mode && cfg.test_effect === 'sunny';
    if (!devOverride && (!pos || !pos.aboveHorizon)) return;
    const uv = getUvIndex();
    const isHighUv = uv !== null && uv >= 6;
    const sunX = (pos && pos.x != null) ? window.innerWidth * pos.x : window.innerWidth * 0.90;
    const sunY = (pos && pos.y != null) ? window.innerHeight * pos.y : window.innerHeight * 0.10;

    const sunGradient = ctx.createRadialGradient(
      sunX, sunY, 0,
      sunX, sunY, 500
    );
    if (isHighUv) {
      // Deep orange glowing light when UV is high
      sunGradient.addColorStop(0, 'rgba(255, 140, 50, 0.35)');
      sunGradient.addColorStop(0.2, 'rgba(255, 110, 40, 0.22)');
      sunGradient.addColorStop(0.5, 'rgba(255, 90, 30, 0.12)');
      sunGradient.addColorStop(0.8, 'rgba(255, 70, 20, 0.04)');
      sunGradient.addColorStop(1, 'rgba(255, 50, 10, 0)');
    } else {
      // Gentle yellow in normal UV conditions
      sunGradient.addColorStop(0, 'rgba(255, 220, 120, 0.22)');
      sunGradient.addColorStop(0.2, 'rgba(255, 200, 90, 0.14)');
      sunGradient.addColorStop(0.5, 'rgba(255, 185, 70, 0.07)');
      sunGradient.addColorStop(0.8, 'rgba(255, 160, 50, 0.02)');
      sunGradient.addColorStop(1, 'rgba(255, 140, 40, 0)');
    }

    ctx.fillStyle = sunGradient;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 500, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sunny2: sun beams (rays from sun position, Ultra-Card style in Canvas 2D)
  let sunBeamsTime = 0;
  function drawSunBeams() {
    const pos = getSunPosition();
    const cfg = window.ForkUWeatherAwareConfig || {};
    const devOverride = cfg.development_mode && (cfg.test_effect === 'sunny2' || cfg.test_effect === 'sunny');
    if (!devOverride && (!pos || !pos.aboveHorizon)) return;
    const sunX = (pos && pos.x != null) ? window.innerWidth * pos.x : window.innerWidth * 0.90;
    const sunY = (pos && pos.y != null) ? window.innerHeight * pos.y : window.innerHeight * 0.10;
    sunBeamsTime += 0.016;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const numRays = 18;
    const maxDist = Math.max(W, H) * 0.85;
    ctx.save();
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2 + sunBeamsTime * 0.8;
      const beam = Math.sin(angle * 9) * 0.5 + 0.5;
      const rayEndX = sunX + Math.cos(angle) * maxDist;
      const rayEndY = sunY + Math.sin(angle) * maxDist;
      const grad = ctx.createLinearGradient(sunX, sunY, rayEndX, rayEndY);
      grad.addColorStop(0, `rgba(255, 220, 140, ${0.22 * beam})`);
      grad.addColorStop(0.4, `rgba(255, 200, 100, ${0.08 * beam})`);
      grad.addColorStop(0.7, `rgba(255, 180, 80, ${0.02 * beam})`);
      grad.addColorStop(1, 'rgba(255, 160, 60, 0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 80;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(rayEndX, rayEndY);
      ctx.stroke();
    }
    ctx.restore();
  }

  function updateMeteor(now, deltaMs) {
    if (meteorNextAt === 0) {
      meteorNextAt = now + 3000 + Math.random() * 60000;
    }
    if (meteorActive) {
      meteorActive.x += meteorActive.vx * (deltaMs / 16);
      meteorActive.y += meteorActive.vy * (deltaMs / 16);
      meteorActive.life -= deltaMs;
      if (meteorActive.life <= 0) {
        meteorActive = null;
        meteorNextAt = now + 5000 + Math.random() * 10000;
      } else {
        const alpha = 0.9 * (meteorActive.life / meteorActive.totalLife);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(200,220,255,0.8)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.moveTo(meteorActive.x, meteorActive.y);
        ctx.lineTo(meteorActive.x - meteorActive.vx * 50, meteorActive.y - meteorActive.vy * 50);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    } else if (now >= meteorNextAt) {
      const angle = -0.4 + Math.random() * 0.5;
      const speed = 12 + Math.random() * 8;
      meteorActive = {
        x: Math.random() * window.innerWidth * 0.8,
        y: Math.random() * window.innerHeight * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 600,
        totalLife: 600
      };
      meteorNextAt = 0;
    }
  }

  // Draw moon glow effect (gentle white, for clear-night and snowy/majestic)
  // Size and intensity scale with distance: closer moon (perigee ~356k km) = larger/brighter
  function drawMoonGlow() {
    const pos = getMoonPosition();
    const moonX = window.innerWidth * pos.x;
    const moonY = window.innerHeight * pos.y;

    // Distance in km: perigee ~356500, apogee ~406700. Scale 1.0 at perigee, ~0.7 at apogee.
    const PERIGEE_KM = 356500;
    const APOGEE_KM = 406700;
    const dist = pos.distance;
    const scale = (dist != null && dist > 0)
      ? Math.max(0.65, Math.min(1, 0.7 + 0.3 * (APOGEE_KM - dist) / (APOGEE_KM - PERIGEE_KM)))
      : 1;

    const radius = 400 * scale;
    const moonGradient = ctx.createRadialGradient(
      moonX, moonY, 0,
      moonX, moonY, radius
    );
    // Gentle white glow; opacity scales with distance (boosted for visibility on dark sky)
    const o0 = 0.32 * scale, o1 = 0.18 * scale, o2 = 0.09 * scale, o3 = 0.035 * scale;
    moonGradient.addColorStop(0, `rgba(255, 252, 245, ${o0})`);
    moonGradient.addColorStop(0.25, `rgba(248, 248, 255, ${o1})`);
    moonGradient.addColorStop(0.5, `rgba(240, 242, 250, ${o2})`);
    moonGradient.addColorStop(0.8, `rgba(235, 238, 248, ${o3})`);
    moonGradient.addColorStop(1, 'rgba(230, 235, 245, 0)');

    ctx.fillStyle = moonGradient;
    ctx.beginPath();
    ctx.arc(moonX, moonY, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Lightning zigzag (Canvas 2D): jagged line from top, few segments with random X offset
  let lightningOriginX = 0;
  let lightningOriginY = 0;
  function drawLightningZigzag() {
    const segCount = 8;
    const W = canvas.width;
    const H = canvas.height;
    let x = lightningOriginX;
    let y = 0;
    const stepY = H / segCount;
    ctx.save();
    ctx.strokeStyle = `rgba(255, 252, 230, ${lightningBrightness * 0.9})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let i = 1; i <= segCount; i++) {
      const nextY = Math.min(i * stepY, H);
      const offset = (Math.random() - 0.5) * 80;
      x = lightningOriginX + offset;
      ctx.lineTo(x, nextY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // Draw lightning effect – zigzag bolt + flash (left or right side, never center)
  function drawLightning() {
    const side = Math.random() < 0.5 ? 0 : 1;
    lightningOriginX = side === 0
      ? Math.random() * (canvas.width * 0.35)
      : canvas.width * 0.65 + Math.random() * (canvas.width * 0.35);
    const lightY = Math.random() * (canvas.height * 0.3);
    
    drawLightningZigzag();
    
    const gradient = ctx.createRadialGradient(
      lightningOriginX, lightY, 0,
      lightningOriginX, lightY, canvas.width * 0.8
    );
    const colorVariation = Math.random() * 30;
    const blue = 220 + colorVariation;
    const green = 230 + colorVariation;
    gradient.addColorStop(0, `rgba(255, ${green}, ${blue}, ${lightningBrightness * 0.4})`);
    gradient.addColorStop(0.3, `rgba(240, ${green - 20}, ${blue - 20}, ${lightningBrightness * 0.25})`);
    gradient.addColorStop(0.7, `rgba(200, ${green - 40}, ${blue - 40}, ${lightningBrightness * 0.1})`);
    gradient.addColorStop(1, 'rgba(180, 190, 210, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(255, 255, 255, ${lightningBrightness * 0.15})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // Window droplets – water drops on glass, sides only, never overlap, smooth spawn
  // appear (0.3s) → rest (few s) → slide (slow start, then accelerates, fade at end)
  const MIN_DROPLET_DIST = 55;
  function getWindowDropletSpawnIntervalMs() {
    const isPouring = currentWeather === 'pouring';
    const isSnowyRainy = currentWeather === 'snowy-rainy';
    const m = cachedPrecipMultiplier;
    let avgPer25s;
    if (isPouring || m >= 1.0) avgPer25s = 4 + Math.random() * 2;
    else if (isSnowyRainy) avgPer25s = 8 + Math.random() * 2; // more drops for snowy-rainy
    else if (m >= 0.7) avgPer25s = 2.5 + Math.random();
    else if (m >= 0.4) avgPer25s = 1.5 + Math.random() * 0.5;
    else avgPer25s = 0.8 + Math.random() * 0.5;
    return (25000 / avgPer25s) * (1.2 + Math.random() * 0.8);
  }

  function dropletOverlaps(x, y, size) {
    for (let i = 0; i < windowDroplets.length; i++) {
      const o = windowDroplets[i];
      const dx = x - o.x;
      const dy = y - o.y;
      const minDist = MIN_DROPLET_DIST + (size + o.size) * 0.5;
      if (dx * dx + dy * dy < minDist * minDist) return true;
    }
    return false;
  }

  function updateWindowDroplets(deltaMs) {
    if (!ctx || !canvas) return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const SIDE_ZONE = 0.18;
    const leftMax = W * SIDE_ZONE;
    const rightMin = W * (1 - SIDE_ZONE);
    const dMs = Math.min(deltaMs, 50);

    windowDropletSpawnTimer += dMs;
    if (windowDropletNextIntervalMs <= 0) windowDropletNextIntervalMs = getWindowDropletSpawnIntervalMs();
    if (windowDropletSpawnTimer >= windowDropletNextIntervalMs) {
      windowDropletSpawnTimer = 0;
      windowDropletNextIntervalMs = getWindowDropletSpawnIntervalMs();
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const size = 3 + Math.random() * 5;
      let x, y;
      let tries = 12;
      do {
        x = side === 'left' ? Math.random() * leftMax : rightMin + Math.random() * (W - rightMin);
        y = Math.random() * H * 0.55;
      } while (--tries > 0 && dropletOverlaps(x, y, size));
      if (tries > 0) {
        windowDroplets.push({
          x, y, size,
          phase: 'appear',
          opacity: 0,
          life: 0,
          appearDur: 300,
          restDur: 2000 + Math.random() * 2500,
          slideVel: 8 + Math.random() * 6,
          slideAccel: 0.8 + Math.random() * 0.6
        });
      }
    }

    for (let i = windowDroplets.length - 1; i >= 0; i--) {
      const d = windowDroplets[i];
      d.life += dMs;

      if (d.phase === 'appear') {
        const t = d.life / d.appearDur;
        d.opacity = Math.min(1, t * 1.8);
        if (d.life >= d.appearDur) {
          d.phase = 'rest';
          d.life = 0;
          d.opacity = 1;
        }
      } else if (d.phase === 'rest') {
        if (d.life >= d.restDur) {
          d.phase = 'slide';
          d.life = 0;
        }
      } else {
        const dt = dMs / 1000;
        d.slideVel = (d.slideVel || 8) + d.slideAccel * dt * 60;
        d.y += d.slideVel * dt;
        const frac = d.y / H;
        d.opacity = frac < 0.85 ? 1 : Math.max(0, (1 - frac) / 0.15);
        if (d.y > H + d.size * 2) windowDroplets.splice(i, 1);
      }

      if (d.y <= H + d.size * 2) {
        ctx.save();
        ctx.globalAlpha = d.opacity;
        const grad = ctx.createRadialGradient(
          d.x - d.size * 0.3, d.y - d.size * 0.3, 0,
          d.x, d.y, d.size * 1.5
        );
        grad.addColorStop(0, 'rgba(220, 235, 255, 0.6)');
        grad.addColorStop(0.4, 'rgba(190, 210, 240, 0.45)');
        grad.addColorStop(0.8, 'rgba(160, 180, 210, 0.2)');
        grad.addColorStop(1, 'rgba(140, 160, 190, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(d.x, d.y, d.size * 0.5, d.size * 1.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
  }

  // Animation loop
  function animate() {
    const cfg = getMobilePerfConfig();
    const now = Date.now();
    const rawDelta = lastAnimateTime ? now - lastAnimateTime : 16;
    const mobileThirtyFps = isMobileDevice() && cfg.mobile_30fps;
    const minDelta = mobileThirtyFps ? 1000 / 30 : 0;
    if (mobileThirtyFps && rawDelta < minDelta) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    const deltaMs = rawDelta;
    lastAnimateTime = now;

    if (!ctx || !canvas) {
      warn('Canvas or context not available, stopping animation');
      return;
    }
    applySpatialZIndex();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const config = weatherConfigs[currentWeather];
    const matrixOnly = !!(cfg.gaming_matrix_only && isGamingModeActive());
    if (config && !matrixOnly) {
      if (config.type === 'sunny') {
        drawSunnyGlow();
      }
      if (config.type === 'sunny2') {
        drawSunnyGlow();
        drawSunBeams();
      }
      // Moon glow for clear-night and snowy (majestic weather)
      if (config.type === 'clear-night' || config.type === 'snowy' || config.type === 'snowy2') {
        drawMoonGlow();
      }

      if (config.type === 'clear-night') {
        updateMeteor(now, deltaMs);
      } else {
        meteorNextAt = 0;
        meteorActive = null;
      }

      cachedPrecipMultiplier = getPrecipitationMultiplier();
      cachedCloudCoverage = getCloudCoverage();
      cachedWindData = getWindData();
      if (config.type === 'snowy2') {
        if (snowy2Canvas) {
          snowy2Canvas.style.display = 'block';
          updateSnowy2Effect(deltaMs);
        }
      } else {
        if (snowy2Canvas && currentWeather !== 'snowy-rainy') snowy2Canvas.style.display = 'none';
        if (particles.length > 0) {
          particles.forEach(particle => {
            particle.update(config);
            particle.draw();
          });
        }
        if (currentWeather === 'snowy-rainy' && snowy2Canvas) {
          snowy2Canvas.style.display = 'block';
          updateSnowy2Effect(deltaMs);
        }
      }
    }
    
    // Handle lightning – default 25–40 s; counter↑ triggers by distance; >30km rarer; min gap 20–40 s
    try {
      if (!matrixOnly && config && (config.type === 'lightning' || config.hasLightning)) {
        const ld = getLightningData();
        const hasSensors = ld.counter !== null || ld.distanceKm !== null;
        const distKm = ld.distanceKm;
        const minGapMs = 20000 + Math.random() * 20000;
        const defIntervalMs = 25000 + Math.random() * 15000;
        const farIntervalMs = 40000 + Math.random() * 20000;
        const lightningFactor = getSpeedFactor('lightning');

        if (lightningFirstBoltAt === 0) {
          lightningFirstBoltAt = now + 2000 + Math.random() * 3000;
        }

        if (ld.counter !== null && lastLightningCounter !== null && ld.counter > lastLightningCounter) {
          const flashDelayMs = distKm != null ? 100 + distKm * 2900 : 4000 + Math.random() * 1000;
          lightningScheduledFlashAt = now + flashDelayMs;
          lastLightningCounter = ld.counter;
        } else if (ld.counter !== null) {
          lastLightningCounter = ld.counter;
        }

        if (lightningScheduledFlashAt > 0 && now >= lightningScheduledFlashAt) {
          lightningScheduledFlashAt = 0;
          showLightning = true;
          lightningDuration = (200 + Math.random() * 150) / lightningFactor;
          lightningBrightness = 0.7 + Math.random() * 0.25;
          lightningFadeSpeed = lightningBrightness / (lightningDuration / 16);
        }

        lightningTimer += 16;

        if (showLightning) {
          lightningDuration -= 16;
          if (lightningDuration <= 0) {
            showLightning = false;
            lightningTimer = 0;
            const farStrike = hasSensors && distKm != null && distKm > 30;
            lightningInterval = (farStrike ? farIntervalMs : defIntervalMs) / lightningFactor;
            lightningInterval = Math.max(lightningInterval, minGapMs / lightningFactor);
          } else {
            lightningBrightness = Math.max(0, lightningBrightness - lightningFadeSpeed);
            drawLightning();
          }
        } else if (lightningScheduledFlashAt === 0 && lightningTimer >= minGapMs &&
            (lightningTimer >= lightningInterval || (now >= lightningFirstBoltAt && lightningTimer >= 1000))) {
          if (now >= lightningFirstBoltAt) lightningFirstBoltAt = 0;
          showLightning = true;
          const flashType = Math.random();
          if (flashType < 0.3) {
            lightningDuration = (150 + Math.random() * 100) / lightningFactor;
            lightningBrightness = 0.7 + Math.random() * 0.3;
          } else if (flashType < 0.6) {
            lightningDuration = (600 + Math.random() * 400) / lightningFactor;
            lightningBrightness = 0.5 + Math.random() * 0.2;
          } else {
            lightningDuration = (300 + Math.random() * 200) / lightningFactor;
            lightningBrightness = 0.6 + Math.random() * 0.3;
          }
          lightningFadeSpeed = lightningBrightness / (lightningDuration / 16);
          lightningTimer = 0;
          lightningInterval = ((hasSensors && distKm != null && distKm > 30) ? farIntervalMs : defIntervalMs) / lightningFactor;
          lightningInterval = Math.max(lightningInterval, (20000 + Math.random() * 20000) / lightningFactor);
        }
      } else {
        lightningFirstBoltAt = 0;
        lastLightningCounter = null;
        lightningScheduledFlashAt = 0;
      }
    } catch (lightningErr) {
      warn('Lightning handling error (animation continues)', lightningErr);
      lightningFirstBoltAt = 0;
      lastLightningCounter = null;
      lightningScheduledFlashAt = 0;
      showLightning = false;
      lightningDuration = 0;
    }

    // Gaming Mode: Matrix cyberpunk overlay – only when overlay enabled and gaming entity is explicitly 'on'
    const gamingOn = isOverlayEnabled() && isGamingModeActive();
    if (matrixCanvas) {
      if (gamingOn) {
        matrixCanvas.style.display = 'block';
        updateMatrixEffect(deltaMs);
      } else {
        matrixCanvas.style.display = 'none';
        matrixStreams = [];
        if (matrixCtx) matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      }
    }

    // Smog Alert: fog rising from bottom (always on top, independent, pointer-events:none)
    const smogOn = isSmogAlertActive();
    if (smogCanvas) {
      smogCanvas.style.display = smogOn ? 'block' : 'none';
      if (smogOn) updateSmogEffect(deltaMs);
      else { smogParticles = []; smogSpawnTimer = 0; }
    }

    // Window droplets (rain-on-glass) – only during rain, on sides
    const rainStates = ['rainy', 'pouring', 'lightning-rainy', 'snowy-rainy'];
    if (!matrixOnly && config && rainStates.includes(currentWeather) && ctx) {
      updateWindowDroplets(deltaMs);
    } else {
      windowDroplets = [];
      windowDropletSpawnTimer = 0;
      windowDropletNextIntervalMs = 0;
    }
    
    if (getSpatialMode() === 'gradient-mask') {
      applyGradientMaskForCanvas(canvas, ctx);
      if (snowy2Canvas && snowy2Ctx) applyGradientMaskForCanvas(snowy2Canvas, snowy2Ctx);
      if (matrixCanvas && matrixCtx) applyGradientMaskForCanvas(matrixCanvas, matrixCtx);
      if (smogCanvas && smogCtx) applyGradientMaskForCanvas(smogCanvas, smogCtx);
    }
    animationId = requestAnimationFrame(animate);
  }
  
  // Get UV index (from refreshSensorCache)
  function getUvIndex() {
    refreshSensorCache();
    return cachedUvIndex;
  }

  // Get sun position. Returns { x: 0-1, y: 0-1, aboveHorizon } or null.
  // x: 0 = left (sunrise/east), 0.5 = center (noon/south), 1 = right (sunset/west)
  function getSunPosition() {
    refreshSensorCache();
    return cachedSunPosition;
  }

  // Get moon position. Returns { x, y, distance? } for glow placement and size/intensity.
  // Moon is drawn by drawMoonGlow() for clear-night, snowy, snowy2 (verified).
  function getMoonPosition() {
    refreshSensorCache();
    return cachedMoonPosition || { x: 0.75, y: 0.12, distance: null };
  }

  // Detect HA theme (light/dark) for optional effect adaptation. Card sets theme_mode from hass.themes.
  function getThemeMode() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    if (cfg.theme_mode === 'dark' || cfg.theme_mode === 'light') return cfg.theme_mode;
    const root = document.documentElement;
    if (root.classList && (root.classList.contains('dark') || root.getAttribute('theme') === 'dark')) return 'dark';
    if (root.classList && root.classList.contains('light')) return 'light';
    if (typeof window.matchMedia !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  }

  // Speed factor for effects (1 = default). Keys: rain, snow, clouds, fog, smog, hail, lightning, stars, matrix.
  function getSpeedFactor(effectKey) {
    const cfg = window.ForkUWeatherAwareConfig || {};
    const key = 'speed_factor_' + (effectKey === 'mixed' ? 'rain' : effectKey);
    const v = cfg[key];
    if (v == null || isNaN(parseFloat(v))) return 1;
    return Math.max(0.1, Math.min(3, parseFloat(v)));
  }

  function getWindSwayFactor() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    const v = cfg.wind_sway_factor;
    if (v == null || isNaN(parseFloat(v))) return 1;
    return Math.max(0, Math.min(2, parseFloat(v)));
  }

  function getSpatialMode() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    const v = cfg.spatial_mode;
    if (v === 'background' || v === 'bubble' || v === 'gradient-mask' || v === 'foreground') return v;
    return 'foreground';
  }

  function applySpatialZIndex() {
    const mode = getSpatialMode();
    let zMain, zSnow, zMatrix, zSmog;
    if (mode === 'background') {
      zMain = zSnow = zMatrix = zSmog = -1;
    } else if (mode === 'bubble') {
      // Slightly above default card layer, but still below most popups
      zMain = zSnow = zMatrix = zSmog = 3;
    } else {
      // foreground and gradient-mask share the same z-indexes
      zMain = 9999;
      zSnow = 9998;
      zMatrix = 10000;
      zSmog = 10001;
    }
    if (canvas) canvas.style.zIndex = String(zMain);
    if (snowy2Canvas) snowy2Canvas.style.zIndex = String(zSnow);
    if (matrixCanvas) matrixCanvas.style.zIndex = String(zMatrix);
    if (smogCanvas) smogCanvas.style.zIndex = String(zSmog);
  }

  function applyGradientMaskForCanvas(targetCanvas, targetCtx) {
    if (!targetCanvas || !targetCtx) return;
    if (getSpatialMode() !== 'gradient-mask') return;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;
    const maxR = Math.max(W, H) / 2;
    const innerR = maxR * 0.32;
    const outerR = maxR * 0.85;

    targetCtx.save();
    targetCtx.globalCompositeOperation = 'destination-out';
    const grad = targetCtx.createRadialGradient(cx, cy, innerR, cx, cy, outerR);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    targetCtx.fillStyle = grad;
    targetCtx.fillRect(0, 0, W, H);
    targetCtx.restore();
  }

  // Check if gaming mode is active (input_boolean.gaming_mode) – only explicit 'on', no undefined/unavailable
  function isGamingModeActive() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    const eid = cfg.gaming_mode_entity;
    if (!eid || typeof eid !== 'string' || !eid.trim()) return false;
    const ha = getHomeAssistant();
    if (!ha?.hass?.states) return false;
    const ent = ha.hass.states[eid];
    return !!(ent && String(ent.state).toLowerCase() === 'on');
  }

  function getCloudCoverage() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    if (cfg.development_mode && cfg.debug_cloud_coverage != null && String(cfg.debug_cloud_coverage).trim() !== '') {
      const v = parseFloat(cfg.debug_cloud_coverage);
      if (!isNaN(v)) return Math.max(0, Math.min(100, v));
    }
    const ha = getHomeAssistant();
    if (!ha?.hass) return null;
    if (cfg.cloud_coverage_entity) {
      const e = ha.hass.states[cfg.cloud_coverage_entity];
      if (e?.state && e.state !== 'unavailable') {
        const v = parseFloat(e.state);
        if (!isNaN(v)) return Math.max(0, Math.min(100, v));
      }
    }
    const we = ha.hass.states[cfg.weather_entity || WEATHER_ENTITY];
    if (we?.attributes?.cloud_coverage != null) {
      const v = parseFloat(we.attributes.cloud_coverage);
      if (!isNaN(v)) return Math.max(0, Math.min(100, v));
    }
    return null;
  }

  const BEARING_MAP = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };
  function getWindData() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    if (cfg.development_mode) {
      if (cfg.debug_wind_speed && cfg.debug_wind_speed !== 'Use sensors') {
        const spd = { none: 0, light: 10, medium: 25, strong: 45 }[cfg.debug_wind_speed];
        if (spd !== undefined) {
          let brg = 270;
          if (cfg.debug_wind_direction && cfg.debug_wind_direction !== 'Use sensors') {
            const d = cfg.debug_wind_direction;
            brg = BEARING_MAP[d] != null ? BEARING_MAP[d] : (parseFloat(d) || 270);
          } else {
            const ha = getHomeAssistant();
            if (ha?.hass && cfg.wind_direction_entity) {
              const e = ha.hass.states[cfg.wind_direction_entity];
              if (e?.state !== 'unavailable') brg = parseFloat(e.state) || 270;
            }
          }
          return { speed: spd, bearing: brg };
        }
      }
      if (cfg.debug_wind_direction && cfg.debug_wind_direction !== 'Use sensors') {
        const d = cfg.debug_wind_direction;
        const brg = BEARING_MAP[d] != null ? BEARING_MAP[d] : (parseFloat(d) || 270);
        const ha = getHomeAssistant();
        let spd = 5;
        if (ha?.hass && cfg.wind_speed_entity) {
          const e = ha.hass.states[cfg.wind_speed_entity];
          if (e?.state !== 'unavailable') spd = parseFloat(e.state) || 5;
        }
        return { speed: spd, bearing: brg };
      }
    }
    const ha = getHomeAssistant();
    if (!ha?.hass) return { speed: 5, bearing: 270 };
    let speed = null, bearing = null;
    if (cfg.wind_speed_entity) {
      const e = ha.hass.states[cfg.wind_speed_entity];
      if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v)) speed = v;
      }
    }
    if (speed == null) {
      const we = ha.hass.states[cfg.weather_entity || WEATHER_ENTITY];
      const v = we?.attributes?.wind_speed != null ? parseFloat(we.attributes.wind_speed) : NaN;
      speed = !isNaN(v) ? v : 5;
    }
    if (cfg.wind_direction_entity) {
      const e = ha.hass.states[cfg.wind_direction_entity];
      if (e?.state !== 'unavailable' && e?.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v)) bearing = v;
      }
    }
    if (bearing == null) {
      const we = ha.hass.states[cfg.weather_entity || WEATHER_ENTITY];
      const v = we?.attributes?.wind_bearing != null ? parseFloat(we.attributes.wind_bearing) : NaN;
      bearing = !isNaN(v) ? v : 270;
    }
    return { speed, bearing };
  }

  function getPrecipitationMultiplier() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    if (cfg.development_mode && cfg.debug_precipitation && cfg.debug_precipitation !== 'Use sensors') {
      const m = { light: 0.35, medium: 0.65, heavy: 1.2 }[cfg.debug_precipitation];
      if (m !== undefined) return m;
    }
    const ha = getHomeAssistant();
    if (!ha?.hass) return 1;
    if (cfg.precipitation_entity) {
      const e = ha.hass.states[cfg.precipitation_entity];
      if (e?.state !== 'unavailable') {
        const v = parseFloat(e.state);
        if (!isNaN(v)) return Math.max(0.2, Math.min(1.5, 0.2 + (v / 10)));
      }
    }
    const we = ha.hass.states[cfg.weather_entity || WEATHER_ENTITY];
    if (!we?.attributes) return 1;
    const precip = we.attributes.precipitation ?? we.attributes.precipitation_probability;
    if (precip == null) return 1;
    const v = parseFloat(precip);
    if (isNaN(v)) return 1;
    return Math.max(0.2, Math.min(1.5, 0.2 + (v / 10)));
  }

  // Get lightning sensor data (defensive: tolerates config updates from editor)
  function getLightningData() {
    let cfg, ha;
    try {
      cfg = window.ForkUWeatherAwareConfig || {};
      ha = getHomeAssistant();
    } catch (e) {
      return { counter: null, distanceKm: null };
    }
    let counter = null, distanceKm = null;
    try {
      if (cfg.lightning_counter_entity && ha?.hass) {
        const e = ha.hass.states[cfg.lightning_counter_entity];
        if (e?.state !== 'unavailable') counter = parseInt(e?.state, 10);
      }
      if (cfg.lightning_distance_entity && ha?.hass) {
        const e = ha.hass.states[cfg.lightning_distance_entity];
        if (e?.state !== 'unavailable') distanceKm = parseFloat(e?.state);
      }
      if (cfg.development_mode) {
        const rawCounter = cfg.debug_lightning_counter;
        if (rawCounter != null && String(rawCounter ?? '').trim() !== '') {
          const v = parseInt(String(rawCounter), 10);
          if (!isNaN(v)) counter = v;
        }
        const rawDist = cfg.debug_lightning_distance;
        if (rawDist != null && String(rawDist ?? '').trim() !== '') {
          const v = parseFloat(String(rawDist));
          if (!isNaN(v)) distanceKm = v;
        }
      }
    } catch (e) {
      warn('getLightningData error', e);
    }
    return { counter: counter != null && !isNaN(counter) ? counter : null, distanceKm: distanceKm != null && !isNaN(distanceKm) ? distanceKm : null };
  }

  // Check if smog alert is active (PM2.5, PM4, or PM10 above threshold)
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
    let critical = false;
    if (pm25Id) {
      const e = ha.hass.states[pm25Id];
      if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v) && v >= thresh25) critical = true;
      }
    }
    if (!critical && pm4Id) {
      const e = ha.hass.states[pm4Id];
      if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v) && v >= thresh4) critical = true;
      }
    }
    if (!critical && pm10Id) {
      const e = ha.hass.states[pm10Id];
      if (e && e.state !== 'unavailable' && e.state !== 'unknown') {
        const v = parseFloat(e.state);
        if (!isNaN(v) && v >= thresh10) critical = true;
      }
    }
    return critical;
  }

  // Get Home Assistant instance
  function getHomeAssistant() {
    const ha = document.querySelector('home-assistant');
    if (!ha || !ha.hass) {
      return null;
    }
    return ha;
  }
  
  // Get weather state from Home Assistant
  function getWeatherState() {
    try {
      const homeAssistant = getHomeAssistant();
      if (!homeAssistant) {
        warn('Home Assistant not available');
        return null;
      }
      
      // Check if development mode is active via global config
      const cfg = window.ForkUWeatherAwareConfig || {};
      if (cfg.development_mode && cfg.test_effect && cfg.test_effect !== 'Use Real Weather') {
        let devState = cfg.test_effect;
        if (devState === 'snowy') {
          // Use selected snow variant for development mode
          devState = cfg.snowy_variant === 'snowy' ? 'snowy' : 'snowy2';
        }
        log(`Using DEVELOPMENT weather: ${devState}`);
        return devState;
      }
      
      // Use real weather entity
      const weatherEntity = homeAssistant.hass.states[WEATHER_ENTITY];
      if (!weatherEntity) {
        error(`Weather entity '${WEATHER_ENTITY}' not found!`);
        error('Available weather entities:', Object.keys(homeAssistant.hass.states).filter(k => k.startsWith('weather.')));
        return null;
      }
      
      let weatherState = (weatherEntity.state || '').toLowerCase().replace(/_/g, '-');
      log(`Weather entity state: ${weatherState}`);
      
      // Drizzle (mży/kropi): rainy with low precipitation – wiosenny lekki deszcz
      const cfgOverlay = window.ForkUWeatherAwareConfig || {};
      const drizzleMax = (cfgOverlay.drizzle_precipitation_max != null && !isNaN(parseFloat(cfgOverlay.drizzle_precipitation_max))) ? parseFloat(cfgOverlay.drizzle_precipitation_max) : 2.5;
      if (weatherState === 'rainy') {
        const precip = weatherEntity.attributes?.precipitation != null ? parseFloat(weatherEntity.attributes.precipitation) : (weatherEntity.attributes?.precipitation_1h != null ? parseFloat(weatherEntity.attributes.precipitation_1h) : NaN);
        if (!isNaN(precip) && precip > 0 && precip <= drizzleMax) {
          weatherState = 'rainy-drizzle';
          log(`Drizzle detected: precipitation ${precip} mm <= ${drizzleMax} (mży/kropi)`);
        }
      }
      
      // Cross-check rainy/pouring with rain sensor if configured
      if (RAIN_SENSOR_ENTITY && REQUIRE_RAIN_CONFIRMATION && (weatherState === 'rainy' || weatherState === 'pouring')) {
        const rainSensor = homeAssistant.hass.states[RAIN_SENSOR_ENTITY];
        
        if (rainSensor) {
          const rainRate = parseFloat(rainSensor.state);
          const isActuallyRaining = !isNaN(rainRate) && rainRate > 0;
          
          if (!isActuallyRaining) {
            log(`Weather says ${weatherState}, but rain sensor shows ${rainRate} - showing cloudy instead`);
            weatherState = 'cloudy';
          } else {
            log(`Rain confirmed by sensor: ${rainRate}`);
          }
        } else {
          warn(`Rain sensor '${RAIN_SENSOR_ENTITY}' not found`);
        }
      }
      
      // Check if weather state is supported
      if (!weatherConfigs[weatherState]) {
        warn(`Unknown weather state: '${weatherState}' - no animation available`);
        warn('Supported states:', Object.keys(weatherConfigs));
      }
      
      return weatherState;
    } catch (err) {
      error('Error getting weather state:', err);
      return null;
    }
  }
  
  // Check if overlay is enabled via toggle
  function isOverlayEnabled() {
    try {
      // First, respect global card configuration if present.
      const cfg = window.ForkUWeatherAwareConfig || {};
      if (cfg.enabled === false) {
        return false;
      }

      // If no toggle entity configured, always enabled
      if (!TOGGLE_ENTITY) {
        return true;
      }
      
      const homeAssistant = getHomeAssistant();
      if (!homeAssistant) {
        return true; // Default to enabled if HA not ready
      }
      
      const toggleEntity = homeAssistant.hass.states[TOGGLE_ENTITY];
      if (!toggleEntity) {
        log(`Toggle entity '${TOGGLE_ENTITY}' not found - overlay enabled by default`);
        return true;
      }
      
      const enabled = toggleEntity.state === 'on';
      if (!enabled) {
        log('Overlay disabled via toggle');
      }
      return enabled;
    } catch (err) {
      error('Error checking toggle state:', err);
      return true;
    }
  }
  
  // Check if current dashboard is in the enabled list
  function isOnEnabledDashboard() {
    // If ENABLED_DASHBOARDS is empty, show on all dashboards
    if (!ENABLED_DASHBOARDS || ENABLED_DASHBOARDS.length === 0) {
      log('Dashboard filtering disabled - showing on all dashboards');
      return true;
    }
    
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(p => p);
    
    log('Current path:', path);
    log('Path parts:', pathParts);
    
    if (pathParts.length === 0) {
      log('No path parts found - assuming home dashboard');
      return ENABLED_DASHBOARDS.includes('lovelace') || ENABLED_DASHBOARDS.includes('home');
    }
    
    // Check for standard lovelace URLs: /lovelace or /lovelace/dashboard
    if (pathParts[0] === 'lovelace') {
      const dashboardName = pathParts.length === 1 ? 'lovelace' : pathParts[1];
      const enabled = ENABLED_DASHBOARDS.includes(dashboardName);
      log(`Dashboard: '${dashboardName}', Enabled: ${enabled}`);
      return enabled;
    }
    
    // Check for custom dashboard URLs
    // Try matching against each path part
    for (const part of pathParts) {
      if (ENABLED_DASHBOARDS.includes(part)) {
        log(`Dashboard: '${part}', Enabled: true`);
        return true;
      }
    }
    
    // Last part is usually the view/dashboard name
    const dashboardName = pathParts[pathParts.length - 1];
    const enabled = ENABLED_DASHBOARDS.includes(dashboardName);
    log(`Dashboard: '${dashboardName}', Enabled: ${enabled}`);
    
    if (!enabled) {
      log('Dashboard not in enabled list. Enabled dashboards:', ENABLED_DASHBOARDS);
    }
    
    return enabled;
  }
  
  // Update weather and manage animation
  function updateWeather() {
    const now = Date.now();
    if (now - lastUpdateTime < UPDATE_INTERVAL) {
      return;
    }
    
    lastUpdateTime = now;
    
    // Check if overlay is enabled
    const enabled = isOverlayEnabled();
    const onEnabledDashboard = isOnEnabledDashboard();
    
    if (!enabled || !onEnabledDashboard) {
      if (canvas) {
        canvas.style.display = 'none';
      }
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        log('Animation stopped (disabled or wrong dashboard)');
      }
      return;
    }
    
    // Show canvas
    if (canvas) {
      canvas.style.display = 'block';
    }
    
    const newWeather = getWeatherState();
    
    if (newWeather && newWeather !== currentWeather) {
      log(`Weather changed: ${currentWeather} -> ${newWeather}`);
      currentWeather = newWeather;
      
      // Reset lightning timers
      lightningTimer = 0;
      lightningFirstBoltAt = 0;
      lastLightningCounter = null;
      lightningScheduledFlashAt = 0;
      showLightning = false;
      lightningDuration = 0;
      lightningBrightness = 0;
      lightningInterval = (15000 + Math.random() * 25000) / Math.max(0.1, getSpeedFactor('lightning'));
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      if (weatherConfigs[newWeather]) {
        if (newWeather === 'snowy2') initSnowy2Layers();
        else initParticles(newWeather);
        animate();
        log(`Animation started for: ${newWeather}`);
      } else {
        particles = [];
        snowy2Layers = null;
        if (snowy2Canvas) snowy2Canvas.style.display = 'none';
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        warn(`No animation config for weather: ${newWeather}`);
      }
    } else if (newWeather && !animationId && weatherConfigs[newWeather]) {
      // Restart animation if it was stopped
      if (newWeather === 'snowy2') initSnowy2Layers();
      else initParticles(newWeather);
      animate();
      log(`Animation restarted for: ${newWeather}`);
    }
  }
  
  // Handle window resize
  function handleResize() {
    const dpr = getEffectiveDpr();
    if (canvas && ctx) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      log('Canvas resized');
    }
    if (matrixCanvas && matrixCtx) {
      matrixCanvas.width = window.innerWidth * dpr;
      matrixCanvas.height = window.innerHeight * dpr;
      matrixCtx.scale(dpr, dpr);
    }
    if (smogCanvas && smogCtx) {
      smogCanvas.width = window.innerWidth * dpr;
      smogCanvas.height = window.innerHeight * dpr;
      smogCtx.scale(dpr, dpr);
    }
    if (snowy2Canvas && snowy2Ctx) {
      snowy2Canvas.width = window.innerWidth * dpr;
      snowy2Canvas.height = window.innerHeight * dpr;
      snowy2Ctx.scale(dpr, dpr);
      if (currentWeather === 'snowy2') initSnowy2Layers();
    }
    applySpatialZIndex();
  }
  
  // Wait for Home Assistant to load
  function waitForHomeAssistant() {
    log('Waiting for Home Assistant...');
    
    let attempts = 0;
    const maxAttempts = 60; // 30 seconds max
    
    const checkHA = setInterval(() => {
      attempts++;
      const homeAssistant = getHomeAssistant();
      
      if (homeAssistant) {
        clearInterval(checkHA);
        log('Home Assistant ready!');
        init();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkHA);
        error('Home Assistant not found after 30 seconds. Is this a Home Assistant page?');
      }
    }, 500);
  }
  
  // Initialize
  function init() {
    if (initializationComplete) {
      log('Already initialized, skipping');
      return;
    }
    
    log('Initializing Weather Overlay v2.0...');
    log('Configuration:', {
      WEATHER_ENTITY,
      TOGGLE_ENTITY: TOGGLE_ENTITY || '(disabled)',
      TEST_ENTITY: TEST_ENTITY || '(disabled)',
      RAIN_SENSOR_ENTITY: RAIN_SENSOR_ENTITY || '(disabled)',
      ENABLED_DASHBOARDS: ENABLED_DASHBOARDS.length ? ENABLED_DASHBOARDS : '(all dashboards)'
    });
    
    initCanvas();
    if (!matrixCanvas || !smogCanvas) initOverlayCanvases();
    
    // Check if overlay is enabled
    if (!isOverlayEnabled()) {
      log('Overlay is disabled via toggle');
      if (canvas) canvas.style.display = 'none';
      if (matrixCanvas) { matrixCanvas.style.display = 'none'; matrixStreams = []; }
    } else if (!isOnEnabledDashboard()) {
      log('Not on enabled dashboard');
      if (canvas) canvas.style.display = 'none';
      if (matrixCanvas) { matrixCanvas.style.display = 'none'; matrixStreams = []; }
    } else {
      // Initial weather check
      const weather = getWeatherState();
      if (weather) {
        currentWeather = weather;
        if (weatherConfigs[weather]) {
          if (weather === 'snowy2') initSnowy2Layers();
          else initParticles(weather);
          animate();
          log(`Started with weather: ${weather}`);
        } else {
          warn(`Weather '${weather}' has no animation config`);
        }
      }
    }
    
    // Setup periodic weather checks
    setInterval(updateWeather, 1000);
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Listen for URL changes (dashboard navigation)
    let lastPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        log('Dashboard changed, re-checking...');
        lastUpdateTime = 0; // Force immediate update
        updateWeather();
      }
    }, 500);
    
    initializationComplete = true;
    log('✅ Initialization complete!');
  }
  
  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForHomeAssistant);
  } else {
    waitForHomeAssistant();
  }
  
  log('Overlay module loaded - v2.0');
})();
