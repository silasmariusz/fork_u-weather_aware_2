# Platforma testowa efektów pogodowych

## Uruchomienie

**Nie otwieraj pliku `index.html` bezpośrednio z dysku (file://).** Przeglądarki blokują moduły ES z powodów CORS.

Użyj serwera deweloperskiego:

```bash
cd fork_u-weather_aware_2   # katalog projektu
npm run serve
```

Potem otwórz w przeglądarce adres (zwykle `http://localhost:5173`).

## Alternatywa (Vite)

```bash
npx vite
```

---

## Fog vs Smog vs Chmury – rozkład na ekranie

| Efekt | Pozycja | Opis |
|-------|---------|------|
| **Chmury** | górna część | `createCloudEffect` – mesh na y = +25% wysokości, maska 0.3–0.8 |
| **Fog (mgła)** | środek | `createFogOverlay` – pasek 25% wysokości na środku ekranu, maska gaussowa |
| **Smog** | dolna część | `createSmogOverlay` – pełny ekran, maska wzmacnia dolę (vMask) |
