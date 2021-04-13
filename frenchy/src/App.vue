<template>
  <div class="controller">
    <textarea v-model="songText"></textarea>
  </div>
  <div class="desk">
    <div class="page" v-if="song">
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
import base64url from 'base64url'
import { songify } from './songify.js'
import FrenchyStanza from './components/FrenchyStanza.vue'
import FrenchyHeader from './components/FrenchyHeader.vue'


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
    --stroke-width: .25mm;
  }

  @media print {
    .controller {
      display: none;
    }
  }

  @media screen {
    :root {
      --bar-width: 5rem;
      --bar-height: 4.5rem;
      --stroke-width: 2px;
    }

    /* body { display: flex; justify-content: center;} */

    #app {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 100vh;
      background: #444;
    }

    .controller {
      color: white;
      padding: 1rem;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      max-height: 100vh;
      min-height: 20rem;
      min-width: 20rem;
    }

    .controller textarea {
      position: relative;
      flex-grow: 1;
    }

    .desk {
      background-color: #252600;
      background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");
      flex-grow: 1;
      /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
    }

    .page {
      background: white;
      /* margin: 0.4rem auto; */
      /* --page-height: 50rem; */
      background-image: 
        linear-gradient(to bottom, transparent 0 calc(var(--page-height) - 3px), red calc(var(--page-height) - 3px) var(--page-height));
      background-size: var(--page-width) calc(var(--page-height) + 1px);
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
