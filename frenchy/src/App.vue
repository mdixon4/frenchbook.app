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
          <div class="non-music">
            {{ part.text }}
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
    --stroke-width: 2;
  }


  * {
    box-sizing: border-box;
  }
  html, body {
    background: white;
    color: black;
    font-family: 'Patrick Hand';
    font-family: 'LilyJAZZ Text';
    font-size: 16px;
    padding: 10px;
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
    border: calc(var(--stroke-width) * 0.5px) dashed var(--gridline-color);
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
