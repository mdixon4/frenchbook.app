<template>
  <frenchy-docs v-if="isDocs">
  </frenchy-docs>
  <frenchy-ui v-else>
    <frenchy-renderer :song="songStore.song" :template="logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { useSongStore } from './store/song'
import { useKeyboardShortcuts } from './composables/useKeyboardShortcuts'
import FrenchyUi from './components/ui/FrenchyUi.vue'
import FrenchyRenderer from './components/renderer/FrenchyRenderer.vue'
import FrenchyDocs from './components/docs/FrenchyDocs.vue'
import TitleBar from './components/ui/TitleBar.vue'
import { useLocalFileStore } from './store/localFile'
import { syncRef, useCssVar } from '@vueuse/core'
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useUIStore } from './store/ui'
import { storeToRefs } from 'pinia'

const logoClass = window.location.pathname === '/s/' ? 'with-shirazz-logo' : 'with-french-book-logo'
const isTablet = window.location.pathname === '/tablet/'
const isDocs = window.location.pathname === '/docs/'

useKeyboardShortcuts()
const songStore = useSongStore()
const localFileStore = useLocalFileStore()
const uiStore = useUIStore()
const { metaThemeColor } = storeToRefs(uiStore)

useHead({
  title: localFileStore.title,
  meta: [
    {
      name: 'theme-color',
      content: metaThemeColor
    }
  ]
})


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
