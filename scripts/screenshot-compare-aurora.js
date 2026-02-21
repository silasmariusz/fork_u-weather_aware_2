/**
 * Zrzuty do porównania: referencja beautiful-aurora vs nasz footer-lights (header)
 */
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const REF_HTML = join(__dirname, '..', '..', 'aurora-reference', 'beautiful-aurora-footer-lights', 'dist', 'index.html');

async function main() {
  const puppeteer = await import('puppeteer');
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.default.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // 1. Zrzut referencji (beautiful-aurora-footer-lights)
    const refPath = 'file:///' + REF_HTML.replace(/\\/g, '/');
    await page.goto(refPath, { waitUntil: 'networkidle0', timeout: 5000 });
    await new Promise((r) => setTimeout(r, 500));
    const refOut = join(OUT_DIR, 'aurora-reference-beautiful.png');
    await page.screenshot({ path: refOut });
    console.log('Zapisano referencję: aurora-reference-beautiful.png');

    // 2. Zrzut naszego efektu (footer-lights w headerze)
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('#effect-btns', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1200));

    await page.evaluate(() => {
      window.ForkUWeatherAwareConfig.debug_aurora_score = 1;
      window.ForkUWeatherAwareConfig.aurora_variant = 'footer-lights';
      window.ForkUWeatherAwareConfig.test_effect = 'stars';
      const auroraInput = document.getElementById('debug-aurora');
      if (auroraInput) { auroraInput.value = '1'; auroraInput.dispatchEvent(new Event('input', { bubbles: true })); }
      const sel = document.getElementById('aurora-variant');
      if (sel) sel.value = 'footer-lights';
      if (sel) sel.dispatchEvent(new Event('change', { bubbles: true }));
    });

    const btn = await page.$('#effect-btns .btn[data-effect="stars"]');
    if (btn) await btn.click();

    await page.evaluate(() => window.dispatchEvent(new Event('fork-u-weather-force-update')));
    await new Promise((r) => setTimeout(r, 800));
    await page.evaluate(() => window.dispatchEvent(new Event('fork-u-weather-force-update')));
    await new Promise((r) => setTimeout(r, 1000));

    const ourOut = join(OUT_DIR, 'aurora-our-footer-lights-header.png');
    await page.screenshot({ path: ourOut });
    console.log('Zapisano nasz efekt: aurora-our-footer-lights-header.png');
    console.log('');
    console.log('Porównaj screenshots/aurora-reference-beautiful.png vs aurora-our-footer-lights-header.png');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
