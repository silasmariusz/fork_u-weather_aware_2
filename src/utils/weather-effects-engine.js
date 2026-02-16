/**
 * Weather Effects Engine - Worker (OffscreenCanvas) or main-thread fallback
 */
import { WeatherEffectsCore } from './weather-effects-core.js';
import DynamicWeatherWorker from '../workers/dynamic-weather-worker.js?worker&inline';

const supportsOffscreenCanvas =
  typeof window !== 'undefined' &&
  typeof Worker !== 'undefined' &&
  typeof HTMLCanvasElement !== 'undefined' &&
  'transferControlToOffscreen' in HTMLCanvasElement.prototype;

export class WeatherEffectsEngine {
  constructor(container, options = {}) {
    this.container = container;
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);';
    this.container.appendChild(this.canvas);

    this.viewportWidth = options.viewportWidth ?? window.innerWidth;
    this.viewportHeight = options.viewportHeight ?? window.innerHeight;
    this.isMobile = options.isMobile ?? (window.innerWidth < 600 || 'ontouchstart' in window);
    this.devicePixelRatio = options.devicePixelRatio ?? this.effectiveDpr();

    this.worker = null;
    this.workerState = 'idle'; // idle | pending | ready | failed
    this.workerQueue = [];
    this.fallbackCore = null;
    this.currentEffect = 'none';
    this.opacity = 100;
    this.effectOptions = {};
    this.resizeHandler = () => this.handleResize();
    window.addEventListener('resize', this.resizeHandler);

    if (supportsOffscreenCanvas) {
      this.initWorker();
    } else {
      this.ensureFallbackCore();
    }
  }

  effectiveDpr() {
    const cfg = window.ForkUWeatherAwareConfig || {};
    let dpr = window.devicePixelRatio || 1;
    if (this.isMobile && cfg.mobile_limit_dpr) dpr = Math.min(dpr, 2);
    return dpr;
  }

  /** Worker is ready - we can post directly */
  useWorkerPath() {
    return supportsOffscreenCanvas && this.workerState === 'ready';
  }

  /** Use worker (post or queue) - canvas is transferred, do NOT use fallback when pending */
  shouldUseWorkerOrQueue() {
    return supportsOffscreenCanvas && this.workerState !== 'failed';
  }

  /** Safe to use fallback - canvas is NOT transferred (either never tried worker, or recreated after failure) */
  shouldUseFallbackCore() {
    return !supportsOffscreenCanvas || this.workerState === 'failed';
  }

  initWorker() {
    if (this.worker) return;

    try {
      this.worker = new DynamicWeatherWorker();
      this.worker.onmessage = (e) => {
        if (e.data?.type === 'READY') {
          this.workerState = 'ready';
          this.flushWorkerQueue();
          if (this.currentEffect !== 'none') {
            this.postWorkerMessage({
              type: 'START',
              effect: this.currentEffect,
              opacity: this.opacity,
              options: this.effectOptions,
            });
          }
        } else if (e.data?.type === 'ERROR') {
          console.error('[Weather Overlay] Worker error:', e.data.error);
          this.handleWorkerFailure();
        }
      };
      this.worker.onerror = (err) => {
        console.error('[Weather Overlay] Worker init failed:', err);
        this.handleWorkerFailure();
      };

      const offscreen = this.canvas.transferControlToOffscreen();
      this.workerState = 'pending';
      this.worker.postMessage(
        {
          type: 'INIT',
          canvas: offscreen,
          viewportWidth: this.viewportWidth,
          viewportHeight: this.viewportHeight,
          devicePixelRatio: this.devicePixelRatio,
          isMobile: this.isMobile,
        },
        [offscreen]
      );
    } catch (err) {
      console.error('[Weather Overlay] Worker creation failed:', err);
      this.handleWorkerFailure();
    }
  }

  handleWorkerFailure() {
    this.workerState = 'failed';
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.flushWorkerQueue(true);
    this.recreateCanvas();
    if (this.fallbackCore) {
      this.fallbackCore.destroy();
      this.fallbackCore = null;
    }
    this.ensureFallbackCore();
    if (this.currentEffect !== 'none') {
      this.fallbackCore?.start(this.currentEffect, this.opacity, this.effectOptions);
    }
  }

  recreateCanvas() {
    if (this.canvas?.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--weather-overlay-z,9998);';
    this.container.appendChild(this.canvas);
  }

  ensureFallbackCore() {
    if (this.fallbackCore) return;
    this.fallbackCore = new WeatherEffectsCore({
      canvas: this.canvas,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      devicePixelRatio: this.devicePixelRatio,
      isMobile: this.isMobile,
    });
  }

  postWorkerMessage(msg) {
    if (this.workerState === 'ready' && this.worker) {
      this.worker.postMessage(msg);
    } else {
      this.workerQueue.push(msg);
    }
  }

  flushWorkerQueue(drop = false) {
    if (drop || !this.worker) {
      this.workerQueue = [];
      return;
    }
    for (const m of this.workerQueue) {
      this.worker.postMessage(m);
    }
    this.workerQueue = [];
  }

  handleResize() {
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;
    this.isMobile = window.innerWidth < 600 || 'ontouchstart' in window;
    this.devicePixelRatio = this.effectiveDpr();

    if (this.shouldUseWorkerOrQueue()) {
      this.postWorkerMessage({
        type: 'RESIZE',
        viewportWidth: this.viewportWidth,
        viewportHeight: this.viewportHeight,
        devicePixelRatio: this.devicePixelRatio,
        isMobile: this.isMobile,
      });
    } else if (this.shouldUseFallbackCore() && this.fallbackCore) {
      this.fallbackCore.resize({
        viewportWidth: this.viewportWidth,
        viewportHeight: this.viewportHeight,
        devicePixelRatio: this.devicePixelRatio,
        isMobile: this.isMobile,
      });
    }
  }

  start(effect, opacity = 100, extras = {}) {
    this.opacity = Math.max(0, Math.min(100, opacity));
    this.effectOptions = extras;

    if (effect === 'none') {
      this.stop();
      return;
    }

    this.currentEffect = effect;

    if (this.shouldUseWorkerOrQueue()) {
      this.postWorkerMessage({
        type: 'START',
        effect,
        opacity: this.opacity,
        options: this.effectOptions,
      });
    } else if (this.shouldUseFallbackCore()) {
      this.ensureFallbackCore();
      this.fallbackCore?.start(effect, this.opacity, this.effectOptions);
    }
  }

  stop() {
    this.currentEffect = 'none';
    if (this.shouldUseWorkerOrQueue()) {
      this.postWorkerMessage({ type: 'STOP' });
    } else if (this.fallbackCore) {
      this.fallbackCore.stop();
    }
  }

  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(100, opacity));
    if (this.shouldUseWorkerOrQueue()) {
      this.postWorkerMessage({ type: 'SET_OPACITY', opacity: this.opacity });
    } else if (this.fallbackCore) {
      this.fallbackCore.setOpacity(this.opacity);
    }
  }

  resize(options = {}) {
    this.viewportWidth = options.viewportWidth ?? window.innerWidth;
    this.viewportHeight = options.viewportHeight ?? window.innerHeight;
    this.isMobile = options.isMobile ?? (window.innerWidth < 600 || 'ontouchstart' in window);
    this.devicePixelRatio = options.devicePixelRatio ?? this.effectiveDpr();

    if (this.shouldUseWorkerOrQueue()) {
      this.postWorkerMessage({
        type: 'RESIZE',
        viewportWidth: this.viewportWidth,
        viewportHeight: this.viewportHeight,
        devicePixelRatio: this.devicePixelRatio,
        isMobile: this.isMobile,
      });
    } else if (this.shouldUseFallbackCore()) {
      this.ensureFallbackCore();
      this.fallbackCore?.resize({
        viewportWidth: this.viewportWidth,
        viewportHeight: this.viewportHeight,
        devicePixelRatio: this.devicePixelRatio,
        isMobile: this.isMobile,
      });
    }
  }

  setStyle(styles) {
    if (styles && typeof styles === 'object') {
      Object.assign(this.canvas.style, styles);
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resizeHandler);

    if (this.worker) {
      this.worker.postMessage({ type: 'DISPOSE' });
      this.worker.terminate();
      this.worker = null;
    }
    this.workerState = 'idle';
    this.workerQueue = [];

    if (this.fallbackCore) {
      this.fallbackCore.destroy();
      this.fallbackCore = null;
    }

    if (this.canvas?.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
