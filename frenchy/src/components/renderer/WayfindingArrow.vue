<template>
  <div class="wayfinding-arrow">
    <svg class="bottom" viewBox="-50 -30 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M30 22 L55 0 L30 -22" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0 -40 L0 -20 A 20 20 0 0 0 20 0 L50 0" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  direction: {
    type: String
  }
})
</script>

<style>

</style>