<template>
  <div class="page" v-if="song" ref="pageElement">
    <frenchy-header :metadata="song.metadata"></frenchy-header>
    <div class="song" :style="{
      '--bar-width': `calc(${song.metadata.barWidth || 1} * var(--root-bar-width))`,
      '--bar-height': `calc(${song.metadata.barHeight || 1} * var(--root-bar-height))`
    }">
      <template v-for="(part, idx) in song.parts" :key="idx">
        <frenchy-hr v-if="part.type === 'hr'" :part="part"></frenchy-hr>
        <frenchy-stanza v-if="part.type === 'stanza'" :stanza="part"></frenchy-stanza>
        <frenchy-text-block v-if="part.type === 'plain-text'" :part="part"></frenchy-text-block>
      </template>
    </div>
    <component :is="'style'">{{ song.css }}</component>
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue'
import panzoom from 'panzoom'

import FrenchyHeader from './FrenchyHeader.vue'
import FrenchyStanza from './FrenchyStanza.vue'
import FrenchyHr from './FrenchyHr.vue'
import FrenchyTextBlock from './FrenchyTextBlock.vue'

const pageElement = ref(null)

const props = defineProps({
  song: {
    type: Object
  }
})

watch(pageElement, () => {
  if (pageElement.value) {
    panzoom(pageElement.value, {
      bounds: true,
      maxZoom: 4,
      minZoom: 0.25
    })
  }
})

</script>

<style>
  .page {
    --page-width: calc(8 * var(--bar-width) + 2 * var(--x-page-margin));
    --page-height: calc(1.41 * var(--page-width));
    width: var(--page-width);
    padding: var(--y-unit) var(--x-page-margin);
    overflow: hidden;
  }

  .song {
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
  }



  /*  TODO: Rehome these */
  .coda-symbol {
    height: 24px;
    margin-right: -6px;
    margin-bottom: -4px;
  }
  .arrow {
    width: 24px;
  }
  .segno-symbol {
    height: 24px;
  }
  .caesura-symbol {
    font-style: normal;
    font-weight: normal;
    transform: scale(2) translateY(0.13em);
    position: relative;
    display: inline-block;
    padding: 0 0.2em 0 0.4em;
    /* background: blue; */
  }

</style>