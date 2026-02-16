/**
 * Dynamic Weather Worker - runs WeatherEffectsCore on OffscreenCanvas
 */
import { WeatherEffectsCore } from '../utils/weather-effects-core.js';

let core = null;

self.addEventListener('message', (event) => {
  const data = event.data;

  switch (data.type) {
    case 'INIT':
      initCore(data);
      break;
    case 'START':
      core?.start(data.effect, data.opacity, data.options || {});
      break;
    case 'SET_OPACITY':
      core?.setOpacity(data.opacity);
      break;
    case 'RESIZE':
      if (core) {
        core.resize({
          viewportWidth: data.viewportWidth,
          viewportHeight: data.viewportHeight,
          devicePixelRatio: data.devicePixelRatio,
          isMobile: data.isMobile,
        });
      }
      break;
    case 'SET_SNOW_SURFACES':
      core?.setSnowSurfaces(data.surfaces || []);
      break;
    case 'STOP':
      core?.stop();
      break;
    case 'DISPOSE':
      if (core) {
        core.destroy();
        core = null;
      }
      break;
  }
});

function initCore(data) {
  try {
    if (core) {
      core.destroy();
      core = null;
    }
    core = new WeatherEffectsCore({
      canvas: data.canvas,
      viewportWidth: data.viewportWidth,
      viewportHeight: data.viewportHeight,
      devicePixelRatio: data.devicePixelRatio ?? 1,
      isMobile: data.isMobile ?? false,
    });
    self.postMessage({ type: 'READY' });
  } catch (error) {
    self.postMessage({
      type: 'ERROR',
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
