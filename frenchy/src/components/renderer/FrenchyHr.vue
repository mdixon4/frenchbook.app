<template>
  <hr class="hr" :style="{
    '--top-margin': part.topMargin,
  }" :class="part.classes">
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
    margin: calc(0.25 * var(--top-margin) * var(--y-unit)) 0 calc(-0.25 * var(--top-margin) * var(--y-unit)) 0;
    border: 0;
    border-bottom: calc(var(--stroke-width) * 0.5) dashed var(--gridline-color);
    align-self: stretch;
    z-index: -2;
  }
  .hr.indent-0-5 {
    margin-left: calc(0.5 * var(--bar-width));
  }
  .hr.indent-1 {
    margin-left: calc(1 * var(--bar-width));
  }
  .hr.indent-1-5 {
    margin-left: calc(1.5 * var(--bar-width))
  }
  .hr.indent-2 {
    margin-left: calc(2 * var(--bar-width));
  }
  .hr.indent-2-5 {
    margin-left: calc(2.5 * var(--bar-width))
  }
  .hr.indent-3 {
    margin-left: calc(3 * var(--bar-width));
  }
  .hr.indent-3-5 {
    margin-left: calc(3.5 * var(--bar-width))
  }
  .hr.indent-4 {
    margin-left: calc(4 * var(--bar-width));
  }
  .hr.indent-4-5 {
    margin-left: calc(4.5 * var(--bar-width))
  }
  .hr.indent-5 {
    margin-left: calc(5 * var(--bar-width));
  }
  .hr.indent-5-5 {
    margin-left: calc(5.5 * var(--bar-width))
  }
  .hr.indent-6 {
    margin-left: calc(6 * var(--bar-width));
  }
  .hr.indent-6-5 {
    margin-left: calc(6.5 * var(--bar-width))
  }
  .hr.indent-7 {
    margin-left: calc(7 * var(--bar-width));
  }
  .hr.indent-7-5 {
    margin-left: calc(7.5 * var(--bar-width))
  }
  .hr.width-0-5 {
    width: calc(0.5 * var(--bar-width));
  }
  .hr.width-1 {
    width: calc(1 * var(--bar-width));
  }
  .hr.width-1-5 {
    width: calc(1.5 * var(--bar-width))
  }
  .hr.width-2 {
    width: calc(2 * var(--bar-width));
  }
  .hr.width-2-5 {
    width: calc(2.5 * var(--bar-width))
  }
  .hr.width-3 {
    width: calc(3 * var(--bar-width));
  }
  .hr.width-3-5 {
    width: calc(3.5 * var(--bar-width))
  }
  .hr.width-4 {
    width: calc(4 * var(--bar-width));
  }
  .hr.width-4-5 {
    width: calc(4.5 * var(--bar-width))
  }
  .hr.width-5 {
    width: calc(5 * var(--bar-width));
  }
  .hr.width-5-5 {
    width: calc(5.5 * var(--bar-width))
  }
  .hr.width-6 {
    width: calc(6 * var(--bar-width));
  }
  .hr.width-6-5 {
    width: calc(6.5 * var(--bar-width))
  }
  .hr.width-7 {
    width: calc(7 * var(--bar-width));
  }
  .hr.width-7-5 {
    width: calc(7.5 * var(--bar-width))
  }
</style>