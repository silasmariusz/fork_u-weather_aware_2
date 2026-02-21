/**
 * Zrzut ekranu aurory (bands) – Clear night z wysokim aurora score
 */
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '..', 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

async function main() {
  const puppeteer = await import('puppeteer');
  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.default.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 15000 });
    await page.waitForSelector('#effect-btns', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1000));

    // Clear night + aurora footer-lights (beautiful-aurora style), score 1
    await page.evaluate(() => {
      window.ForkUWeatherAwareConfig.debug_aurora_score = 1;
      window.ForkUWeatherAwareConfig.aurora_variant = 'footer-lights';
      window.ForkUWeatherAwareConfig.test_effect = 'stars';
      window.dispatchEvent(new Event('fork-u-weather-force-update'));
    });

    const btn = await page.$('#effect-btns .btn[data-effect="stars"]');
    if (btn) await btn.click();

    const auroraInput = await page.$('#debug-aurora');
    if (auroraInput) {
      await auroraInput.click({ clickCount: 3 });
      await auroraInput.type('1');
      await page.evaluate(() => window.dispatchEvent(new Event('fork-u-weather-force-update')));
    }
    const variantSelect = await page.$('#aurora-variant');
    if (variantSelect) await variantSelect.select('footer-lights');

    await new Promise((r) => setTimeout(r, 2000));
    await page.evaluate(() => window.dispatchEvent(new Event('fork-u-weather-force-update')));

    const path = join(OUT_DIR, 'aurora-footer-lights.png');
    await page.screenshot({ path });
    console.log('Zapisano: aurora-footer-lights.png');
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
