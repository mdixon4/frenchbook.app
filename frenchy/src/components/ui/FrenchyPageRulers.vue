<template>
  <div class="rulers" ref="rulersEl">
    <svg viewBox="0 0 210 1" class="top-margin" preserveAspectRatio="none">
      <line x1="0" x2="210" y1="1" y2="1"></line>
    </svg>
    <svg viewBox="0 0 210 1" class="bottom-margin" preserveAspectRatio="none">
      <line x1="0" x2="210" y1="1" y2="1"></line>
    </svg>
    <svg viewBox="0 0 1 500" class="left-margin" preserveAspectRatio="none">
      <line x1="1" x2="1" y1="0" y2="500"></line>
    </svg>
    <svg viewBox="0 0 1 500" class="right-margin" preserveAspectRatio="none">
      <line x1="1" x2="1" y1="0" y2="500"></line>
    </svg>
    <svg viewBox="0 0 210 1" class="page-break" preserveAspectRatio="none">
      <line x1="0" x2="210" y1="1" y2="1"></line>
    </svg>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCssVar } from '@vueuse/core'

const rulersEl = ref(null)
const topMargin = useCssVar('--top-margin', rulersEl)
console.log(topMargin)
setTimeout(() => { console.log(topMargin) }, 1000)

</script>

<style>
  .rulers {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .rulers svg {
    overflow: visible;
    position: absolute;
    stroke: red;
    stroke-width: 1px;
    opacity: 0.5;
  }
  .rulers line {
    vector-effect: non-scaling-stroke;
  }

  .rulers .top-margin {
    width: 100%;
    height: 1px;
    top: calc(var(--top-page-margin) - 1px);
  }
  .rulers .bottom-margin {
    width: 100%;
    height: 1px;
    top: calc(var(--page-height) - var(--bottom-page-margin));
  }
  .rulers .left-margin {
    height: 500mm;
    width: 1px;
    left: calc(var(--x-page-margin) - 1px);
  }
  .rulers .right-margin {
    height: 500mm;
    width: 1px;
    left: calc(var(--page-width) - var(--x-page-margin) - 1px);
  }
  .rulers .page-break {
    width: 100%;
    height: 1px;
    top: calc(var(--page-height));
    stroke: black;
    opacity: 1;
  }

  .hide-rulers .rulers [class$="-margin"] {
    display: none;
  }

</style>