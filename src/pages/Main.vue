<template>
  <frenchy-ui>
    <frenchy-renderer :song="songStore.song" :template="viewParametersStore.logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { useSongStore } from '../store/song'
import { useKeyboardShortcuts } from '../composables/useKeyboardShortcuts'
import FrenchyUi from '../components/ui/FrenchyUi.vue'
import FrenchyRenderer from '../components/renderer/FrenchyRenderer.vue'
import { computed, watch } from 'vue'

import { useViewParametersStore } from '../store/viewParameters'

const viewParametersStore = useViewParametersStore()



const props = defineProps({
  isTablet: {
    type: Boolean,
    default: false
  }
})

watch(() => props.isTablet, (isTablet) => {
  document.documentElement.dataset.media = isTablet ? 'screen' : 'print'
  document.documentElement.dataset.ratio = isTablet ? '3:4' : ''
})

useKeyboardShortcuts()
const songStore = useSongStore()
</script>

<style>
#apphost {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>