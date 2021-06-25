<template>
  <div class="non-music" v-html="part.html" :class="part.classes">
  </div>
</template>

<script setup>
import { defineProps } from 'vue'


const props = defineProps({
  part: {
    type: Object
  }
})
console.log(props.part)
</script>

<style>
  .non-music {
    /* white-space: pre; */
    font-size: calc(16/16 * 1rem);
  }

  .non-music h1 {
    font-size: calc(18/16 * 1rem);
  }

  .non-music h1, .non-music h2, .non-music h3, .non-music h4, .non-music p {
    margin: 0;
  }

  .non-music img {
    max-width: 100%;
  }

  .non-music p + p {
    margin-top: 0.5rem;
  }
</style>