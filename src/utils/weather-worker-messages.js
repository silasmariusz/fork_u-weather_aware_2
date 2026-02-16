/**
 * Weather Worker Messages - main/worker communication
 */

export const WeatherEffectType = {
  NONE: 'none',
  RAIN: 'rain',
  RAIN_STORM: 'rain_storm',
  RAIN_DRIZZLE: 'rain_drizzle',
  HAIL: 'hail',
  LIGHTNING: 'lightning',
  SNOW_GENTLE: 'snow_gentle',
  SNOW_STORM: 'snow_storm',
  FOG_LIGHT: 'fog_light',
  FOG_DENSE: 'fog_dense',
  SUN_BEAMS: 'sun_beams',
  CLOUDS: 'clouds',
  WIND: 'wind',
};

/** @typedef {{ type: 'INIT'; canvas: OffscreenCanvas; viewportWidth: number; viewportHeight: number; devicePixelRatio: number; isMobile: boolean }} InitMessage */
/** @typedef {{ type: 'START'; effect: string; opacity: number; options?: { snowAccumulation?: boolean; matrixRainColor?: string } }} StartMessage */
/** @typedef {{ type: 'SET_OPACITY'; opacity: number }} SetOpacityMessage */
/** @typedef {{ type: 'RESIZE'; viewportWidth: number; viewportHeight: number; devicePixelRatio: number; isMobile: boolean }} ResizeMessage */
/** @typedef {{ type: 'SET_SNOW_SURFACES'; surfaces: unknown[] }} SetSnowSurfacesMessage */
/** @typedef {{ type: 'STOP' }} StopMessage */
/** @typedef {{ type: 'DISPOSE' }} DisposeMessage */

/** @typedef {InitMessage|StartMessage|SetOpacityMessage|ResizeMessage|SetSnowSurfacesMessage|StopMessage|DisposeMessage} WeatherWorkerMessage */

/** @typedef {{ type: 'READY' }} ReadyResponse */
/** @typedef {{ type: 'ERROR'; error: string }} ErrorResponse */

/** @typedef {ReadyResponse|ErrorResponse} WeatherWorkerResponse */
