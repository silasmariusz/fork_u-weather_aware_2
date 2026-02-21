# Rain droplets (NordicBeaver-style) – propozycja

Efekt kropli na szybie (zniekształcenie UV) do ewentualnej implementacji.

## Źródła

- **Artykuł:** [Making a rain animation with WebGL shaders in Three.js](https://dev.to/nordicbeaver/making-rain-animation-with-webgl-shaders-in-threejs-4ic5)
- **Wideo:** [YouTube – proces tworzenia](https://www.youtube.com/watch?v=Rl3clbrsI40)
- **Kod:** [NordicBeaver/rain-shader](https://github.com/NordicBeaver/rain-shader)

## Idea

W fragment shaderze generowane są „krople” w siatce komórek: dla każdego piksela wokół kropli liczone jest zniekształcenie UV, które potem jest nakładane na próbkowanie tekstury tła. Daje to wrażenie kropli na szybie zamiast rysowanych linii deszczu.

- Funkcja `Drops(uv, seed)` zwraca wektor zniekształcenia UV.
- Krople pojawiają się i znikają w czasie (`dropIntensity`).
- Wielokrotne wywołanie (np. 10×) z różnymi seedami daje losowy wzór.

## Integracja z Fork U Weather Aware

- Opcja: **osobny efekt** (np. `rain_droplets` / „Krople na szybie”) lub **nakładka** na obecny deszcz.
- Wymaga renderowania sceny do tekstury i użycia jej jako `u_texture` w shaderze kropli.
- Można dodać jako drugi tryb deszczu (particle rain vs. window-droplets distortion).
