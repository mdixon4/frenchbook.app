<script setup>
import { ref } from 'vue'
import { songify } from '../../songify/songify'
import FrenchyPart from './FrenchyPart.vue'
import { FunctionalComponent } from './FunctionalComponent'

const text = `
  ====
  | A | B | C |
`
const part = songify(text).parts?.[0]

window.songParser = songify


</script>

<template>
  <h1>Hello World</h1>
  <pre>{{ text }}</pre>
  <hr>
  <FunctionalComponent>
    Coda .indent-1 .coda-immediate
    | F | Fm | C | Cdim |
    bottom: ___rambunctious___
  </FunctionalComponent>
</template>
