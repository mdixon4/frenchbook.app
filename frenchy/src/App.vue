<template>
  <div class="controller" v-if="isEditing">
    <button class="end-edit" @click="isEditing = false">Close</button>
    <textarea v-model="songText"></textarea>
  </div>
  <button class="begin-edit" v-else @click="isEditing = true">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
  </button>
  <div class="desk">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="page-holder">
      <frenchy-page :song="song"></frenchy-page>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { songify } from './songify'
import { fromUrlHash, toUrlHash } from './util'

import FrenchyPage from './components/FrenchyPage.vue'

const errorMessage = ref('')
const isEditing = ref(false)
let rawSongText = fromUrlHash(window.location.hash.substr(1))
let songText = ref(rawSongText)

watch(songText, () => {
  try {
    window.location.hash = toUrlHash(songText.value)
  } catch (err) {
    console.error(err)
  }
})

let song = computed(() => {
  try {
    errorMessage.value = ''
    return songify(songText.value)
  } catch (err) {
    errorMessage.value = err
    console.error(err)
    return null
  }
})

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
    --root-bar-width: 23mm;
    --root-bar-height: 21mm;
    --font-size: 4.25mm;
    --bar-width: var(--root-bar-width);
    --bar-height: var(--root-bar-height);

    --x-unit: calc(var(--bar-width) / 2);
    --y-unit: calc(var(--bar-height) / 2);
    --x-page-margin: var(--x-unit);

    --row-gap: var(--y-unit);
    --col-gap: var(--x-unit);

    --gridline-color: black;
    --stop-color: #DDD;
    --stroke-width: .5mm;
    --thick-stroke-width: 0.75mm;
    --rhythm-font-size: 5mm;
    --text-outline-color: white;

    --serif-font: 'EB Garamond', 'MuseJazz';
  }

  /* Utility Classes */
  .absolute {
    position: absolute;
  }
  .teeny {
    font-size: 0.8em;
  }

  /* Do not print UI, just page */
  @media print {
    .controller {
      display: none;
    }
    .begin-edit {
      display: none;
    }
    .page {
      transform: none !important;
    }
  }

  @media screen {
    #app {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 100vh;
      background-color: #252600;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      align-items: stretch;
      overflow: hidden;
    }

    .controller {
      color: white;
      background: rgba(255, 255, 255, 0.329);
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      min-height: 20rem;
      min-width: 20rem;
      z-index: 500;
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

    .controller textarea {
      position: relative;
      flex-grow: 1;
    }

    .desk {
      flex-grow: 1;
      max-height: 100vh;
      padding: var(--y-unit);
      display:flex;
      justify-content: center;
    }

    .page-holder:focus {
      outline: none;
    }

    .page {
      background: white;
      background-image: 
        linear-gradient(to bottom, transparent 0 calc(var(--page-height) - 3px), red calc(var(--page-height) - 3px) var(--page-height));
      background-size: var(--page-width) calc(var(--page-height) + 1px);
      min-height: var(--page-height);
      background-repeat: repeat;
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

</style>
