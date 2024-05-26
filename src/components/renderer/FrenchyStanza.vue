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
    <frenchy-stanza-exteriors :stanza="stanza">
      <frenchy-stanza-border :width="stanza.fullWidth" :height="stanza.height" :borderCoordinates="stanza.borderCoordinates"></frenchy-stanza-border>
      <frenchy-stanza-music :stanza="stanza"></frenchy-stanza-music>
    </frenchy-stanza-exteriors>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import FrenchyStanzaExteriors from './FrenchyStanzaExteriors.vue'
import FrenchyStanzaBorder from './FrenchyStanzaBorder.vue'
import FrenchyStanzaMusic from './FrenchyStanzaMusic.vue'

const props = defineProps({
  stanza: {
    type: Object
  }
})

</script>

<style>
  .stanza-music {
    position: relative;
  }

  .stanza-border {
    z-index: 41;
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
    font-family: 'RhythmsFont';
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