# Plan: miękkie przejście słońca i księżyca do tła

## Problem

Na zrzucie widać:
- **Twarde przejście** – wyraźna linia/krawędź gdzie efekt słońca/księżyca styka się z tłem
- **Niewidoczne przejście transparentne** – efekt powinien płynnie zanikać, zamiast kończyć się ostro

## Obecna implementacja (2.6.2)

### Słońce (`createSunBeamEffect`, ok. linia 1697)

```
- Pełnoekranowy plane z shaderem
- alpha = clamp((core*0.55 + halo*0.35 + beam) * 0.32 * uOpacity, 0, 1)
- Blending: AdditiveBlending
- smoothstep(0.18, 0.0, dist) – core
- smoothstep(0.62, 0.08, dist) – halo
- smoothstep(0.9, 0.15, dist) * rays – beam (promienie)
```

**Źródła twardej krawędzi:**
1. `clamp(..., 0, 1)` – górna granica może obcinać gradient
2. Szybkie przejście w `smoothstep(0.9, 0.15, dist)` – przy dist≈0.9 alpha spada do 0 → potencjalna ostra granica
3. Brak dodatkowego fade-out na obrzeżach ekranu

### Księżyc (`createStarsEffect`, ok. linia 985)

**moonMesh (tarcza):**
```glsl
if (d > 1.0) discard;   // ← PROBLEM: twarde obcięcie
float core = smoothstep(0.34, 0.0, d);
float halo = smoothstep(1.0, 0.12, d);
float alpha = (core*0.78 + halo*0.22) * uOpacity;
```

**moonEdgeGlowMesh (glow):**
```glsl
float glow = smoothstep(0.9, 0.05, d);
float alpha = glow * glow * uOpacity;
```

**Źródła twardej krawędzi:**
1. `discard` przy `d > 1.0` – całkowicie ucina piksele poza dyskiem (ostra krawędź)
2. Halo używa smoothstep(1.0, 0.12, d) – przy d>1 powinniśmy mieć 0, ale przez discard nigdy nie renderujemy d>1
3. Krawędź księżyca jest ostra – brak miękkiego zanikania w stronę tła

---

## Plan zmian

### 1. Księżyc – usunięcie `discard`, gradient alpha

**Lokalizacja:** `createStarsEffect`, fragment shader moonMesh

**Obecnie:**
```glsl
if (d > 1.0) discard;
float core = smoothstep(0.34, 0.0, d);
float halo = smoothstep(1.0, 0.12, d);
float alpha = (core*0.78 + halo*0.22) * uOpacity;
```

**Docelowo:**
```glsl
// Usunąć discard – pozwolić alpha naturalnie zanikać
float core = smoothstep(0.34, 0.0, d);
float halo = smoothstep(1.0, 0.12, d);
// Miękki falloff na krawędzi (d od 0.7 do 1.2)
float edgeFade = smoothstep(1.15, 0.65, d);
float alpha = (core*0.78 + halo*0.22) * edgeFade * uOpacity;
```

Efekt: zamiast ostrej krawędzi księżyca – stopniowe zanikanie w kierunku tła.

### 2. Słońce – szersze strefy przejścia, falloff na brzegach

**Lokalizacja:** `createSunBeamEffect`, fragment shader

**Obecnie:** `smoothstep(0.9, 0.15, dist)` dla beam – przy dist=0.9 alpha spada do 0.

**Propozycja:**
- Rozszerzyć zakres smoothstep (np. 0.95 → 0.05 zamiast 0.9 → 0.15)
- Dodać globalny fade względem dist, np. `outerFade = smoothstep(0.95, 0.3, dist)`
- Mnożyć końcową alpha przez `outerFade`, aby efekt stopniowo znikał od centrum na zewnątrz
- Ewentualnie dodać fade od krawędzi ekranu (distance to viewport edge)

```glsl
// Szerszy falloff – efekt zanika łagodnie
float outerFade = smoothstep(0.98, 0.25, dist);
float alpha = clamp((core*0.55 + halo*0.35 + beam) * 0.32 * uOpacity * outerFade, 0.0, 0.98);
// Opcjonalnie: max alpha < 1 aby uniknąć „obcinania” gradientu
```

### 3. Opcjonalnie – NormalBlending zamiast AdditiveBlending

AdditiveBlending może dawać ostre „świecące” brzegi. NormalBlending z poprawnym gradientem alpha zwykle daje gładsze przejścia, ale może zmienić wizualny charakter efektu. Warto przetestować obie opcje.

---

## Checklist implementacji

- [x] **Księżyc:** Usunąć `if (d > 1.0) discard;`
- [x] **Księżyc:** Dodać `edgeFade` w frag shaderze moonMesh
- [x] **Księżyc:** Rozszerzyć moonEdgeGlow smoothstep (0.95, 0.02) dla miękkiego falloff
- [x] **Słońce:** Dodać `outerFade` oparty na dist
- [x] **Słońce:** Rozszerzyć zakresy smoothstep dla beam (0.95, 0.08)
- [x] **Słońce:** Max alpha obniżony do 0.98
- [ ] **Test:** Clear night (księżyc) – czy krawędź jest miękka
- [ ] **Test:** Sunny (słońce) – czy efekt płynnie znika w tle

---

## Ryzyko

Zmiany są mało inwazyjne (głównie shadery). Ryzyko: możliwa zmiana siły/jasności efektu – warto dopasować mnożniki (uOpacity, 0.32, 0.78 itd.) po wizualnym teście.
