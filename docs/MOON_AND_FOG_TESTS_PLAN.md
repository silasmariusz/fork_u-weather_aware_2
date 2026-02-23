# Plan: Księżyc + Symulacja mgły w dev mode

## 1. Księżyc – zidentyfikowane problemy

### 1.1 URL-e tekstur
- **Produkcja (HACS):** `/hacsfiles/fork_u_weather_aware_2/assets/moon_albedo.jpg` – OK
- **Test platforma (localhost):** te same URL-e dają **404**, bo Vite nie serwuje `/hacsfiles/...`
- **Rozwiązanie:** W dev mode test platformy ustawić `moon_texture_url: '/assets/moon_albedo.jpg'` i skopiować assety do `public/assets/` (Vite serwuje `public/` z roota)

### 1.2 Dwa księżyce widoczne równocześnie
- Fallback (prosty okrąg) jest zawsze dodawany gdy `moonPosition` jest OK
- Teksturowana kula jest dodawana asynchronicznie po załadowaniu obrazów
- **Fallback nigdy nie jest ukrywany** → użytkownik widzi oba (krąg + kulę)
- **Rozwiązanie:** Gdy `moonTexturedMesh` się załaduje, ustawić `moonMesh.visible = false`

### 1.3 Tangenty / normal map
- `SphereGeometry` nie ma `computeTangents()` w nowych Three.js
- Shader zakłada `attribute vec4 tangent` – brak atrybutu → błąd lub dziwny wygląd
- **Rozwiązanie:** Użyć `MeshStandardMaterial` z `map` i `normalMap` – Three.js obsługuje normal mapping wewnętrznie (wymaga tangents w geometrii). Alternatywa: użyć tylko albedo (bez normal map) z `MeshBasicMaterial` lub prostym shaderem – wtedy księżyc będzie widoczny, choć bez reliefu.

### 1.4 Brak logowania przy błędzie ładowania
- `.catch(() => {})` po cichu ignoruje błędy (np. 404)
- Użytkownik nie wie, że tekstury się nie załadowały
- **Rozwiązanie:** `catch(err => console.warn('[Weather] Moon texture load failed:', err))`

### 1.5 Proponowane testy księżyca
- [ ] **Test 1 – URL-e:** W dev mode sprawdzić, że assety ładują się (brak 404)
- [ ] **Test 2 – Fallback vs tekstura:** Po załadowaniu tekstury widoczny tylko jeden księżyc (bez duplikatu)
- [ ] **Test 3 – Pozycja:** Księżyc w prawym górnym rogu (domyślne mp) lub zgodnie z sensorem
- [ ] **Test 4 – Opacity:** `moon_opacity_max` zmienia widoczność
- [ ] **Test 5 – Clear night:** Efekt "Clear night" pokazuje księżyc + gwiazdy
- [ ] **Scenariusz testowy:** Przycisk „Test Moon” → Clear night + max opacity + local URLs

---

## 2. Symulacja mgły w development mode

### 2.1 Aktualny stan
- `fogIntensity` pochodzi z `getEstimatedFogScore()` (humidity + cloud coverage + PM2.5)
- W dev mode: `debug_humidity`, `debug_cloud_coverage` wpływają na wynik
- Mgła pokazuje się jako **overlay**, gdy `effect !== fog_light/fog_dense` i `fogIntensity > 0.25`

### 2.2 Ograniczenia
- Żeby zobaczyć mgłę nad innymi efektami (np. stars), trzeba ręcznie ustawić `debug_humidity` i `debug_cloud_coverage`
- Brak bezpośredniego „Force fog” – użytkownik musi kombinować z wartościami

### 2.3 Rozwiązanie
- **Nowy parametr:** `debug_fog_intensity` (0–1)
- **Gdy ustawiony w dev mode:** Nadpisuje obliczony `fogIntensity` – np. 0.8 = mocna mgła
- **Test platforma:** Kontrolka „Fog intensity (0–1)” + scenariusz „Fog over stars”

---

## 3. Checklist wdrożenia

- [x] Ukryć fallback moon gdy textured moon załadowany
- [x] Dodać log przy błędzie ładowania tekstur
- [x] geo.computeTangents() – BufferGeometry ma tę metodę w Three.js 0.170
- [x] W devCfg (index.html) ustawić local URLs dla moon textures
- [x] Dodać `public/assets/` – user kopiuje moon textures (patrz README.txt)
- [x] Dodać `debug_fog_intensity` (config, weather-overlay, engine extras)
- [x] Dodać kontrolkę „Fog intensity” w test platformie
- [x] Dodać scenariusz „Fog over stars”
- [ ] Zaktualizować edytor o `debug_fog_intensity` (opcjonalnie)
