<template>
  <div>
    <frenchy-header :metadata="song.metadata"></frenchy-header>
    <div class="song">
      <div class="song-grid">
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

    --gridline-color: #333;
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


  :root {
  }

  .song {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .song-grid {
    position: relative;
  }

  .song-grid::after {
    display: block;
    content: '';
    /* background: #88F3; */
    position: absolute;
    left: 0;
    right: 0;
    height: 60rem;
    pointer-events: none;
  }

  .hr {
    margin: 0;
    border: calc(var(--stroke-width) * 0.5px) dashed var(--gridline-color);
  }

  .stanza-title {
    white-space: nowrap;
    z-index: 50;
  }

  .stanza {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: start;
    page-break-inside: avoid;
    left: calc((var(--column-start) - 1) * var(--x-unit));


    /* grid-column: var(--column-start) / span var(--column-span);
    grid-row: var(--row-start, auto) / span var(--row-span); */

    /* page-break-after: always; */
    /* box-shadow: 4px 4px #EEE; */
    /* filter: drop-shadow(2px 0 var(--gridline-color)) drop-shadow(-2px 0 var(--gridline-color)) drop-shadow(0 -2px var(--gridline-color)) drop-shadow(0 2px var(--gridline-color)); */
    /* border: 1px solid var(--gridline-color); */
    /* background: white; */
  }
  .stanza-title {
    font-size: calc(18/16 * 1rem);
    text-shadow: white 1px 1px, white -1px -1px, white 1px -1px, white -1px 1px;
  }
  .stanza-break {
    position: relative;
    display: flex;
    align-items: end;
    height: 1em;
  }
  .stanza-music {
    display: flex;
    flex-direction: column;
  }

  .line {
    display: inline-flex;
    /* background: white; */
    position: relative;
  }
  .line.align-right {
    align-self: end;
  }
  .line-text.align-right {
    align-self: end;
  }
  .bar {
    width: var(--bar-width);
    height: var(--bar-height);
    position: relative;
    flex-shrink: 0;
  }

  .line-rhythms {
    position: absolute;
    bottom: 0;
    /* top: 100%; */
    /* height: 5rem; */
    /* background: #38B6; */
    display: flex;
    right: 0;
    font-family: 'rhythms';
    font-size: 1.2rem;
    line-height: 1.8rem;
  }
  .line-rhythms > div {
    width: 5rem;
    display: flex;
    justify-content: space-around;
    white-space: pre;
    /* padding-left: 0.5rem; */
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
</style>
