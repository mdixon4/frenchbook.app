import { ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg'
import domtoimage from 'dom-to-image-more'
import trimImageData from 'trim-image-data'
import trimCanvas from 'trim-canvas'
import html2canvas from 'html2canvas'

const SCALE = 2

const text = ref('')

const { copy } = useClipboard({ source: text })

export const useImageExport = () => {
  
  const runOld = async () => {
    let el = document.querySelector('.page')
    if (el.querySelector('header').textContent.trim() === '') {
      el = el.querySelector('.song > *')
    }
    const svgDocument = elementToSVG(el)
    await inlineResources(svgDocument.documentElement)
    const svgString = new XMLSerializer().serializeToString(svgDocument)
    text.value = svgString
    copy()
  }


  const run = async () => {
    let page = document.querySelector('.page')
    let header = document.querySelector('.page header')
    
    const pageWidth = page.scrollWidth
    const pageHeight = page.scrollHeight
    
    if (!header.textContent.trim()) {
      header.style.display = 'none'
    }
    page.style.overflow = 'visible'
    
    console.log('Beginning screenshot')
    // const canvas = await domtoimage.toCanvas(page, { 
    //   // width: pageWidth * 2,
    //   // height: pageHeight * 2,
    //   scale: SCALE 
    // })
    const canvas = await html2canvas(page, {
      scale: SCALE
    })
    // trimCanvas(canvas)
    // Apply a background field of white
    // const canvasWithField = document.createElement('canvas')
    // canvasWithField.width = canvas.width
    // canvasWithField.height = canvas.height
    
    // const ctx2 = canvasWithField.getContext('2d')
    // ctx2.fillStyle = 'turquoise'
    // ctx2.fillRect(0, 0, canvasWithField.width, canvasWithField.height)
    // ctx2.drawImage(canvas, 0, 0)

    const url = canvas.toDataURL()
    
    console.log('Ending screenshot')
    const a = document.createElement('a')
    a.href = url
    a.download = 'frenchbook.png'
    a.dispatchEvent(new MouseEvent('click'))
    // text.value = url
    // copy()
    header.style = ''
  }


  return {
    run
  }

}