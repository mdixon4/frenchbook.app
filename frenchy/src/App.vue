d<template>
  <div>
    <div class="title">
      {{ song.metadata.title }}
    </div>

    <div class="song">
      <div class="stanza" v-for="(stanza, stanzaIdx) in song.stanzas" :key="stanzaIdx">
        <template v-for="(line, lineIdx) in stanza.lines">
          <div v-if="line.isText" class="line-text" :key="`text${lineIdx}`" :class="{ 'align-right': line.align === 'right' }">
            {{ line.text }}
          </div>
          <div v-else class="line" :key="lineIdx" :class="{ 'align-right': line.align === 'right' }">
            <frenchy-bar v-for="bar in line.bars" :key="bar.id" :barData="bar"></frenchy-bar>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { songify } from './songify.js'
import FrenchyBar from './components/FrenchyBar.vue'

import songText from './song3.js'

let song = computed(() => songify(songText))
// let title = song.metadata.title

</script>

<style>
  * {
    box-sizing: border-box;
  }
  html, body {
    background: white;
    color: black;
    font-family: 'Century Schoolbook';
    font-size: 16px;
    padding: 10px;
  }

  .title {
    display: block;
    border: 3px solid var(--gridline-color);
    text-align: center;
    padding: 1rem;
    margin-bottom: 2rem;
    font-size: 2rem;
  }

  :root {
    --gridline-color: black;
    --stop-color: #DDD;
  }

  .song {
    display: flex;
    flex-direction: column;
    gap: 2.5em;
    align-items: center;
  }

  .stanza {
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    /* box-shadow: 4px 4px #EEE; */
    /* filter: drop-shadow(2px 0 var(--gridline-color)) drop-shadow(-2px 0 var(--gridline-color)) drop-shadow(0 -2px var(--gridline-color)) drop-shadow(0 2px var(--gridline-color)); */
    /* border: 1px solid var(--gridline-color); */
    /* background: white; */
  }
  .line {
    display: inline-flex;
    background: white;
  }
  .line.align-right {
    align-self: end;
  }
  .line-text.align-right {
    align-self: end;
  }
  .bar {
    width: 5rem;
    height: 5rem;
    position: relative;
    flex-shrink: 0;
  }

</style>
