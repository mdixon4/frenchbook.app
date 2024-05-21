<template>
  <frenchy-size-observer>
    <frenchy-renderer :song="songStore.song"></frenchy-renderer>
  </frenchy-size-observer>
</template>

<script setup lang="ts">
import FrenchyRenderer from '../components/renderer/FrenchyRenderer.vue'
import FrenchySizeObserver from '../components/FrenchySizeObserver.vue'
import { useSongStore } from '../store/song';
import { useViewParametersStore } from '../store/viewParameters';
const viewParametersStore = useViewParametersStore()
const songStore = useSongStore()
</script>
