<template>
  <div class="page">
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { songify } from './songify.js'
import FrenchyStanza from './components/FrenchyStanza.vue'
import FrenchyHeader from './components/FrenchyHeader.vue'

import songText from './didnt_he_ramble.js'
let song = songify(songText)

</script>

<style>

  :root {
    --bar-width: 21mm;
    --bar-height: 19mm;

    --x-unit: calc(var(--bar-width) / 2);
    --y-unit: calc(var(--bar-height) / 2);

    --row-gap: var(--y-unit);
    --col-gap: var(--x-unit);

    --gridline-color: black;
    --stop-color: #DDD;
    --stroke-width: .25mm;
  }

  @media screen {
    :root {
      --bar-width: 5rem;
      --bar-height: 4.5rem;
      --stroke-width: 2px;

    }

    body { display: flex; justify-content: center;}
    #app {
      margin: 0.4rem 1rem;
      background-image: 
        linear-gradient(to bottom, transparent 0 22px, lightblue 22px 23px), 
        linear-gradient(to right, transparent 0 70px, crimson 70px 71px, transparent 71px);
      background-size: 9999px 23px;
      background-repeat: repeat;
      border: 1px solid black;
      box-shadow: 4px 4px black;
      padding: 2rem 3rem;
      aspect-ratio: 1 / 1.414;
      overflow-y: auto;
      overflow-x: hidden
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
    font-family: 'LilyJAZZ Text';
    font-size: 16px;
    padding: 0px;
  }

  .page {
    width: 40rem;
    margin: 0 auto;
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
