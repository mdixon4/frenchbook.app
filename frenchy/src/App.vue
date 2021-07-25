<template>
  <frenchy-ui v-model:songText="songText">
    <frenchy-renderer :song="song" :template="logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { useSongParser } from './composables/useSongParser'
import { useBase64RouteHash } from './composables/useBase64RouteHash'

import FrenchyUi from './components/ui/FrenchyUi.vue'
import FrenchyRenderer from './components/renderer/FrenchyRenderer.vue'

const logoClass = window.location.pathname === '/s/' ? 'with-shirazz-logo' : 'with-french-book-logo'
const songText = useBase64RouteHash()
const song = useSongParser(songText)
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html, body {
    padding: 0px;
    margin: 0;
  }
</style>
