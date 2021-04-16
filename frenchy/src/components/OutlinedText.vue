<template>
  <div class="outlined-text">
    <span class="outline" v-html="props.text"></span>
    <span v-html="props.text"></span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  text: {
    type: String
  }
})
</script>

<style>
.outlined-text {
  position: relative;
}
.outlined-text .outline {
  user-select: none;
  inset: 0;
  -webkit-text-stroke: var(--stroke-width) white;
  position: absolute;
  z-index: -1;
  left: 0;
}

</style>