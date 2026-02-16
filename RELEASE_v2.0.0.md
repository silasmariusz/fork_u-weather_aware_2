# Release v2.0.0

## Three.js WebGL overlay

Migracja z Canvas 2D na Three.js (WebGL). Lepsza wydajność, mniejsze zużycie baterii na telefonie.

### Główne zmiany

- **WebGL / Three.js** – GPU-accelerated efekty pogodowe
- **Web Worker** – renderowanie w OffscreenCanvas (gdy dostępne)
- **Efekty**: deszcz, śnieg, mgła, chmury, promienie słońca, błyskawice, grad, gwiazdy, glow księżyca, smog, Matrix
- **Snowy2** – warstwowy efekt śniegu
- **Window droplets** – kropelki na szybie przy deszczu
- **Gradient-mask** – tryb `spatial_mode: 'gradient-mask'` (efekt przy krawędziach)
- **WebGL fallback** – main thread gdy Worker niedostępny
- **prefers-reduced-motion** – wyłączenie animacji na życzenie
- **README** – sekcja Requirements (WebGL)
- **Poprawki** – ctx null checks w funkcjach tekstur (weather-overlay.js)

### Wymagania

- WebGL (obsługiwane przez nowoczesne przeglądarki)
- `extra_module_url` w configuration.yaml

### Instalacja HACS

```
https://github.com/silasmariusz/fork_u-weather_aware_2
```
