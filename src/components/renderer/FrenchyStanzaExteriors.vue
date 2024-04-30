<template>
  <div class="stanza-exteriors" :style="{
    '--stanza-width': stanza.width,
    '--stanza-full-width': stanza.fullWidth,
    '--stanza-height': stanza.height,
    '--first-line-indent': firstLineIndent
  }">
    <div v-for="spanGroup in groupedSpans" :key="`${spanGroup.side}-${spanGroup.inset}`"
      class="exterior"
      :class="spanGroup.side"
      :style="{ '--inset': spanGroup.inset }"
    >
      <frenchy-span v-for="span in spanGroup.annotations" :key="span.uuid" :span="span"></frenchy-span>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs } from 'vue'
import FrenchySpan from './FrenchySpan.vue'

const props = defineProps({
  stanza: {
    type: Object
  }
})

const { stanza } = toRefs(props)

const firstLineIndent = computed(() => stanza.value.layout[0]?.indexOf('1') || 0)

const groupedSpans = computed(() => (stanza.value.annotations || [])
  .reduce((groupedSpans, a) => {
    let group = groupedSpans.find(g => g.side === a.side && g.inset === a.inset)
    if (group) {
      group.annotations.push(a)
    } else {
      group = {
        side: a.side,
        inset: a.inset,
        annotations: [a]
      }
      groupedSpans.push(group)
    }
    return groupedSpans
  }, [])
)

</script>

<style>
  .stanza-exteriors {
    display: grid;
    grid-template-columns: 
      [topleft-start left-start bottomleft-start] 0
      [topleft-end left-end bottomleft-end top-start bottom-start content-start] repeat(var(--stanza-full-width), var(--bar-width)) /*repeat(var(--stanza-width), calc(--bar-width)) */
      [top-end bottom-end content-end topright-start right-start bottomright-start] 0
      [topright-end right-end bottomright-end];
    grid-template-rows: 
      [topleft-start top-start topright-start] 0 
      [topleft-end top-end topright-end left-start right-start content-start] repeat(var(--stanza-height), var(--bar-height)) 
      [left-end right-end content-end bottomleft-start bottom-start bottomright-start] 0 
      [bottomleft-end bottom-end bottomright-end];
    position: relative;
    pointer-events: none;
  }

  .exterior {
    display: grid;
    grid-auto-flow: dense;
  }
  .exterior.top {
    width: 100%;
    grid-column-start: top-start;
    grid-column-end: top-end;
    grid-row: calc(var(--inset, 0) + 1);
    align-self: flex-end;
    grid-template-columns: repeat(var(--stanza-full-width), minmax(0, 1fr));
    align-items: flex-end;
  }
  .exterior.left {
    height: 100%;
    justify-self: flex-end;
    grid-row-start: left-start;
    grid-row-end: left-end;
    grid-column: calc(var(--inset, 0) + 1);
    grid-template-rows: repeat(var(--stanza-height), minmax(0, 1fr));
    grid-auto-columns: max-content;
    justify-items: flex-end;
  }
  .exterior.right {
    height: 100%;
    grid-row-start: right-start;
    grid-row-end: right-end;
    grid-column: calc(var(--stanza-full-width) - var(--inset, 0) + 2);
    grid-template-rows: repeat(var(--stanza-height), minmax(0, 1fr));
    grid-auto-columns: max-content;
    justify-items: flex-start;
    align-content: flex-start;
  }
  .exterior.bottom {
    width: 100%;
    grid-column-start: bottom-start;
    grid-column-end: bottom-end;
    grid-row: calc(var(--stanza-height) - var(--inset, 0) + 2);
    grid-template-columns: repeat(var(--stanza-full-width), minmax(0, 1fr));
    grid-auto-rows: min-content;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .exterior.top-left {
    grid-row: top-start;
    grid-column: calc(var(--inset) + 1);
    align-self: flex-end;
    justify-self: flex-end;
  }
  .exterior.top-right {
    grid-row: top-start;
    grid-column: calc(var(--stanza-full-width) - var(--inset) + 2);
    align-self: flex-end;
    justify-self: flex-start;
  }
  .exterior.bottom-left {
    grid-row: bottom-start;
    grid-column: calc(var(--inset) + 1);
    align-self: flex-start;
    justify-self: flex-end;
  }
  .exterior.bottom-right {
    grid-row: bottom-start;
    grid-column: calc(var(--stanza-full-width) - var(--inset) + 2);
    align-self: flex-start;
    justify-self: flex-start;
  }
  .tight .exterior.top, .exterior.top-left, .exterior.top-right {
    margin-bottom: 0;
  }
  .bottom-tight .exterior.bottom, 
  .bottom-tight .exterior.bottom-left, 
  .bottom-tight .exterior.bottom-right {
    margin-top: 0;
  }

/*
  .coda-here {
    grid-column: calc(1 + var(--first-line-indent));
    grid-row: 1;
    align-self: flex-end;
    justify-self: flex-end;
  }
  .segno-here {
    grid-column: calc(1 + var(--first-line-indent));
    grid-row: 1;
    align-self: flex-end;
    justify-self: flex-end;
  }
  .coda-arrow {
    grid-column: calc(1 + var(--first-line-indent));
    grid-row: 2;
    justify-self: flex-end;
    align-self: flex-start;
    transform:  scaleX(-1) rotateZ(90deg);
  }
  .title-left .coda-arrow {
    align-self: center;
    margin-top: -1ch;
  }

  .arrow-top .coda-arrow {
    grid-column: calc(2 + var(--first-line-indent));
    grid-row: 1;
    justify-self: center;
    align-self: flex-end;
    transform:  translateX(-4px) translateY(6px);
  }
  .no-symbol .coda-here {
    display: none;
  }
  .stanza + .stanza.coda .coda-here {
    /* By default, don't show the coda symbol if the coda directly follows another stanza */ /*
    display: none;
  }
  .stanza + .stanza.coda.with-symbol .coda-here {
    /* By default, don't show the coda symbol if the coda directly follows another stanza */ /*
    display: unset; 
  }

  .on-white {
    background-color: transparent;
    position: relative;
  }
  .on-white::after {
    position: absolute;
    height: 0.75em;
    top: 0.25em;
    inset-inline: -0.5ch;
    background: white;
    content: ' ';
    z-index: -1;
  }
*/

</style>