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

watch(fitStrategy, () => {
  document.body.style.overflowX = 'auto'
  document.body.style.overflowY = 'auto'
  if (fitStrategy.value === 'FIT-WIDTH' || fitStrategy.value === 'FIT-SCREEN') {
    document.body.style.overflowX = 'hidden'
  }
  if (fitStrategy.value === 'FIT-HEIGHT' || fitStrategy.value === 'FIT-SCREEN') {
    document.body.style.overflowY = 'hidden'
  }
  console.log('Strategy changed to', fitStrategy.value)
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

html,
body {
  width: 0;
  height: 0;
}

body {
  background: darkkhaki;
}
</style>