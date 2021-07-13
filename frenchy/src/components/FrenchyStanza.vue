<template>
  <div class="stanza" :style="{
    '--default-indent': stanza.indent,
    '--top-margin': stanza.topMargin,
    '--bottom-margin': stanza.bottomMargin,
    '--height': stanza.lines.length
  }" :class="[{
    'has-title': stanza.title.length > 0,
    'has-top-matter': stanza.annotations.some(a => a.side === 'top')
  }, stanza.classes ]">
    <!-- <div class=  "stanza-break"></div> -->
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
      <svg class="stanza-border" :viewBox="stanzaBorderViewBox" preserveAspectRatio="none">
        <path class="border-stroke" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath"></path>
        <path class="border-stroke-gap" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath"></path>
        <template v-if="stanza.classes.includes('shadow')">
        <defs>
          <mask :id="`mask${randomId}`">
            <rect x="-999" y="-999" width="9999" height="9999" fill="white"></rect>
            <path class="shadow-mask" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath" fill="black"></path>
          </mask>
        </defs>
        <g :mask="`url(#mask${randomId})`">
          <path class="shadow-fill" vector-effect='non-scaling-stroke' shape-rendering="crispEdges" :d="stanzaBorderPath"></path>
        </g>
        </template>
      </svg>
    </div>
    <!-- <div class="stanza-break"></div> -->
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import FrenchyBar from './FrenchyBar.vue'
import FrenchyStanzaExteriors from './FrenchyStanzaExteriors.vue'

const props = defineProps({
  stanza: {
    type: Object
  }
})

// const stanza = computed(() => props.part)

const randomId = Math.round(Math.random() * 100_000)

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
  .stanza-border, .stanza-shadow {
    position: absolute;
    inset: 0;
    height: calc(var(--height) * var(--bar-height));
    width: 100%;
    overflow: visible;
    pointer-events: none;
    /* background: orange; */
  }
  .stanza-border .border-stroke-gap {
    display: none;
  }
  .stanza-border .border-stroke {
    fill: transparent;
    stroke: var(--gridline-color);
    stroke-width: var(--thick-stroke-width);
  }
  .stanza.b .border-stroke-gap {
    display: unset;
    fill: transparent;
    stroke: white;
    stroke-width: calc(var(--stroke-width) * .75); /* Looks too wide on screen, but just right on pdf */
  }
  .stanza-border { z-index: 40 }
  .stanza.shadow .stanza-border { z-index: 41 }
  .stanza.shadow .shadow-mask {
    stroke-width: var(--thick-stroke-width);
    stroke: black;
  }
  .stanza.shadow .shadow-fill {
    transform: translate(calc(2 * var(--thick-stroke-width)), calc(2 * var(--thick-stroke-width)));
    fill: var(--gridline-color, black);
  }
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
    margin-top: calc(var(--top-margin)/2 * var(--y-unit));
    margin-bottom: 0;
  }

  /* .stanza.flush {
    margin-top: 0;
  }
  .stanza.tight {
    margin-top: calc(0.5 * var(--y-unit));
  } */

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
  .line.indent-0-5 {
    left: calc(0.5 * var(--bar-width));
  }
  .line.indent-1 {
    left: calc(1 * var(--bar-width));
  }
  .line.indent-1-5 {
    left: calc(1.5 * var(--bar-width))
  }
  .line.indent-2 {
    left: calc(2 * var(--bar-width));
  }
  .line.indent-2-5 {
    left: calc(2.5 * var(--bar-width))
  }
  .line.indent-3 {
    left: calc(3 * var(--bar-width));
  }
  .line.indent-3-5 {
    left: calc(3.5 * var(--bar-width))
  }
  .line.indent-4 {
    left: calc(4 * var(--bar-width));
  }
  .line.indent-4-5 {
    left: calc(4.5 * var(--bar-width))
  }
  .line.indent-5 {
    left: calc(5 * var(--bar-width));
  }
  .line.indent-5-5 {
    left: calc(5.5 * var(--bar-width))
  }
  .line.indent-6 {
    left: calc(6 * var(--bar-width));
  }
  .line.indent-6-5 {
    left: calc(6.5 * var(--bar-width))
  }
  .line.indent-7 {
    left: calc(7 * var(--bar-width));
  }
  .line.indent-7-5 {
    left: calc(7.5 * var(--bar-width))
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

  .down-0-5 {
    top: calc(0.5 * var(--bar-height));
  }
  .down-1 {
    top: calc(1 * var(--bar-height));
  }
  .down-1-5 {
    top: calc(1.5 * var(--bar-height));
  }
  .down-2 {
    top: calc(2 * var(--bar-height));
  }
  .down-2-5 {
    top: calc(2.5 * var(--bar-height));
  }
  .down-3 {
    top: calc(3 * var(--bar-height));
  }
  .down-3-5 {
    top: calc(3.5 * var(--bar-height));
  }
  .down-4 {
    top: calc(4 * var(--bar-height));
  }
  .down-4-5 {
    top: calc(4.5 * var(--bar-height));
  }
  .down-5 {
    top: calc(5 * var(--bar-height));
  }
  .down-5-5 {
    top: calc(5.5 * var(--bar-height));
  }
  .down-6 {
    top: calc(6 * var(--bar-height));
  }
  .down-6-5 {
    top: calc(6.5 * var(--bar-height));
  }
  .down-7 {
    top: calc(7 * var(--bar-height));
  }
  .down-7-5 {
    top: calc(7.5 * var(--bar-height));
  }
  .down-8 {
    top: calc(8 * var(--bar-height));
  }
  .down-8-5 {
    top: calc(8.5 * var(--bar-height));
  }
  .down-9 {
    top: calc(9 * var(--bar-height));
  }
  .down-9-5 {
    top: calc(9.5 * var(--bar-height));
  }
  .down-10 {
    top: calc(10 * var(--bar-height));
  }
  .down-10-5 {
    top: calc(10.5 * var(--bar-height));
  }
  .down-11 {
    top: calc(11 * var(--bar-height));
  }
  .down-11-5 {
    top: calc(11.5 * var(--bar-height));
  }
  .down-12 {
    top: calc(12 * var(--bar-height));
  }
  .down-12-5 {
    top: calc(12.5 * var(--bar-height));
  }
  .down-13 {
    top: calc(13 * var(--bar-height));
  }
  .down-13-5 {
    top: calc(13.5 * var(--bar-height));
  }
  .down-14 {
    top: calc(14 * var(--bar-height));
  }
  .down-14-5 {
    top: calc(14.5 * var(--bar-height));
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