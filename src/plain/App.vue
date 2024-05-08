<script setup>
console.log('hi')
import { onMounted, ref } from 'vue';
import { songify } from '../songify/songify';
import { toPng, toSvg } from '../../vendor/html-to-image/src';
import { jsPDF } from 'jspdf'
import { svg2pdf } from 'svg2pdf.js'
import FrenchyPage from '../components/renderer/FrenchyPage.vue';

const text = 'title:Test\n===\n\n.shadow .flush\n| A | B | |\n| C | D | E | F |\nleft:___big___'
const stanza = songify(text)
console.log(stanza.parts[0])
const stanzaEl = ref(null)
const imageData = ref(null)
const pdfUrl = ref(null)

onMounted(async () => {
  const el = document.querySelector('.frame')
  const dataUrl = await toSvg(el)
  imageData.value = dataUrl
})

const toPdf = async () => {
  const doc = new jsPDF()
  const el = document.querySelector('.frame')
  const pdf = await doc.svg(el, {
    x: 0,
    y: 0,
    width: 210,
    height: 297
  })
  console.log(pdf)
  pdfUrl.value = pdf.output('datauristring')
}

</script>

<template>
  <button @click="toPdf">To PDF</button>
  <a href="pdfUrl" target="_blank">Open PDF</a>
  <div class="frame">
    <FrenchyPage ref="pageEl" :song="stanza" />
  </div>
  <img :src="imageData" class="image">
  <iframe v-if="pdfUrl" style="width:100%; height:600px" :src="pdfUrl"></iframe>
</template>

<style>
.frame {
  padding: 1rem;
}

.image {
  border: 1px solid black;
}
</style>
