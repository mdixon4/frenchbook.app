<template>
  <frenchy-page :song="song" :class="template"></frenchy-page>
</template>

<script setup>
import { defineProps, toRefs } from 'vue'
import FrenchyPage from './FrenchyPage.vue'

const props = defineProps({
  song: {
    type: Object,
    required: true
  },
  template: {
    type: String,
    default: ''
  }
})

const { song, template } = toRefs(props)
</script>


<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=Open+Sans+Condensed:wght@700&display=swap');
  @font-face {
    font-family: 'LJC';
    font-style: normal;
    font-weight: normal;
    src: url('../../assets/lilyjazz-chord.otf') format('opentype');
  }
  @font-face {
    font-family: 'MuseJazz';
    font-style: normal;
    font-weight: normal;
    src: url('../../assets/MuseJazz.otf') format('opentype');
  }

  :root {
    --page-width: 210mm;
    --page-height: 297mm;

    --root-bar-width: 22mm;
    --page-columns: 8;
    --x-page-margin: calc(
      calc(var(--page-width) - var(--page-columns) * var(--root-bar-width))
      / 2
    );
    

    --top-page-margin: 10mm;
    --bottom-page-margin: 10mm;
    --root-bar-height: 20mm;
    --header-height: 16mm;

    --font-size: 4.25mm;
    --bar-width: var(--root-bar-width);
    --bar-height: var(--root-bar-height);
    --x-unit: calc(var(--bar-width) / 2);
    --y-unit: calc(var(--bar-height) / 2);

    --row-gap: var(--y-unit);
    --col-gap: var(--x-unit);

    --gridline-color: black;
    --stop-color: #DDD;
    --stroke-width: 0.25mm;
    --thick-stroke-width: 0.75mm;
    --border-stroke-gap-width: 0.25mm;
    --rhythm-font-size: 5mm;
    --text-outline-color: white;

    --serif-font: 'EB Garamond';
    /* --annotation-font: 'EB Garamond'; */
    --annotation-font: 'EB Garamond';
    --annotation-script-font: 'EB Garamond';
    /* --annotation-font: 'MuseJazz Text'; */
    /* --serif-font: 'Patrick Hand SC'; */
    /* --annotation-font: 'Patrick Hand SC'; */
    /* --annotation-font: 'LilyJazz Text'; */
    /* --annotation-script-font: 'Patrick Hand'; */
  }
  html, body {
    color: black;
    font-size: var(--font-size);
    padding: 0px;
    margin: 0;
    font-family: var(--serif-font);
  }
  /* Utility Classes */
  .absolute {
    position: absolute;
  }
  .teeny {
    font-size: 0.8em;
  }

  .non-scaling-stroke {
    vector-effect: non-scaling-stroke;
  }

  [data-outline] {
    display: inline-block;
    isolation: isolate;
  }

  [data-outline]::before {
    content: attr(data-outline);
    position: absolute;
    z-index: -1;
    inset: 0;
    -webkit-text-stroke: var(--stroke-width) var(--text-outline-color);
  }

  .smufl-symbol {
    font-style: normal;
    font-weight: normal;
    font-family: 'MuseJazz';
    font-size: 1.7em;
    line-height: 0;
    position: relative;
  }

  .smufl-symbol.coda {
    bottom: -0.2em;
    font-size: 1.5em;
  }
  .smufl-symbol.segno {
    bottom: -0.2em;
    font-size: 1.5em;
  }
  .smufl-symbol.caesura {
    bottom: -0.1em;
  }
  .smufl-symbol.fermata {
    bottom: -0.1em;
  }
  .smufl-symbol.fermata-up {
    bottom: 0.55em;
  }

  .unicode-symbol {
    font-style: normal;
    font-weight: normal;
    font-size: 2.1em;
    line-height: 0;
    position: relative;
  }
  .unicode-symbol.fermata {
    bottom: -0.4em;
  }
  .unicode-symbol.fermata-up {
    bottom: 0.2em;
  }
  .unicode-symbol.down-right {
    bottom: -0.18em;
  }
  .unicode-symbol.left-down {
    bottom: -0.1em;
  }
  .unicode-symbol.right-down {
    bottom: -0.18em;
  }

  .unicode-symbol.mirror {
    transform: scaleX(-1);
    background: lightskyblue;
    display: inline-block;
  }

  .special-arrow {
    margin-bottom: -.25em;
    margin-right: 0.25ch;
    width: 1rem;
    display: inline-block;
  }

  

  @page {
    size:A4 portrait;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    margin: 0;
    /* -webkit-print-color-adjust: exact; */
  }
  
  /* Do not print UI, just page */
  @media print {
    /* Ensure user agent does not need "print background colours" on in order
       for white outlines to print around chord names etc */
    body {
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }
    .page {
      transform: none !important;
    }

    /* .crisp {
      shape-rendering: crispEdges;
    } */
  }


</style>