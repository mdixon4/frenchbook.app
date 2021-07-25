<template>
  <frenchy-page :song="song" :class="template"></frenchy-page>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
import FrenchyPage from './FrenchyPage.vue'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  template: {
    type: String,
    default: ''
  }
})

const { song, template } = toRefs(props)
</script>
