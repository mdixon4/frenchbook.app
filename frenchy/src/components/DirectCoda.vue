<template>
  <div class="direct-coda-conglomerate">
    <div class="direct-coda-symbol">
      <span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>
    </div>
    <div class="direct-coda-arrow">
      <svg class="top" viewBox="-50 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
        <path d="
          M-40 0 
          L -20 0
          A 20 20 0 0 1 0 20 
          L 0 50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="middle" viewBox="-50 -1 100 2" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible" preserveAspectRatio="none">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="black" stroke-width="6" stroke-linecap="flat" stroke-linejoin="round"/>
      </svg>
      <svg class="bottom" viewBox="-50 -30 100 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
        <path d="M30 22 L55 0 L30 -22" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M0 -40 L0 -20 A 20 20 0 0 0 20 0 L50 0" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </div>
</template>

<script setup>

</script>

<style>
.direct-coda {
  display: flex;
  align-items: flex-end;
}
.direct-coda-conglomerate {
  /* background: green; */
  display: flex;
  /* margin-right: -0.4rem; */
  height: calc(var(--top-margin)/2 * var(--y-unit) + 0.25 * var(--bar-height));
  position: relative;
  bottom: calc(0.75 * var(--bar-height));
}

.tight .direct-coda-conglomerate {
  /* height: calc(var(--top-margin)/2 * var(--y-unit) + 0.25 * var(--bar-height)); */
  /* bottom: calc(-0.25 * var(--bar-height)); */
}

.direct-coda-arrow {
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-top: calc(0.25 * var(--y-unit));
}
.direct-coda-arrow .middle {
  flex-grow: 1;
}

.direct-coda-symbol {
  align-self: flex-start;
  margin-right: -0.5rem;
  margin-top: calc(0.875 * var(--y-unit));
}

.direct-coda .smufl-symbol {
  position: relative;
  display: block;
}
</style>