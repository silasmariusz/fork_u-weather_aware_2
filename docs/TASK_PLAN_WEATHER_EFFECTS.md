# Plan zadań – efekty pogodowe (Weather Overlay)

**Status:** Po cofnięciu ostatniego commita (7ba17a6). Stan źródłowy przywrócony.

---

## 1. GWIAZDY vs KROPLE DESZCZU – ROZDZIELENIE

**Problem:** Krople deszczu na szybie (window droplets) nie mogą być używane jako gwiazdy. To dwa osobne efekty.

| Efekt | Gdy się pokazuje | Źródło referencyjne |
|-------|------------------|---------------------|
| **Gwiazdy** | `clear-night` (stars) | Osobna warstwa – małe, delikatne punkty światła |
| **Krople na szybie** | rain/snow, opady > 2 mm | `krople_deszczu_realistic-living-rainy-window-generator...zip` – Raindrops.js |

**Zadania:**
- [ ] **1.1** Upewnić się, że `createStarTexture()` i `createWindowDropletsOverlay()` używają **różnych** tekstur/logiki – zero współdzielenia.
- [ ] **1.2** Zastąpić obecne krople (sprzed 9b522c0) implementacją wzorowaną na referencie: Raindrops.js – canvas z kroplami na tle, styl „na szybie frontowej”.
- [ ] **1.3** Krople tylko przy opadach > 2 mm (już jest w `getPrecipitationAmountMm()`).
- [ ] **1.4** Brak sterowania gęstością/wiatrem – jedynie maska i gradientowe chowanie bubble.

---

## 2. CLEAR-NIGHT – CZYSTE NIEBO

**Problem:** „UFO na podłodze”, „dymy”, zapchane tło – efekt miał być subtelny.

**Oczekiwany efekt:**
- Czyste, ciemne niebo
- Delikatny fioletowy gradient u góry
- Widoczne gwiazdy (osobna warstwa, nie krople)
- Delikatny glow z krawędzi ekranu (pozycja księżyca), **nie** na środku ani na dole

**Zadania:**
- [ ] **2.1** Usunąć wszystkie warstwy „dymu”/mgły dla `clear-night`.
- [ ] **2.2** Dodać subtelny fioletowy gradient tylko u góry (np. `smoothstep` od góry).
- [ ] **2.3** Księżyc: okrągły, z radialnym gradientem, **bez** „jajka” ani glow na dole ekranu.
- [ ] **2.4** Edge glow: delikatna poświata od krawędzi (góra/boki) symbolizująca księżyc – **nigdy** na „podłodze”.

---

## 3. AURORA – NA HEADERZE (GÓRA JAK NA NIEBIE)

**Problem:** Aurora była rysowana na dole/„podłodze” zamiast u góry.

**Oczekiwany efekt:** Aurora na górze ekranu, jak na niebie (header = horyzont).

**Referencje:**
- `aurora-background.zip` – `.jumbo` z gradientami, blur, maska radialna u góry
- `beautiful-aurora-footer-lights.zip` – **footer** (dół) – ale user chce aurorę na **górze**

**Zadania:**
- [ ] **3.1** Aurora bands / Northern Gradients: pozycja **top** (np. `topY = viewH/2 - X`), nie bottom.
- [ ] **3.2** Zastosować styl z `beautiful-aurora-footer-lights` – zagnieżdżone sekcje z `box-shadow`, animowane kolory – ale **odwrócone** na górę (header).
- [ ] **3.3** Opcja: aurora jako CSS (jak w ZIP) zamiast WebGL – mniej obciążenia baterii; do rozważenia.

---

## 4. NORTHERN LIGHTS – ODWZOROWANIE REFERENCJI

**Problem:** Northern lights wygląda ładnie i subtelnie, ale nie odpowiada referencjom.

**Referencje:**
- `beautiful-aurora-footer-lights.zip` – 5 zagnieżdżonych `section` z `border-radius: 50%`, `box-shadow` animowane między kolorami (#473C78↔#F72A3B, #18C499↔#D8F05E, itd.), `bottom: -60px`
- `aurora-background.zip` – `.jumbo` z `repeating-linear-gradient`, `blur(10px)`, `mask-image: radial-gradient(ellipse at 100% 0%, ...)`

**Zadania:**
- [ ] **4.1** Zaimplementować rozwiązania z ZIP-ów (style CSS + ewentualnie JS) jako alternatywę lub podstawę.
- [ ] **4.2** Zachować subtelność – nie zalewać całego ekranu.

---

## 5. SŁOŃCE (SUN GLOW)

**Problem:** „Czy to jest glow słońca?” – efekt wyglądał jak UFO/placki.

**Oczekiwany efekt:** Prawdziwy, miękki glow słońca – promienie od pozycji słońca, bez „jajka” ani plam na podłodze.

**Zadania:**
- [ ] **5.1** Sun glow tylko gdy `effect === 'sun_beams'` (słonecznie).
- [ ] **5.2** Pozycja z `sunPosition` (azimuth, elevation) – góra ekranu, nie środek ani dół.
- [ ] **5.3** Miękki radialny glow + delikatne promienie, bez ostrych krawędzi.

---

## 6. PLATFORMA TESTOWA / ZRZUTY EKRANU

**Zadania:**
- [ ] **6.1** Stworzyć prostą stronę HTML (np. `dev/test-effects.html`) z przyciskami do przełączania efektów (clear-night, rain, aurora, sun, clouds).
- [ ] **6.2** Możliwość generowania zrzutów ekranu (np. `html2canvas` lub `canvas.toDataURL`) dla weryfikacji wizualnej.
- [ ] **6.3** Porównanie z referencjami – side-by-side lub overlay.

---

## 7. FOG – NIE ZMIENIAĆ

Fog jest oznaczony jako **nie do modyfikacji** bez zezwolenia. Obecna implementacja ma zostać bez zmian.

---

## Kolejność realizacji (proponowana)

1. **2** (clear-night) – najpilniejsze, usuwa „UFO” i bałagan
2. **5** (sun glow) – drugie w kolejności
3. **3** (aurora na headerze)
4. **1** (rozdzielenie gwiazd i kropli + nowe krople)
5. **4** (Northern lights z referencji)
6. **6** (platforma testowa)

---

## Pliki referencyjne (rozpakowane)

- `_refs/footer/beautiful-aurora-footer-lights/` – aurora footer (CSS)
- `_refs/aurora/aurora-background/` – aurora jumbo (CSS)
- `_refs/rain/realistic-living-rainy-window-generator.../` – Raindrops.js, krople na szybie
