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
        <path class="border-stroke crisp non-scaling-stroke" :d="stanzaBorderPath"></path>
        <path class="border-stroke-gap non-scaling-stroke" :d="stanzaBorderPath"></path>
        <template v-if="stanza.classes.includes('shadow')">
        <defs>
          <mask :id="`mask${randomId}`">
            <rect x="-999" y="-999" width="9999" height="9999" fill="white"></rect>
            <path class="shadow-mask crisp non-scaling-stroke" :d="stanzaBorderPath" fill="black"></path>
          </mask>
        </defs>
        <g :mask="`url(#mask${randomId})`">
          <path class="shadow-fill crisp non-scaling-stroke" :d="stanzaBorderPath"></path>
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
    stroke-width: var(--border-stroke-gap-width);
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