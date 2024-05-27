<script setup>
import { ref, computed, watch } from 'vue'
import { useElementSize, useWindowSize } from '@vueuse/core';
import { useViewParametersStore } from '../store/viewParameters';
import { storeToRefs } from 'pinia';

const viewParametersStore = useViewParametersStore()
const { fitStrategy } = storeToRefs(viewParametersStore)
const el = ref(null)

const { width, height } = useWindowSize({ includeScrollbar: true })
const { width: elementWidth, height: elementHeight } = useElementSize(el)

const scale = computed(() => {
  if (fitStrategy.value === 'FIT-WIDTH') {
    // Width should be equal to screen width.
    return width.value / elementWidth.value
  } else if (fitStrategy.value === 'FIT-HEIGHT') {
    // Height should be equal to screen height.
    return height.value / elementHeight.value
  } else if (fitStrategy.value === 'FIT-SCREEN') {
    // Scale factor should be the smaller of the two.
    return Math.min(width.value / Math.ceil(elementWidth.value), height.value / elementHeight.value)
  }
  return 1
})

watch(scale, (newScale) => {
  document.documentElement.style.setProperty('--scale', newScale)
}, { immediate: true })

watch(fitStrategy, (fit) => {
  document.documentElement.style.setProperty('--fit-strategy', fit)
  document.documentElement.dataset.fitStrategy = fit
}, { immediate: true })

</script>

<template>
  <div class="scaler" :style="{ '--scale': scale }" ref="el">
    <slot></slot>
  </div>
</template>

<style>
.scaler {
  background: white;
  transform: scale(var(--scale, 1));
  width: fit-content;
  transform-origin: top left;
}

@media print {
  .scaler {
    transform: none;
  }
}

.info {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  padding: 1rem;
  border: 1px solid black;
  z-index: 1000;
  opacity: 0.8;
}

html {
  width: 100%;
  height: 100%;
  overflow: auto;
}

body {
  background: var(--vscode-editor-background, #1e1e1e);
  overflow: hidden;
}

/* 
[data-fit-strategy="FIT-WIDTH"] body {
  overflow-x: hidden;
}

[data-fit-strategy="FIT-HEIGHT"] body {
  overflow-y: hidden;
} */

[data-fit-strategy="FIT-WIDTH"] body {
  height: calc(var(--scale) * var(--page-height));
}

[data-fit-strategy="FIT-HEIGHT"] body {
  width: calc(var(--scale) * var(--page-width));
  margin: 0 auto;
  height: 100%;
}
</style>