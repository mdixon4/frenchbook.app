<template>
  <div class="controller" v-if="isEditing">
    <button class="end-edit" @click="isEditing = false">Close</button>
    <textarea v-model="songText"></textarea>
  </div>
  <button class="begin-edit" v-else @click="isEditing = true">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
  </button>
  <div class="desk">
    <div class="page" v-if="song" ref="pageElement">
      <frenchy-header :metadata="song.metadata"></frenchy-header>
      <div class="song">
        <template v-for="(part, idx) in song.parts" :key="idx">
          <template v-if="part.type === 'hr'"><hr class="hr"></template>
          <template v-if="part.type === 'stanza'">
            <frenchy-stanza :stanza="part"></frenchy-stanza>
          </template>
          <template v-if="part.type === 'plain-text'">
            <div class="non-music" v-html="part.html">
            </div>
          </template>
        </template>
      </div>
      <component :is="'style'">{{ song.css }}</component>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouteHash } from '@vueuse/router'
import panzoom from 'panzoom'
import base64url from 'base64url'
import { songify } from './songify.js'
import FrenchyStanza from './components/FrenchyStanza.vue'
import FrenchyHeader from './components/FrenchyHeader.vue'

const pageElement = ref(null)

// convert a Unicode string to a string in which
// each 16-bit unit occupies only one byte
function toBinary(string) {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint8Array(codeUnits.buffer));
}
function fromBinary(binary) {
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

const toUrlHash = utf8String => {
  return btoa(toBinary(utf8String))
}

const fromUrlHash = base64String => {
  return fromBinary(atob(base64String))
}



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
    return songify(songText.value)
  } catch {
    return null
  }
})

const isEditing = ref(false)

watch(pageElement, () => {
  if (pageElement.value) {
    panzoom(pageElement.value, {
      bounds: true,
      transformOrigin: {x: 0.5, y: 0.5}
    })
  }
})

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500&display=swap');
  @font-face {
    font-family: 'LJC';
    font-style: normal;
    font-weight: normal;
    src: url('./assets/lilyjazz-chord.otf') format('opentype');
  }

  :root {
    --bar-width: 23mm;
    --bar-height: 21mm;
    --x-unit: calc(var(--bar-width) / 2);
    --y-unit: calc(var(--bar-height) / 2);
    --x-page-margin: var(--x-unit);

    --row-gap: var(--y-unit);
    --col-gap: var(--x-unit);

    --gridline-color: black;
    --stop-color: #DDD;
    --stroke-width: .5mm;
    --thick-stroke-width: 0.75mm;
  }

  @media print {
    .controller {
      display: none;
    }
    .begin-edit {
      display: none;
    }
  }

  @media screen {
    :root {
      --bar-width: 5rem;
      --bar-height: 4.5rem;
      --stroke-width: 2px;
      --thick-stroke-width: 3px;
    }

    /* body { display: flex; justify-content: center;} */

    #app {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 100vh;
      background-color: #252600;
      background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");
      align-items: stretch;
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
      overflow: hidden;
      /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
    }

    .page {
      background: white;
      /* margin: 0.4rem auto; */
      /* --page-height: 50rem; */
      background-image: 
        linear-gradient(to bottom, transparent 0 calc(var(--page-height) - 3px), red calc(var(--page-height) - 3px) var(--page-height));
      background-size: var(--page-width) calc(var(--page-height) + 1px);
      min-height: var(--page-height);
      /* background-image: 
        linear-gradient(to bottom, transparent 0 22px, lightblue 22px 23px), 
        linear-gradient(to right, transparent 0 70px, crimson 70px 71px, transparent 71px); */
      /* background-size: 9999px 23px; */
      background-repeat: repeat;
      border: 1px solid black;
      box-shadow: 4px 4px black;
      /* aspect-ratio: 1 / 1.414; */
      /* overflow-y: auto; */
      /* overflow-x: hidden */
      margin: var(--y-unit) auto;
    }
  }


  g.borders path {
    stroke-width: var(--stroke-width);
    stroke: var(--gridline-color);
    stroke-linecap: square;
  }

  g.borders-internal path {
    stroke-width: var(--stroke-width);
    stroke: var(--gridline-color);
  }


  * {
    box-sizing: border-box;
  }
  html, body {
    /* background: white; */
    color: black;

    /* font-family: 'Patrick Hand'; */
    /* font-family: 'Century'; */
    /* font-family: 'IM Fell DW Pica'; */
    font-size: 16px;
    padding: 0px;
    margin: 0;
  }

  .page {
    --page-width: calc(8 * var(--bar-width) + 2 * var(--x-page-margin));
    --page-height: calc(1.41 * var(--page-width));
    width: var(--page-width);
    padding: var(--y-unit) var(--x-page-margin)
  }

  .song {
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .hr {
    margin: 0;
    border: calc(var(--stroke-width) * 1) dashed var(--gridline-color);
    border-top: 0;
    align-self: stretch;
  }

  .non-music {
    white-space: pre;
    font-size: calc(20/16 * 1rem);
  }

  .coda-here {
    position: absolute;
    display: flex;
    align-items: start;
    right: 100%;
    flex-direction: column;
    top: -8px;
    filter: drop-shadow(white 0 1px) drop-shadow(white 0 -1px) drop-shadow(white 1px 0) drop-shadow(white -1px 0);
  }
  .coda-here .coda-arrow {
    transform: rotate(90deg) scaleY(-1);
  }
  
  

  .coda-symbol {
    height: 24px;
    margin-right: -6px;
    margin-bottom: -4px;
  }
  .coda-arrow {
    width: 24px;
  }

  .segno-here {
    position: absolute;
    right: 100%;
  }
  .segno-symbol {
    height: 24px;
  }

</style>
