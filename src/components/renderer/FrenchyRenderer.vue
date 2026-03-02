<template>
  <frenchy-multipage :song="song" :template="template"></frenchy-multipage>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
import FrenchyMultipage from './FrenchyMultipage.vue'

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
