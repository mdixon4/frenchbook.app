<template>
  <div class="here-coda-conglomerate">
    <div class="here-coda-symbol">
      <span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>
    </div>
    <div class="here-coda-arrow">
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
.here-coda {
  display: flex;
  align-items: flex-end;
}
.here-coda-conglomerate {
  /* background: green; */
  display: flex;
  flex-direction: column;
  /* margin-right: -0.4rem; */
  /* height: calc(var(--top-margin)/2 * var(--y-unit) + 0.25 * var(--bar-height)); */
  position: relative;
  bottom: calc(0.5 * var(--bar-height));
}

.tight .here-coda-conglomerate {
  /* height: calc(var(--top-margin)/2 * var(--y-unit) + 0.25 * var(--bar-height)); */
  /* bottom: calc(-0.25 * var(--bar-height)); */
}

.here-coda-arrow {
  width: 1.5rem;
  display: flex;
  flex-direction: column;
  margin-top: calc(0.25 * var(--y-unit));
}
.here-coda-arrow .middle {
  flex-grow: 1;
}

.here-coda-symbol {
  /* align-self: flex-start; */
  margin-right: 0.25rem;
  margin-bottom: var(--stroke-width);
  /* margin-top: calc(0.875 * var(--y-unit)); */
}

.here-coda .smufl-symbol {
  position: relative;
  display: block;
}
</style>