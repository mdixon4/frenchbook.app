<template>
  <div class="page" v-if="song" ref="pageElement">
    <div class="rule top-margin"></div>
    <div class="rule bottom-margin"></div>
    <div class="rule left-margin"></div>
    <div class="rule right-margin"></div>
    <div class="rule page-break"></div>

    <frenchy-header :metadata="song.metadata"></frenchy-header>
    <div class="song" :style="{
      '--bar-width': `calc(${song.metadata.barWidth || 1} * var(--root-bar-width))`,
      '--bar-height': `calc(${song.metadata.barHeight || 1} * var(--root-bar-height))`
    }">
      <template v-for="(part, idx) in song.parts" :key="idx">
        <frenchy-hr v-if="part.type === 'hr'" :part="part"></frenchy-hr>
        <frenchy-stanza v-if="part.type === 'stanza'" :stanza="part"></frenchy-stanza>
        <frenchy-text-block v-if="part.type === 'plain-text'" :part="part"></frenchy-text-block>
      </template>
    </div>
    <component :is="'style'">{{ song.css }}</component>
  </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue'
import panzoom from 'panzoom'

import FrenchyHeader from './FrenchyHeader.vue'
import FrenchyStanza from './FrenchyStanza.vue'
import FrenchyHr from './FrenchyHr.vue'
import FrenchyTextBlock from './FrenchyTextBlock.vue'

const pageWidth = ref(210)
const pageHeight = ref(297)

const pageElement = ref(null)

const props = defineProps({
  song: {
    type: Object
  }
})

watch(pageElement, () => {
  if (pageElement.value) {
    panzoom(pageElement.value, {
      bounds: true,
      maxZoom: 4,
      minZoom: 0.25
    })
  }
})

</script>

<style>
  .page {
    width: var(--page-width);
    min-height: var(--page-height);
    padding: var(--top-page-margin) var(--x-page-margin) 0;
    overflow: hidden;
  }

  .rule { display: none; }
  @media screen {
    .rule {
      display: block;
      position: absolute;
      background: red;
      opacity: 0.25;
    }
    .rule.top-margin {
      width: 100%;
      height: 1px;
      left: 0;
      top: calc(var(--top-page-margin) - 0px);
    }
    .rule.bottom-margin {
      width: 100%;
      height: 1px;
      left: 0;
      top: calc(var(--page-height) - var(--bottom-page-margin) - 1px);
    }
    .rule.left-margin {
      height: 100%;
      width: 1px;
      top: 0;
      left: calc(var(--x-page-margin) - 0px);
    }
    .rule.right-margin {
      height: 100%;
      width: 1px;
      top: 0;
      left: calc(var(--page-width) - var(--x-page-margin) - 1px);
    }
    .rule.page-break {
      width: 100%;
      height: 1px;
      left: 0;
      opacity: 1;
      top: calc(var(--page-height) - 0px);
      background: black;
    }

    .hide-rulers .rule:not(.page-break) {
      display: none;
    }
  }

  .song {
    display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    margin-top: calc(var(--y-unit) / 2);
  }




  /*  TODO: Rehome these */
  .coda-symbol {
    height: 24px;
    margin-right: -6px;
    margin-bottom: -4px;
  }
  .arrow {
    width: 8mm;
    margin-right: 0.5mm;
  }
  .segno-symbol {
    height: 24px;
  }
  .caesura-symbol {
    font-style: normal;
    font-weight: normal;
    transform: scale(2) translateY(0.13em);
    position: relative;
    display: inline-block;
    padding: 0 0.2em 0 0.4em;
    /* background: blue; */
  }
  .arrow.right-down-right {
    display: flex;
    flex-direction: column;
  }
  .arrow.right-down-right .top {
    height: calc(30/110 * 8mm);
    flex-grow: 0;
  }
  .arrow.right-down-right .bottom {
    height: calc(30/110 * 8mm);
    flex-grow: 0;
  }
  .arrow.right-down-right .middle {
    height: 1.5em;
    flex-grow: 1;
  }
  .arrow.right-down-squished {
    display: none;
  }
  .arrow.left-down-squished {
    display: none;
  }
  .arrow.right-up-squished {
    display: none;
  }

  span.rhythms {
    font-family: 'Rhythms';
    font-style: normal;
    font-size: var(--rhythm-font-size);
    font-weight: normal;
    white-space: pre;
    position: relative;
    transform: scaleY(0.9);
    transform-origin: bottom;
  }
  span.rhythms::before {
    clip-path: inset(-0.2em);
  }

</style>