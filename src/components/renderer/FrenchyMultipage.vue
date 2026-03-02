<template>
  <div class="page-wrapper" v-if="song">
    <frenchy-page v-for="(page, idx) in song.pages" :key="idx" :song="song" :pageIdx="idx"
      :class="template"></frenchy-page>
    <component :is="'style'">{{ songStore.song.css }}</component>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useSongStore } from '../../store/song';

const songStore = useSongStore()

import FrenchyPage from './FrenchyPage.vue'
import FrenchyPageRulers from '../ui/FrenchyPageRulers.vue';

const props = defineProps({
  song: {
    type: Object
  },
  template: {
    type: String,
    default: ''
  },
})

</script>

<style>
@media screen {
  .page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}
</style>
