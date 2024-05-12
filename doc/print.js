import puppeteer from 'puppeteer'

const BROWSER = await puppeteer.launch({ headless: true });
const page = await BROWSER.newPage();
await page.goto('http://localhost:5500/doc/test-page.html', {
  waitUntil: 'networkidle0'
});
await page.pdf({
  format: 'A4',
  printBackground: true,
  path: 'test-page-a4.pdf'
})

await page.pdf({
  height: `297mm`,
  width: `${297 * 3 / 4}mm`,
  printBackground: true,
  path: 'test-page-4-3.pdf'
})

await BROWSER.close()

