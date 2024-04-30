<template>
  <svg class="bar-borders" viewBox="0 0 100 100" preserveAspectRatio="none">
    <path class="internal-border ╱" vector-effect='non-scaling-stroke' d="M 100 0, 0 100"></path>
    <path class="internal-border ┘" vector-effect='non-scaling-stroke' d="M 50 0, 50 50, 0 50"></path>
    <path class="internal-border ┴" vector-effect='non-scaling-stroke' d="M 50 0, 50 50 M 0 50, 100 50"></path>
    <path class="internal-border ┼" vector-effect='non-scaling-stroke' d="M 50 0 50 100 M 0 50 100 50"></path>
    <path class="internal-border ┬" vector-effect='non-scaling-stroke' d="M 0 50 100 50 M 50 50 50 100"></path>
    <path class="internal-border ┌" vector-effect='non-scaling-stroke' d="M 100 50 50 50 50 100"></path>

    <path class="barline top-barline" vector-effect='non-scaling-stroke' d="M 0 0 100 0"></path>
    <path class="barline bottom-barline" vector-effect='non-scaling-stroke' d="M 0 100 100 100"></path>    
    <g class="barline left-barline">
      <path class="left-barline-line" vector-effect='non-scaling-stroke' d="M 0 0 0 100"></path>
      <path class="left-barline-bracket" vector-effect='non-scaling-stroke' d="M 10 4 C 5 6 3 12 3 20 L 3 80 C 3 88 5 94 10 96"></path>
      <g class="left-barline-repeat">
        <circle cx="7" cy="40" r="2" fill="var(--gridline-color)"></circle>
        <circle cx="7" cy="60" r="2" fill="var(--gridline-color)"></circle>
      </g>
    </g>
    <g class="barline right-barline">
      <path class="right-barline-line" vector-effect='non-scaling-stroke' d="M 100 0 100 100"></path>
      <path class="right-barline-bracket" vector-effect='non-scaling-stroke' d="M 90 4 C 95 6 97 12 97 20 L 97 80 C 97 88 95 94 90 96"></path>
      <g class="right-barline-repeat">
        <circle cx="93" cy="40" r="2" fill="var(--gridline-color)"></circle>
        <circle cx="93" cy="60" r="2" fill="var(--gridline-color)"></circle>
      </g>
    </g>
  </svg>
</template>

<script setup>

</script>

<style>
.bar-borders {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  overflow: visible;
}

.internal-border {
  display: none;
  fill: none;
  stroke: var(--gridline-color);
  stroke-width: var(--stroke-width);
}
.blocks-╱ .╱ { display: unset; }
.blocks-┘ .┘ { display: unset; }
.blocks-┴ .┴ { display: unset; }
.blocks-┼ .┼ { display: unset; }
.blocks-┬ .┬ { display: unset; }
.blocks-┌ .┌ { display: unset; }

.barline, .barline path {
  fill: none;
  stroke: var(--gridline-color);
  stroke-width: var(--stroke-width);
}

.left-barline-bracket, .right-barline-bracket,
.left-barline-repeat, .right-barline-repeat {
  display: none;
}

.has-left-bracket-barline .left-barline-bracket,
.has-right-bracket-barline .right-barline-bracket,
.has-left-repeat-barline .left-barline-repeat,
.has-right-repeat-barline .right-barline-repeat {
  display: unset;
}


.is-leftmost .left-barline {
  transform: translateX(calc(0.5 * var(--stroke-width)));
}
.has-left-double-barline .left-barline {
  /* --gridline-color: red; */
  transform: translateX(calc(1.25 * var(--border-stroke-gap-width)));
}
.is-leftmost.has-left-double-barline .left-barline {
  transform: translateX(calc(3.5 * var(--stroke-width)));
}

.is-rightmost .right-barline {
  transform: translateX(calc(-0.5 * var(--stroke-width)));
}
.has-right-double-barline .right-barline {
  /* --gridline-color: red; */
  transform: translateX(calc(-1.25 * var(--border-stroke-gap-width)));
}
.is-rightmost.has-right-double-barline .right-barline {
  transform: translateX(calc(-3.5 * var(--stroke-width)));
}
</style>