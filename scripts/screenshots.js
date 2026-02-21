/**
 * Generuje zrzuty ekranu wszystkich efektów pogodowych.
 * Wymaga: serwer działa (npm run serve), puppeteer (npm install puppeteer).
 *
 * Uruchom: node scripts/screenshots.js
 */
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

const EFFECTS = [
  { id: 'stars', label: 'clear-night' },
  { id: 'sunny', label: 'sunny' },
  { id: 'cloudy', label: 'cloudy' },
  { id: 'rainy', label: 'rain' },
  { id: 'pouring', label: 'storm' },
  { id: 'rainy-drizzle', label: 'drizzle' },
  { id: 'snowy', label: 'snow' },
  { id: 'snowy-rainy', label: 'snow-storm' },
  { id: 'fog', label: 'fog' },
];

async function main() {
  let puppeteer;
  try {
    puppeteer = await import('puppeteer');
  } catch (e) {
    console.error('Zainstaluj puppeteer: npm install puppeteer');
    process.exit(1);
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  console.log('Uruchamiam przeglądarkę...');
  const browser = await puppeteer.default.launch({ headless: 'new' });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 15000 });

    await page.waitForSelector('#effect-btns', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 3000));

    for (const { id, label } of EFFECTS) {
      const btn = await page.$(`#effect-btns .btn[data-effect="${id}"]`);
      if (!btn) {
        console.warn(`  Pomijam ${label} – brak przycisku`);
        continue;
      }
      await btn.click();
      await new Promise((r) => setTimeout(r, 2500));

      const path = join(OUT_DIR, `effect-${label}.png`);
      await page.screenshot({ path });
      console.log(`  Zapisano: effect-${label}.png`);
    }

    console.log(`\nZrzuty zapisane w: ${OUT_DIR}`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
