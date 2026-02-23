/**
 * Weather Effects Core - Three.js renderer
 */
import * as THREE from 'three';

export const WEATHER_EFFECTS_VIEW_HEIGHT = 100;

const fallbackTimers = new Map();
let fallbackId = 0;

const requestFrame = typeof globalThis.requestAnimationFrame === 'function'
  ? (cb) => globalThis.requestAnimationFrame(cb)
  : (cb) => {
      const id = ++fallbackId;
      const handle = setTimeout(() => {
        fallbackTimers.delete(id);
        cb(performance.now());
      }, 16);
      fallbackTimers.set(id, handle);
      return id;
    };

const cancelFrame = typeof globalThis.cancelAnimationFrame === 'function'
  ? (id) => globalThis.cancelAnimationFrame(id)
  : (id) => {
      const handle = fallbackTimers.get(id);
      if (handle) {
        clearTimeout(handle);
        fallbackTimers.delete(id);
      }
    };

function createDrawingSurface(width, height = width) {
  if (typeof document !== 'undefined' && document.createElement) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get 2D context');
    return { canvas, ctx };
  }
  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get 2D context');
    return { canvas, ctx };
  }
  throw new Error('Canvas not supported');
}

function createCanvasTexture(canvas) {
  return new THREE.CanvasTexture(canvas);
}

function createSnowflakeTexture() {
  const size = 32;
  const { canvas, ctx } = createDrawingSurface(size, size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = createCanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createStarTexture() {
  const size = 16;
  const { canvas, ctx } = createDrawingSurface(size, size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.35)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = createCanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const fogVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export class WeatherEffectsCore {
  constructor(options) {
    this.canvas = options.canvas;
    this.viewportWidth = options.viewportWidth;
    this.viewportHeight = options.viewportHeight;
    this.devicePixelRatio = options.devicePixelRatio ?? 1;
    this.isMobile = options.isMobile ?? false;
    this.viewWidth = this.computeViewWidth(WEATHER_EFFECTS_VIEW_HEIGHT);
    this.viewHeight = WEATHER_EFFECTS_VIEW_HEIGHT;
    this.camera = this.createCamera();
    this.renderer = this.createRenderer();
    this.scene = new THREE.Scene();
    this.animationFrame = null;
    this.lastTimestamp = 0;
    this.currentEffect = 'none';
    this.activeEffect = null;
    this.opacity = 100;
    this.effectExtras = {};
    this.lastAppliedExtras = {};
    this.snowSurfaces = [];
    this.smogOverlay = null;
    this.windowDropletsOverlay = null;
    this.lightningOverlay = null;
    this.auroraOverlay = null;
    this.renderTarget = null;
    this.maskScene = null;
    this.maskCamera = null;
    this.maskQuad = null;
    this.renderLoop = (ts) => this.renderFrame(ts);
  }

  computeViewWidth(viewHeight) {
    return viewHeight * (this.viewportWidth / Math.max(1, this.viewportHeight));
  }

  createCamera() {
    const hw = this.viewWidth / 2;
    const hh = this.viewHeight / 2;
    const cam = new THREE.OrthographicCamera(-hw, hw, hh, -hh, -1000, 1000);
    cam.position.z = 10;
    return cam;
  }

  createRenderer() {
    const r = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: !this.isMobile,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false,
      preserveDrawingBuffer: false,
    });
    r.setPixelRatio(Math.min(this.devicePixelRatio || 1, this.isMobile ? 1 : 1.5));
    r.setSize(this.viewportWidth, this.viewportHeight, false);
    return r;
  }

  start(effect, opacity, extras = {}) {
    this.opacity = Math.max(0, Math.min(100, opacity));
    this.effectExtras = extras;
    const mp = this.effectExtras.moonPosition;
    const lmp = this.lastAppliedExtras.moonPosition;
    const moonChanged = (mp?.x !== lmp?.x) || (mp?.y !== lmp?.y);
    const windChanged =
      this.lastAppliedExtras.windBearing !== this.effectExtras.windBearing ||
      this.lastAppliedExtras.windSpeedKmh !== this.effectExtras.windSpeedKmh;
    const extrasChanged =
      this.lastAppliedExtras.snowAccumulation !== this.effectExtras.snowAccumulation ||
      this.lastAppliedExtras.matrixRainColor !== this.effectExtras.matrixRainColor ||
      this.lastAppliedExtras.smogActive !== this.effectExtras.smogActive ||
      this.lastAppliedExtras.windowDroplets !== this.effectExtras.windowDroplets ||
      this.lastAppliedExtras.lightningOverlay !== this.effectExtras.lightningOverlay ||
      this.lastAppliedExtras.cloudCoverage !== this.effectExtras.cloudCoverage ||
      this.lastAppliedExtras.themeMode !== this.effectExtras.themeMode ||
      this.lastAppliedExtras.cloudSpeedMultiplier !== this.effectExtras.cloudSpeedMultiplier ||
      this.lastAppliedExtras.auroraOverlay !== this.effectExtras.auroraOverlay ||
      this.lastAppliedExtras.auroraVisibilityScore !== this.effectExtras.auroraVisibilityScore ||
      this.lastAppliedExtras.auroraVariant !== this.effectExtras.auroraVariant ||
      JSON.stringify(this.lastAppliedExtras.effectOpacity || {}) !== JSON.stringify(this.effectExtras.effectOpacity || {}) ||
      moonChanged ||
      windChanged;
    if (this.currentEffect === effect && this.activeEffect && !extrasChanged) {
      this.activeEffect.setOpacity(this.opacity);
      this.updateSmogOverlay();
      this.updateWindowDropletsOverlay();
      this.updateLightningOverlay();
      this.updateAuroraOverlay();
      this.startLoop();
      return;
    }
    this.setEffect(effect);
  }

  stop() {
    this.disposeSmogOverlay();
    this.disposeWindowDropletsOverlay();
    this.disposeLightningOverlay();
    this.disposeAuroraOverlay();
    this.disposeActiveEffect();
    this.currentEffect = 'none';
    this.stopLoop();
    this.lastAppliedExtras = {};
  }

  updateSmogOverlay() {
    const active = Boolean(this.effectExtras.smogActive);
    if (active && !this.smogOverlay) {
      this.smogOverlay = createSmogOverlay(this);
      this.scene.add(this.smogOverlay.group);
    } else if (!active && this.smogOverlay) {
      this.disposeSmogOverlay();
    } else if (this.smogOverlay) {
      this.smogOverlay.setOpacity(this.opacity);
    }
  }

  disposeSmogOverlay() {
    if (!this.smogOverlay) return;
    this.scene.remove(this.smogOverlay.group);
    this.smogOverlay.dispose();
    this.smogOverlay = null;
  }

  updateWindowDropletsOverlay() {
    const active = Boolean(this.effectExtras.windowDroplets);
    if (active && !this.windowDropletsOverlay) {
      this.windowDropletsOverlay = createWindowDropletsOverlay(this);
      this.scene.add(this.windowDropletsOverlay.group);
    } else if (!active && this.windowDropletsOverlay) {
      this.disposeWindowDropletsOverlay();
    } else if (this.windowDropletsOverlay) {
      this.windowDropletsOverlay.setOpacity(this.opacity);
    }
  }

  disposeWindowDropletsOverlay() {
    if (!this.windowDropletsOverlay) return;
    this.scene.remove(this.windowDropletsOverlay.group);
    this.windowDropletsOverlay.dispose();
    this.windowDropletsOverlay = null;
  }

  updateLightningOverlay() {
    const active = this.currentEffect === 'rain_storm' && Boolean(this.effectExtras.lightningData);
    if (active && !this.lightningOverlay) {
      this.lightningOverlay = createLightningEffect({
        viewWidth: this.viewWidth,
        viewHeight: this.viewHeight,
        opacity: this.opacity,
        isMobile: this.isMobile,
      });
      this.scene.add(this.lightningOverlay.group);
    } else if (!active && this.lightningOverlay) {
      this.disposeLightningOverlay();
    } else if (this.lightningOverlay) {
      this.lightningOverlay.setOpacity(this.opacity);
    }
  }

  disposeLightningOverlay() {
    if (!this.lightningOverlay) return;
    this.scene.remove(this.lightningOverlay.group);
    this.lightningOverlay.dispose();
    this.lightningOverlay = null;
  }

  updateAuroraOverlay() {
    const active = this.currentEffect === 'stars' && Boolean(this.effectExtras.auroraOverlay);
    const visibilityScore = Math.max(0, Math.min(1, this.effectExtras.auroraVisibilityScore ?? 0));
    const variant = this.effectExtras.auroraVariant || 'bands';
    const needsRecreate = this.auroraOverlay && this.lastAppliedExtras.auroraVariant !== variant;
    if (active && (!this.auroraOverlay || needsRecreate)) {
      if (this.auroraOverlay) this.disposeAuroraOverlay();
      this.auroraOverlay = createAuroraOverlay(this, visibilityScore, variant);
      this.scene.add(this.auroraOverlay.group);
    } else if (!active && this.auroraOverlay) {
      this.disposeAuroraOverlay();
    } else if (this.auroraOverlay) {
      this.auroraOverlay.setOpacity(this.opacity);
      this.auroraOverlay.setVisibilityScore?.(visibilityScore);
    }
  }

  disposeAuroraOverlay() {
    if (!this.auroraOverlay) return;
    this.scene.remove(this.auroraOverlay.group);
    this.auroraOverlay.dispose();
    this.auroraOverlay = null;
  }

  setOpacity(opacity) {
    this.opacity = Math.max(0, Math.min(100, opacity));
    this.activeEffect?.setOpacity(this.opacity);
  }

  setSnowSurfaces(surfaces) {
    this.snowSurfaces = surfaces || [];
    this.activeEffect?.setSnowSurfaces?.(this.snowSurfaces);
  }

  getLastAppliedExtras() {
    return { ...this.lastAppliedExtras };
  }

  resize(options) {
    this.viewportWidth = options.viewportWidth;
    this.viewportHeight = options.viewportHeight;
    if (this.renderTarget) {
      this.renderTarget.setSize(this.viewportWidth, this.viewportHeight);
    }
    this.devicePixelRatio = options.devicePixelRatio ?? 1;
    this.isMobile = options.isMobile ?? false;
    this.viewWidth = this.computeViewWidth(WEATHER_EFFECTS_VIEW_HEIGHT);
    this.camera = this.createCamera();
    this.renderer.setPixelRatio(Math.min(this.devicePixelRatio || 1, this.isMobile ? 1 : 1.5));
    this.renderer.setSize(this.viewportWidth, this.viewportHeight, false);
    if (this.activeEffect?.onResize) {
      this.activeEffect.onResize(this.viewWidth, this.viewHeight, this.isMobile, this.viewportWidth, this.viewportHeight);
      this.activeEffect.setSnowSurfaces?.(this.snowSurfaces);
    } else if (this.currentEffect !== 'none') {
      const effect = this.currentEffect;
      this.currentEffect = 'none';
      this.setEffect(effect);
    }
    this.smogOverlay?.onResize?.(this.viewWidth, this.viewHeight, this.isMobile, this.viewportWidth, this.viewportHeight);
    this.windowDropletsOverlay?.onResize?.(this.viewWidth, this.viewHeight, this.isMobile, this.viewportWidth, this.viewportHeight);
    this.lightningOverlay?.onResize?.(this.viewWidth, this.viewHeight, this.isMobile, this.viewportWidth, this.viewportHeight);
    this.auroraOverlay?.onResize?.(this.viewWidth, this.viewHeight, this.isMobile, this.viewportWidth, this.viewportHeight);
  }

  destroy() {
    this.stop();
    if (this.renderTarget) {
      this.renderTarget.dispose();
      this.renderTarget = null;
    }
    if (this.maskQuad?.material) {
      this.maskQuad.material.dispose();
    }
    this.maskScene?.clear();
    this.renderer.dispose();
    this.scene.clear();
  }

  startLoop() {
    if (this.animationFrame != null) return;
    this.lastTimestamp = 0;
    this.animationFrame = requestFrame(this.renderLoop);
  }

  stopLoop() {
    if (this.animationFrame != null) {
      cancelFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  renderFrame(timestamp) {
    if (this.lastTimestamp === 0) this.lastTimestamp = timestamp;
    const delta = Math.min((timestamp - this.lastTimestamp) / 1000, 0.05);
    this.lastTimestamp = timestamp;
    this.activeEffect?.update(delta, timestamp / 1000, this.effectExtras);
    this.smogOverlay?.update(delta);
    this.windowDropletsOverlay?.update(delta);
    this.lightningOverlay?.update(delta, timestamp / 1000, this.effectExtras);
    this.auroraOverlay?.update(delta);

    const useGradientMask = this.effectExtras.spatialMode === 'gradient-mask';
    if (useGradientMask) {
      this.ensureGradientMaskPass();
      this.renderer.setRenderTarget(this.renderTarget);
    }
    this.renderer.render(this.scene, this.camera);
    if (useGradientMask) {
      this.renderer.setRenderTarget(null);
      this.maskQuad.material.uniforms.tDiffuse.value = this.renderTarget.texture;
      this.renderer.render(this.maskScene, this.maskCamera);
    }
    this.animationFrame = requestFrame(this.renderLoop);
  }

  ensureGradientMaskPass() {
    if (this.renderTarget) return;
    this.renderTarget = new THREE.WebGLRenderTarget(this.viewportWidth, this.viewportHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      stencilBuffer: false,
    });
    this.maskCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.maskScene = new THREE.Scene();
    const geo = new THREE.PlaneGeometry(2, 2);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uInner: { value: 0.32 },
        uOuter: { value: 0.85 },
      },
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uInner;
        uniform float uOuter;
        varying vec2 vUv;
        void main() {
          vec4 tex = texture2D(tDiffuse, vUv);
          vec2 c = vUv - 0.5;
          float d = length(c) * 2.0;
          float mask = smoothstep(uInner, uOuter, d);
          gl_FragColor = vec4(tex.rgb, tex.a * mask);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
    this.maskQuad = new THREE.Mesh(geo, mat);
    this.maskScene.add(this.maskQuad);
  }

  setEffect(effect) {
    this.disposeActiveEffect();
    this.currentEffect = effect;
    if (effect === 'none') {
      this.stopLoop();
      return;
    }
    const instance = this.createEffectInstance(effect);
    if (!instance) {
      this.stopLoop();
      this.currentEffect = 'none';
      return;
    }
    this.activeEffect = instance;
    this.activeEffect.setOpacity(this.opacity);
    if (this.snowSurfaces.length && this.activeEffect.setSnowSurfaces) {
      this.activeEffect.setSnowSurfaces(this.snowSurfaces);
    }
    this.scene.add(instance.group);
    this.lastAppliedExtras = { ...this.effectExtras };
    this.updateSmogOverlay();
    this.updateWindowDropletsOverlay();
    this.updateLightningOverlay();
    this.updateAuroraOverlay();
    this.startLoop();
  }

  disposeActiveEffect() {
    if (!this.activeEffect) return;
    this.scene.remove(this.activeEffect.group);
    this.activeEffect.dispose();
    this.activeEffect = null;
  }

  createEffectInstance(effect) {
    const ctx = {
      viewWidth: this.viewWidth,
      viewHeight: this.viewHeight,
      viewportWidth: this.viewportWidth,
      viewportHeight: this.viewportHeight,
      isMobile: this.isMobile,
      effect,
      opacity: this.opacity,
      snowAccumulation: Boolean(this.effectExtras.snowAccumulation),
      snowSurfaces: this.snowSurfaces,
      matrixRainColor: this.effectExtras.matrixRainColor,
      moonPosition: this.effectExtras.moonPosition,
      windBearing: this.effectExtras.windBearing,
      windSpeedKmh: this.effectExtras.windSpeedKmh,
      windSwayFactor: this.effectExtras.windSwayFactor,
      rainMaxTiltDeg: this.effectExtras.rainMaxTiltDeg,
      rainWindMinKmh: this.effectExtras.rainWindMinKmh,
      sunPosition: this.effectExtras.sunPosition,
      cloudCoverage: this.effectExtras.cloudCoverage,
      precipitationMultiplier: this.effectExtras.precipitationMultiplier ?? 1,
      themeMode: this.effectExtras.themeMode ?? 'dark',
      cloudSpeedMultiplier: this.effectExtras.cloudSpeedMultiplier ?? 1,
      effectOpacity: this.effectExtras.effectOpacity || {},
    };
    if (effect === 'lightning') return createLightningEffect(ctx);
    if (effect === 'sun_beams') return createSunBeamEffect(ctx);
    if (effect === 'stars') return createStarsEffect(ctx);
    if (effect === 'matrix') return createMatrixEffect(ctx);
    if (effect === 'clouds') return createCloudEffect(ctx);
    if (effect === 'hail') return createHailEffect(ctx);
    if (effect.startsWith('rain')) return createRainEffect(ctx);
    if (effect === 'snow_layered') return createSnowy2Effect(ctx);
    if (effect.startsWith('snow')) return createSnowEffect(ctx);
    if (effect.startsWith('fog')) return createFogEffect(ctx);
    return null;
  }
}

function getRainPreset(effect, isMobile) {
  const scale = isMobile ? 0.6 : 1;
  if (effect === 'rain_storm') {
    return { count: Math.floor(600 * scale), length: { min: 1.1, max: 1.5 }, speed: { min: 1.4, max: 1.9 }, timeScale: 1.2, lightning: true, lightningOnly: false };
  }
  if (effect === 'rain_drizzle') {
    return { count: Math.floor(250 * scale), length: { min: 0.6, max: 0.9 }, speed: { min: 0.3, max: 0.6 }, timeScale: 0.6, lightning: false, lightningOnly: false };
  }
  return { count: Math.floor(480 * scale), length: { min: 0.9, max: 1.2 }, speed: { min: 1.0, max: 1.3 }, timeScale: 1.0, lightning: false, lightningOnly: false };
}

function createRainEffect(ctx) {
  const group = new THREE.Group();
  const preset = getRainPreset(ctx.effect, ctx.isMobile);
  const dropCount = preset.count;
  const baseGeo = new THREE.PlaneGeometry(0.06, 1);
  const rainGeo = new THREE.InstancedBufferGeometry();
  rainGeo.index = baseGeo.index;
  rainGeo.attributes.position = baseGeo.attributes.position;
  rainGeo.attributes.uv = baseGeo.attributes.uv;
  rainGeo.instanceCount = dropCount;

  const offsets = new Float32Array(dropCount * 3);
  const speeds = new Float32Array(dropCount);
  const lengths = new Float32Array(dropCount);
  const sway = new Float32Array(dropCount);
  const phases = new Float32Array(dropCount);

  for (let i = 0; i < dropCount; i++) {
    const i3 = i * 3;
    offsets[i3] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 10);
    offsets[i3 + 1] = THREE.MathUtils.randFloatSpread(ctx.viewHeight);
    offsets[i3 + 2] = Math.random() * 0.5;
    speeds[i] = THREE.MathUtils.randFloat(preset.speed.min, preset.speed.max);
    lengths[i] = THREE.MathUtils.randFloat(preset.length.min, preset.length.max);
    sway[i] = THREE.MathUtils.randFloat(0.5, 1.5);
    phases[i] = Math.random();
  }

  rainGeo.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(offsets, 3));
  rainGeo.setAttribute('instanceSpeed', new THREE.InstancedBufferAttribute(speeds, 1));
  rainGeo.setAttribute('instanceLength', new THREE.InstancedBufferAttribute(lengths, 1));
  rainGeo.setAttribute('instanceSway', new THREE.InstancedBufferAttribute(sway, 1));
  rainGeo.setAttribute('instancePhase', new THREE.InstancedBufferAttribute(phases, 1));

  const windMin = ctx.rainWindMinKmh ?? 3;
  const swayFactor = ctx.windSwayFactor ?? 0.7;
  const windSpeed = ctx.windSpeedKmh ?? 5;
  const bearingRad = ((ctx.windBearing ?? 270) * Math.PI) / 180;
  let windSway = 0;
  if (windSpeed >= windMin) {
    windSway = -Math.sin(bearingRad) * windSpeed * 0.06 * swayFactor;
  }
  const windSwayNorm = windSway * 0.15;

  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: ctx.opacity / 100 },
    uViewSize: { value: new THREE.Vector2(ctx.viewWidth, ctx.viewHeight) },
    uWindSway: { value: windSwayNorm },
  };

  const rainMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      attribute vec3 instanceOffset;
      attribute float instanceSpeed;
      attribute float instanceLength;
      attribute float instanceSway;
      attribute float instancePhase;
      uniform float uTime;
      uniform vec2 uViewSize;
      uniform float uWindSway;
      varying float vAlpha;
      void main() {
        float progress = fract(uTime * instanceSpeed + instancePhase);
        float travel = (uViewSize.y * 0.5) - progress * (uViewSize.y + 20.0);
        vec3 transformed = position;
        transformed.y *= instanceLength;
        transformed.x += instanceOffset.x + sin(progress * 6.28318 + instancePhase) * instanceSway + uWindSway * progress * uViewSize.y;
        transformed.y += travel + instanceOffset.y;
        transformed.z += -5.0 + instanceOffset.z;
        vAlpha = 1.0 - progress;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.65, 0.75, 0.9, clamp(vAlpha * 0.85 * uOpacity, 0.0, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const rainMesh = new THREE.Mesh(rainGeo, rainMaterial);
  rainMesh.frustumCulled = false;
  group.add(rainMesh);

  return {
    group,
    update(delta, _time, extras) {
      const precipMult = extras?.precipitationMultiplier ?? 1;
      uniforms.uTime.value += delta * preset.timeScale * precipMult;
      uniforms.uViewSize.value.set(ctx.viewWidth, ctx.viewHeight);
    },
    setOpacity(v) {
      uniforms.uOpacity.value = Math.max(0, Math.min(1, v / 100));
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      uniforms.uViewSize.value.set(w, h);
    },
    dispose() {
      rainGeo.dispose();
      rainMaterial.dispose();
    },
  };
}

function getSnowCount(effect, isMobile) {
  const m = isMobile ? 0.6 : 1;
  return effect === 'snow_storm' ? Math.floor(1000 * m) : Math.floor(600 * m);
}

function createSnowEffect(ctx) {
  const group = new THREE.Group();
  const count = getSnowCount(ctx.effect, ctx.isMobile);
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  const windMin = ctx.rainWindMinKmh ?? 3;
  const swayFactor = ctx.windSwayFactor ?? 0.7;
  const windSpeed = ctx.windSpeedKmh ?? 5;
  const bearingRad = ((ctx.windBearing ?? 270) * Math.PI) / 180;
  const windBiasX = windSpeed >= windMin
    ? -Math.sin(bearingRad) * windSpeed * 0.06 * swayFactor * 0.8
    : 0;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 30);
    positions[i3 + 1] = THREE.MathUtils.randFloatSpread(ctx.viewHeight + 30);
    positions[i3 + 2] = Math.random() * 4 - 2;
    velocities[i3] = THREE.MathUtils.randFloat(-0.2, 0.2) + windBiasX;
    velocities[i3 + 1] = ctx.effect === 'snow_storm' ? THREE.MathUtils.randFloat(-1.4, -0.9) : THREE.MathUtils.randFloat(-0.8, -0.4);
    velocities[i3 + 2] = THREE.MathUtils.randFloat(-0.05, 0.05);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const tex = createSnowflakeTexture();
  const baseOpacity = ctx.effect === 'snow_storm' ? 0.9 : 0.75;
  const isLight = ctx.themeMode === 'light';
  const snowColor = isLight ? 0xffffff : 0xe8f4ff;
  const mat = new THREE.PointsMaterial({
    map: tex,
    transparent: true,
    opacity: baseOpacity * (ctx.opacity / 100),
    sizeAttenuation: false,
    size: ctx.effect === 'snow_storm' ? 3.4 : 2.6,
    color: snowColor,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);

  return {
    group,
    update(delta) {
      const verts = geo.attributes.position.array;
      for (let i = 0; i < verts.length; i += 3) {
        verts[i] += velocities[i] * delta * 25;
        verts[i + 1] += velocities[i + 1] * delta * 25;
        verts[i + 2] += velocities[i + 2] * delta * 10;
        const halfW = ctx.viewWidth / 2 + 15;
        const halfH = ctx.viewHeight / 2 + 15;
        if (verts[i + 1] < -halfH) {
          verts[i + 1] = halfH;
          verts[i] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 30);
        }
        if (verts[i] < -halfW) verts[i] = halfW;
        if (verts[i] > halfW) verts[i] = -halfW;
      }
      geo.attributes.position.needsUpdate = true;
    },
    setOpacity(v) {
      mat.opacity = baseOpacity * Math.max(0, Math.min(1, v / 100));
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
      tex.dispose();
    },
  };
}

const SNOWY2_LAYERS = [
  { sizeMin: 24, sizeMax: 40, speedFactor: 0.12, swayAmpMin: 10, swayAmpMax: 30, opacity: 1, colorMin: 255, colorMax: 255 },
  { sizeMin: 20, sizeMax: 28, speedFactor: 0.09, swayAmpMin: 10, swayAmpMax: 25, opacity: 0.85, colorMin: 255, colorMax: 255 },
  { sizeMin: 16, sizeMax: 24, speedFactor: 0.07, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.75, colorMin: 255, colorMax: 255 },
  { sizeMin: 12, sizeMax: 18, speedFactor: 0.05, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.65, colorMin: 220, colorMax: 229 },
  { sizeMin: 10, sizeMax: 14, speedFactor: 0.03, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.55, colorMin: 210, colorMax: 219 },
  { sizeMin: 8, sizeMax: 12, speedFactor: 0.01, swayAmpMin: 10, swayAmpMax: 20, opacity: 0.4, colorMin: 200, colorMax: 209 },
];

function createSnowy2Effect(ctx) {
  const group = new THREE.Group();
  let totalFlakes = (ctx.isMobile ? 180 : 300);
  const flakesPerLayer = Math.floor(totalFlakes / SNOWY2_LAYERS.length);
  const tex = createSnowflakeTexture();

    const windMin = ctx.rainWindMinKmh ?? 3;
    const swayFactor = ctx.windSwayFactor ?? 0.7;
    const windSpeed = ctx.windSpeedKmh ?? 5;
    const bearingRad = ((ctx.windBearing ?? 270) * Math.PI) / 180;
    const windBiasX = windSpeed >= windMin
      ? -Math.sin(bearingRad) * windSpeed * 0.06 * swayFactor * 0.12
      : 0;

    const layerData = SNOWY2_LAYERS.map((lp) => {
    const positions = new Float32Array(flakesPerLayer * 3);
    const fallSpeeds = new Float32Array(flakesPerLayer);
    const swayAmps = new Float32Array(flakesPerLayer);
    const swayOffsets = new Float32Array(flakesPerLayer);
    const swaySpeeds = new Float32Array(flakesPerLayer);

    for (let i = 0; i < flakesPerLayer; i++) {
      const i3 = i * 3;
      const size = lp.sizeMin + Math.random() * (lp.sizeMax - lp.sizeMin);
      positions[i3] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 20);
      positions[i3 + 1] = THREE.MathUtils.randFloatSpread(ctx.viewHeight + 20);
      positions[i3 + 2] = Math.random() * 2 - 1;
      fallSpeeds[i] = size * lp.speedFactor * 0.15 + Math.random() * 0.02;
      swayAmps[i] = lp.swayAmpMin + Math.random() * (lp.swayAmpMax - lp.swayAmpMin);
      swayOffsets[i] = Math.random() * Math.PI * 2;
      swaySpeeds[i] = 0.01 + Math.random() * 0.02;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const sizeAvg = (lp.sizeMin + lp.sizeMax) / 2;
    const mat = new THREE.PointsMaterial({
      map: tex,
      transparent: true,
      opacity: lp.opacity * (ctx.opacity / 100),
      sizeAttenuation: false,
      size: sizeAvg * 0.15,
      color: 0xffffff,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Points(geo, mat);
    mesh.frustumCulled = false;
    group.add(mesh);
    return { geo, mat, fallSpeeds, swayAmps, swayOffsets, swaySpeeds, baseOpacity: lp.opacity };
  });

  return {
    group,
    update(delta) {
      layerData.forEach((ld) => {
        const verts = ld.geo.attributes.position.array;
        const d = delta * 60;
        for (let i = 0; i < verts.length / 3; i++) {
          const i3 = i * 3;
          ld.swayOffsets[i] += ld.swaySpeeds[i];
          const swayX = Math.sin(ld.swayOffsets[i]) * ld.swayAmps[i] * 0.08;
          verts[i3] += (swayX + windBiasX) * d;
          verts[i3 + 1] -= ld.fallSpeeds[i] * d;
          const halfW = ctx.viewWidth / 2 + 15;
          const halfH = ctx.viewHeight / 2 + 15;
          if (verts[i3 + 1] < -halfH) {
            verts[i3 + 1] = halfH;
            verts[i3] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 20);
          }
          if (verts[i3] < -halfW) verts[i3] = halfW;
          if (verts[i3] > halfW) verts[i3] = -halfW;
        }
        ld.geo.attributes.position.needsUpdate = true;
      });
    },
    setOpacity(v) {
      const n = Math.max(0, Math.min(1, v / 100));
      layerData.forEach((ld) => {
        ld.mat.opacity = ld.baseOpacity * n;
      });
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
    },
    dispose() {
      layerData.forEach((ld) => {
        ld.geo.dispose();
        ld.mat.dispose();
      });
      tex.dispose();
    },
  };
}

const MATRIX_CHARS = ['園', '迎', '簡', '益', '大', '诶', '比', '西', '迪', '伊', '弗', '吉', '尺', '杰', '开', '艾', '勒', '马', '娜'];
const MATRIX_GREEN = '#00ff41';
const MATRIX_GREEN_DIM = '#00cc33';
const MATRIX_MIN_STREAM_DIST = 85;

function createMatrixEffect(ctx) {
  const group = new THREE.Group();
  const cw = Math.max(256, Math.floor(ctx.viewportWidth / 2));
  const ch = Math.max(256, Math.floor(ctx.viewportHeight / 2));
  const { canvas: matrixCanvas, ctx: matrixCtx } = createDrawingSurface(cw, ch);
  const texture = createCanvasTexture(matrixCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const geo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9 * (ctx.opacity / 100),
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  group.add(mesh);

  const streams = [];
  let spawnTimer = 0;

  return {
    group,
    update(delta) {
      const W = matrixCanvas.width;
      const H = matrixCanvas.height;
      const scale = W / ctx.viewportWidth;
      spawnTimer += delta * 1000;

      const oneThirdY = H / 3;
      const anyPastThird = streams.some((s) => s.y > oneThirdY);
      const canSpawn = (streams.length === 0 || anyPastThird) && spawnTimer >= 0.8;

      if (canSpawn && streams.length < 6) {
        spawnTimer = 0;
        const leftZone = W * 0.28;
        const rightStart = W * 0.72;
        let tries = 15;
        let x;
        do {
          const side = Math.random() < 0.5;
          x = side ? 30 + Math.random() * (leftZone - 60) : rightStart + 30 + Math.random() * (W - rightStart - 60);
          const minDist = MATRIX_MIN_STREAM_DIST * (W / ctx.viewportWidth);
          const overlaps = streams.some((s) => Math.abs(s.x - x) < minDist);
          if (!overlaps) break;
        } while (--tries > 0);
        if (tries > 0) {
          const len = 4 + Math.floor(Math.random() * 8);
          streams.push({
            x,
            y: -80,
            chars: Array.from({ length: len }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]),
            speed: (0.15 + Math.random() * 0.12) * scale,
          });
        }
      }

      matrixCtx.fillStyle = 'rgba(0,0,0,0.08)';
      matrixCtx.fillRect(0, 0, W, H);

      matrixCtx.font = `${Math.max(12, 16 * scale)}px monospace`;
      matrixCtx.textAlign = 'center';
      matrixCtx.textBaseline = 'top';
      const centerX = W / 2;

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];
        s.y += s.speed;
        if (s.y > H + 150) {
          streams.splice(i, 1);
          continue;
        }
        const distFromCenter = Math.abs(s.x - centerX);
        const centerOpacity = distFromCenter < W * 0.2 ? 0.5 + (distFromCenter / (W * 0.2)) * 0.4 : 0.9;
        const charH = 16 * scale;
        for (let j = 0; j < s.chars.length; j++) {
          const trailAlpha = 1 - (j / s.chars.length) * 0.5;
          matrixCtx.globalAlpha = trailAlpha * centerOpacity;
          matrixCtx.fillStyle = j === 0 ? MATRIX_GREEN : MATRIX_GREEN_DIM;
          matrixCtx.fillText(s.chars[j], s.x, s.y + j * charH);
        }
        matrixCtx.globalAlpha = 1;
      }

      texture.needsUpdate = true;
    },
    setOpacity(v) {
      mat.opacity = 0.9 * Math.max(0, Math.min(1, v / 100));
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(w, h);
    },
    dispose() {
      geo.dispose();
      mat.dispose();
      texture.dispose();
    },
  };
}

function getStarsCount(isMobile) {
  return isMobile ? Math.floor(400 * 0.6) : Math.floor(400);
}

function createStarsEffect(ctx) {
  const moonMult = ctx.effectOpacity?.moon ?? 1;
  const starsMult = ctx.effectOpacity?.stars ?? 1;
  const group = new THREE.Group();
  const count = getStarsCount(ctx.isMobile);
  const positions = new Float32Array(count * 3);
  const moonPos = ctx.moonPosition;

  // Subtle violet top gradient for clean clear-night sky.
  const nightGlowGeo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
  const nightGlowMat = new THREE.ShaderMaterial({
    uniforms: {
      uOpacity: { value: 0.16 * (ctx.opacity / 100) },
    },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uOpacity;
      void main() {
        float top = smoothstep(0.28, 0.98, vUv.y);
        float centerSoft = 1.0 - smoothstep(0.0, 0.55, abs(vUv.x - 0.5));
        float alpha = top * (0.55 + centerSoft * 0.45) * uOpacity;
        vec3 col = vec3(0.34, 0.30, 0.52);
        gl_FragColor = vec4(col, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const nightGlowMesh = new THREE.Mesh(nightGlowGeo, nightGlowMat);
  nightGlowMesh.position.set(0, 0, -2.2);
  nightGlowMesh.renderOrder = -1;
  group.add(nightGlowMesh);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Keep stars mostly near edges so center stays subtle.
    let x = 0;
    let y = 0;
    for (let t = 0; t < 8; t++) {
      x = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 20);
      y = THREE.MathUtils.randFloatSpread(ctx.viewHeight + 20);
      const nx = Math.abs(x) / Math.max(1, (ctx.viewWidth + 20) * 0.5);
      const ny = Math.abs(y) / Math.max(1, (ctx.viewHeight + 20) * 0.5);
      const edge = Math.max(nx, ny);
      if (edge > 0.55 || Math.random() < 0.18) break;
    }
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = Math.random() * 2 - 1;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const tex = createStarTexture();
  const mat = new THREE.PointsMaterial({
    map: tex,
    transparent: true,
    opacity: 0.92 * (ctx.opacity / 100) * starsMult,
    sizeAttenuation: false,
    size: 2.2,
    color: 0xe8f4ff,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);

  let moonMesh = null;
  let moonEdgeGlowMesh = null;
  if (moonPos && typeof moonPos.x === 'number' && typeof moonPos.y === 'number') {
    const mx = (moonPos.x - 0.5) * ctx.viewWidth;
    const my = (0.5 - moonPos.y) * ctx.viewHeight;
    const moonSize = Math.max(ctx.viewWidth, ctx.viewHeight) * 0.12;
    const moonGeo = new THREE.PlaneGeometry(moonSize, moonSize);
    const moonMat = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 0.18 * (ctx.opacity / 100) * moonMult },
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uOpacity;
        void main() {
          vec2 c = vUv - 0.5;
          float d = length(c) * 2.0;
          if (d > 1.0) discard;
          float core = smoothstep(0.34, 0.0, d);
          float halo = smoothstep(1.0, 0.12, d);
          float alpha = (core * 0.78 + halo * 0.22) * uOpacity;
          gl_FragColor = vec4(0.96, 0.97, 1.0, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(mx, my, -1);
    moonMesh.renderOrder = 1;
    group.add(moonMesh);

    const edgeGeo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
    const edgeCenter = { x: moonPos.x, y: moonPos.y };
    if (edgeCenter.y <= edgeCenter.x && edgeCenter.y <= (1 - edgeCenter.x)) {
      edgeCenter.y = -0.16;
    } else if (edgeCenter.x < 0.5) {
      edgeCenter.x = -0.15;
    } else {
      edgeCenter.x = 1.15;
    }
    const edgeMat = new THREE.ShaderMaterial({
      uniforms: {
        uOpacity: { value: 0.1 * (ctx.opacity / 100) * moonMult },
        uCenter: { value: new THREE.Vector2(edgeCenter.x, edgeCenter.y) },
      },
      vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uOpacity;
        uniform vec2 uCenter;
        void main() {
          float d = length(vUv - uCenter);
          float glow = smoothstep(0.9, 0.05, d);
          float alpha = glow * glow * uOpacity;
          gl_FragColor = vec4(0.82, 0.86, 0.96, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    moonEdgeGlowMesh = new THREE.Mesh(edgeGeo, edgeMat);
    moonEdgeGlowMesh.position.set(0, 0, -1.8);
    moonEdgeGlowMesh.renderOrder = 0;
    group.add(moonEdgeGlowMesh);
  }

  let twinkleTime = 0;

  return {
    group,
    update(delta) {
      twinkleTime += delta * 1.2;
      mat.opacity = 0.92 * (ctx.opacity / 100) * starsMult * (0.82 + 0.18 * Math.sin(twinkleTime));
    },
    setOpacity(v) {
      const n = Math.max(0, Math.min(1, v / 100));
      mat.opacity = 0.92 * n * starsMult;
      if (moonMesh) moonMesh.material.uniforms.uOpacity.value = 0.18 * n * moonMult;
      if (moonEdgeGlowMesh) moonEdgeGlowMesh.material.uniforms.uOpacity.value = 0.1 * n * moonMult;
      nightGlowMat.uniforms.uOpacity.value = 0.16 * n;
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      nightGlowMesh.geometry.dispose();
      nightGlowMesh.geometry = new THREE.PlaneGeometry(w, h);
    },
    dispose() {
      geo.dispose();
      mat.dispose();
      tex.dispose();
      nightGlowMesh.geometry.dispose();
      nightGlowMat.dispose();
      if (moonMesh) {
        moonMesh.geometry.dispose();
        moonMesh.material.dispose();
      }
      if (moonEdgeGlowMesh) {
        moonEdgeGlowMesh.geometry.dispose();
        moonEdgeGlowMesh.material.dispose();
      }
    },
  };
}

const MIN_DROPLET_DIST = 55;

function createWindowDropletsOverlay(core) {
  const viewW = core.viewWidth;
  const viewH = core.viewHeight;
  const { canvas: dropCanvas, ctx: dropCtx } = createDrawingSurface(
    Math.max(256, Math.floor(core.viewportWidth / 2)),
    Math.max(256, Math.floor(core.viewportHeight / 2))
  );
  const texture = createCanvasTexture(dropCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const geo = new THREE.PlaneGeometry(viewW, viewH);
  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.95 * (core.opacity / 100),
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 5;
  const group = new THREE.Group();
  group.add(mesh);

  const droplets = [];
  let spawnTimer = 0;
  let nextIntervalMs = 0;

  function dropletOverlaps(x, y, size) {
    for (const o of droplets) {
      const dx = x - o.x;
      const dy = y - o.y;
      const minDist = MIN_DROPLET_DIST + (size + o.size) * 0.5;
      if (dx * dx + dy * dy < minDist * minDist) return true;
    }
    return false;
  }

  function getSpawnInterval() {
    return 120 + Math.random() * 220;
  }

  return {
    group,
    update(delta) {
      const W = dropCanvas.width;
      const H = dropCanvas.height;
      const dMs = Math.min(delta * 1000, 50);

      spawnTimer += dMs;
      if (nextIntervalMs <= 0) nextIntervalMs = getSpawnInterval();
      if (spawnTimer >= nextIntervalMs) {
        spawnTimer = Math.max(0, spawnTimer - nextIntervalMs);
        nextIntervalMs = getSpawnInterval();
        const size = 3.5 + Math.random() * 10;
        let x, y;
        let tries = 16;
        do {
          x = Math.random() * W;
          y = Math.random() * H * 0.9;
        } while (--tries > 0 && dropletOverlaps(x, y, size));
        if (tries > 0) {
          droplets.push({
            x, y, size,
            phase: 'appear',
            opacity: 0,
            life: 0,
            appearDur: 140 + Math.random() * 220,
            restDur: 650 + Math.random() * 1800,
            slideVel: 10 + Math.random() * 20,
            slideAccel: 0.7 + Math.random() * 1.2,
            trailLife: 0,
          });
        }
      }

      dropCtx.clearRect(0, 0, W, H);

      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        d.life += dMs;

        if (d.phase === 'appear') {
          d.opacity = Math.min(1, (d.life / d.appearDur) * 1.8);
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
          d.trailLife = Math.min(1, (d.trailLife || 0) + dt * 1.5);
          const frac = d.y / H;
          d.opacity = frac < 0.85 ? 1 : Math.max(0, (1 - frac) / 0.15);
          if (d.y > H + d.size * 2) {
            droplets.splice(i, 1);
            continue;
          }
        }

        if (d.y <= H + d.size * 2) {
          dropCtx.save();
          dropCtx.globalAlpha = d.opacity;
          if (d.phase === 'slide') {
            const trailLen = d.size * (1.8 + d.slideVel * 0.02) * (0.45 + d.trailLife * 0.55);
            const trail = dropCtx.createLinearGradient(d.x, d.y - trailLen, d.x, d.y + d.size * 0.3);
            trail.addColorStop(0, 'rgba(205,220,240,0)');
            trail.addColorStop(0.4, 'rgba(205,220,240,0.06)');
            trail.addColorStop(1, 'rgba(215,230,248,0.14)');
            dropCtx.strokeStyle = trail;
            dropCtx.lineWidth = Math.max(1, d.size * 0.16);
            dropCtx.lineCap = 'round';
            dropCtx.beginPath();
            dropCtx.moveTo(d.x, d.y - trailLen);
            dropCtx.lineTo(d.x, d.y + d.size * 0.25);
            dropCtx.stroke();
          }
          const grad = dropCtx.createRadialGradient(
            d.x - d.size * 0.3, d.y - d.size * 0.3, 0,
            d.x, d.y, d.size * 1.65
          );
          grad.addColorStop(0, 'rgba(238, 247, 255, 0.28)');
          grad.addColorStop(0.28, 'rgba(214, 230, 248, 0.16)');
          grad.addColorStop(0.62, 'rgba(184, 203, 225, 0.08)');
          grad.addColorStop(1, 'rgba(150, 170, 195, 0)');
          dropCtx.fillStyle = grad;
          dropCtx.beginPath();
          dropCtx.ellipse(d.x, d.y, d.size * 0.52, d.size * 1.18, 0, 0, Math.PI * 2);
          dropCtx.fill();
          const hl = dropCtx.createRadialGradient(
            d.x - d.size * 0.25, d.y - d.size * 0.4, 0,
            d.x - d.size * 0.25, d.y - d.size * 0.4, d.size * 0.6
          );
          hl.addColorStop(0, `rgba(255,255,255,${0.22 * d.opacity})`);
          hl.addColorStop(0.55, `rgba(255,255,255,${0.06 * d.opacity})`);
          hl.addColorStop(1, 'rgba(255,255,255,0)');
          dropCtx.fillStyle = hl;
          dropCtx.beginPath();
          dropCtx.ellipse(d.x - d.size * 0.23, d.y - d.size * 0.42, d.size * 0.30, d.size * 0.38, 0, 0, Math.PI * 2);
          dropCtx.fill();
          dropCtx.restore();
        }
      }

      texture.needsUpdate = true;
    },
    setOpacity(v) {
      const dropletsMult = core.effectExtras?.effectOpacity?.droplets ?? 1;
      mat.opacity = 0.95 * Math.max(0, Math.min(1, v / 100)) * dropletsMult;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
      texture.dispose();
    },
  };
}

function createSmogOverlay(core) {
  const viewW = core.viewWidth;
  const viewH = core.viewHeight;
  const smogMult = core.effectExtras?.effectOpacity?.smog ?? 1;
  const stripH = Math.max(42, viewH * 0.1);
  const geo = new THREE.PlaneGeometry(viewW, stripH);
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0.11 * (core.opacity / 100) * smogMult },
    uScale: { value: 2.0 },
    uResolution: { value: new THREE.Vector2(viewW, stripH) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: fogVertexShader,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uOpacity;
      uniform float uScale;
      uniform vec2 uResolution;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, amp = 0.5;
        for (int i = 0; i < 4; i++) {
          v += amp * noise(p);
          p *= 2.0;
          amp *= 0.5;
        }
        return v;
      }
      void main() {
        vec2 aspect = vec2(uResolution.x / max(uResolution.y, 0.0001), 1.0);
        vec2 uv = (vUv - 0.5) * aspect + 0.5;
        uv *= uScale;
        uv += vec2(0.01, 0.02) * uTime;
        float d = fbm(uv);
        float puff = smoothstep(0.72, 0.96, fbm(uv * 0.85 + vec2(uTime * 0.11, -uTime * 0.07)));
        d = smoothstep(0.28, 0.72, d) * 0.72 + puff * 0.28;
        float floorMask = smoothstep(1.0, 0.2, vUv.y);
        float riseMask = 1.0 - smoothstep(0.0, 1.0, vUv.y);
        float vMask = floorMask * riseMask;
        vec3 color = vec3(0.55, 0.52, 0.48);
        gl_FragColor = vec4(color, clamp(d * vMask * uOpacity, 0.0, 1.0));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, -viewH / 2 + stripH / 2, -1);
  mesh.renderOrder = 10;
  const group = new THREE.Group();
  group.add(mesh);

  return {
    group,
    update(delta) {
      uniforms.uTime.value += delta * 0.2;
    },
    setOpacity(v) {
      const m = core.effectExtras?.effectOpacity?.smog ?? 1;
      uniforms.uOpacity.value = 0.11 * Math.max(0, Math.min(1, v / 100)) * m;
    },
    onResize(w, h) {
      const nextStripH = Math.max(42, h * 0.1);
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(w, nextStripH);
      mesh.position.y = -h / 2 + nextStripH / 2;
      uniforms.uResolution.value.set(w, nextStripH);
    },
    dispose() {
      mesh.geometry.dispose();
      mat.dispose();
    },
  };
}

function createAuroraNorthernGradients(core, visibilityScore) {
  const viewW = core.viewWidth;
  const viewH = core.viewHeight;
  const auroraMult = core.effectExtras?.effectOpacity?.aurora ?? 1;
  const geo = new THREE.PlaneGeometry(viewW * 1.2, viewH * 1.2);
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: 0.5 * (visibilityScore || 0.5) * (core.opacity / 100) * auroraMult },
    uResolution: { value: new THREE.Vector2(viewW, viewH) },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uOpacity;
      uniform vec2 uResolution;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p); vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0, amp = 0.5;
        for (int i = 0; i < 4; i++) { v += amp * noise(p); p *= 2.0; amp *= 0.5; }
        return v;
      }
      vec3 gradient(float t) {
        vec3 a = vec3(0.38, 0.65, 0.98);
        vec3 b = vec3(0.91, 0.47, 0.98);
        vec3 c = vec3(0.37, 0.92, 0.83);
        if (t < 0.2) return mix(a, b, smoothstep(0.0, 0.2, t));
        if (t < 0.4) return mix(b, a, smoothstep(0.2, 0.4, t));
        if (t < 0.6) return mix(a, c, smoothstep(0.4, 0.6, t));
        if (t < 0.8) return mix(c, a, smoothstep(0.6, 0.8, t));
        return mix(a, b, smoothstep(0.8, 1.0, t));
      }
      void main() {
        vec2 uv = vUv;
        float n = fbm(uv * 2.5 + uTime * 0.025) * 0.05;
        float t = fract(uv.x * 0.5 + (1.0 - uv.y) * 0.5 + uTime * 0.01 + n);
        vec3 col = gradient(t);
        vec2 fromTop = uv - vec2(0.5, 1.0);
        float dist = length(fromTop) * 1.6;
        float mask = 1.0 - smoothstep(0.15, 1.0, dist);
        mask = mask * mask;
        float noiseVal = clamp(fbm(uv * 4.0), 0.0, 1.0);
        float edgeMask = smoothstep(0.2, 0.58, length(uv - vec2(0.5)));
        float sideMask = smoothstep(0.22, 0.48, abs(uv.x - 0.5));
        float borderMask = max(edgeMask, sideMask * 0.9);
        float alpha = clamp(mask * uOpacity * (0.92 + 0.08 * noiseVal) * borderMask, 0.0, 1.0);
        gl_FragColor = vec4(max(col, vec3(0.0)), alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -9);
  mesh.renderOrder = 9;
  const group = new THREE.Group();
  group.add(mesh);

  let currentVisibilityScore = visibilityScore || 0.5;
  const applyOpacity = () => {
    const m = core.effectExtras?.effectOpacity?.aurora ?? 1;
    const base = 0.22 * currentVisibilityScore * Math.max(0, Math.min(1, core.opacity / 100)) * m;
    uniforms.uOpacity.value = base;
  };

  return {
    group,
    update(delta) {
      uniforms.uTime.value += delta;
    },
    setOpacity() {
      applyOpacity();
    },
    setVisibilityScore(score) {
      currentVisibilityScore = score || 0.5;
      applyOpacity();
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}

const AURORA_BANDS = [
  { width: 1, colorA: [71 / 255, 60 / 255, 120 / 255], colorB: [247 / 255, 42 / 255, 59 / 255], speed: 1.26 },
  { width: 0.9, colorA: [24 / 255, 196 / 255, 153 / 255], colorB: [216 / 255, 240 / 255, 94 / 255], speed: 1.57 },
  { width: 0.8, colorA: [255 / 255, 221 / 255, 0 / 255], colorB: [62 / 255, 51 / 255, 255 / 255], speed: 2.09 },
  { width: 0.7, colorA: [120 / 255, 24 / 255, 72 / 255], colorB: [242 / 255, 187 / 255, 233 / 255], speed: 3.14 },
  { width: 0.6, colorA: [66 / 255, 242 / 255, 161 / 255], colorB: [244 / 255, 246 / 255, 173 / 255], speed: 6.28 },
];

function createAuroraOverlay(core, visibilityScore, variant) {
  if (variant === 'northern-gradients') {
    return createAuroraNorthernGradients(core, visibilityScore);
  }
  const viewW = core.viewWidth;
  const viewH = core.viewHeight;
  const auroraMult = core.effectExtras?.effectOpacity?.aurora ?? 1;
  const bandHeight = Math.max(62, viewH * 0.28);
  const bottomY = -viewH / 2 + bandHeight / 2 - 10;
  const group = new THREE.Group();

  const auroraVertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const auroraFragShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uSpeed;
    uniform float uPulsePhase;
    float softColumn(float x, float center, float width) {
      float d = abs(x - center) / max(width, 0.0001);
      return exp(-d * d * 2.5);
    }

    void main() {
      vec2 uv = vUv;
      float drift = uTime * (0.014 + uSpeed * 0.006);
      float c1 = softColumn(fract(uv.x + drift + uPulsePhase * 0.05), 0.18, 0.13);
      float c2 = softColumn(fract(uv.x + drift * 1.15 + 0.23 + uPulsePhase * 0.07), 0.48, 0.15);
      float c3 = softColumn(fract(uv.x + drift * 0.9 + 0.51 + uPulsePhase * 0.03), 0.78, 0.14);
      float curtains = clamp(c1 + c2 + c3, 0.0, 1.0);
      float yFade = pow(max(0.0, 1.0 - uv.y), 1.7);
      float edgeFade = smoothstep(0.0, 0.08, uv.x) * smoothstep(0.0, 0.08, 1.0 - uv.x);
      float radialEdge = smoothstep(0.2, 0.58, length(uv - vec2(0.5)));
      float sideEdge = smoothstep(0.2, 0.47, abs(uv.x - 0.5));
      float borderMask = max(radialEdge, sideEdge);
      float fade = yFade * edgeFade * borderMask;
      float t = 0.5 + 0.5 * sin((uTime * 0.55) + uv.x * 2.2 + uPulsePhase);
      vec3 col = mix(uColorA, uColorB, t);
      float pulse = 0.92 + 0.08 * sin(uTime * 0.7 + uPulsePhase);
      float alpha = clamp(curtains * fade * uOpacity * pulse * 0.72, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  for (let i = 0; i < AURORA_BANDS.length; i++) {
    const band = AURORA_BANDS[i];
    const w = viewW * 1.15;
    const h = bandHeight;
    const geo = new THREE.PlaneGeometry(w, h);
    const pulsePhase = (i / AURORA_BANDS.length) * 6.28;
    const uniforms = {
      uTime: { value: 0 },
      uOpacity: { value: 0.12 * (visibilityScore || 0.5) * (core.opacity / 100) * auroraMult },
      uColorA: { value: new THREE.Vector3().fromArray(band.colorA) },
      uColorB: { value: new THREE.Vector3().fromArray(band.colorB) },
      uSpeed: { value: band.speed * 0.4 },
      uPulsePhase: { value: pulsePhase },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: auroraVertexShader,
      fragmentShader: auroraFragShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, bottomY + i * 2, -8 - i * 0.01);
    mesh.renderOrder = 9;
    group.add(mesh);
  }

  let currentVisibilityScore = visibilityScore || 0.5;
  const bandMeshes = group.children;

  const applyOpacity = () => {
    const m = core.effectExtras?.effectOpacity?.aurora ?? 1;
    const base = 0.12 * currentVisibilityScore * Math.max(0, Math.min(1, core.opacity / 100)) * m;
    for (const mesh of bandMeshes) {
      mesh.material.uniforms.uOpacity.value = base;
    }
  };

  return {
    group,
    update(delta) {
      for (const mesh of bandMeshes) {
        mesh.material.uniforms.uTime.value += delta;
      }
    },
    setOpacity() {
      applyOpacity();
    },
    setVisibilityScore(score) {
      currentVisibilityScore = score || 0.5;
      applyOpacity();
    },
    dispose() {
      for (const mesh of bandMeshes) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
    },
  };
}

const FOG_STRIP_HEIGHT = 200;

function getFogSettings(effect, isMobile) {
  const isDense = effect === 'fog_dense';
  const baseOpacity = isDense ? 0.32 : 0.22;
  const ms = isMobile ? 0.85 : 1;
  const layers = isDense
    ? [
        { scale: 2.2 * ms, speed: 0.28, intensity: 1.0, flow: new THREE.Vector2(0.08, 0.02), low: 0.25, high: 0.78, contrast: 1.1, color: [0.86, 0.89, 0.95] },
        { scale: 2.8 * ms, speed: 0.36, intensity: 0.85, flow: new THREE.Vector2(-0.05, 0.025), low: 0.2, high: 0.7, contrast: 1.22, color: [0.9, 0.92, 0.97] },
      ]
    : [
        { scale: 2.5 * ms, speed: 0.22, intensity: 0.75, flow: new THREE.Vector2(0.05, 0.015), low: 0.3, high: 0.82, contrast: 1.15, color: [0.88, 0.91, 0.96] },
        { scale: 3.2 * ms, speed: 0.3, intensity: 0.55, flow: new THREE.Vector2(-0.03, 0.012), low: 0.25, high: 0.75, contrast: 1.22, color: [0.8, 0.84, 0.92] },
      ];
  return { baseOpacity, layers };
}

const fogFragShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uScale;
  uniform vec2 uFlow;
  uniform vec2 uResolution;
  uniform float uLow;
  uniform float uHigh;
  uniform float uContrast;
  uniform vec3 uColor;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), u.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }
  void main() {
    vec2 aspect = vec2(uResolution.x / max(uResolution.y, 0.0001), 1.0);
    vec2 uv = (vUv - 0.5) * aspect + 0.5;
    uv *= uScale;
    uv += uFlow * uTime;
    float primary = fbm(uv);
    float detail = fbm(uv * 1.8 - uFlow.yx * (uTime * 0.35));
    float density = mix(primary, detail, 0.35);
    density = smoothstep(uLow, uHigh, density);
    density = pow(density, uContrast);
    float vMask = 1.0 - smoothstep(0.0, 1.0, vUv.y);
    gl_FragColor = vec4(uColor, density * vMask * uOpacity);
  }
`;

function createFogEffect(ctx) {
  const group = new THREE.Group();
  const settings = getFogSettings(ctx.effect, ctx.isMobile);
  const cov = ctx.cloudCoverage;
  const coverageMult = cov != null ? 0.6 + (cov / 100) * 0.5 : 1;
  const fogMult = ctx.effectOpacity?.fog ?? 1;
  const stripH = Math.min(FOG_STRIP_HEIGHT, ctx.viewHeight * 0.25);
  const bottomY = -ctx.viewHeight / 2 + stripH / 2;
  const layers = settings.layers.map((lc) => {
    const geo = new THREE.PlaneGeometry(ctx.viewWidth, stripH);
    const uniforms = {
      uTime: { value: 0 },
      uOpacity: { value: settings.baseOpacity * lc.intensity * (ctx.opacity / 100) * coverageMult * fogMult },
      uScale: { value: lc.scale },
      uFlow: { value: lc.flow.clone() },
      uResolution: { value: new THREE.Vector2(ctx.viewWidth, ctx.viewHeight) },
      uLow: { value: lc.low },
      uHigh: { value: lc.high },
      uContrast: { value: lc.contrast },
      uColor: { value: new THREE.Color(lc.color[0], lc.color[1], lc.color[2]) },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: fogVertexShader,
      fragmentShader: fogFragShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, bottomY, 0);
    mesh.renderOrder = -3;
    group.add(mesh);
    return { mesh, uniforms, config: lc };
  });

  return {
    group,
    update(delta) {
      layers.forEach((l) => { l.uniforms.uTime.value += delta * l.config.speed; });
    },
    setOpacity(v) {
      const n = Math.max(0, Math.min(1, v / 100));
      const ms = ctx.isMobile ? 0.75 : 1;
      layers.forEach((l) => {
        l.uniforms.uOpacity.value = settings.baseOpacity * l.config.intensity * n * ms * coverageMult * fogMult;
      });
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      const newStripH = Math.min(FOG_STRIP_HEIGHT, h * 0.25);
      const newBottomY = -h / 2 + newStripH / 2;
      layers.forEach((l) => {
        l.uniforms.uResolution.value.set(w, h);
        l.mesh.geometry.dispose();
        l.mesh.geometry = new THREE.PlaneGeometry(w, newStripH);
        l.mesh.position.y = newBottomY;
      });
    },
    dispose() {
      layers.forEach((l) => {
        l.mesh.geometry.dispose();
        l.mesh.material.dispose();
      });
    },
  };
}

function createSunBeamEffect(ctx) {
  const group = new THREE.Group();
  const sunMult = ctx.effectOpacity?.sun ?? 1;
  let geo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
  const sun = ctx.sunPosition || { azimuth: 180, elevation: 45, uvIndex: 3 };
  const originX = Math.max(0, Math.min(1, (sun.azimuth - 90) / 180));
  const originY = 0.08 + 0.35 * (1 - Math.min(90, Math.max(0, sun.elevation)) / 90);
  const uniforms = {
    uOpacity: { value: (ctx.opacity / 100) * sunMult },
    uViewSize: { value: new THREE.Vector2(ctx.viewWidth, ctx.viewHeight) },
    uOrigin: { value: new THREE.Vector2(originX, originY) },
    uUvIndex: { value: sun.uvIndex },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `varying vec3 vPosition; void main() { vPosition = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec3 vPosition;
      uniform vec2 uViewSize;
      uniform vec2 uOrigin;
      uniform float uOpacity;
      uniform float uUvIndex;
      void main() {
        vec2 uv = vec2((vPosition.x / uViewSize.x) + 0.5, (vPosition.y / uViewSize.y) + 0.5);
        float dist = length(uv - uOrigin);
        float core = smoothstep(0.18, 0.0, dist);
        float halo = smoothstep(0.62, 0.08, dist);
        float rays = 0.5 + 0.5 * cos(atan(uv.y - uOrigin.y, uv.x - uOrigin.x) * 6.0);
        float beam = smoothstep(0.9, 0.15, dist) * rays * 0.18;
        float alpha = clamp((core * 0.55 + halo * 0.35 + beam) * 0.32 * uOpacity, 0.0, 1.0);
        vec3 color;
        if (uUvIndex >= 6.0) {
          color = mix(vec3(1.0, 0.62, 0.2), vec3(1.0, 0.4, 0.12), min(1.0, dist * 1.5));
        } else if (uUvIndex >= 4.0) {
          color = mix(vec3(1.0, 0.82, 0.42), vec3(1.0, 0.62, 0.25), min(1.0, dist * 1.4));
        } else {
          color = mix(vec3(1.0, 0.97, 0.84), vec3(1.0, 0.86, 0.52), min(1.0, dist * 1.4));
        }
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 0, -2);
  group.add(mesh);

  return {
    group,
    update(_delta, _time, extras) {
      if (extras?.sunPosition) {
        const s = extras.sunPosition;
        uniforms.uOrigin.value.set(
          Math.max(0, Math.min(1, (s.azimuth - 90) / 180)),
          0.08 + 0.35 * (1 - Math.min(90, Math.max(0, s.elevation)) / 90)
        );
        uniforms.uUvIndex.value = s.uvIndex ?? 3;
      }
    },
    setOpacity(v) { uniforms.uOpacity.value = Math.max(0, Math.min(1, v / 100)) * sunMult; },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      uniforms.uViewSize.value.set(w, h);
      geo.dispose();
      geo = new THREE.PlaneGeometry(w, h);
      mesh.geometry = geo;
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}

function createCloudEffect(ctx) {
  const group = new THREE.Group();
  const heightRatio = 0.25;
  const cov = ctx.cloudCoverage;
  const coverageMult = cov != null ? 0.5 + (cov / 100) * 0.5 : 1;
  const cloudsMult = ctx.effectOpacity?.clouds ?? 1;
  const speedMult = ctx.cloudSpeedMultiplier ?? 1;
  let geo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight * heightRatio);
  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: (ctx.opacity / 100) * 0.1 * coverageMult * cloudsMult },
    uViewSize: { value: new THREE.Vector2(ctx.viewWidth, ctx.viewHeight) },
    uScale: { value: ctx.isMobile ? 1.5 : 1.0 },
  };
  const cloudFrag = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uOpacity;
    uniform float uScale;
    float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i+vec2(1,0)), u.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), u.x), u.y);
    }
    float fbm(vec2 p) {
      float v = 0.0, amp = 0.5, freq = 1.0;
      for (int i = 0; i < 6; i++) {
        v += amp * noise(p * freq);
        amp *= 0.5;
        freq *= 2.0;
      }
      return v;
    }
    void main() {
      vec2 uv = vUv * uScale;
      float time = uTime * 0.05;
      vec2 q = vec2(fbm(uv + vec2(time * 0.5, time * 0.2)), fbm(uv + vec2(1.0)));
      vec2 r = vec2(fbm(uv + q + vec2(1.7, 9.2) + 0.15 * time), fbm(uv + q + vec2(8.3, 2.8) + 0.126 * time));
      float f = fbm(uv + r);
      float cloud = smoothstep(0.36, 0.76, f);
      cloud *= smoothstep(0.0, 0.18, vUv.y);
      cloud *= smoothstep(1.0, 0.72, vUv.y);
      cloud = pow(cloud, 1.25);
      float shadow = smoothstep(0.3, 0.6, fbm(uv * 2.0 + r + vec2(0.5)));
      vec3 color = mix(vec3(0.81, 0.82, 0.89), vec3(1.0), shadow * 0.8 + 0.2);
      gl_FragColor = vec4(color, cloud * uOpacity);
    }
  `;
  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: cloudFrag,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, ctx.viewHeight * 0.375, -6);
  mesh.renderOrder = -2;
  group.add(mesh);

  return {
    group,
    update(delta) { uniforms.uTime.value += delta * speedMult; },
    setOpacity(v) { uniforms.uOpacity.value = Math.max(0, Math.min(1, v / 100)) * 0.1 * coverageMult * cloudsMult; },
    onResize(w, h, isMobile) {
      geo.dispose();
      geo = new THREE.PlaneGeometry(w, h * heightRatio);
      mesh.geometry = geo;
      uniforms.uViewSize.value.set(w, h);
      uniforms.uScale.value = isMobile ? 1.5 : 1.0;
      mesh.position.set(0, h * 0.375, -6);
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}

function createLightningEffect(ctx) {
  const group = new THREE.Group();
  const lightningFrag = `
    varying vec2 vUv;
    uniform float uFlash;
    uniform vec2 uOrigin;
    uniform float uTime;
    float hash(float n) { return fract(sin(n) * 43758.5453); }
    float jaggedLine(vec2 uv, float anchor, float seed) {
      float segments = 8.0;
      float progress = clamp(1.0 - uv.y, 0.0, 0.999) * segments;
      float idx = floor(progress);
      float frac = fract(progress);
      float offsetA = hash(seed + idx) * 0.24 - 0.12;
      float offsetB = hash(seed + idx + 1.0) * 0.24 - 0.12;
      float offset = mix(offsetA, offsetB, smoothstep(0.0, 1.0, frac));
      float width = mix(0.006, 0.02, hash(seed + idx * 1.7));
      float target = anchor + offset;
      float dist = abs(uv.x - target);
      float intensity = smoothstep(width, 0.0, dist);
      float fade = smoothstep(0.0, 0.9, 1.0 - uv.y);
      return intensity * fade;
    }
    void main() {
      float seed = floor(uTime * 11.0);
      float core = jaggedLine(vUv, uOrigin.x, seed);
      float halo = jaggedLine(vUv, uOrigin.x + 0.008, seed + 2.0) * 0.4;
      float alpha = clamp((core + halo) * uFlash, 0.0, 1.0);
      gl_FragColor = vec4(1.0, 0.98, 0.9, alpha);
    }
  `;
  const lightningUniforms = {
    uFlash: { value: 0 },
    uOrigin: { value: new THREE.Vector2(0.85, 1.05) },
    uTime: { value: 0 },
  };
  let lightningGeo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
  const lightningMat = new THREE.ShaderMaterial({
    uniforms: lightningUniforms,
    vertexShader: fogVertexShader,
    fragmentShader: lightningFrag,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const lightningMesh = new THREE.Mesh(lightningGeo, lightningMat);
  lightningMesh.position.set(0, 0, -6);
  lightningMesh.renderOrder = 25;
  group.add(lightningMesh);

  let screenFlashGeo = new THREE.PlaneGeometry(ctx.viewWidth, ctx.viewHeight);
  const screenFlashMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const screenFlashMesh = new THREE.Mesh(screenFlashGeo, screenFlashMat);
  screenFlashMesh.position.set(0, 0, -8);
  screenFlashMesh.renderOrder = 30;
  group.add(screenFlashMesh);

  const LIGHTNING_COOLDOWN_S = 20;
  let lightningTimer = THREE.MathUtils.randFloat(1, 3);
  let flashTimer = 0;
  let flashDuration = 0.25;
  let cooldownRemain = 0;
  let scheduledFlashAt = -1;
  const normOp = Math.max(0, Math.min(1, ctx.opacity / 100));

  const trigger = () => {
    flashDuration = THREE.MathUtils.randFloat(0.18, 0.32);
    flashTimer = flashDuration;
    lightningUniforms.uFlash.value = 1;
    lightningUniforms.uOrigin.value.set(THREE.MathUtils.randFloat(0.6, 0.95), THREE.MathUtils.randFloat(0.85, 1.05));
    screenFlashMat.opacity = Math.max(screenFlashMat.opacity, 0.55 * normOp + 0.15);
  };

  return {
    group,
    update(delta, time, extras) {
      const ld = extras?.lightningData;
      const speedFac = (typeof extras?.speed_factor_lightning === 'number') ? extras.speed_factor_lightning : 1;

      if (ld && (ld.strikesToTrigger > 0 || ld.distanceKm > 0)) {
        if (ld.strikesToTrigger > 0 && cooldownRemain <= 0) {
          const thunderDelay = ld.distanceKm * 3;
          scheduledFlashAt = time + thunderDelay;
          cooldownRemain = LIGHTNING_COOLDOWN_S;
        }
        if (scheduledFlashAt > 0 && time >= scheduledFlashAt) {
          scheduledFlashAt = -1;
          trigger();
        }
        cooldownRemain = Math.max(0, cooldownRemain - delta * speedFac);
      } else {
        lightningTimer -= delta * speedFac;
        if (lightningTimer <= 0) {
          lightningTimer = THREE.MathUtils.randFloat(1.5, 4);
          trigger();
        }
      }

      lightningUniforms.uTime.value += delta;
      if (flashTimer > 0) {
        flashTimer -= delta;
        const nt = Math.max(0, flashTimer / Math.max(flashDuration, 0.001));
        lightningUniforms.uFlash.value = Math.pow(nt, 1.4) * normOp;
      } else if (lightningUniforms.uFlash.value > 0) {
        lightningUniforms.uFlash.value = Math.max(0, lightningUniforms.uFlash.value - delta * 8);
      }
      screenFlashMat.opacity = Math.max(0, screenFlashMat.opacity - delta * 6);
    },
    setOpacity(v) {
      const n = Math.max(0, Math.min(1, v / 100));
      lightningUniforms.uFlash.value *= n / normOp;
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      lightningGeo.dispose();
      lightningGeo = new THREE.PlaneGeometry(w, h);
      lightningMesh.geometry = lightningGeo;
      screenFlashGeo.dispose();
      screenFlashGeo = new THREE.PlaneGeometry(w, h);
      screenFlashMesh.geometry = screenFlashGeo;
    },
    dispose() {
      lightningGeo.dispose();
      lightningMat.dispose();
      screenFlashGeo.dispose();
      screenFlashMat.dispose();
    },
  };
}

function createHailEffect(ctx) {
  const group = new THREE.Group();
  const hailCount = ctx.isMobile ? 10 : 15;
  const baseGeo = new THREE.PlaneGeometry(0.25, 0.25);
  const geo = new THREE.InstancedBufferGeometry();
  geo.index = baseGeo.index;
  geo.attributes.position = baseGeo.attributes.position;
  geo.attributes.uv = baseGeo.attributes.uv;
  geo.instanceCount = hailCount;

  const offsets = new Float32Array(hailCount * 3);
  const speeds = new Float32Array(hailCount);
  const sizes = new Float32Array(hailCount);
  const rotations = new Float32Array(hailCount);
  const phases = new Float32Array(hailCount);

  for (let i = 0; i < hailCount; i++) {
    const i3 = i * 3;
    offsets[i3] = THREE.MathUtils.randFloatSpread(ctx.viewWidth + 10);
    offsets[i3 + 1] = THREE.MathUtils.randFloatSpread(ctx.viewHeight);
    offsets[i3 + 2] = Math.random() * 2;
    speeds[i] = THREE.MathUtils.randFloat(2.8, 4.0);
    sizes[i] = THREE.MathUtils.randFloat(1.8, 2.8);
    rotations[i] = Math.random() * Math.PI * 2;
    phases[i] = Math.random();
  }

  geo.setAttribute('instanceOffset', new THREE.InstancedBufferAttribute(offsets, 3));
  geo.setAttribute('instanceSpeed', new THREE.InstancedBufferAttribute(speeds, 1));
  geo.setAttribute('instanceSize', new THREE.InstancedBufferAttribute(sizes, 1));
  geo.setAttribute('instanceRotation', new THREE.InstancedBufferAttribute(rotations, 1));
  geo.setAttribute('instancePhase', new THREE.InstancedBufferAttribute(phases, 1));

  const uniforms = {
    uTime: { value: 0 },
    uOpacity: { value: ctx.opacity / 100 },
    uViewSize: { value: new THREE.Vector2(ctx.viewWidth, ctx.viewHeight) },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      attribute vec3 instanceOffset;
      attribute float instanceSpeed;
      attribute float instanceSize;
      attribute float instanceRotation;
      attribute float instancePhase;
      uniform float uTime;
      uniform vec2 uViewSize;
      varying float vAlpha;
      void main() {
        float progress = fract(uTime * instanceSpeed + instancePhase);
        float travel = (uViewSize.y * 0.5) - progress * (uViewSize.y + 20.0);
        float angle = instanceRotation + uTime * instanceSpeed * 3.0;
        vec2 rotated = vec2(position.x * cos(angle) - position.y * sin(angle), position.x * sin(angle) + position.y * cos(angle));
        vec3 transformed = vec3(rotated * instanceSize, position.z);
        transformed.x += instanceOffset.x;
        transformed.y += travel + instanceOffset.y;
        transformed.z += -5.0 + instanceOffset.z;
        vAlpha = 1.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        gl_FragColor = vec4(0.95, 0.98, 1.0, vAlpha * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  group.add(mesh);

  return {
    group,
    update(delta) {
      uniforms.uTime.value += delta;
      uniforms.uViewSize.value.set(ctx.viewWidth, ctx.viewHeight);
    },
    setOpacity(v) {
      uniforms.uOpacity.value = Math.max(0, Math.min(1, v / 100));
    },
    onResize(w, h) {
      ctx.viewWidth = w;
      ctx.viewHeight = h;
      uniforms.uViewSize.value.set(w, h);
    },
    dispose() {
      geo.dispose();
      mat.dispose();
    },
  };
}
