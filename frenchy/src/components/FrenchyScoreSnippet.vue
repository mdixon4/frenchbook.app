<template>
  <div>
    <div ref="easel">
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, nextTick, watch } from 'vue'
import abcjs from 'abcjs'

const easel = ref(null)

const props = defineProps({
  part: {
    type: Object
  }
})

onMounted(() => {
  abcjs.renderAbc(easel.value, props.part.source, {
    paddingtop: 0,
    paddingleft: 0,
    paddingright: 0,
    paddingbottom: 0,
    scale: 0.8,
    staffwidth: 500
  })
})

watch(props.part, () => {
  abcjs.renderAbc(easel.value, props.part.source)
})

// // on(() => {
// //   nextTick(() => {
//     console.log('?')
//     console.log(r.value)
//     console.log(props.part.source)
//     console.log(abcjs)
//     // abcjs.renderAbc(r, props)
// //   })
// // })

</script>

<style>

</style>