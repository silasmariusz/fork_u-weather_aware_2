# Plan napraw i implementacji – Fork U Weather Aware

## Wykonane w tej sesji

1. **Bubble mode – z-index 3** ✓  
   - `getSpatialZIndex()`: bubble = 3, background = -1  
   - Poprawka w edytorze: "z-index -3" → "z-index 3"

2. **Glow księżyca** ✓  
   - Zmniejszenie rozmiaru z 0.45 na 0.35, żeby nie było ucięcia

3. **Smog od dołu** ✓  
   - vMask: smog gęsty na dole, zanika ku górze  
   - Animacja: przesuw `uv` w górę (0.06 * uTime na Y)

---

## Do zrobienia (kolejność sugerowana)

### 1. Wiatr → kierunek opadów (rain/snow tilt)

**Cel:** Kierunek wiatru ma wpływać na odchylenie kropel deszczu i śniegu.

**Kroki:**
- W `weather-overlay-three.js` odczytać `wind_direction_entity` i `wind_speed_entity`
- Przekazać do `engine.start()`: `windBearing` (0–360°), `windSpeedKmh`, `rainMaxTiltDeg`, `windSwayFactor`
- W `weather-effects-core.js`:
  - W `createRainEffect(ctx)` użyć `ctx.windBearing` do obliczenia `uWindTilt` w shaderze
  - W vertex shaderze: dodać offset X w zależności od kierunku wiatru
  - Analogicznie dla `createSnowEffect` i `createSnowy2Effect`

### 2. Promienie słońca – nowa koncepcja

**Cel:** 
- Wschód: glow od lewej, wznoszący się
- Południe: glow u góry ekranu (np. telefon)
- Zachód: zejście glow prawą krawędzią
- Kolory: żółty (południe), zachód/wschód (pomarańcz/czerwony)
- UV: wysokie UV → intensywny pomarańcz (ostrzeżenie)

**Kroki:**
- Korzystać z `sun_entity` (azimuth, elevation)
- Mapować pozycję słońca na ekran (lewo = wschód, prawo = zachód, góra = południe)
- W `createSunBeamEffect`:
  - Przekazać `sunAzimuth`, `sunElevation`, `uvIndex`
  - Ustawić origin promieni według pozycji słońca
  - Kolor: UV 6+ → pomarańczowy, zachód → czerwono-pomarańczowy, wschód → różowo-pomarańczowy

### 3. Błyskawice – sterowane czujnikiem

**Cel:**
- Max 1 bolt/flash na 20 s (limit)
- Regularnie odczytywać `lightning_counter_entity`
- Przyrost np. +3 → 3 uderzenia
- `lightning_distance_entity` → czas do grzmotu → synchronizacja flashy ze „sygnałem” grzmotu

**Kroki:**
- W `weather-overlay-three.js` subskrybować `lightning_counter` i `lightning_distance`
- Przekazać do core: `lightningCount`, `lightningDistance`, `lastLightningCount`
- W `createLightningEffect`:
  - Co klatkę sprawdzać przyrost liczby wyładowań
  - Limit 20 s między boltami
  - Dystans (km) → czas do grzmotu (≈ 3 s/km) → opóźnienie flashów

### 4. Krople deszczu na szybie (raindrops.js style)

**Cel:** Krople spływające po ekranie z efektem refrakcji/odbicia jak w [Gist raindrops](https://gist.github.com/silasmariusz/6d0aa431b15a43bda7ee97f773f3660b).

**Uwagi:**
- Gist używa `raindrops.js` (WebGL) w iframe
- Trzeba zaimplementować podobny efekt w Three.js / WebGL overlay
- Krople z odbiciem światła, refrakcją tła
- Opcjonalnie: osobna warstwa nad obecnym overlay

**Kroki (szacunkowe):**
- Albo: warstwa Canvas 2D z kroplami (prostsza)
- Albo: shader w Three.js z texture z tła + distortion
- Rozważyć integrację z `windowDroplets` lub osobną warstwą „screen droplets”

---

## Konfiguracja (już istniejąca)

- `wind_speed_entity`, `wind_direction_entity`
- `rain_max_tilt_deg`, `wind_sway_factor`
- `uv_index_entity`
- `lightning_counter_entity`, `lightning_distance_entity`
- `sun_entity`

---

## Pliki do modyfikacji

| Zadanie           | Pliki                                            |
|-------------------|--------------------------------------------------|
| Wiatr             | `weather-overlay-three.js`, `weather-effects-core.js`, worker |
| Słońce            | `weather-overlay-three.js`, `weather-effects-core.js` |
| Błyskawice        | `weather-overlay-three.js`, `weather-effects-core.js` |
| Raindrops.js style| nowy moduł + `weather-overlay-three.js`         |

---

## Braki w edytorze (README vs editor)

| Opcja | W README | W edytorze | Uwagi |
|-------|----------|------------|-------|
| `rain_max_tilt_deg` | ✓ (30) | ❌ | Brak pola – ustawiany przez YAML |
| `rain_wind_min_kmh` | ✓ (3) | ❌ | Brak pola – ustawiany przez YAML |
| `theme_mode` | ✓ (null=auto) | ❌ | Ustawiane z hass.themes – brak ręcznego override |
| `gaming_mode_entity` | input_boolean / binary_sensor | tylko input_boolean | Dodać `binary_sensor` do domains |
| `precipitation` → prędkość deszczu | ✓ | sensor jest | Sprawdzić, czy Three.js używa do speed |
| `cloud_coverage` → gęstość chmur/fogu | ✓ | sensor jest | Sprawdzić użycie |
| `TOGGLE_ENTITY`, `ENABLED_DASHBOARDS` | w przykładach | ❌ | Stałe w kodzie, nie w edytorze |

**Do dodania w edytorze:** `rain_max_tilt_deg`, `rain_wind_min_kmh` w sekcji Wind & clouds.
