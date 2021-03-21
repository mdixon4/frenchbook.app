console.log('hi')

let canv = document.createElement('canvas')
document.body.appendChild(canv)
canv.style.border = '1px solid red'
canv.width = '800'
canv.height = '200'
let ctx = canv.getContext('2d')
window.ctx = ctx
ctx.font = '40px "MuseJazz Text"'

let eflat = 'E\u266d'
let seven = '\ue197'
let bass = ''


let entryX = 0
let entryY = 0

ctx.translate(100, 100)
ctx.fillRect(0, 0, 1, 1)

ctx.fillText(eflat, entryX, entryY)

let metrics = [ctx.measureText(eflat)]
entryX = entryX + metrics[0].width

ctx.font = '48px "MuseJazz Text"'
ctx.fillStyle = "black"
ctx.fillText(seven, entryX, entryY + 8)
metrics.push(ctx.measureText(seven))
ctx.font = '40px "MuseJazz Text"'
entryX = entryX + metrics[1].width


let slashCanvas = document.createElement('canvas')
document.body.appendChild(slashCanvas)
slashCanvas.style.border = '1px solid red'
slashCanvas.width = '800'
slashCanvas.height = '200'
let slashCtx = slashCanvas.getContext('2d')
slashCtx.font = '40px "MuseJazz Text"'
slashCtx.fillStyle = 'orange'
slashCtx.scale(2, 2)
slashCtx.translate(40, 40)
slashCtx.fillRect(0, 0, 10, 10)
let m2 = slashCtx.measureText('/')
let width = m2.actualBoundingBoxRight - m2.actualBoundingBoxLeft
let height = m2.actualBoundingBoxDescent - m2.actualBoundingBoxAscent
console.log(m2)
slashCtx.rotate(50 * Math.PI/180)
slashCtx.fillText('Am7', 0, 0)

let image = cropImageFromCanvas(slashCtx)

ctx.putImageData(image, image.width, image.height)



//============

let secondCanvas = document.createElement('canvas')
document.body.appendChild(secondCanvas)
secondCanvas.style.border = '1px solid red'
secondCanvas.width = '800'
secondCanvas.height = '200'
let sctx = secondCanvas.getContext('2d')
sctx.font = '40px "MuseJazz Text"'

sctx.translate(400, 100)
sctx.fillRect(10, 10, -5, -5)


sctx.textAlign = 'center'
sctx.rotate(30 * Math.PI/180)
sctx.fillText('/', 0, 20)



function cropImageFromCanvas(ctx) {
  let canvas = ctx.canvas
  let w = canvas.width
  let h = canvas.height
  let x, y
  let pixelIndex
  let pix = { x: [], y: [] }
  let imageData = ctx.getImageData(0,0,canvas.width,canvas.height)

  for (y = 0; y < h; y++) {
    for (x = 0; x < w; x++) {
      pixelIndex = (y*w + x) * 4
      if (imageData.data[pixelIndex + 3] > 0) {
        pix.x.push(x);
        pix.y.push(y);
      }
    }
  }
  pix.x.sort((a, b) => a - b)
  pix.y.sort((a, b) => a - b)
  let n = pix.x.length - 1
  w = 1 + pix.x[n] - pix.x[0]
  h = 1 + pix.y[n] - pix.y[0]
  console.log(pix)
  console.log(w, h)
  let cut = ctx.getImageData(pix.x[0], pix.y[0], w, h)
  return cut
}



