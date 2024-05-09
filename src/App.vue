<template>
  <title-bar></title-bar>
  <frenchy-docs v-if="isDocs">
  </frenchy-docs>
  <frenchy-ui v-else>
    <frenchy-renderer :song="songStore.song" :template="logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { useSongStore } from './store/song'

import FrenchyUi from './components/ui/FrenchyUi.vue'
import FrenchyRenderer from './components/renderer/FrenchyRenderer.vue'
import FrenchyDocs from './components/docs/FrenchyDocs.vue'
import TitleBar from './components/ui/TitleBar.vue'

const logoClass = window.location.pathname === '/s/' ? 'with-shirazz-logo' : 'with-french-book-logo'
const isTablet = window.location.pathname === '/tablet/'
const isDocs = window.location.pathname === '/docs/'

const songStore = useSongStore()

if (isTablet) {
  document.documentElement.dataset.media = 'screen'
  document.documentElement.dataset.ratio = '3:4'
} else {
  document.documentElement.dataset.media = 'print'
}
</script>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  padding: 0px;
  margin: 0;
}

#apphost {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
