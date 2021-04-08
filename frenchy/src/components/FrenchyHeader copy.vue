<template>
  <div class="header">
    <div class="logo">Shirazz</div>
    <div class="id">{{ metadata.number }}. {{ metadata.title }} - {{ metadata.key}}</div>
    <div class="copyright"></div>
  </div>
  <div class="title-bar">
    <div class="number">{{ metadata.number }}</div>
    <div class="title">
      {{ metadata.title }}
    </div>
    <div class="number">{{ metadata.number }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  metadata: {
    type: Object,
    required: true
  }
})


</script>