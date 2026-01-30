const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-gpu'] });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });
  try {
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle' });
    await new Promise(r => setTimeout(r, 3000)); // Espera o Next.js hidratar
    await page.screenshot({ path: 'current-design-v2.png', fullPage: true });
    console.log('FOTO_CAPTURADA: current-design-v2.png');
  } catch (e) {
    console.error('ERRO_NA_CAPTURA');
  } finally {
    await browser.close();
  }
})();