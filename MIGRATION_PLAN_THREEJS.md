# Plan migracji: Canvas 2D → Three.js (WebGL)

**Fork U - Weather Aware 2**  
Cel: Lepsza wydajność, mniejsze zużycie baterii na telefonie.

## Status implementacji

| Komponent | Status |
|-----------|--------|
| Vite + Three.js | ✓ |
| Worker (OffscreenCanvas) | ✓ |
| Rain, snow, fog, clouds | ✓ |
| Sun beams, lightning, hail | ✓ |
| Stars + moon glow | ✓ |
| Smog (PM2.5/PM10) | ✓ |
| Wind → clouds | ✓ |
| WebGL detect + fallback | ✓ |
| prefers-reduced-motion | ✓ |
| gaming_matrix_only | ✓ (effect=none) |
| Matrix rain | ✓ |
| Snowy2 warstwy | ✓ |
| Window droplets | ✓ |
| Gradient-mask (spatial_mode) | ✓ |

**Build:** `npm run build` lub `npm run build:hacs`

---

## Spis treści

1. [Faza 0: Przygotowanie](#faza-0-przygotowanie)
2. [Faza 1: Fundament Three.js](#faza-1-fundament-threejs)
3. [Faza 2: Migracja efektów](#faza-2-migracja-efektów)
4. [Faza 3: Web Worker](#faza-3-web-worker)
5. [Faza 4: Optymalizacje mobile](#faza-4-optymalizacje-mobile)
6. [Faza 5: Fallback i testy](#faza-5-fallback-i-testy)
7. [Struktura plików docelowa](#struktura-plików-docelowa)
8. [Szacunek czasowy](#szacunek-czasowy)

---

## Faza 0: Przygotowanie

### 0.1 Decyzja: Bundler vs CDN

| Opcja | Zalety | Wady |
|-------|--------|------|
| **CDN** (skrypt w HTML) | Szybki start, brak zmian w buildzie | Three.js ~600KB, nie tree-shaking, zależność od sieci |
| **Vite/Rollup** | Tree-shaking (mniejszy bundle), modułowość | Wymaga zmiany procesu budowania karty HA |

**Rekomendacja:** Bundler (Vite). Większość nowoczesnych kart HA już używa bundlera. Three.js z `import` daje ok. ~150–200 KB gzip po tree-shake.

### 0.2 Instalacja (jeśli Vite)

```bash
npm create vite@latest . -- --template vanilla
npm install three
```

### 0.3 Konfiguracja wyjścia dla HACS

- Build powinien produkować jeden plik `.js` (np. `fork_u-weather_aware.js`) ładowany przez Lovelace.
- W `vite.config.js` ustawić `output.format: 'iife'` i `output.file` na docelową nazwę.

---

## Faza 1: Fundament Three.js

### 1.1 Nowa struktura modułu

```
weather-overlay.js (lub weather-overlay.ts)
├── initThreeRenderer()
├── resize()
├── destroy()
└── setEffect(effectType)
```

### 1.2 Kroki implementacji

1. **Utworzenie sceny**
   - `THREE.Scene()`
   - `THREE.OrthographicCamera()` – widok 2D (jak Canvas)
   - `THREE.WebGLRenderer({ alpha: true, antialias: !isMobile })`

2. **Montowanie canvas**
   - Renderer tworzy własny `<canvas>`
   - Umieszczenie w tym samym kontenerze co obecny (np. `document.body` lub warstwa overlay)

3. **Render loop**
   - Zamiana `requestAnimationFrame` + `ctx.clearRect` + rysowanie na `renderer.render(scene, camera)`
   - Zachowanie aktualnego flow: `updateWeather()` → `animate()` → aktualizacja efektu

4. **API kompatybilne z kartą**
   - `window.ForkUWeatherAwareConfig` – bez zmian
   - Logika `getWeatherState()`, `isOverlayEnabled()`, `isOnEnabledDashboard()` – bez zmian
   - Tylko warstwa rysowania (Canvas → Three.js) jest wymieniana

### 1.3 Mapowanie stanów pogody → efektów

Zachować istniejące mapowanie, np.:

| Weather state | Effect (Three.js) |
|---------------|-------------------|
| sunny | sun_beams |
| sunny2 | sun_beams |
| cloudy / partlycloudy | clouds |
| fog | fog_light / fog_dense |
| rainy / pouring / rainy-drizzle | rain / rain_storm / rain_drizzle |
| snowy | snow_gentle |
| snowy2 / snowy-rainy | snow_gentle + layers |
| lightning / lightning-rainy | lightning / rain_storm |
| hail | hail |
| clear-night | stars (+ moon_glow) |
| windy | wind (opcjonalnie) |

---

## Faza 2: Migracja efektów

### Kolejność i szczegóły

#### 2.1 Sun Beams (prosty)
- **Implementacja:** `createSunBeamEffect()`
- PlaneGeometry pełnoekranowe + ShaderMaterial
- Vertex: pass-through UV/position
- Fragment: rays od `vec2(1.1, 1.05)` z `sin(angle * 18 + uTime)` + smoothstep

#### 2.2 Clouds
- **Implementacja:** `createCloudEffect()`
- PlaneGeometry (np. 60% wysokości), pozycja u góry
- Shader: FBM (fractal Brownian motion) noise, `smoothstep(0.2, 0.7, f)`
- Używane: `uTime`, `uOpacity`, `uScale` (mobile), `uCloudColor`, `uCloudShadow`

#### 2.3 Fog (light/dense)
- **Implementacja:** `createFogEffect()` + `getFogSettings()`
- Kilka warstw PlaneGeometry z ShaderMaterial
- Shader: hash + noise + fbm, `smoothstep(uLow, uHigh, density)`
- Parametry: scale, speed, flow, low, high, contrast, color

#### 2.4 Rain
- **Implementacja:** `createRainEffect()`
- InstancedBufferGeometry: wiele „linii” deszczu w jednym draw call
- Atrybuty: instanceOffset, instanceSpeed, instanceLength, instanceSway, instancePhase
- Shader vertex: `progress = fract(uTime * speed + phase)`, pozycja Y
- Shader fragment: alpha z `vAlpha * uOpacity`
- Dla rain_storm: lightning overlay

#### 2.5 Snow
- **Implementacja:** `createSnowEffect()`
- BufferGeometry + Points (position), PointsMaterial z teksturą „płatka”
- Pętla JS w `update()`: zmiana position array, `needsUpdate = true`
- Opcjonalnie: snow accumulation (shader na górze/dole ekranu)

#### 2.6 Lightning
- **Implementacja:** (w rain_storm lub osobny `createLightningEffect()`)
- PlaneGeometry fullscreen + ShaderMaterial (jagged line w fragmencie)
- Timer w JS: losowy interwał, trigger flash, fade out
- `uFlash`, `uOrigin`, `uTime` w shaderze

#### 2.7 Hail
- **Implementacja:** `createHailEffect()`
- InstancedBufferGeometry, małe kwadraty (PlaneGeometry 0.25×0.25)
- Vertex: rotacja + spadanie w dół, bez sway
- Fragment: białe lodowe kolory

#### 2.8 Stars
- BufferGeometry (position), Points, tekstura gwiazdki
- Lub proste kółka/cross w PointsMaterial
- Logika mrugania w `update()`: phase, opacity

#### 2.9 Moon Glow
- Analogicznie do sun beams: radial gradient (plane lub shader)
- Pozycja z `getMoonPosition()`, rozmiar/intensywność z distance

#### 2.10 Matrix (gaming)
- **Złożoność:** wysoka
- Opcja A: wiele PlaneGeometry z Texture (atlas znaków), animacja w JS
- Opcja B: sprite-based
- Znaki: texture per character lub atlas

#### 2.11 Smog
- Podobnie do fog: warstwy shaderowe lub cząstki (Points)
- Kolory szaro-brązowe, ruch w górę

#### 2.12 Snowy2 (warstwy)
- Kilka warstw Points (różne rozmiary, prędkości, blur)
- Logika „pile” (akumulacja) – można uprościć lub pominąć na start

#### 2.13 Window droplets
- **Złożoność:** wysoka (fizyka, overlap)
- Można na początek zostawić w Canvas 2D lub zrobić proste sprites w Three.js

---

## Faza 3: Web Worker

### 3.1 Wymagania

- `OffscreenCanvas` – wsparcie w głównych przeglądarkach
- `transferControlToOffscreen()` na `<canvas>`
- Worker: import tego samego kodu Three.js (lub osobny bundle workera)

### 3.2 Architektura

```
Main thread:
  - WeatherEffectsEngine
  - Tworzy Worker
  - postMessage: INIT (canvas, viewport), START (effect, opacity), RESIZE, STOP, DISPOSE
  - onmessage: READY, ERROR

Worker:
  - dynamic-weather-worker.js
  - Importuje WeatherEffectsCore (Three.js)
  - Obsługuje wiadomości, uruchamia render loop wewnątrz workera
```

### 3.3 Fallback

Jeśli `Worker` lub `OffscreenCanvas` niedostępne → uruchomienie Three.js w main thread (bez workera). Działa, ale main thread jest obciążony.

---

## Faza 4: Optymalizacje mobile

| Optymalizacja | Implementacja |
|---------------|---------------|
| DPR cap | `Math.min(devicePixelRatio, 2)` na mobile |
| Mniej cząstek | `isMobile ? 0.6 * count : count` dla rain, snow, clouds |
| Prostsze shadery | Mniej iteracji FBM, niższa rozdzielczość noise |
| 30 FPS | Throttle `requestAnimationFrame` do ~33 ms |
| Wyłączenie antialiasingu | `antialias: !isMobile` w WebGLRenderer |
| Snowy2 light | Mniej warstw, mniej płatków (już jest w config) |

---

## Faza 5: Fallback i testy

### 5.1 Wykrywanie WebGL

```javascript
function isWebGLSupported() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}
```

### 5.2 Strategia fallback

1. Brak WebGL → ukryć overlay, wyświetlić komunikat (opcjonalnie)
2. Nieudana inicjalizacja Three.js → fallback do starego Canvas 2D (jeśli zachowany)
3. Worker się nie uruchomi → Three.js w main thread

### 5.3 Testy

- [ ] Chrome, Firefox, Safari (desktop + mobile)
- [ ] Android (Chrome, possibly Kiwi/Firefox)
- [ ] iOS Safari
- [ ] Różne DPR (1, 2, 3)
- [ ] `prefers-reduced-motion: reduce` – zatrzymanie animacji
- [ ] Dashboard w trybie edycji (preview)
- [ ] Wszystkie stany pogody + development_mode (test_effect)

---

## Struktura plików docelowa

```
fork_u-weather_aware_2/
├── src/
│   ├── weather-effects-core.js      # Three.js logika efektów
│   ├── weather-effects-engine.js    # Orkiestracja main/worker
│   ├── weather-worker-messages.js   # Typy wiadomości
│   ├── workers/
│   │   └── dynamic-weather-worker.js # Worker
│   └── weather-overlay.js           # Entry: config, getWeatherState, init, update loop
├── fork_u-weather_aware.js          # Loader karty (bez zmian lub minimalne)
├── fork_u-weather_aware-editor.js   # Edytor (bez zmian)
├── vite.config.js
├── package.json
└── MIGRATION_PLAN_THREEJS.md        # Ten dokument
```

Po buildzie: jeden `fork_u-weather_aware.js` (lub kilka chunków, jeśli code-splitting).

---

## Szacunek czasowy

| Faza | Czas (orientacyjnie) |
|------|----------------------|
| Faza 0: Przygotowanie | 0,5–1 dzień |
| Faza 1: Fundament | 1–2 dni |
| Faza 2: Efekty (wszystkie) | 5–10 dni |
| Faza 3: Web Worker | 1–2 dni |
| Faza 4: Mobile | 0,5 dnia |
| Faza 5: Fallback + testy | 1–2 dni |
| **Razem** | **~2–3 tygodnie** |

---

## Referencje

- [Three.js docs](https://threejs.org/docs/)
- [OffscreenCanvas – MDN](https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas)
