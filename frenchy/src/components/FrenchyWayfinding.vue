<template>
  {{ props }}
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  symbols: {
    type: Array
  }
})
</script>

<style>

</style>