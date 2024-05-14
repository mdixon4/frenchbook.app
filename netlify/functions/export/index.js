import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import md5 from 'md5'
import { toUrlHash } from './_util'
import { getPresignedUrl, storage, fileExists } from './_storage'

const API_KEY = process.env.PDF_API_KEY
const FRENCHBOOK_URL = 'https://beta.frenchbook.app/'

const abort = (statusCode, message) => {
  return {
    statusCode: statusCode || 401,
    headers: {
      "content-type": 'application/json'
    },
    body: JSON.stringify({ message: message || "Error" })
  }
}

const render = async (url) => {
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    defaultViewport: chromium.defaultViewport,
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
  })

  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle0' })
  // if (waitFor) {
  //   await page.waitForSelector(waitFor, {
  //     timeout: parseInt(timeout || 5000, 10),
  //   })
  // }
  await page.evaluate(() => document.fonts.ready)

  const pdfBuffer = await page.pdf({
    format: 'a4',
    landscape: true,
    printBackground: true,
    omitBackground: true,
  })

  await browser.close()

  return pdfBuffer
}

export async function handler(event, context) {
  // Require api-key
  const auth = event.headers["x-api-key"];
  if (!auth || auth !== API_KEY) {
    return abort(403, "Unauthorized, missing or invalid api-key")
  }

  // Require post
  if (event.httpMethod !== "POST") {
    return abort(405, "Method Not Allowed")
  }

  // Body should be a plain text file.
  if (event.headers['content-type'] !== 'text/plain') {
    return abort(415, "Unsupported Media Type")
  }

  console.log(event.body)
  const key = md5(event.body)


  // Check if the pdf is already cached
  const cached = await fileExists('frenchbook.app/pdf/' + key)
  if (cached) {
    const pdfBuffer = await storage.readToBuffer('frenchbook.app/pdf/' + key)
    return {
      statusCode: 200,
      headers: {
        "content-type": 'application/pdf',
        "content-disposition": 'attachment; filename="frenchbook.pdf"'
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true
    }
  }

  // Turn body into base-64 encoded string
  const b64 = toUrlHash(event.body)
  const url = new URL('', FRENCHBOOK_URL)
  url.hash = b64
  const pdfBuffer = await render(url)

  // Cache the pdf under the hash
  storage.write('frenchbook.app/pdf/' + key, pdfBuffer)

  return {
    statusCode: 200,
    headers: {
      "content-type": 'application/pdf',
      "content-disposition": 'attachment; filename="frenchbook.pdf"'
    },
    body: pdfBuffer.toString('base64'),
    isBase64Encoded: true
  }
}