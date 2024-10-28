<template>
  <svg class="stanza-border" :viewBox="stanzaBorderViewBox" preserveAspectRatio="none">
    <path class="border-stroke crisp non-scaling-stroke" :d="stanzaBorderPath"></path>
    <path class="border-stroke-gap non-scaling-stroke" :d="stanzaBorderPath"></path>
    <filter id="shadow-filter" x=0 y=0 width="200%" height="200%">
      <feOffset in="SourceGraphic" result="offset" dx="4" dy="4"></feOffset>
      <feComposite in2="SourceGraphic" in="offset" operator="out"></feComposite>
    </filter>
    <path class="stanza-shadow crisp non-scaling-stroke" :d="stanzaBorderPath" filter="url(#shadow-filter)"></path>
  </svg>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  borderCoordinates: {
    type: Array,
    required: true
  }
})

const randomId = ref(Math.round(Math.random()*100000).toString().padStart(5, '0'))

const stanzaBorderPath = computed(() => {
  if (props.width * props.height) {
    return `M${props.borderCoordinates.map(coords => coords.map(coord => coord * 100).join(' ')).join(' L')} Z`
  }
  return ''
})

const stanzaBorderViewBox = computed(() => {
  let width = Math.max(props.width * 100, 0)
  let height = Math.max(props.height * 100, 0)
  return `0 0 ${width} ${height}`
})
</script>

<style>
  .stanza-border, .stanza-shadow {
    grid-area: content;
    height: calc(var(--height) * var(--bar-height));
    width: 100%;
    overflow: visible;
    pointer-events: none;
    /* background: orange; */
  }
  .stanza-border .border-stroke {
    fill: transparent;
    stroke: var(--gridline-color);
    stroke-width: var(--thick-stroke-width);
  }

  .stanza-border .border-stroke-gap {
    display: none;
  }
  .stanza.b .border-stroke-gap {
    display: unset;
    fill: transparent;
    stroke: white;
    stroke-width: var(--border-stroke-gap-width);
  }
  .stanza-shadow {
    fill: black;
    stroke-width: var(--thick-stroke-width);
    stroke: black;
    display: none;
  }
  .stanza.shadow .stanza-shadow {
    display: unset;
  }


</style>