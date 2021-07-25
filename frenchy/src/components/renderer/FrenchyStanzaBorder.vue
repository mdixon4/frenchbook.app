<template>
  <svg class="stanza-border" :viewBox="stanzaBorderViewBox" preserveAspectRatio="none">
    <path class="border-stroke crisp non-scaling-stroke" :d="stanzaBorderPath"></path>
    <path class="border-stroke-gap non-scaling-stroke" :d="stanzaBorderPath"></path>
    <defs>
      <mask :id="`mask${randomId}`">
        <rect x="-999" y="-999" width="9999" height="9999" fill="white"></rect>
        <path class="shadow-mask crisp non-scaling-stroke" :d="stanzaBorderPath" fill="black"></path>
      </mask>
    </defs>
    <g :mask="`url(#mask${randomId})`">
      <path class="shadow-fill crisp non-scaling-stroke" :d="stanzaBorderPath"></path>
    </g>
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
    position: absolute;
    inset: 0;
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
  .shadow-mask {
    stroke-width: var(--thick-stroke-width);
    stroke: black;
  }
  .stanza.shadow .shadow-fill {
    transform: translate(calc(2 * var(--thick-stroke-width)), calc(2 * var(--thick-stroke-width)));
    fill: var(--gridline-color, black);
  }


</style>