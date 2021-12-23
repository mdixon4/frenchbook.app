const chromium = require('chrome-aws-lambda')

exports.handler = async (event) => {

  const pageToScreenshot = event.queryStringParameters.url;
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless
  })
  const page = await browser.newPage()
  await page.goto(pageToScreenshot)
  const screenshot = await page.screenshot({
    encoding: 'base64'
  })
  await browser.close()
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png'
    },
    body: screenshot,
    isBase64Encoded: true
  }
}