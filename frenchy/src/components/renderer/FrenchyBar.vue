<template>
  <div class="bar" :class="[
  {
    'is-topmost': barData.isTopmost,
    'is-rightmost': barData.isRightmost,
    'is-bottommost': barData.isBottommost,
    'is-leftmost': barData.isLeftmost,
    'is-ditto': isDitto,
    'has-bottom-annotation': hasBottomAnnotation,
    'has-top-annotation': hasTopAnnotation,
    'is-slashed': isSlashed,
    'is-empty': isEmpty,
    'is-whole-bar-stop': isWholeBarStop,
    'is-stop-on-1': isStopOn1,
    'is-stop-on-2': isStopOn2,
    'is-stop-on-3': isStopOn3,
    'is-stop-on-4': isStopOn4,
    'has-left-double-barline': barData.leftBarline.includes('||'),
    'has-right-double-barline': barData.rightBarline.includes('||'),
    'has-left-bracket-barline': barData.leftBarline.includes('('),
    'has-right-bracket-barline': barData.rightBarline.includes(')'),
    'has-left-repeat-barline': barData.leftBarline.match(/\|.*:/),
    'has-right-repeat-barline': barData.rightBarline.match(/:.*\|/),
    
  }, ...barData.classes, `blocks-${blocks}`]">
    <frenchy-bar-borders></frenchy-bar-borders>
    <div class="chords">
      <frenchy-beat :key="chord.beats" v-for="chord in chords" :beats="chord.beats" :chord="chord" :isSlashed="isSlashed"></frenchy-beat>
    </div>
    <div v-for="annotation in barData.annotations" :key="annotation.text" class="annotation" :class="[ `annotation-${annotation.position}`, `annotation-${annotation.align}` ]" v-html="annotation.text"></div>
    <frenchy-bar-stop-shading></frenchy-bar-stop-shading>
  </div>
</template>

<script setup>
import { defineProps, computed, toRefs } from 'vue'

import FrenchyBeat from './FrenchyBeat.vue'
import FrenchyBarBorders from './FrenchyBarBorders.vue'
import FrenchyBarStopShading from './FrenchyBarStopShading.vue'

const props = defineProps({
  barData: {
    type: Object,
    required: true
  }
})

const { barData } = toRefs(props)

const getStopOnFn = beatNo => {
  return computed(() => {
    console.log({ chords: chords.value })
    return chords.value.length && chords.value.find(c => c.beats.includes(beatNo)).isStop
  })
}

const isDitto = computed(() => barData.value.chords.length === 1 && barData.value.chords[0].chord === '-')
const chords = computed(() => barData.value.chords)
const numChords = computed(() => chords.value.length)
const isEmpty = computed(() => barData.value.isEmpty)
const isSlashed = computed(() => blocks.value === '╱')
const chordPattern = computed(() => chords.value.map(c => c.beats).join('-'))
const blocks = computed(() => ({
  '1234': '',
  '12-34': '╱',
  '1-234': '┘',
  '1-2-34': '┴',
  '1-2-3-4': '┼',
  '12-3-4': '┬',
  '123-4': '┌'
}[chordPattern.value]))
const hasBottomAnnotation = computed(() => barData.value.annotations.some(a => a.position === 'bottom'))
const hasTopAnnotation =  computed(() => barData.value.annotations.some(a => a.position === 'top'))
const isStopOn1 = getStopOnFn(1)
const isStopOn2 = getStopOnFn(2)
const isStopOn3 = getStopOnFn(3)
const isStopOn4 = getStopOnFn(4)
const isWholeBarStop = computed(() => {
  console.log({ blocks, isStopOn1 })
  return blocks.value === '' && isStopOn1.value
})


</script>

<style>


  .bar > .chords {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bar.has-top-annotation > .chords {
    top: 10%;
  }
  .bar.has-bottom-annotation > .chords {
    bottom: 10%;
  }
  .bar.is-slashed.has-rhythm > .chords {
    height: 78%;
  }

  .bar > .annotation {
    position: absolute;
    bottom: 0;
    line-height: 0.9;
    width: 100%;
    padding: 0.15em;
    text-align: center;
    font-family: var(--annotation-font);
    font-weight: 700;
    white-space: pre;
    /* font-style: italic; */
  }
  .bar > .annotation-top {
    top: 0;
  }
  .bar > .annotation-left {
    text-align: left;
  }
  .bar > .annotation-right {
    text-align: right;
  }

  .bar.is-empty {
    display: flex;
  }
  .bar.is-empty > .annotation {
    position: relative;
    align-self: center;
    bottom: 0;
  }

  .bar > .rhythm {
    font-size: var(--rhythm-font-size);
    position: absolute;
    white-space: pre;
    bottom: 0%;
    padding: 0.15em 0;
    line-height: 1;
    width: 100%;
    text-align: center;
    font-family: 'Rhythms';
    font-weight: normal;
    /* font-style: italic; */
  }


  .chords {
    z-index: 2;
  }
  .rhythm { 
    z-index: 1;
  }
  .annotation {
    z-index: 1;
  }


</style>