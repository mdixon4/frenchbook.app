<template>
  <frenchy-docs v-if="isDocs">
  </frenchy-docs>
  <frenchy-ui v-else v-model:songText="songText">
    <frenchy-renderer :song="song" :template="logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { useSongParser } from './composables/useSongParser'
import { useBase64RouteHash } from './composables/useBase64RouteHash'
import { useBroadcast } from './composables/useBroadcast'

import FrenchyUi from './components/ui/FrenchyUi.vue'
import FrenchyRenderer from './components/renderer/FrenchyRenderer.vue'
import FrenchyDocs from './components/docs/FrenchyDocs.vue'

const logoClass = window.location.pathname === '/s/' ? 'with-shirazz-logo' : 'with-french-book-logo'
const isTablet = window.location.pathname === '/tablet/'
const isDocs = window.location.pathname === '/docs/'
const songText = useBase64RouteHash()
const song = useSongParser(songText)
const { isBroadcasting, isListening, broadcastPassword } = useBroadcast('https://old-condoir-62.deno.dev/charts/ROOM', songText)
provide('isBroadcasting', isBroadcasting)
provide('isListening', isListening)
provide('broadcastPassword', broadcastPassword)




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
</style>
