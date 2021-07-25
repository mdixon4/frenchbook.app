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
import { defineProps } from 'vue'

import FrenchyHeader from './FrenchyHeader.vue'
import FrenchyStanza from './FrenchyStanza.vue'
import FrenchyHr from './FrenchyHr.vue'
import FrenchyTextBlock from './FrenchyTextBlock.vue'

const props = defineProps({
  song: {
    type: Object
  }
})

</script>
