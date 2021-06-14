<template>
  <div ref="spanEl" class="span" :style="{
    '--start': span.start,
    '--end': span.end,
    '--grid-span': gridSpan
  }" :class="span.classes">
    <div class="span-inner">
      <span class="span-start"></span>
      <span class="span-text" ref="textEl">
        <span v-html="span.text"></span>
      </span>
      <span class="span-end"></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, toRef, ref, watch, nextTick, watchEffect, reactive, onUpdated, onMounted, computed } from 'vue'
import FrenchyWayfinding from './FrenchyWayfinding.vue'

const props = defineProps({
  span: {
    type: Object
  }
})

const spanEl = ref(null)
const gridSpan = ref(1)

const span = toRef(props, 'span')



const isOverflowing = () => {
  return isSideways
}

const growSpan = async () => {
  let tryTaller = async () => {
    if (spanEl.value.scrollHeight > spanEl.value.clientHeight) {
      console.log(`Height ${gridSpan.value} not big enough`)
      if (gridSpan.value < 10) {
        gridSpan.value = gridSpan.value + 1
        await nextTick()
        await tryTaller()
      }
    }
  }
  let tryWider = async () => {
    if (spanEl.value.scrollWidth > spanEl.value.clientWidth) {
      console.log(`Width ${gridSpan.value} not big enough`)
      if (gridSpan.value < 10) {
        gridSpan.value = gridSpan.value + 1
        await nextTick()
        await tryWider()
      }
    }
  }

  if (span.value.classes?.includes('flow')) {
    gridSpan.value = 1
    await nextTick()
    if (span.value.classes?.includes('sideways')) {
      await tryTaller()
    } else {
      await tryWider()
    }
  }
}

onMounted(growSpan)
watch(span, growSpan)

</script>

<style>
  .exterior .span {
    font-family: var(--annotation-script-font);
    font-style: italic;
    /* line-height: calc(18/16 * 1rem); */
    white-space: pre-wrap;
    z-index: 41;
    position: relative;
  }
  .exterior .span-text strong {
    font-family: var(--annotation-font);
    font-style: normal;
    /* font-size: calc(18/16 * 1em); */
  }
  .exterior .title {
    font-family: var(--annotation-font);
    font-style: normal;
    /* font-size: calc(18/16 * 1em); */
    font-weight: bold;
  }
  .exterior .title em {
    font-family: var(--annotation-script-font);
    /* font-size: calc(16/18 * 1em); */
    font-weight: normal;
  }
  .exterior .flow {
    white-space: nowrap;
  }

  .exterior .span.rhythms .span-text {
    font-family: 'Rhythms';
    font-style: normal;
    font-size: var(--rhythm-font-size);
    line-height: 1;
    white-space: pre;
  }

  .exterior.top .span,
  .exterior.bottom .span {
    grid-column-start: var(--start, 1);
    grid-column-end: calc(var(--end, -2) + 1);
  }
  .exterior.top .span.flow {
    grid-column-end: calc(var(--start, 1) + var(--grid-span, 0));
  }
  .exterior.left .span.flow {
    grid-row-end: calc(var(--start, 1) + var(--grid-span, 0));
  }

  .exterior.left .span,
  .exterior.right .span {
    grid-row-start: var(--start, 1);
    grid-row-end: calc(var(--end, -2) + 1);
  }

  .span-inner {
    min-height: 100%;
    min-width: 100%;
  }

  .exterior.left .span-inner,
  .exterior.right .span-inner {
    display: flex;
    flex-direction: column;
  }
  .exterior.top .span-inner,
  .exterior.bottom .span-inner {
    display: flex;
    flex-direction: row;
  }

  .exterior.top .span-inner,
  .exterior.left .span-inner {
    align-items: flex-end;
  }
  .exterior.right .span-inner,
  .exterior.bottom .span-inner {
    /* align-items: flex-start; */
  }


  .span.sideways .span-inner {
    height: 100%;
  }
  .span.sideways .span-text {
    writing-mode: vertical-rl;
    text-align: center;
    transform: rotate(180deg);
    width: max-content;
  }

  .volta-dashed :is(.span-start, .span-end) {
    border: calc(var(--stroke-width)/2) dashed var(--gridline-color);
  }
  .volta :is(.span-start, .span-end) {
    border: calc(var(--stroke-width)/2) solid var(--gridline-color);
  }
  .dotted :is(.span-start, .span-end) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dotted :is(.span-start, .span-end)::after {
    content: '..................................................................................................................';
    width: 0;
    display: absolute;
    inset: 0;
  }
  .dotted {
    padding: 0 0.5ch;
  }
  .dotted .span-start {
    display: none;
  }
  .dotted.align-middle .span-start {
    display: unset;
  }
  .dotted.align-end .span-start {
    display: unset;
  }
  .dotted.align-end .span-end {
    display: none;
  }
  .dotted .span-text {
    white-space: nowrap;
  }
  


  .exterior .span-start,
  .exterior .span-end {
    flex-grow: 1;
  }
  .exterior .span.align-start .span-start {
    flex-grow: 0;
  }
  .exterior .span.align-end .span-end {
    flex-grow: 0;
  }

  .exterior.top {
    text-align: center;
    margin-bottom: calc(1 * var(--stroke-width));
  }
  .exterior.left {
    text-align: right;
    margin-right: calc(2 * var(--stroke-width));
  }
  .exterior.right {
    text-align: left;
    margin-left: calc(2 * var(--stroke-width));
  }
  .exterior.bottom {
    text-align: center;
    margin-top: calc(1 * var(--stroke-width));
  }
  .exterior.top-left,
  .exterior.top-right,
  .exterior.bottom-left,
  .exterior.bottom-right {
    margin: calc(1 * var(--stroke-width)) calc(2 * var(--stroke-width))
  }


  .exterior.top :is(.volta, .volta-dashed) .span-start {
    border-right: 0;
    border-bottom: 0;
    align-self: flex-end;
    height: 0.3em;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
    min-width: 0.5ch;
  }

  .exterior.top :is(.volta, .volta-dashed) .span-end {
    border-left: 0;
    border-bottom: 0;
    align-self: flex-end;
    height: 0.3em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
  }

  .exterior.left :is(.volta, .volta-dashed) .span-start {
    border-bottom: 0;
    border-right: 0;
    align-self: flex-end;
    width: 1ch;

    min-height: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
    margin-bottom: 0.25ch;
  }
  .exterior.left :is(.volta, .volta-dashed) .span-end {
    border-top: 0;
    border-right: 0;
    align-self: flex-end;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.right :is(.volta, .volta-dashed) .span-start {
    border-bottom: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-top: 0.5ch;
    margin-bottom: 0.25ch;
  }
  .exterior.right :is(.volta, .volta-dashed) .span-end {
    border-top: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;

    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-bottom: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.bottom :is(.volta, .volta-dashed) .span-start {
    border-right: 0;
    border-top: 0;
    align-self: flex-start;
    height: 0.5em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.bottom :is(.volta, .volta-dashed) .span-end {
    border-left: 0;
    border-top: 0;
    align-self: flex-start;
    height: 0.5em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
  }

  .exterior.bottom svg.right-down, 
  .exterior.bottom-right svg.right-down {
    position: relative;
    bottom: 0.45em;
  }
  .exterior.top svg.left-down,
  .exterior.top svg.right-down {
    position: relative;
    bottom: 0.4em;
  }
  .exterior.top svg.down-right {
    position: relative;
    bottom: -0.15em;
  }



.coda-here-vertical-left .span-text > span {
  display: flex;
}
.coda-here-vertical-left .smufl-symbol.coda {
  position: absolute;
  top: calc(1em - var(--thick-stroke-width));
  right: 0.05em;
}

.to-coda-vertical-right .smufl-symbol.coda {
  position: absolute;
  top: calc(0.75em + var(--bar-height) * 0.25);
  left: 0.2em;
}

.to-coda-horizontal-bottom {
  background: red;
}

.coda-immediate.span {
  white-space: initial;
  bottom: calc(0.5 * var(--bar-height));
}
.right-down-right {
  height: calc(0.5 * var(--bar-height) + var(--top-margin) * 0.5 * var(--y-unit) - 0.25 * var(--y-unit));
}
.coda-immediate .smufl-symbol.coda {
  position: absolute;
  bottom: calc(0.25 * var(--bar-height) - var(--thick-stroke-width));
  right: 0.8em;
}
</style>