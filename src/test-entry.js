/**
 * Test entry - platforma testowa efektów pogodowych
 * Uruchom: npm run dev (vite dev server)
 */
import './config.js';
import './weather-overlay-three.js';

const EFFECTS = [
  { id: 'stars', label: 'Clear night', testEffect: 'stars' },
  { id: 'sun_beams', label: 'Sunny', testEffect: 'sunny' },
  { id: 'clouds', label: 'Cloudy', testEffect: 'cloudy' },
  { id: 'rain', label: 'Rain', testEffect: 'rainy' },
  { id: 'lightning', label: 'Lightning', testEffect: 'lightning' },
  { id: 'rain_storm', label: 'Lightning-rainy', testEffect: 'lightning-rainy' },
  { id: 'rain_storm', label: 'Storm', testEffect: 'pouring' },
  { id: 'rain_drizzle', label: 'Drizzle', testEffect: 'rainy-drizzle' },
  { id: 'snow_gentle', label: 'Snow', testEffect: 'snowy' },
  { id: 'snow_storm', label: 'Snow storm', testEffect: 'snowy-rainy' },
  { id: 'fog_light', label: 'Fog', testEffect: 'fog' },
];

const SPEED_FACTOR_CONTROLS = [
  { id: 'speed-factor-rain', key: 'speed_factor_rain' },
  { id: 'speed-factor-snow', key: 'speed_factor_snow' },
  { id: 'speed-factor-clouds', key: 'speed_factor_clouds' },
  { id: 'speed-factor-fog', key: 'speed_factor_fog' },
  { id: 'speed-factor-smog', key: 'speed_factor_smog' },
  { id: 'speed-factor-hail', key: 'speed_factor_hail' },
  { id: 'speed-factor-lightning', key: 'speed_factor_lightning' },
  { id: 'speed-factor-stars', key: 'speed_factor_stars' },
  { id: 'speed-factor-matrix', key: 'speed_factor_matrix' },
];

const SCENARIOS = {
  'near-storm': {
    effect: 'pouring',
    controls: {
      'debug-precipitation': 'heavy',
      'debug-wind-speed': 'strong',
      'debug-wind-direction': 'W',
      'debug-lightning-distance': 4,
      'speed-factor-rain': 1.8,
      'speed-factor-lightning': 1.0,
    },
    strikeIncrement: 1,
  },
  'far-storm': {
    effect: 'pouring',
    controls: {
      'debug-precipitation': 'heavy',
      'debug-wind-speed': 'medium',
      'debug-wind-direction': 'SW',
      'debug-lightning-distance': 25,
      'speed-factor-rain': 1.4,
      'speed-factor-lightning': 1.0,
    },
    strikeIncrement: 1,
  },
  blizzard: {
    effect: 'snowy-rainy',
    controls: {
      'debug-precipitation': 'heavy',
      'debug-wind-speed': 'strong',
      'debug-wind-direction': 'NW',
      'speed-factor-snow': 2.2,
      'speed-factor-rain': 1.4,
      'speed-factor-fog': 1.2,
    },
  },
  'fast-fog': {
    effect: 'fog',
    controls: {
      'debug-wind-speed': 'light',
      'debug-wind-direction': 'E',
      'speed-factor-fog': 2.5,
      'speed-factor-clouds': 1.8,
      'speed-factor-smog': 1.6,
    },
  },
  'reset-speeds': {
    controls: {
      'speed-factor-rain': 1,
      'speed-factor-snow': 1,
      'speed-factor-clouds': 1,
      'speed-factor-fog': 1,
      'speed-factor-smog': 1,
      'speed-factor-hail': 1,
      'speed-factor-lightning': 1,
      'speed-factor-stars': 1,
      'speed-factor-matrix': 1,
    },
  },
};

function getCfg() {
  return window.ForkUWeatherAwareConfig || {};
}

function setCfg(updates) {
  Object.assign(window.ForkUWeatherAwareConfig || {}, updates);
}

function showToast(msg) {
  const el = document.getElementById('toast');
  if (el) {
    el.textContent = msg;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
  }
}

function takeScreenshot() {
  const container = document.getElementById('fork-u-weather-overlay');
  if (!container) {
    showToast('Overlay nie znaleziony');
    return;
  }
  const canvas = container.querySelector('canvas');
  if (!canvas) {
    showToast('Canvas nie znaleziony');
    return;
  }
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `weather-effect-${getCfg().test_effect || 'unknown'}-${Date.now()}.png`;
    a.click();
    showToast('Zrzut zapisany');
  } catch (e) {
    showToast('Błąd: ' + (e.message || 'nie można wykonać zrzutu'));
  }
}

function applyEffect(testEffect) {
  setCfg({ test_effect: testEffect });
  document.querySelectorAll('#effect-btns .btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.effect === testEffect);
  });
  forceWeatherUpdate();
}

function forceWeatherUpdate() {
  window.dispatchEvent(new Event('fork-u-weather-force-update'));
}

function clampSpeedFactor(value, fallback = 1) {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) return fallback;
  return Math.max(0.1, Math.min(3, parsed));
}

function setControlValue(id, value) {
  const el = document.getElementById(id);
  if (!el || value == null) return;
  el.value = String(value);
}

function updateDebugFromControls() {
  const precip = document.getElementById('debug-precipitation');
  const windSpeed = document.getElementById('debug-wind-speed');
  const windDirection = document.getElementById('debug-wind-direction');
  const lightningDistance = document.getElementById('debug-lightning-distance');
  const lightningCounter = document.getElementById('debug-lightning-counter');
  const aurora = document.getElementById('debug-aurora');
  const variant = document.getElementById('aurora-variant');
  const updates = {};
  if (precip?.value) {
    const mmMap = { light: 1, medium: 5, heavy: 15 };
    updates.debug_precipitation = precip.value;
    updates.debug_precipitation_mm = mmMap[precip.value] ?? 5;
  } else {
    updates.debug_precipitation = null;
    updates.debug_precipitation_mm = 0;
  }
  updates.debug_wind_speed = windSpeed?.value || null;
  updates.debug_wind_direction = windDirection?.value || null;

  const lightningDistanceValue = parseFloat(lightningDistance?.value || '');
  updates.debug_lightning_distance = !isNaN(lightningDistanceValue) ? lightningDistanceValue : null;

  const lightningCounterValue = parseInt(lightningCounter?.value || '', 10);
  updates.debug_lightning_counter = !isNaN(lightningCounterValue) ? lightningCounterValue : null;

  if (aurora?.value !== '' && !isNaN(parseFloat(aurora.value))) {
    updates.debug_aurora_score = parseFloat(aurora.value);
  } else {
    updates.debug_aurora_score = null;
  }

  SPEED_FACTOR_CONTROLS.forEach(({ id, key }) => {
    const el = document.getElementById(id);
    updates[key] = clampSpeedFactor(el?.value, 1);
  });

  if (variant?.value) updates.aurora_variant = variant.value;
  setCfg(updates);
}

function applyScenario(scenarioId) {
  const scenario = SCENARIOS[scenarioId];
  if (!scenario) return;
  if (scenario.effect) {
    applyEffect(scenario.effect);
  }
  Object.entries(scenario.controls || {}).forEach(([id, value]) => {
    setControlValue(id, value);
  });
  if (scenario.strikeIncrement) {
    const counterEl = document.getElementById('debug-lightning-counter');
    const current = parseInt(counterEl?.value || '0', 10) || 0;
    if (counterEl) counterEl.value = String(current + scenario.strikeIncrement);
  }
  updateDebugFromControls();
  forceWeatherUpdate();
  showToast(`Scenario: ${scenarioId}`);
}

function init() {
  const btns = document.getElementById('effect-btns');
  if (btns) {
    const seen = new Set();
    EFFECTS.forEach(({ id, label, testEffect }) => {
      if (seen.has(testEffect)) return;
      seen.add(testEffect);
      const btn = document.createElement('button');
      btn.className = 'btn' + (getCfg().test_effect === testEffect ? ' active' : '');
      btn.textContent = label;
      btn.dataset.effect = testEffect;
      btn.onclick = () => applyEffect(testEffect);
      btns.appendChild(btn);
    });
  }

  const cfg = getCfg();
  setControlValue('debug-precipitation', cfg.debug_precipitation || '');
  setControlValue('debug-wind-speed', cfg.debug_wind_speed || '');
  setControlValue('debug-wind-direction', cfg.debug_wind_direction || '');
  setControlValue('debug-lightning-distance', cfg.debug_lightning_distance ?? '');
  setControlValue('debug-lightning-counter', cfg.debug_lightning_counter ?? '');
  setControlValue('debug-aurora', cfg.debug_aurora_score ?? '');
  setControlValue('aurora-variant', cfg.aurora_variant || 'bands');
  SPEED_FACTOR_CONTROLS.forEach(({ id, key }) => {
    setControlValue(id, clampSpeedFactor(cfg[key], 1));
  });

  const refreshOnChange = () => {
    updateDebugFromControls();
    forceWeatherUpdate();
  };

  document.getElementById('debug-precipitation')?.addEventListener('change', () => {
    refreshOnChange();
  });
  document.getElementById('debug-wind-speed')?.addEventListener('change', refreshOnChange);
  document.getElementById('debug-wind-direction')?.addEventListener('change', refreshOnChange);
  document.getElementById('debug-lightning-distance')?.addEventListener('input', refreshOnChange);
  document.getElementById('debug-lightning-counter')?.addEventListener('input', refreshOnChange);
  document.getElementById('debug-aurora')?.addEventListener('input', refreshOnChange);
  document.getElementById('aurora-variant')?.addEventListener('change', refreshOnChange);
  SPEED_FACTOR_CONTROLS.forEach(({ id }) => {
    document.getElementById(id)?.addEventListener('input', refreshOnChange);
  });

  document.getElementById('strike-plus-btn')?.addEventListener('click', () => {
    const counterEl = document.getElementById('debug-lightning-counter');
    const current = parseInt(counterEl?.value || '0', 10) || 0;
    if (counterEl) counterEl.value = String(current + 1);
    refreshOnChange();
  });

  document.querySelectorAll('#scenario-btns .scenario-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const scenarioId = btn.getAttribute('data-scenario');
      if (scenarioId) applyScenario(scenarioId);
    });
  });

  document.getElementById('screenshot-btn')?.addEventListener('click', takeScreenshot);

  updateDebugFromControls();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
