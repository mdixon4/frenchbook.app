<template>
  <div class="hr" :style="{
    '--top-margin': part.topMargin,
  }" :class="part.classes"></div>
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
  .hr {
    margin-top: calc(0.25 * var(--top-margin) * var(--y-unit));
    margin-bottom: calc(-0.25 * var(--top-margin) * var(--y-unit));
    border: 0;
    border-bottom: var(--stroke-width) dashed var(--gridline-color);
    position: relative;
    z-index: -2;
    align-self: stretch;
  }
</style>