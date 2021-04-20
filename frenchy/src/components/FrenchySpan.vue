<template>
  <div ref="spanEl" class="span" :style="{
    '--start': span.start,
    '--end': span.end,
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
import { defineProps, toRefs, toRef, ref, watch, nextTick, watchEffect, reactive, onUpdated, onMounted } from 'vue'

const props = defineProps({
  span: {
    type: Object
  }
})

const span = toRef(props, 'span')

</script>

<style>

  .exterior .span {
    font-family: 'EB Garamond';
    font-style: italic;
    line-height: 1;
  }
  .exterior .span-text strong {
    font-style: normal;
    font-size: calc(18/16 * 1em);
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
    /* display: flex;
    flex-direction: row; */
  }

  .exterior.left .span,
  .exterior.right .span {
    grid-row-start: var(--start, 1);
    grid-row-end: calc(var(--end, -2) + 1);
    /* display: flex;
    flex-direction: column; */
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
    align-items: flex-start;
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
    margin-bottom: calc(2 * var(--stroke-width));
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
    margin-top: calc(2 * var(--stroke-width));
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

    
</style>