<template>
  <frenchy-ui v-model:songText="songText">
    <frenchy-renderer :song="song" :template="logoClass"></frenchy-renderer>
  </frenchy-ui>
</template>

<script setup lang="ts">
import { useSongParser } from './composables/useSongParser'
import { useBase64RouteHash } from './composables/useBase64RouteHash'

import FrenchyUi from './components/ui/FrenchyUi.vue'
import FrenchyRenderer from './components/renderer/FrenchyRenderer.vue'

const logoClass = window.location.pathname === '/s/' ? 'with-shirazz-logo' : 'with-french-book-logo'
const songText = useBase64RouteHash()
const song = useSongParser(songText)
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,700;1,500;1,700&family=Open+Sans+Condensed:wght@700&display=swap');
  @font-face {
    font-family: 'LJC';
    font-style: normal;
    font-weight: normal;
    src: url('./assets/lilyjazz-chord.otf') format('opentype');
  }
  @font-face {
    font-family: 'MuseJazz';
    font-style: normal;
    font-weight: normal;
    src: url('./assets/MuseJazz.otf') format('opentype');
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
    .controller {
      display: none;
    }
    .begin-edit {
      display: none;
    }
    .page {
      transform: none !important;
    }

    /* .crisp {
      shape-rendering: crispEdges;
    } */
  }

  @media screen {

    #app.docked-left {
      flex-direction: row;
    }
    #app.docked-top {
      flex-direction: column;
    }

    #app {
      display: flex;
      flex-direction: row;
      /* flex-wrap: wrap; */
      height: 100vh;
      background-color: #080f1f;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      align-items: stretch;
      overflow: hidden;
    }

    #app.backdrop-wood {
      background-color: #6a4d3d;
      background-image: url(https://source.unsplash.com/J2gEgTPM_OA/1600x900)
    }
    #app.backdrop-blue-wall {
      background-color: #4772aa;
      background-image: url(https://source.unsplash.com/BawjznQ3Q8U/1600x900)
    }
    #app.backdrop-nebula {
      background-color: #775318;
      background-image: url(https://source.unsplash.com/-hI5dX2ObAs/1600x900)
    }
    #app.backdrop-bright-paper {
      background-color: #fec42d;
      background-image: url(https://source.unsplash.com/7OCUyev2M9E/1600x900)
    }
    #app.backdrop-black-sand {
      background-color: #2c2c2c;
      background-image: url(https://source.unsplash.com/w1_4YH5IhDg/1600x900)
    }

    .begin-edit {
      border: 0;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.329);
      box-shadow: black 4px 4px 18px;
      color: white;
      position: fixed;
      left: 1rem;
      top: 1rem;
      border-radius: 100%;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      z-index: 50;
    }
    .begin-edit svg {
      width: 2rem;
      height: 2rem;
    }
    .open-settings {
      border: 0;
      padding: 0.5rem;
      background: rgba(255, 255, 255, 0.329);
      box-shadow: black 4px 4px 18px;
      color: white;
      position: fixed;
      right: 1rem;
      top: 1rem;
      border-radius: 100%;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      z-index: 50;
    }
    .open-settings svg {
      width: 2rem;
      height: 2rem;
    }

    .desk {
      flex-grow: 1;
      flex-shrink: 1;
      max-height: 100vh;
      padding: var(--y-unit);
      display:flex;
      justify-content: center;
      /* overflow: hidden; */
    }

    .page-holder:focus {
      outline: none;
    }

    .page {
      background: white;
      border: 1px solid black;
      box-shadow: 4px 4px black;
    }

  }


  * {
    box-sizing: border-box;
  }
  html, body {
    color: black;
    font-size: var(--font-size);
    padding: 0px;
    margin: 0;
    font-family: var(--serif-font);
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
</style>
