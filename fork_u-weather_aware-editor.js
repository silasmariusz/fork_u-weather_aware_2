// Fork U - Weather Aware: Lovelace card + editor (load after weather-overlay.js)
(function() {
  'use strict';

  const DEFAULT_OVERLAY_CONFIG = window.ForkUWeatherAwareDefaultConfig || {
    enabled: true,
    weather_entity: 'weather.openweathermap',
    development_mode: false,
    test_effect: 'Use Real Weather',
    sun_entity: 'sun.sun',
    moon_phase_entity: null,
    uv_index_entity: null,
    moon_position_entity: null,
    moon_azimuth_entity: null,
    moon_altitude_entity: null,
    moon_distance_entity: null,
    gaming_mode_entity: null,
    pm25_entity: null,
    pm4_entity: null,
    pm10_entity: null,
    smog_threshold_pm25: 35,   // WHO/EPA: ~35 µg/m³ = unhealthy for sensitive (24h)
    smog_threshold_pm4: 50,    // no global standard; CF awareness
    smog_threshold_pm10: 50,   // EU 24h limit / WHO guideline ballpark
    cloud_coverage_entity: null,
    wind_speed_entity: null,
    wind_direction_entity: null,
    precipitation_entity: null,
    lightning_counter_entity: null,
    lightning_distance_entity: null,
    debug_precipitation: null,
    debug_wind_speed: null,
    debug_wind_direction: null,
    debug_lightning_distance: null,
    debug_lightning_counter: null,
    debug_cloud_coverage: null,
    cloud_speed_multiplier: 1,
    wind_sway_factor: 0.7,
    spatial_mode: 'foreground',
    // Effect toggles – allow disabling heavy effects
    enable_rain: true,
    enable_snow: true,
    enable_clouds: true,
    enable_fog: true,
    enable_smog_effect: true,
    enable_sun_glow: true,
    enable_moon_glow: true,
    enable_stars: true,
    enable_hail: true,
    enable_lightning_effect: true,
    enable_matrix: true,
    enable_window_droplets: true,
    stars_require_moon: false,
    // Mobile performance options (mirrored into overlay config)
    mobile_limit_dpr: true,
    mobile_reduce_particles: true,
    mobile_snowy2_light: true,
    mobile_smog_simple: false,
    mobile_30fps: false,
    gaming_matrix_only: false,
    snowy_variant: 'snowy2', // 'snowy' or 'snowy2'
    enable_aurora_effect: true,
    aurora_variant: 'bands',
    aurora_chance_entity: null,
    aurora_visibility_alert_entity: null,
    aurora_visibility_min: 0.15,
    k_index_entity: null,
    debug_aurora_score: null,
    opacity_moon: 100,
    opacity_clouds: 100,
    opacity_aurora: 100,
    opacity_stars: 100,
    opacity_droplets: 100,
    opacity_sun: 100,
    opacity_fog: 100,
    opacity_smog: 100
  };

  class ForkUWeatherAwareCard extends HTMLElement {
    connectedCallback() {
      super.connectedCallback && super.connectedCallback();
      this._scheduleEditorCheck();
    }

    _scheduleEditorCheck() {
      if (this._editorCheckScheduled) return;
      this._editorCheckScheduled = true;
      requestAnimationFrame(() => {
        this._editorCheckScheduled = false;
        if (this._config) this._render();
      });
    }

    setConfig(config) {
      const merged = Object.assign({}, DEFAULT_OVERLAY_CONFIG, config || {});
      window.ForkUWeatherAwareConfig = merged;
      this._config = merged;
      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      if (this._config && !window.ForkUWeatherAwareConfig) {
        window.ForkUWeatherAwareConfig = this._config;
      }
      if (hass?.themes?.darkMode !== undefined) {
        const cfg = window.ForkUWeatherAwareConfig || {};
        const override = cfg.theme_mode;
        const fromHA = hass.themes.darkMode ? 'dark' : 'light';
        window.ForkUWeatherAwareConfig = Object.assign({}, cfg, {
          theme_mode: (override === 'light' || override === 'dark') ? override : fromHA
        });
      }
    }

    _isInEditorPreview() {
      let node = this;
      while (node) {
        if (node.nodeType === 1 && node.classList && (
          node.classList.contains('element-preview') ||
          (node.tagName && node.tagName.toLowerCase().includes('hui-dialog-edit-card'))
        )) return true;
        const root = node.getRootNode ? node.getRootNode() : node;
        node = (root instanceof ShadowRoot ? root.host : node.parentNode) || null;
      }
      return false;
    }

    _render() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      const cfg = this._config || window.ForkUWeatherAwareConfig || DEFAULT_OVERLAY_CONFIG;
      const inEditPreview = this._isInEditorPreview();
      // Show card when: development_mode ON, or when in edit dialog preview (like Bubble – disappears after leaving edit)
      const hideCard = !cfg.development_mode && !inEditPreview;
      this.style.display = hideCard ? 'none' : '';
      this.shadowRoot.innerHTML = `
        <ha-card header="Fork U - Weather Aware" style="${hideCard ? 'display:none' : ''}">
          <div class="card-content">
            <p>Fullscreen, smooth weather overlay running on this dashboard.</p>
            <p><strong>Weather entity:</strong> ${cfg.weather_entity || 'not set'}</p>
            <p><strong>Development mode:</strong> ${cfg.development_mode ? 'on' : 'off'}</p>
          </div>
        </ha-card>
      `;
    }

    getCardSize() {
      const cfg = this._config || window.ForkUWeatherAwareConfig || {};
      const inEditPreview = this._isInEditorPreview && this._isInEditorPreview();
      const hideCard = !cfg.development_mode && !inEditPreview;
      return hideCard ? 0 : 1;
    }

    static getConfigElement() {
      return document.createElement('fork-u-weather-aware-editor');
    }

    static getStubConfig() {
      return {
        enabled: true,
        weather_entity: 'weather.openweathermap',
        development_mode: false,
        test_effect: 'Use Real Weather'
      };
    }
  }

  // Register card in HA "Add card" list (card picker) – type without "custom:" prefix
  if (typeof window.customCards === 'undefined') window.customCards = [];
  window.customCards.push({
    type: 'fork-u-weather-aware-card',
    name: 'Fork U - Weather Aware',
    description: 'Fullscreen weather overlay with rain, snow, lightning, fog and more.',
    preview: false
  });

  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getEntityOptions(hass, domains, currentValue) {
    const none = { value: '', label: '— None —' };
    if (!hass || !hass.states) return currentValue ? [none, { value: currentValue, label: 'Current: ' + currentValue }] : [none];
    const ids = Object.keys(hass.states)
      .filter(eid => domains.some(d => eid.startsWith(d + '.')))
      .sort();
    const options = [none];
    ids.forEach(id => options.push({ value: id, label: id }));
    if (currentValue && currentValue.trim() && !ids.includes(currentValue))
      options.splice(1, 0, { value: currentValue, label: 'Current: ' + currentValue });
    return options;
  }

  function selectMarkup(id, options, currentValue) {
    return `<select id="${id}" class="entity-select">${options.map(o =>
      `<option value="${escapeHtml(o.value)}" ${(currentValue || '') === o.value ? 'selected' : ''}>${escapeHtml(o.label)}</option>`
    ).join('')}</select>`;
  }

  class ForkUWeatherAwareEditor extends HTMLElement {
    setConfig(config) {
      this._config = Object.assign({}, DEFAULT_OVERLAY_CONFIG, config || {});
      if (this._config) window.ForkUWeatherAwareConfig = this._config;
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
        this._render();
      } else {
        this._updateFormValues(this._config);
      }
    }

    set hass(hass) {
      this._hass = hass;
      if (hass && this.shadowRoot && this._config && !this._entitySelectsPopulated) this._populateEntitySelects();
    }

    _populateEntitySelects() {
      const root = this.shadowRoot;
      const hass = this._hass;
      const cfg = this._config || {};
      if (!root || !hass) return;
      this._entitySelectsPopulated = true;
      const entitySelects = [
        { id: 'weather_entity', domains: ['weather'] },
        { id: 'sun_entity', domains: ['sun'] },
        { id: 'moon_phase_entity', domains: ['sensor'] },
        { id: 'uv_index_entity', domains: ['sensor'] },
        { id: 'moon_position_entity', domains: ['sensor'] },
        { id: 'moon_azimuth_entity', domains: ['sensor'] },
        { id: 'moon_altitude_entity', domains: ['sensor'] },
        { id: 'moon_distance_entity', domains: ['sensor'] },
        { id: 'wind_speed_entity', domains: ['sensor'] },
        { id: 'wind_direction_entity', domains: ['sensor'] },
        { id: 'cloud_coverage_entity', domains: ['sensor'] },
        { id: 'precipitation_entity', domains: ['sensor'] },
        { id: 'pm25_entity', domains: ['sensor'] },
        { id: 'pm4_entity', domains: ['sensor'] },
        { id: 'pm10_entity', domains: ['sensor'] },
        { id: 'gaming_mode_entity', domains: ['input_boolean', 'binary_sensor'] },
        { id: 'lightning_counter_entity', domains: ['sensor'] },
        { id: 'lightning_distance_entity', domains: ['sensor'] },
        { id: 'aurora_chance_entity', domains: ['sensor'] },
        { id: 'aurora_visibility_alert_entity', domains: ['binary_sensor'] },
        { id: 'k_index_entity', domains: ['sensor'] }
      ];
      entitySelects.forEach(({ id, domains }) => {
        const list = root.getElementById(id + '_list');
        if (!list) return;
        const cur = cfg[id] || '';
        const opts = getEntityOptions(hass, domains, cur);
        list.innerHTML = opts
          .filter(o => o.value) // skip "— None —" as actual value
          .map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`)
          .join('');
      });
    }

    _updateFormValues(cfg) {
      const root = this.shadowRoot;
      if (!root || !cfg) return;
      const set = (id, value) => {
        const el = root.getElementById(id);
        if (!el) return;
        if (el.type === 'checkbox') el.checked = !!value;
        else el.value = value != null ? String(value) : '';
      };
      set('enabled', cfg.enabled);
      set('weather_entity', cfg.weather_entity);
      set('sun_entity', cfg.sun_entity);
      set('moon_phase_entity', cfg.moon_phase_entity);
      set('uv_index_entity', cfg.uv_index_entity);
      set('moon_position_entity', cfg.moon_position_entity);
      set('moon_azimuth_entity', cfg.moon_azimuth_entity);
      set('moon_altitude_entity', cfg.moon_altitude_entity);
      set('moon_distance_entity', cfg.moon_distance_entity);
      set('gaming_mode_entity', cfg.gaming_mode_entity);
      set('pm25_entity', cfg.pm25_entity);
      set('pm4_entity', cfg.pm4_entity);
      set('pm10_entity', cfg.pm10_entity);
      set('smog_threshold_pm25', cfg.smog_threshold_pm25);
      set('smog_threshold_pm4', cfg.smog_threshold_pm4);
      set('smog_threshold_pm10', cfg.smog_threshold_pm10);
      set('cloud_coverage_entity', cfg.cloud_coverage_entity);
      set('wind_speed_entity', cfg.wind_speed_entity);
      set('wind_direction_entity', cfg.wind_direction_entity);
      set('precipitation_entity', cfg.precipitation_entity);
      set('lightning_counter_entity', cfg.lightning_counter_entity);
      set('lightning_distance_entity', cfg.lightning_distance_entity);
      set('aurora_variant', cfg.aurora_variant || 'bands');
      set('aurora_chance_entity', cfg.aurora_chance_entity);
      set('aurora_visibility_alert_entity', cfg.aurora_visibility_alert_entity);
      set('aurora_visibility_min', cfg.aurora_visibility_min);
      set('k_index_entity', cfg.k_index_entity);
      set('enable_aurora_effect', cfg.enable_aurora_effect);
      set('debug_aurora_score', cfg.debug_aurora_score);
      set('cloud_speed_multiplier', cfg.cloud_speed_multiplier);
      set('wind_sway_factor', cfg.wind_sway_factor);
      set('rain_max_tilt_deg', cfg.rain_max_tilt_deg);
      set('rain_wind_min_kmh', cfg.rain_wind_min_kmh);
      set('enable_rain', cfg.enable_rain);
      set('enable_snow', cfg.enable_snow);
      set('enable_clouds', cfg.enable_clouds);
      set('enable_fog', cfg.enable_fog);
      set('enable_smog_effect', cfg.enable_smog_effect);
      set('enable_sun_glow', cfg.enable_sun_glow);
      set('enable_moon_glow', cfg.enable_moon_glow);
      set('enable_stars', cfg.enable_stars);
      set('enable_hail', cfg.enable_hail);
      set('enable_lightning_effect', cfg.enable_lightning_effect);
      set('enable_matrix', cfg.enable_matrix);
      set('enable_window_droplets', cfg.enable_window_droplets);
      set('stars_require_moon', cfg.stars_require_moon);
      ['moon', 'clouds', 'aurora', 'stars', 'droplets', 'sun', 'fog', 'smog'].forEach(k => set('opacity_' + k, cfg['opacity_' + k] ?? 100));
      set('drizzle_precipitation_max', cfg.drizzle_precipitation_max);
      ['rain', 'snow', 'clouds', 'fog', 'smog', 'hail', 'lightning', 'stars', 'matrix'].forEach(k => set('speed_factor_' + k, cfg['speed_factor_' + k]));
      set('development_mode', cfg.development_mode);
      set('debug_precipitation', cfg.debug_precipitation);
      set('debug_wind_speed', cfg.debug_wind_speed);
      set('debug_wind_direction', cfg.debug_wind_direction);
      set('debug_lightning_distance', cfg.debug_lightning_distance);
      set('debug_lightning_counter', cfg.debug_lightning_counter);
      set('debug_cloud_coverage', cfg.debug_cloud_coverage);
      set('mobile_limit_dpr', cfg.mobile_limit_dpr);
      set('mobile_reduce_particles', cfg.mobile_reduce_particles);
      set('mobile_snowy2_light', cfg.mobile_snowy2_light);
      set('mobile_smog_simple', cfg.mobile_smog_simple);
      set('mobile_30fps', cfg.mobile_30fps);
      set('gaming_matrix_only', cfg.gaming_matrix_only);
      set('snowy_variant', cfg.snowy_variant || 'snowy2');
      set('theme_mode', cfg.theme_mode || '');
      set('spatial_mode', cfg.spatial_mode || 'foreground');
      const testVal = (cfg.test_effect || 'Use Real Weather');
      root.querySelectorAll('input[name="test_effect"]').forEach(inp => { inp.checked = inp.value === testVal; });
    }

    _render() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: 'open' });
      }
      const cfg = this._config || DEFAULT_OVERLAY_CONFIG;
      const hass = this._hass;
      const effects = [
        'Use Real Weather',
        'rainy',
        'pouring',
        'cloudy',
        'partlycloudy',
        'fog',
        'lightning',
        'lightning-rainy',
        'snowy',          // actual variant (snowy / snowy2) is chosen via Snow variant setting
        'snowy-rainy',
        'clear-night',
        'sunny',
        'hail'
      ];
      const weatherOpts = getEntityOptions(hass, ['weather'], cfg.weather_entity);
      const sunOpts = getEntityOptions(hass, ['sun'], cfg.sun_entity);
      const sensorOpts = (val) => getEntityOptions(hass, ['sensor'], val);
      const gamingModeOpts = getEntityOptions(hass, ['input_boolean', 'binary_sensor'], cfg.gaming_mode_entity);
      this.shadowRoot.innerHTML = `
        <style>
          :host { display: block; }
          .editor { padding: 16px; max-width: 560px; }
          ha-expansion-panel { margin-bottom: 8px; --expansion-panel-content-padding: 12px 16px; }
          ha-expansion-panel .content { padding: 12px 16px; }
          .section { margin-bottom: 16px; }
          .section-title { font-size: 0.9em; font-weight: 600; margin-bottom: 10px; color: var(--primary-text-color); }
          .form-row { margin-bottom: 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
          .form-row label { font-size: 14px; color: var(--secondary-text-color); min-width: 140px; }
          .entity-select, input[type="text"], input[type="number"], select {
            min-width: 220px; max-width: 100%;
            padding: 8px 12px;
            border-radius: var(--mdc-shape-small, 8px);
            border: 1px solid var(--divider-color, rgba(0,0,0,0.12));
            background: var(--ha-card-background, var(--card-background-color));
            color: var(--primary-text-color);
            font-size: 14px;
            font-family: var(--mdc-typography-font-family, Roboto, sans-serif);
          }
          .entity-select:focus, input:focus, select:focus { outline: none; border-color: var(--primary-color); }
          input[type="number"] { min-width: 72px; width: 72px; }
          .radio-group { display: flex; flex-wrap: wrap; gap: 12px; }
          .radio-group label { min-width: auto; cursor: pointer; }
          input[type="checkbox"] { cursor: pointer; width: 18px; height: 18px; accent-color: var(--primary-color); }
        </style>
        <div class="editor">
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:cog"></ha-icon> General</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">General</div>
            <div class="form-row">
              <label><input type="checkbox" id="enabled" ${cfg.enabled ? 'checked' : ''}> Enable overlay</label>
            </div>
            <div class="form-row">
              <label>Weather entity</label>
              <input id="weather_entity" type="text" class="entity-select" list="weather_entity_list" value="${cfg.weather_entity || ''}" placeholder="e.g. weather.openweathermap">
              <datalist id="weather_entity_list">
                ${weatherOpts.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Sun entity</label>
              <input id="sun_entity" type="text" class="entity-select" list="sun_entity_list" value="${cfg.sun_entity || ''}" placeholder="sun.sun">
              <datalist id="sun_entity_list">
                ${sunOpts.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:weather-night"></ha-icon> Moon &amp; UV</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Moon &amp; UV</div>
            <div class="form-row">
              <label>Moon phase</label>
              <input id="moon_phase_entity" type="text" class="entity-select" list="moon_phase_entity_list" value="${cfg.moon_phase_entity || ''}" placeholder="sensor.moon_phase">
              <datalist id="moon_phase_entity_list">
                ${sensorOpts(cfg.moon_phase_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>UV index</label>
              <input id="uv_index_entity" type="text" class="entity-select" list="uv_index_entity_list" value="${cfg.uv_index_entity || ''}" placeholder="sensor.uv_index">
              <datalist id="uv_index_entity_list">
                ${sensorOpts(cfg.uv_index_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Moon position (single)</label>
              <input id="moon_position_entity" type="text" class="entity-select" list="moon_position_entity_list" value="${cfg.moon_position_entity || ''}" placeholder="sensor.moon_position">
              <datalist id="moon_position_entity_list">
                ${sensorOpts(cfg.moon_position_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row"><label>Lunar Phase (3 sensors)</label></div>
            <div class="form-row">
              <label>Azimuth</label>
              <input id="moon_azimuth_entity" type="text" class="entity-select" list="moon_azimuth_entity_list" value="${cfg.moon_azimuth_entity || ''}" placeholder="sensor.moon_azimuth">
              <datalist id="moon_azimuth_entity_list">
                ${sensorOpts(cfg.moon_azimuth_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Altitude</label>
              <input id="moon_altitude_entity" type="text" class="entity-select" list="moon_altitude_entity_list" value="${cfg.moon_altitude_entity || ''}" placeholder="sensor.moon_altitude">
              <datalist id="moon_altitude_entity_list">
                ${sensorOpts(cfg.moon_altitude_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Distance</label>
              <input id="moon_distance_entity" type="text" class="entity-select" list="moon_distance_entity_list" value="${cfg.moon_distance_entity || ''}" placeholder="sensor.moon_distance">
              <datalist id="moon_distance_entity_list">
                ${sensorOpts(cfg.moon_distance_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:weather-windy"></ha-icon> Wind, clouds, precipitation</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Wind, clouds, precipitation</div>
            <div class="form-row">
              <label>Wind speed</label>
              <input id="wind_speed_entity" type="text" class="entity-select" list="wind_speed_entity_list" value="${cfg.wind_speed_entity || ''}" placeholder="sensor.wind_speed">
              <datalist id="wind_speed_entity_list">
                ${sensorOpts(cfg.wind_speed_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Wind direction</label>
              <input id="wind_direction_entity" type="text" class="entity-select" list="wind_direction_entity_list" value="${cfg.wind_direction_entity || ''}" placeholder="sensor.wind_direction">
              <datalist id="wind_direction_entity_list">
                ${sensorOpts(cfg.wind_direction_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Cloud coverage</label>
              <input id="cloud_coverage_entity" type="text" class="entity-select" list="cloud_coverage_entity_list" value="${cfg.cloud_coverage_entity || ''}" placeholder="sensor.cloud_coverage">
              <datalist id="cloud_coverage_entity_list">
                ${sensorOpts(cfg.cloud_coverage_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Precipitation</label>
              <input id="precipitation_entity" type="text" class="entity-select" list="precipitation_entity_list" value="${cfg.precipitation_entity || ''}" placeholder="sensor.precipitation">
              <datalist id="precipitation_entity_list">
                ${sensorOpts(cfg.precipitation_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Cloud speed multiplier</label>
              <input type="number" id="cloud_speed_multiplier" value="${cfg.cloud_speed_multiplier ?? 1}" min="0.1" max="3" step="0.1" style="width:72px">
            </div>
            <div class="form-row">
              <label>Drizzle threshold (mm)</label>
              <input type="number" id="drizzle_precipitation_max" value="${cfg.drizzle_precipitation_max ?? 2.5}" min="0" max="20" step="0.5" style="width:72px" title="Precipitation ≤ this = drizzle (light rain); above = normal rain">
            </div>
            <div class="form-row">
              <label>Wind sway factor</label>
              <input type="number" id="wind_sway_factor" value="${cfg.wind_sway_factor ?? 0.7}" min="0" max="2" step="0.1" style="width:72px" title="How strongly wind bends rain/snow (0 = off, 0.7 = default)">
            </div>
            <div class="form-row">
              <label>Rain max tilt (°)</label>
              <input type="number" id="rain_max_tilt_deg" value="${cfg.rain_max_tilt_deg ?? 30}" min="0" max="60" step="5" style="width:72px" title="Max rain/snow tilt from wind (default 30)">
              <label>Rain wind min (km/h)</label>
              <input type="number" id="rain_wind_min_kmh" value="${cfg.rain_wind_min_kmh ?? 3}" min="0" max="20" step="1" style="width:72px" title="Min wind speed to tilt rain (default 3)">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:speedometer"></ha-icon> Effect speed factors (1 = default, 0.1–3)</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Effect speed factors (1 = default, 0.1–3)</div>
            <div class="form-row" style="flex-wrap:wrap;gap:8px 16px;">
              <label>Rain</label><input type="number" id="speed_factor_rain" value="${cfg.speed_factor_rain ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Snow</label><input type="number" id="speed_factor_snow" value="${cfg.speed_factor_snow ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Clouds</label><input type="number" id="speed_factor_clouds" value="${cfg.speed_factor_clouds ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Fog</label><input type="number" id="speed_factor_fog" value="${cfg.speed_factor_fog ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Smog</label><input type="number" id="speed_factor_smog" value="${cfg.speed_factor_smog ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Hail</label><input type="number" id="speed_factor_hail" value="${cfg.speed_factor_hail ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Lightning</label><input type="number" id="speed_factor_lightning" value="${cfg.speed_factor_lightning ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Stars</label><input type="number" id="speed_factor_stars" value="${cfg.speed_factor_stars ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
              <label>Matrix</label><input type="number" id="speed_factor_matrix" value="${cfg.speed_factor_matrix ?? 1}" min="0.1" max="3" step="0.1" style="width:52px">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:tune"></ha-icon> Effects enabled</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Toggle individual effects (disable heavy ones if needed)</div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_rain" ${cfg.enable_rain !== false ? 'checked' : ''}> Rain (rainy / pouring / lightning-rainy)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_snow" ${cfg.enable_snow !== false ? 'checked' : ''}> Snow (snowy / snowy2 / snowy-rainy)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_clouds" ${cfg.enable_clouds !== false ? 'checked' : ''}> Clouds</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_fog" ${cfg.enable_fog !== false ? 'checked' : ''}> Fog</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_smog_effect" ${cfg.enable_smog_effect !== false ? 'checked' : ''}> Smog alert fog</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_sun_glow" ${cfg.enable_sun_glow !== false ? 'checked' : ''}> Sun glow / beams</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_moon_glow" ${cfg.enable_moon_glow !== false ? 'checked' : ''}> Moon glow</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_stars" ${cfg.enable_stars !== false ? 'checked' : ''}> Stars</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="stars_require_moon" ${cfg.stars_require_moon ? 'checked' : ''}> Stars require moon glow</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_hail" ${cfg.enable_hail !== false ? 'checked' : ''}> Hail (meteors)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_lightning_effect" ${cfg.enable_lightning_effect !== false ? 'checked' : ''}> Lightning flashes</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_matrix" ${cfg.enable_matrix !== false ? 'checked' : ''}> Matrix / gaming overlay</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_window_droplets" ${cfg.enable_window_droplets !== false ? 'checked' : ''}> Window droplets (side rain on glass)</label>
            </div>
            <div class="section-title" style="margin-top:12px">Effect opacity (0–100, default 100; Aurora 0–200 for boost)</div>
            <div class="form-row">
              <label>Moon</label><input type="number" id="opacity_moon" value="${cfg.opacity_moon ?? 100}" min="0" max="100" style="width:52px" title="Moon glow opacity (0–100%)">
              <label>Clouds</label><input type="number" id="opacity_clouds" value="${cfg.opacity_clouds ?? 100}" min="0" max="100" style="width:52px" title="Cloud opacity (0–100%)">
              <label>Aurora</label><input type="number" id="opacity_aurora" value="${cfg.opacity_aurora ?? 100}" min="0" max="200" style="width:52px" title="Aurora intensity (0–200%, 100=default, 150–200=boost)">
              <label>Stars</label><input type="number" id="opacity_stars" value="${cfg.opacity_stars ?? 100}" min="0" max="100" style="width:52px" title="Stars opacity (0–100%)">
              <label>Droplets</label><input type="number" id="opacity_droplets" value="${cfg.opacity_droplets ?? 100}" min="0" max="100" style="width:52px">
              <label>Sun</label><input type="number" id="opacity_sun" value="${cfg.opacity_sun ?? 100}" min="0" max="100" style="width:52px">
              <label>Fog</label><input type="number" id="opacity_fog" value="${cfg.opacity_fog ?? 100}" min="0" max="100" style="width:52px">
              <label>Smog</label><input type="number" id="opacity_smog" value="${cfg.opacity_smog ?? 100}" min="0" max="100" style="width:52px">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:target"></ha-icon> Spatial awareness</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Spatial awareness (where effects are drawn)</div>
            <div class="form-row">
              <label>Theme</label>
              <select id="theme_mode" title="Override light/dark for snow/effects; null = auto from HA theme">
                <option value="" ${!cfg.theme_mode ? 'selected' : ''}>Auto (from HA theme)</option>
                <option value="light" ${cfg.theme_mode === 'light' ? 'selected' : ''}>Light</option>
                <option value="dark" ${cfg.theme_mode === 'dark' ? 'selected' : ''}>Dark</option>
              </select>
            </div>
            <div class="form-row">
              <label>Mode</label>
              <select id="spatial_mode" class="entity-select">
                <option value="background" ${cfg.spatial_mode === 'background' ? 'selected' : ''}>Background (behind all cards, z-index -1)</option>
                <option value="bubble" ${cfg.spatial_mode === 'bubble' ? 'selected' : ''}>Bubble aware (under Bubble card backdrops, z-index 3)</option>
                <option value="gradient-mask" ${cfg.spatial_mode === 'gradient-mask' ? 'selected' : ''}>Gradient mask (effects around card edges)</option>
                <option value="foreground" ${!cfg.spatial_mode || cfg.spatial_mode === 'foreground' ? 'selected' : ''}>Foreground (current behavior, above cards)</option>
              </select>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:snowflake"></ha-icon> Snow variant</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Snow variant</div>
            <div class="form-row">
              <label>Preferred snow style</label>
              <select id="snowy_variant" class="entity-select">
                <option value="snowy" ${cfg.snowy_variant === 'snowy' ? 'selected' : ''}>Classic snowy (particles)</option>
                <option value="snowy2" ${!cfg.snowy_variant || cfg.snowy_variant === 'snowy2' ? 'selected' : ''}>Snowy2 (layered, lighter on mobile)</option>
              </select>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:northern-lights"></ha-icon> Aurora (Northern Lights)</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Aurora effect on clear nights – header bands when visibility score &gt; threshold</div>
            <div class="form-row">
              <label><input type="checkbox" id="enable_aurora_effect" ${cfg.enable_aurora_effect !== false ? 'checked' : ''}> Enable aurora effect</label>
            </div>
            <div class="form-row">
              <label>Style</label>
              <select id="aurora_variant" title="Bands: footer-style header; Northern Gradients: soft flowing curtains">
                <option value="bands" ${cfg.aurora_variant === 'bands' || !cfg.aurora_variant ? 'selected' : ''}>Bands (header stripes)</option>
                <option value="northern-gradients" ${cfg.aurora_variant === 'northern-gradients' ? 'selected' : ''}>Bubble Northern Gradients (soft curtains)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Aurora chance entity (%)</label>
              <input id="aurora_chance_entity" type="text" class="entity-select" list="aurora_chance_entity_list" value="${cfg.aurora_chance_entity || ''}" placeholder="sensor.aurora_60_1">
              <datalist id="aurora_chance_entity_list">
                ${sensorOpts(cfg.aurora_chance_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <span class="help">NOAA Aurora Forecast 0–100</span>
            </div>
            <div class="form-row">
              <label>Aurora alert (binary)</label>
              <input id="aurora_visibility_alert_entity" type="text" class="entity-select" list="aurora_visibility_alert_entity_list" value="${cfg.aurora_visibility_alert_entity || ''}" placeholder="binary_sensor.aurora_visibility_alert">
              <datalist id="aurora_visibility_alert_entity_list">
                ${getEntityOptions(hass, ['binary_sensor'], cfg.aurora_visibility_alert_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <span class="help">Optional shortcut when ON</span>
            </div>
            <div class="form-row">
              <label>K-index (optional)</label>
              <input id="k_index_entity" type="text" class="entity-select" list="k_index_entity_list" value="${cfg.k_index_entity || ''}" placeholder="sensor.planetary_k_index">
              <datalist id="k_index_entity_list">
                ${sensorOpts(cfg.k_index_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <span class="help">Planetary Kp from NOAA Space Weather</span>
            </div>
            <div class="form-row">
              <label>Min visibility score (0–1)</label>
              <input type="number" id="aurora_visibility_min" value="${cfg.aurora_visibility_min ?? 0.15}" min="0" max="1" step="0.05" style="width:72px" title="Minimum score to show effect (default 0.15)">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:blur"></ha-icon> Smog (PM µg/m³ – fog above threshold)</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Smog (PM µg/m³ – fog when above threshold). Default thresholds: WHO / EPA / EU</div>
            <div class="form-row">
              <label>PM2.5</label>
              <input id="pm25_entity" type="text" class="entity-select" list="pm25_entity_list" value="${cfg.pm25_entity || ''}" placeholder="sensor.pm25">
              <datalist id="pm25_entity_list">
                ${sensorOpts(cfg.pm25_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm25" value="${cfg.smog_threshold_pm25 ?? 35}" min="1" max="500" style="width:60px" title="Default 35 (EPA: unhealthy for sensitive groups)">
            </div>
            <div class="form-row">
              <label>PM4</label>
              <input id="pm4_entity" type="text" class="entity-select" list="pm4_entity_list" value="${cfg.pm4_entity || ''}" placeholder="sensor.pm4">
              <datalist id="pm4_entity_list">
                ${sensorOpts(cfg.pm4_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm4" value="${cfg.smog_threshold_pm4 ?? 50}" min="1" max="500" style="width:60px">
            </div>
            <div class="form-row">
              <label>PM10</label>
              <input id="pm10_entity" type="text" class="entity-select" list="pm10_entity_list" value="${cfg.pm10_entity || ''}" placeholder="sensor.pm10">
              <datalist id="pm10_entity_list">
                ${sensorOpts(cfg.pm10_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
              <label>Alert threshold (µg/m³)</label>
              <input type="number" id="smog_threshold_pm10" value="${cfg.smog_threshold_pm10 ?? 50}" min="1" max="500" style="width:60px" title="Default 50 (EU 24h limit / WHO guideline)">
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:flash"></ha-icon> Gaming &amp; Lightning</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Gaming &amp; Lightning</div>
            <div class="form-row">
              <label>Gaming mode</label>
              <input id="gaming_mode_entity" type="text" class="entity-select" list="gaming_mode_entity_list" value="${cfg.gaming_mode_entity || ''}" placeholder="input_boolean.gaming_mode">
              <datalist id="gaming_mode_entity_list">
                ${gamingModeOpts.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="gaming_matrix_only" ${cfg.gaming_matrix_only ? 'checked' : ''}> When Gaming ON: Matrix only (no weather background)</label>
            </div>
            <div class="form-row">
              <label>Lightning counter</label>
              <input id="lightning_counter_entity" type="text" class="entity-select" list="lightning_counter_entity_list" value="${cfg.lightning_counter_entity || ''}" placeholder="sensor.lightning_counter">
              <datalist id="lightning_counter_entity_list">
                ${sensorOpts(cfg.lightning_counter_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
            <div class="form-row">
              <label>Lightning distance</label>
              <input id="lightning_distance_entity" type="text" class="entity-select" list="lightning_distance_entity_list" value="${cfg.lightning_distance_entity || ''}" placeholder="sensor.lightning_distance">
              <datalist id="lightning_distance_entity_list">
                ${sensorOpts(cfg.lightning_distance_entity).map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('')}
              </datalist>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:cellphone"></ha-icon> Mobile</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Mobile</div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_limit_dpr" ${cfg.mobile_limit_dpr ? 'checked' : ''}> Limit canvas resolution on mobile (better performance)</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_reduce_particles" ${cfg.mobile_reduce_particles ? 'checked' : ''}> Fewer particles (rain/snow/fog) on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_snowy2_light" ${cfg.mobile_snowy2_light ? 'checked' : ''}> Lighter <code>snowy2</code> snow on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_smog_simple" ${cfg.mobile_smog_simple ? 'checked' : ''}> Simpler smog rendering on mobile</label>
            </div>
            <div class="form-row">
              <label><input type="checkbox" id="mobile_30fps" ${cfg.mobile_30fps ? 'checked' : ''}> Limit animation to ~30 FPS on mobile</label>
            </div>
          </div>
            </div>
          </ha-expansion-panel>
          <ha-expansion-panel outlined>
            <h4 slot="header"><ha-icon icon="mdi:test-tube"></ha-icon> Development mode</h4>
            <div class="content">
          <div class="section">
            <div class="section-title">Development mode</div>
            <div class="form-row">
              <label><input type="checkbox" id="development_mode" ${cfg.development_mode ? 'checked' : ''}> Override real weather for testing</label>
            </div>
            ${cfg.development_mode ? `
            <div class="form-row">
              <label>Test effect</label>
              <div class="radio-group">
                ${effects.map(eff => `
                  <label><input type="radio" name="test_effect" value="${escapeHtml(eff)}" ${cfg.test_effect === eff ? 'checked' : ''}> ${escapeHtml(eff)}</label>
                `).join('')}
              </div>
            </div>
            <div class="form-row" style="margin-top:10px;"><strong>Debug overrides</strong></div>
            <div class="form-row">
              <label>Precipitation</label>
              <select id="debug_precipitation">
                <option value="">Use sensors</option>
                <option value="light" ${cfg.debug_precipitation === 'light' ? 'selected' : ''}>Light (~1 mm/h)</option>
                <option value="medium" ${cfg.debug_precipitation === 'medium' ? 'selected' : ''}>Medium (~3 mm/h)</option>
                <option value="heavy" ${cfg.debug_precipitation === 'heavy' ? 'selected' : ''}>Heavy (~8 mm/h)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Wind speed</label>
              <select id="debug_wind_speed">
                <option value="">Use sensors</option>
                <option value="none" ${cfg.debug_wind_speed === 'none' ? 'selected' : ''}>None</option>
                <option value="light" ${cfg.debug_wind_speed === 'light' ? 'selected' : ''}>Light (~10 km/h)</option>
                <option value="medium" ${cfg.debug_wind_speed === 'medium' ? 'selected' : ''}>Medium (~25 km/h)</option>
                <option value="strong" ${cfg.debug_wind_speed === 'strong' ? 'selected' : ''}>Strong (~45 km/h)</option>
              </select>
            </div>
            <div class="form-row">
              <label>Wind direction</label>
              <select id="debug_wind_direction">
                <option value="">Use sensors</option>
                <option value="N" ${cfg.debug_wind_direction === 'N' ? 'selected' : ''}>N</option>
                <option value="NE" ${cfg.debug_wind_direction === 'NE' ? 'selected' : ''}>NE</option>
                <option value="E" ${cfg.debug_wind_direction === 'E' ? 'selected' : ''}>E</option>
                <option value="SE" ${cfg.debug_wind_direction === 'SE' ? 'selected' : ''}>SE</option>
                <option value="S" ${cfg.debug_wind_direction === 'S' ? 'selected' : ''}>S</option>
                <option value="SW" ${cfg.debug_wind_direction === 'SW' ? 'selected' : ''}>SW</option>
                <option value="W" ${cfg.debug_wind_direction === 'W' ? 'selected' : ''}>W</option>
                <option value="NW" ${cfg.debug_wind_direction === 'NW' ? 'selected' : ''}>NW</option>
              </select>
            </div>
            <div class="form-row">
              <label>Lightning distance (km)</label>
              <input type="number" id="debug_lightning_distance" value="${cfg.debug_lightning_distance ?? ''}" placeholder="override" min="0" max="500" step="0.5" style="width:80px">
              <label>Lightning counter</label>
              <input type="number" id="debug_lightning_counter" value="${cfg.debug_lightning_counter ?? ''}" placeholder="override" min="0" style="width:60px">
            </div>
            <div class="form-row">
              <label>Cloud coverage (%)</label>
              <input type="number" id="debug_cloud_coverage" value="${cfg.debug_cloud_coverage ?? ''}" placeholder="0-100" min="0" max="100" style="width:80px">
            </div>
            <div class="form-row">
              <label>Aurora visibility score (0–1)</label>
              <input type="number" id="debug_aurora_score" value="${cfg.debug_aurora_score ?? ''}" placeholder="force aurora" min="0" max="1" step="0.1" style="width:80px" title="Force aurora effect in dev mode">
            </div>
            ` : ''}
          </div>
            </div>
          </ha-expansion-panel>
        </div>
      `;
      this._attachListeners();
      if (this._hass) this._populateEntitySelects();
    }

    _attachListeners() {
      const root = this.shadowRoot;
      if (!root) return;
      const cfg = this._config || DEFAULT_OVERLAY_CONFIG;

      const update = () => {
        const newConfig = Object.assign({}, cfg, {
          enabled: root.getElementById('enabled').checked,
          weather_entity: root.getElementById('weather_entity').value || DEFAULT_OVERLAY_CONFIG.weather_entity,
          sun_entity: root.getElementById('sun_entity').value || DEFAULT_OVERLAY_CONFIG.sun_entity,
          moon_phase_entity: root.getElementById('moon_phase_entity').value || null,
          uv_index_entity: root.getElementById('uv_index_entity').value || null,
          moon_position_entity: root.getElementById('moon_position_entity').value || null,
          moon_azimuth_entity: root.getElementById('moon_azimuth_entity').value || null,
          moon_altitude_entity: root.getElementById('moon_altitude_entity').value || null,
          moon_distance_entity: root.getElementById('moon_distance_entity').value || null,
          gaming_mode_entity: root.getElementById('gaming_mode_entity').value || null,
          pm25_entity: root.getElementById('pm25_entity').value || null,
          pm4_entity: root.getElementById('pm4_entity').value || null,
          pm10_entity: root.getElementById('pm10_entity').value || null,
          smog_threshold_pm25: parseInt(root.getElementById('smog_threshold_pm25')?.value || '35', 10) || 35,
          smog_threshold_pm4: parseInt(root.getElementById('smog_threshold_pm4')?.value || '50', 10) || 50,
          smog_threshold_pm10: parseInt(root.getElementById('smog_threshold_pm10')?.value || '50', 10) || 50,
          cloud_coverage_entity: root.getElementById('cloud_coverage_entity')?.value || null,
          wind_speed_entity: root.getElementById('wind_speed_entity')?.value || null,
          wind_direction_entity: root.getElementById('wind_direction_entity')?.value || null,
          precipitation_entity: root.getElementById('precipitation_entity')?.value || null,
          lightning_counter_entity: root.getElementById('lightning_counter_entity')?.value || null,
          lightning_distance_entity: root.getElementById('lightning_distance_entity')?.value || null,
          debug_precipitation: root.getElementById('debug_precipitation')?.value || null,
          debug_wind_speed: root.getElementById('debug_wind_speed')?.value || null,
          debug_wind_direction: root.getElementById('debug_wind_direction')?.value || null,
          debug_lightning_distance: root.getElementById('debug_lightning_distance')?.value || null,
          debug_lightning_counter: root.getElementById('debug_lightning_counter')?.value || null,
          debug_cloud_coverage: root.getElementById('debug_cloud_coverage')?.value || null,
          debug_aurora_score: root.getElementById('debug_aurora_score')?.value || null,
          aurora_variant: root.getElementById('aurora_variant')?.value || 'bands',
          aurora_chance_entity: root.getElementById('aurora_chance_entity')?.value || null,
          aurora_visibility_alert_entity: root.getElementById('aurora_visibility_alert_entity')?.value || null,
          aurora_visibility_min: parseFloat(root.getElementById('aurora_visibility_min')?.value || '0.15') || 0.15,
          k_index_entity: root.getElementById('k_index_entity')?.value || null,
          enable_aurora_effect: !!root.getElementById('enable_aurora_effect')?.checked,
          cloud_speed_multiplier: parseFloat(root.getElementById('cloud_speed_multiplier')?.value || '1') || 1,
          drizzle_precipitation_max: parseFloat(root.getElementById('drizzle_precipitation_max')?.value || '2.5') || 2.5,
          wind_sway_factor: parseFloat(root.getElementById('wind_sway_factor')?.value || '0.7') || 0.7,
          rain_max_tilt_deg: parseFloat(root.getElementById('rain_max_tilt_deg')?.value || '30') || 30,
          rain_wind_min_kmh: parseFloat(root.getElementById('rain_wind_min_kmh')?.value || '3') || 3,
          speed_factor_rain: parseFloat(root.getElementById('speed_factor_rain')?.value || '1') || 1,
          speed_factor_snow: parseFloat(root.getElementById('speed_factor_snow')?.value || '1') || 1,
          speed_factor_clouds: parseFloat(root.getElementById('speed_factor_clouds')?.value || '1') || 1,
          speed_factor_fog: parseFloat(root.getElementById('speed_factor_fog')?.value || '1') || 1,
          speed_factor_smog: parseFloat(root.getElementById('speed_factor_smog')?.value || '1') || 1,
          speed_factor_hail: parseFloat(root.getElementById('speed_factor_hail')?.value || '1') || 1,
          speed_factor_lightning: parseFloat(root.getElementById('speed_factor_lightning')?.value || '1') || 1,
          speed_factor_stars: parseFloat(root.getElementById('speed_factor_stars')?.value || '1') || 1,
          speed_factor_matrix: parseFloat(root.getElementById('speed_factor_matrix')?.value || '1') || 1,
          enable_rain: !!root.getElementById('enable_rain')?.checked,
          enable_snow: !!root.getElementById('enable_snow')?.checked,
          enable_clouds: !!root.getElementById('enable_clouds')?.checked,
          enable_fog: !!root.getElementById('enable_fog')?.checked,
          enable_smog_effect: !!root.getElementById('enable_smog_effect')?.checked,
          enable_sun_glow: !!root.getElementById('enable_sun_glow')?.checked,
          enable_moon_glow: !!root.getElementById('enable_moon_glow')?.checked,
          enable_stars: !!root.getElementById('enable_stars')?.checked,
          enable_hail: !!root.getElementById('enable_hail')?.checked,
          enable_lightning_effect: !!root.getElementById('enable_lightning_effect')?.checked,
          enable_matrix: !!root.getElementById('enable_matrix')?.checked,
          enable_window_droplets: !!root.getElementById('enable_window_droplets')?.checked,
          stars_require_moon: !!root.getElementById('stars_require_moon')?.checked,
          opacity_moon: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_moon')?.value || '100') || 100)),
          opacity_clouds: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_clouds')?.value || '100') || 100)),
          opacity_aurora: Math.max(0, Math.min(200, parseFloat(root.getElementById('opacity_aurora')?.value || '100') || 100)),
          opacity_stars: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_stars')?.value || '100') || 100)),
          opacity_droplets: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_droplets')?.value || '100') || 100)),
          opacity_sun: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_sun')?.value || '100') || 100)),
          opacity_fog: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_fog')?.value || '100') || 100)),
          opacity_smog: Math.max(0, Math.min(100, parseFloat(root.getElementById('opacity_smog')?.value || '100') || 100)),
          mobile_limit_dpr: !!root.getElementById('mobile_limit_dpr')?.checked,
          mobile_reduce_particles: !!root.getElementById('mobile_reduce_particles')?.checked,
          mobile_snowy2_light: !!root.getElementById('mobile_snowy2_light')?.checked,
          mobile_smog_simple: !!root.getElementById('mobile_smog_simple')?.checked,
          mobile_30fps: !!root.getElementById('mobile_30fps')?.checked,
          gaming_matrix_only: !!root.getElementById('gaming_matrix_only')?.checked,
          snowy_variant: root.getElementById('snowy_variant')?.value || 'snowy2',
          theme_mode: root.getElementById('theme_mode')?.value || null,
          spatial_mode: root.getElementById('spatial_mode')?.value || 'foreground',
          development_mode: root.getElementById('development_mode').checked,
          test_effect: (root.querySelector('input[name="test_effect"]:checked') || {}).value || 'Use Real Weather'
        });
        this._config = newConfig;
        window.ForkUWeatherAwareConfig = newConfig;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: newConfig }
        }));
      };

      // Use 'change' for text inputs to avoid cursor jumping (config-changed triggers re-render)
      const textIds = ['weather_entity', 'sun_entity', 'theme_mode', 'moon_phase_entity', 'uv_index_entity', 'moon_position_entity', 'moon_azimuth_entity', 'moon_altitude_entity', 'moon_distance_entity', 'gaming_mode_entity', 'pm25_entity', 'pm4_entity', 'pm10_entity', 'smog_threshold_pm25', 'smog_threshold_pm4', 'smog_threshold_pm10', 'cloud_coverage_entity', 'wind_speed_entity', 'wind_direction_entity', 'precipitation_entity', 'lightning_counter_entity', 'lightning_distance_entity', 'aurora_variant', 'aurora_chance_entity', 'aurora_visibility_alert_entity', 'aurora_visibility_min', 'k_index_entity', 'debug_precipitation', 'debug_wind_speed', 'debug_wind_direction', 'debug_lightning_distance', 'debug_lightning_counter', 'debug_cloud_coverage', 'debug_aurora_score', 'cloud_speed_multiplier', 'drizzle_precipitation_max', 'wind_sway_factor', 'rain_max_tilt_deg', 'rain_wind_min_kmh', 'speed_factor_rain', 'speed_factor_snow', 'speed_factor_clouds', 'speed_factor_fog', 'speed_factor_smog', 'speed_factor_hail', 'speed_factor_lightning', 'speed_factor_stars', 'speed_factor_matrix', 'snowy_variant', 'spatial_mode', 'opacity_moon', 'opacity_clouds', 'opacity_aurora', 'opacity_stars', 'opacity_droplets', 'opacity_sun', 'opacity_fog', 'opacity_smog'];
      textIds.forEach(id => {
        const el = root.getElementById(id);
        if (el) el.addEventListener('change', update);
      });
      // Checkboxes fire 'change' on toggle
      ['enabled', 'development_mode', 'mobile_limit_dpr', 'mobile_reduce_particles', 'mobile_snowy2_light', 'mobile_smog_simple', 'mobile_30fps', 'gaming_matrix_only', 'enable_rain', 'enable_snow', 'enable_clouds', 'enable_fog', 'enable_smog_effect', 'enable_sun_glow', 'enable_moon_glow', 'enable_stars', 'enable_hail', 'enable_lightning_effect', 'enable_matrix', 'enable_window_droplets', 'stars_require_moon', 'enable_aurora_effect'].forEach(id => {
        const el = root.getElementById(id);
        if (el) el.addEventListener('change', update);
      });
      root.querySelectorAll('input[name="test_effect"]').forEach(input => {
        input.addEventListener('change', update);
      });
    }
  }

  if (!customElements.get('fork-u-weather-aware-card')) {
    customElements.define('fork-u-weather-aware-card', ForkUWeatherAwareCard);
  }
  if (!customElements.get('fork-u-weather-aware-editor')) {
    customElements.define('fork-u-weather-aware-editor', ForkUWeatherAwareEditor);
  }
})();
