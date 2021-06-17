<template>
  <div class="non-music" v-html="part.html">
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  part: {
    type: Object
  }
})
</script>

<style>
  .non-music {
    white-space: pre;
    font-size: calc(20/16 * 1rem);
  }
</style>