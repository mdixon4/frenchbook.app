import fs from 'fs'
import puppeteer from 'puppeteer'
import minimist from 'minimist'


// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}
function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

const toUrlHash = utf8String => {
  return Buffer.from(toBinary(utf8String)).toString('base64')
  // return btoa(toBinary(utf8String))
}

const fromUrlHash = base64String => {
  // return fromBinary(atob(base64String))
}


const print = async (songText, outputFile) => {
  const urlHash = toUrlHash(songText)
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto(`http://localhost:3000/#${urlHash}`, {
    waitUntil: 'networkidle0'
  })
  await page.evaluate(() => document.fonts.ready)
  const pdf = await page.pdf({ 
    format: 'A4',
    printBackground: true,
    path: outputFile
  })
  await browser.close()
}


const argv = minimist(process.argv.slice(2))

if (!argv.f || !argv.o) {
  console.log('-f and -o required')
}

let songText = fs.readFileSync(argv.f, { encoding: 'utf-8' })
songText = songText.replace(/\r\n/g, '\n')
print(songText, argv.o)
