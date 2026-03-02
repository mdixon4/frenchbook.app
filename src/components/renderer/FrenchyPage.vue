<template>
  <div class="page" v-if="song">
    <frenchy-header layout="ipad" :metadata="song.metadata" :totalPages="song.pages.length"
      :pageNumber="props.pageIdx + 1"></frenchy-header>
    <div class="song" :style="{
      '--bar-width': `calc(${song.metadata.barWidth || 1} * var(--root-bar-width))`,
      '--bar-height': `calc(${song.metadata.barHeight || 1} * var(--root-bar-height))`,
      '--chord-size': song.metadata.chordSize || '1'
    }">
      <template v-for="(part, idx) in parts" :key="idx">
        <frenchy-hr v-if="part.type === 'hr'" :part="part"></frenchy-hr>
        <frenchy-stanza v-if="part.type === 'stanza'" :stanza="part"></frenchy-stanza>
        <frenchy-text-block v-if="part.type === 'plain-text'" :part="part"></frenchy-text-block>
      </template>
    </div>
    <frenchy-page-rulers></frenchy-page-rulers>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'

import FrenchyHeader from './FrenchyHeader.vue'
import FrenchyStanza from './FrenchyStanza.vue'
import FrenchyHr from './FrenchyHr.vue'
import FrenchyTextBlock from './FrenchyTextBlock.vue'
import FrenchyPageRulers from '../ui/FrenchyPageRulers.vue'

const props = defineProps({
  song: {
    type: Object
  },
  pageIdx: {
    type: Number,
    default: 0
  }
})

const parts = computed(() => {
  return props.song?.pages.at(props.pageIdx) || []
})

</script>

<style>
@media screen {
  .page {
    background: white;
    border: 1px solid black;
    box-shadow: 4px 4px black;
  }
}
</style>