<template>
  <div class="stanza-music">
    <div v-for="(line, lineIdx) in stanza.lines" :key="lineIdx" class="line" :class="[ line.classes, { 'align-right': line.align === 'right' }]">
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

</template>

<script setup>
import { defineProps } from 'vue'

import FrenchyBar from './FrenchyBar.vue'

const props = defineProps({ stanza: { type: Object, required: true } })

</script>

<style>
.stanza-music {
  grid-area: content;
}
</style>
