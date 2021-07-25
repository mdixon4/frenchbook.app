<template>
  <div class="wayfinding-diagram">
    <div class="to-coda-wayfinding" v-if="span.text === 'TOCODA'">
      <div class="wayfinding-coda-symbol">
        <span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>
      </div>
      <div class="wayfinding-arrow">
        <svg class="top" viewBox="-50 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
          <path d="M22 30 L0 55 L-22 30" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="
            M-40 0 
            L -20 0
            A 20 20 0 0 1 0 20 
            L 0 50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
    <div class="coda-here-wayfinding" v-if="span.text === 'CODA'">
      <div class="wayfinding-coda-symbol">
        <span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>
      </div>
      <div class="wayfinding-arrow">
        <svg class="bottom" viewBox="-50 -30 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
          <path d="M30 22 L55 0 L30 -22" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M0 -40 L0 -20 A 20 20 0 0 0 20 0 L50 0" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  span: {
    type: Object
  }
})
</script>

<style>
.wayfinding-diagram {
  /* background: gold; */
  display: flex;
}

.to-coda-wayfinding {
  display: flex;
  align-items: center;
  position: relative;
}

.wayfinding-arrow {
  width: 1.5rem;
}

.exterior.right .to-coda-wayfinding {
  flex-direction: column;
  align-self: end;
  bottom: calc(30/100 * 1.5rem);
  margin-left: calc(-1 * var(--stroke-width))
}
.exterior.right .to-coda-wayfinding .wayfinding-coda-symbol {
  margin-left: -0.2em;
  margin-bottom: -0.1em; 
  /* calc(0.5 * var(--bar-height) - 30/100 * 1.5rem); */
}
.exterior.bottom .to-coda-wayfinding {
  /* flex-direction: column; */
  margin-right: -0.55rem;
  margin-left: auto;
  flex-direction: row-reverse;
  /* bottom: calc(30/100 * 1.5rem); */
  /* margin-left: calc(-1 * var(--stroke-width)) */
}
.exterior.bottom .to-coda-wayfinding .wayfinding-coda-symbol {
  margin-left: -0.35em;
  margin-top: 0.2rem;
  /* margin-bottom: -0.1em;  */
  /* calc(0.5 * var(--bar-height) - 30/100 * 1.5rem); */
}

.exterior.left .wayfinding-diagram,
.exterior.right .wayfinding-diagram {
  height: 100%;
}
.exterior.bottom .wayfinding-diagram {
  width: 100%;
}



.coda-here-wayfinding {
  /* background: green; */
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin-right: -0.4rem; */
  /* height: calc(var(--top-margin)/2 * var(--y-unit) + 0.25 * var(--bar-height)); */
  position: relative;
  bottom: calc(0.5 * var(--bar-height));
  /* background: red; */
}

.coda-here-wayfinding .wayfinding-arrow {
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-top: calc(0.25 * var(--y-unit));
}

.coda-here-wayfinding .wayfinding-coda-symbol {
  margin-bottom: -0.1rem;
}

</style>