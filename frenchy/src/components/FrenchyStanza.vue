<template>
  <div class="stanza" :style="{
    '--default-indent': stanza.indent,
    'has-title': stanza.title.length,
    'has-top-matter': stanza.annotations.some(a => a.side === 'top')
  }" :class="stanza.classes">
    <!-- <div class="stanza-break"></div> -->
    <div class="stanza-music">
      <frenchy-stanza-exteriors :stanza="stanza"></frenchy-stanza-exteriors>
      <div v-for="(line, lineIdx) in stanza.lines" :key="lineIdx" class="line" :class="[ line.classes, { 'align-right': line.align === 'right' }]">
        <div v-if="lineIdx === 0 && (stanza.title === 'CODA' || stanza.title === 'TAG')" class="coda-arrow">
          <svg viewBox="0 0 24 24" width="32px" height="32px" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
        </div>
        <frenchy-bar v-for="(bar, barIdx) in line.bars" :key="bar.id" :barData="bar" :barIdx="barIdx" :lineIdx="lineIdx" :lineLayout="stanza.lineLayout"></frenchy-bar>
        <div v-if="line.rhythms" class="line-rhythms">
          <div v-for="(rhythm, rhythmIdx) in line.rhythms" :key="rhythmIdx">
            <span>{{ rhythm.rhythms.textContent }}</span>
          </div>
        </div>
      </div>
      <svg class="stanza-border-b" :viewBox="stanzaBorderViewBox" preserveAspectRatio="none">
        <mask :id="`stanza-border-eraser-mask-b-${stanza.id}`">
          <rect x="-99" y="-99" width="9999" height="9999" fill="white"></rect>
          <path class="mask-stroke-gap" vector-effect='non-scaling-stroke' :d="stanzaBorderPath" stroke="black"></path>
        </mask>
        <mask :id="`stanza-mask-b-${stanza.id}`">
          <rect x="-99" y="-99" width="9999" height="9999" fill="white"></rect>
          <!-- <path class="mask-stroke-gap" vector-effect='non-scaling-stroke' :d="stanzaBorderPath" stroke="black"></path> -->
          <!-- <path class="mask-stroke-inner" vector-effect='non-scaling-stroke' :d="stanzaBorderPath" stroke="white"></path> -->
          <!-- <path class="mask-fill-inner" vector-effect='non-scaling-stroke' :d="stanzaBorderPath" stroke-width="0" fill="black"></path> -->
        </mask>
        <path class="border-stroke" vector-effect='non-scaling-stroke' :d="stanzaBorderPath"></path>
        <path class="border-stroke-gap" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath"></path>
      </svg>
      <svg class="stanza-border" :viewBox="stanzaBorderViewBox" preserveAspectRatio="none">
        <mask :id="`stanza-mask-${stanza.id}`">
          <rect x="-99" y="-99" width="9999" height="9999" fill="white"></rect>
          <!-- <path class="mask-fill-inner" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath" stroke-width="white" fill="black"></path> -->
        </mask>
        <path class="border-stroke" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath" :mask="`url(#stanza-mask-${stanza.id})`"></path>
      </svg>
    </div>
    <!-- <div class="stanza-break"></div> -->
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import FrenchyBar from './FrenchyBar.vue'
import FrenchyStanzaExteriors from './FrenchyStanzaExteriors.vue'

const props = defineProps({
  stanza: {
    type: Object
  }
})

const stanzaBorderPath = computed(() => {
  if (props.stanza.lines.length) {
    return `M${props.stanza.borderCoordinates.map(coords => coords.map(coord => coord * 100).join(' ')).join(' L')} Z`
  }
  return ''
})

const stanzaBorderViewBox = computed(() => {
  let width = Math.max(props.stanza.width * 100, 0)
  let height = Math.max(props.stanza.height * 100, 0)
  return `0 0 ${width} ${height}`
})


</script>

<style>
  /* .bar.is-topmost .top-barline {
    stroke: white;
    stroke-width: calc(var(--stroke-width) / 2);
  }
  .bar.is-bottommost .bottom-barline {
    display: none;
  }
  .bar.is-rightmost .right-barline {
    display: none;
  }
  .bar.is-leftmost .left-barline {
    display: none;
  } */

  .stanza-border, .stanza-border-b {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    overflow: visible;
    pointer-events: none;
    /* opacity: 1; */
  }

  .stanza-border-b {
    display: none;
  }
  .stanza.b .stanza-border-b {
    display: block;
  }
  .stanza.b .stanza-border {
    display: none;
  }

  /* .stanza-border { fill: transparent; } */

  .stanza-border .border-stroke {
    fill: transparent;
    stroke: var(--gridline-color);
    /* stroke: var(--gridline-color); */
    stroke-width: var(--thick-stroke-width);
  }


  .stanza-border-b .border-stroke {
    fill: transparent;
    stroke: var(--gridline-color);
    /* stroke: bl; */
    /* stroke: blue; */
    stroke-width: var(--thick-stroke-width);
    /* stroke-width: 10px; */
  }
  .stanza-border-b .border-stroke-gap {
    fill: transparent;
    stroke: white;
    stroke-width: calc(var(--stroke-width) * 0.5);
    stroke-width: calc(var(--stroke-width) * .75);
  }

  .stanza.b .mask-stroke-gap {
    stroke-width: 2px;
    /* stroke-width: calc(var(--thick-stroke-width) / 2 + var(--stroke-width) / 2); */
  }
  /* .stanza.b .mask-stroke-inner {
    stroke-width: calc(1 * var(--stroke-width));
  }
  .mask-stroke-inner {
    stroke-width: var(--stroke-width);
  } */
  
  .stanza-border { z-index: 40 }



  .stanza-music {
    position: relative;
  }




  .stanza {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    page-break-inside: avoid;
    left: calc(var(--indent, var(--default-indent)) * var(--bar-width));
    /* margin-top: calc(var(--downdent, 1) * var(--y-unit)); */
    margin-top: calc(var(--y-unit) / 2);
    margin-bottom: calc(var(--y-unit) / 2);
  }

  .song .stanza.no-top-annotations.no-top-title:first-child {
    margin-top: 0;
  }

  .stanza-break {
    position: relative;
    display: flex;
    align-items: flex-end;
    height: calc(var(--row-gap) / 2);
    /* margin-bottom: 1rem; */
  }
  .stanza-music {
    display: flex;
    flex-direction: column;
  }

  .line {
    display: inline-flex;
    /* background: white; */
    position: relative;
  }
  .line.align-right {
    align-self: flex-end;
  }
  .line-text.align-right {
    align-self: end;
  }
  .line.indent-1 {
    left: calc(1 * var(--bar-width));
  }
  .line.indent-2 {
    left: calc(2 * var(--bar-width));
  }
  .line.indent-3 {
    left: calc(3 * var(--bar-width));
  }
  .line.indent-4 {
    left: calc(4 * var(--bar-width));
  }
  .line.indent-5 {
    left: calc(5 * var(--bar-width));
  }
  .line.indent-6 {
    left: calc(6 * var(--bar-width));
  }
  .line.indent-7 {
    left: calc(7 * var(--bar-width));
  }
  
  .stanza.indent-0 {
    left: 0;
  }
  .stanza.indent-0-5 {
    left: calc(0.5 * var(--bar-width));
  }
  .stanza.indent-1 {
    left: calc(1 * var(--bar-width));
  }
  .stanza.indent-1-5 {
    left: calc(1.5 * var(--bar-width));
  }
  .stanza.indent-2 {
    left: calc(2 * var(--bar-width));
  }
  .stanza.indent-2-5 {
    left: calc(2.5 * var(--bar-width));
  }
  .stanza.indent-3 {
    left: calc(3 * var(--bar-width));
  }
  .stanza.indent-3-5 {
    left: calc(3.5 * var(--bar-width));
  }
  .stanza.indent-4 {
    left: calc(4 * var(--bar-width));
  }
  .stanza.indent-4-5 {
    left: calc(4.5 * var(--bar-width));
  }
  .stanza.indent-5 {
    left: calc(5 * var(--bar-width));
  }
  .stanza.indent-5-5 {
    left: calc(5.5 * var(--bar-width));
  }
  .stanza.indent-6 {
    left: calc(6 * var(--bar-width));
  }
  .stanza.indent-6-5 {
    left: calc(6.5 * var(--bar-width));
  }
  .stanza.indent-7 {
    left: calc(7 * var(--bar-width));
  }
  .stanza.indent-7-5 {
    left: calc(7.5 * var(--bar-width));
  }


  .bar {
    width: var(--bar-width);
    height: var(--bar-height);
    position: relative;
    flex-shrink: 0;
  }

  .line-rhythms {
    position: absolute;
    bottom: 0;
    /* top: 100%; */
    /* height: 5rem; */
    /* background: #38B6; */
    display: flex;
    right: 0;
    font-family: 'rhythms';
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
  .line-rhythms > div {
    width: 5rem;
    display: flex;
    justify-content: space-around;
    white-space: pre;
    /* padding-left: 0.5rem; */
  }

</style>