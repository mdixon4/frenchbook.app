<template>
  <div ref="spanEl" class="span" :style="{
    '--start': span.start,
    '--end': span.end,
  }" :class="span.classes">
    <div class="span-inner">
      <span class="span-start"></span>
      <span class="span-text" ref="textEl">
        <span>{{ span.text }}</span>
      </span>
      <span class="span-end"></span>
    </div>
    <div class="span-inner sizer-span-inner">
      <span class="span-start"></span>
      <span class="span-text sizer" ref="sizerEl">
        <span>{{ span.text }}</span>
        <span class="sizer-expander" ref="sizerExpander">*********************************************************************************************************************************************************************************************</span>
      </span>
      <span class="span-end"></span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, toRefs, toRef, ref, watch, nextTick, watchEffect, reactive, onUpdated, onMounted } from 'vue'

console.log('Setting up span')
const props = defineProps({
  span: {
    type: Object
  }
})

const span = toRef(props, 'span')
console.log(toRefs(reactive(span.value)))
const { text, start, end, classes, side } = toRefs(reactive(span.value))
const spanEl = ref(null)
const textEl = ref(null)
const sizerEl = ref(null)
const sizerExpander = ref(null)

const resize = () => {
  console.log('resizing!', side)
  if (classes.value.includes('sideways')) {
    resizeSideways()
  } else if (side.value === 'left' || side.value === 'right') {
    resizeSidetext()
  }
}

const resizeSideways = () => {
  sizerEl.value.style.removeProperty('height')
  let minWidth = sizerEl.value.clientWidth
  let height = sizerEl.value.clientHeight

  sizerExpander.value.style.display = 'unset'
  let maxHeight = sizerEl.value.clientHeight
  sizerExpander.value.style.removeProperty('display')
  
  if (height < maxHeight) {
    textEl.value.style.removeProperty('height')
    return
  };

  while (sizerEl.value.clientWidth <= minWidth) {
    height = height - 1;
    if (height < 1) break;
    sizerEl.value.style.height = `${height}px`;
  }

  if (height === 0) {
    textEl.value.style.height = 'min-content'
  } else {
    textEl.value.style.height = `${height + 1}px`
  }

  sizerEl.value.style.removeProperty('height')
}


const resizeSidetext = () => {
  window.sizerEl = sizerEl.value
  window.textEl = textEl.value

  sizerEl.value.style.width = 'min-content'
  console.log({ scrollHeight: sizerEl.value.scrollHeight, parentClientHeight: sizerEl.value.parentElement.clientHeight })
  if (sizerEl.value.scrollHeight <= sizerEl.value.parentElement.clientHeight) {
    console.log({ width: sizerEl.value.clientWidth, height: sizerEl.value.scrollHeight })
    console.log('YAY')
    textEl.value.style.removeProperty('width')
    return
  }
  let width = sizerEl.value.clientWidth
  console.log(width)
  while (sizerEl.value.scrollHeight > sizerEl.value.parentElement.clientHeight) {
    width = width + 1
    sizerEl.value.style.width = `${width}px`
    console.log({ width, height: sizerEl.value.scrollHeight })
  }
  textEl.value.style.width = `${width}px`
  sizerEl.value.style.removeProperty('width')
}


onMounted(() => {
  console.log('MOUNTED')
  resize()
})
onUpdated(resize)

// const { text, start, end, classes, side } = toRefs(span)

// console.log({ text, start, end, classes, side })
// console.log(spanEl)
// watch([text, start, end, classes, side], () => {
  // })

// nextTick(() => {
//   console.log(textEl.value)
//   textEl.value.style.height = 'unset'
//   nextTick(() => {
//   })
// })

// const fitText = () => {
//   if (spanEl.value.clientHeight >= spanEl.value.children[0].clientHeight) {
//     return
//   }
//   spanEl.value.style.width = `${spanEl.value.clientWidth + 5}px`
//   nextTick(fitText)
// }

// let minVertHeight = null;
// let maxVertWidth = null;
// let minVertWidth = null;
// let newHeight = 0;

// const expandVertical = () => {
//   if (textEl.value.clientWidth <= minVertWidth) return
//   newHeight += 1;
//   textEl.value.style.height = `${newHeight}mm`;
//   expandVertical()
// }

// const fitVerticalText = () => {
//   minVertHeight = textEl.value.clientHeight;
//   maxVertWidth = textEl.value.clientWidth;
//   textEl.value.style.height = '999rem';
//   minVertWidth = textEl.value.clientWidth;
//   textEl.value.style.height = 'min-content';
//   expandVertical()
// }

// watch([spanEl, span], () => {
//   if (span.value.classes.includes('sideways')) {
//     // fitVerticalText()
//   } else {
//     // fitText()
//   }
// })

</script>

<style>
  .span {
    position: relative;
  }
  .sizer-span-inner {
    position: absolute;
    inset: 0;
    background: hsla(30deg, 100%, 65%, 0.8);
    opacity: 0.8;
    flex-grow: 1;
    color: red;
    pointer-events: none;
  }
  .sizer {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .sizer-span-inner .span-text {
    position:relative;
    width: min-content;
    background: blue;
  }
  .sizer-expander {
    display: none;
  }
  .sideways .sizer-span-inner .span-text {
    width: max-content;
  }

  .exterior .span {
    font-family: 'EB Garamond';
    font-style: italic;
    line-height: 1;
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

  .exterior.top .span,
  .exterior.left .span {
    align-items: flex-end;
  }
  .exterior.right .span,
  .exterior.bottom .span {
    align-items: flex-start;
  }


  .span.sideways .span-inner {
    height: 100%;
  }
  .span.sideways .span-text {
    writing-mode: vertical-rl;
    text-align: center;
    transform: rotate(180deg);
    /* height: fit-content; */
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
    /* border: calc(var(--stroke-width)/2) dotted; */
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
  }
  .exterior.left :is(.volta, .volta-dashed) .span-end {
    border-top: 0;
    border-right: 0;
    align-self: flex-end;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
  }
  .exterior.right :is(.volta, .volta-dashed) .span-start {
    border-bottom: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.right :is(.volta, .volta-dashed) .span-end {
    border-top: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;

    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-bottom: 0.5ch;
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