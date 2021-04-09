<template>
  <div class="stanza" :style="{
    '--column-start': stanza.columnStart,
    '--column-span': stanza.columnSpan,
    '--row-start': stanza.rowStart,
    '--row-span': stanza.rowSpan + 1
  }" :class="stanza.classes">
    <!-- <svg class="stanza-border" viewBox="0 0 8 8">
      <path :d="stanzaBorderPath"></path>
    </svg> -->
    <div class="stanza-break">
      <div class="stanza-title">{{ stanza.title }}</div>
    </div>
    <div v-if="stanza.classes.includes('coda')" class="coda-here">
      <svg class="coda-symbol" width="24" height="24" viewBox="0 0 245 321" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M133 10.5C133 4.70101 128.299 0 122.5 0C116.701 0 112 4.70101 112 10.5V50.0988C78.104 57.2549 51.5368 98.5512 48.326 150H10.5C4.70101 150 0 154.701 0 160.5C0 166.299 4.70101 171 10.5 171H48.326C51.5368 222.449 78.104 263.745 112 270.901V310.5C112 316.299 116.701 321 122.5 321C128.299 321 133 316.299 133 310.5V270.901C166.896 263.745 193.463 222.449 196.674 171H234.5C240.299 171 245 166.299 245 160.5C245 154.701 240.299 150 234.5 150H196.674C193.463 98.5512 166.896 57.2549 133 50.0988V10.5ZM112 71.0436C97.8529 76.6923 87.16 93.4661 85.2909 114H85.0618C83.5282 125.255 82.5288 137.353 82.1598 150H112V71.0436ZM133 150V71.0436C147.147 76.6923 157.84 93.4661 159.709 114H159.938C161.472 125.255 162.471 137.353 162.84 150H133ZM112 171H82.1319C82.4667 183.635 83.4302 195.732 84.9273 207H85.2909C87.16 227.534 97.8529 244.308 112 249.956V171ZM133 249.956V171H162.868C162.533 183.635 161.57 195.732 160.073 207H159.709C157.84 227.534 147.147 244.308 133 249.956Z"/>
      </svg>
      <svg class="coda-arrow" viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
      </svg>
    </div>
    <div class="stanza-music">
      <div v-for="(line, lineIdx) in stanza.lines" :key="lineIdx" class="line" :class="{ 'align-right': line.align === 'right' }">
        <div v-if="lineIdx === 0 && (stanza.title === 'CODA' || stanza.title === 'TAG')" class="coda-arrow">
          <svg viewBox="0 0 24 24" width="32px" height="32px" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
        </div>
        <frenchy-bar v-for="(bar, barIdx) in line.bars" :key="bar.id" :barData="bar" :barIdx="barIdx" :lineIdx="lineIdx" :lineLayout="stanza.lineLayout"></frenchy-bar>
        <div v-if="line.rhythms" class="line-rhythms">
          <div v-for="(rhythm, rhythmIdx) in line.rhythms" :key="rhythmIdx">
            <span>{{ rhythm.rhythms.textContent }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="stanza-break"></div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import FrenchyBar from './FrenchyBar.vue'

defineProps({
  stanza: {
    type: Object
  }
})

// export const stanzaBorderPath = computed(() => {
//   return stanza.borderCoordinates.map(coords => coords.join(' ')).join(' ')
// })


</script>