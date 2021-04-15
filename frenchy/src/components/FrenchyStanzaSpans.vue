<template>
  <div class="stanza-exteriors" :style="{
    '--stanza-width': stanza.width,
    '--stanza-height': stanza.height
  }">
    <div class="exterior top">
      <frenchy-span v-for="span in topSpans" :key="span.text" :span="span"></frenchy-span>
    </div>
    <div class="exterior left">
      <frenchy-span v-for="span in leftSpans" :key="span.text" :span="span"></frenchy-span>
    </div>
    <div class="exterior right">
      <frenchy-span v-for="span in rightSpans" :key="span.text" :span="span"></frenchy-span>
    </div>
    <div class="exterior bottom">
      <frenchy-span v-for="span in bottomSpans" :key="span.text" :span="span"></frenchy-span>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs } from 'vue'
import FrenchySpan from './FrenchySpan.vue'

const props = defineProps({
  stanza: {
    type: Object
  }
})

const { stanza } = toRefs(props)

const topSpans = computed(
  () => stanza.value.exteriorSpans?.filter(span => span.side === 'top') || []
)
const leftSpans = computed(
  () => stanza.value.exteriorSpans?.filter(span => span.side === 'left') || []
)
const rightSpans = computed(
  () => stanza.value.exteriorSpans?.filter(span => span.side === 'right') || []
)
const bottomSpans = computed(
  () => stanza.value.exteriorSpans?.filter(span => span.side === 'bottom') || []
)

</script>

<style>
  .stanza-exteriors {
    position: absolute;
    inset: 0;
  }
  .exterior {
    position: absolute;
    display: grid;
    grid-auto-flow: dense;
  }
  .exterior.top {
    width: 100%;
    bottom: 100%;
    grid-template-columns: repeat(var(--stanza-width), 1fr);
    align-items: flex-end;
  }
  .exterior.left {
    height: 100%;
    right: 100%;
    grid-template-rows: repeat(var(--stanza-height), minmax(0, 1fr));
    justify-items: flex-end;
  }
  .exterior.right {
    height: 100%;
    left: 100%;
    grid-template-rows: repeat(var(--stanza-height), 1fr);
    justify-items: flex-start;
  }
  .exterior.bottom {
    width: 100%;
    top: 100%;
    grid-template-columns: repeat(var(--stanza-width), 1fr);
    align-items: flex-start;
  }

</style>