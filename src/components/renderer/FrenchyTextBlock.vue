<template>
  <div class="non-music" v-html="part.html" :class="part.classes"
    :style="{
      '--top-margin': part.topMargin,
      '--bottom-margin': part.bottomMargin
    }"
  >
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
    font-family: var(--serif-font);
    position: relative;
    font-size: calc(16/16 * 1rem);
    margin-top: calc(var(--top-margin)/2 * var(--y-unit));
  }

  .non-music h1 {
    font-size: calc(18/16 * 1rem);
  }

  .non-music h1, .non-music h2, .non-music h3, .non-music h4, .non-music p, .non-music ul {
    margin: 0;
  }

  .non-music img {
    max-width: 100%;
  }

  .non-music p + p {
    margin-top: 0.25em;
  }
</style>