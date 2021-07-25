<template>
  <svg class="stop-shading" viewBox="0 0 100 100" preserveAspectRatio="none">
    <g fill="var(--stop-color)">
      <rect class="beat1" x="0" y="0" width="50" height="50"></rect>
      <rect class="beat2" x="50" y="0" width="50" height="50"></rect>
      <rect class="beat3" x="0" y="50" width="50" height="50"></rect>
      <rect class="beat4" x="50" y="50" width="50" height="50"></rect>
      <path class="left-triangle" d="M 0 0 100 0 0 100 0 0"></path>
      <path class="right-triangle" d="M 100 0 100 100 0 100 100 0"></path>
    </g>
  </svg>
</template>

<script setup>
</script>

<style>
  .stop-shading {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    overflow: visible;

    z-index: 4;
    pointer-events: none;
    mix-blend-mode: darken;
  }
  .stop-shading rect, .stop-shading path { display: none; }
  
  .is-whole-bar-stop rect {
    display: unset;
  }
  .is-stop-on-1.is-slashed .left-triangle {
    display: unset;
  }
  .is-stop-on-3.is-slashed .right-triangle {
    display: unset;
  }
  .is-stop-on-1:not(.is-slashed) .beat1 { display: unset; }
  .is-stop-on-2:not(.is-slashed) .beat2 { display: unset; }
  .is-stop-on-3:not(.is-slashed) .beat3 { display: unset; }
  .is-stop-on-4:not(.is-slashed) .beat4 { display: unset; }
</style>