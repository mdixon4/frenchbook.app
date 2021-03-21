<template>
  <div>
    <div class="stanza" v-for="(stanza, stanzaIdx) in song.stanzas" :key="stanzaIdx">
      <div class="line" v-for="(line, lineIdx) in stanza.lines" :key="lineIdx">
        <frenchy-bar v-for="bar in line.bars" :key="bar.id" :barData="bar"></frenchy-bar>
      </div>
    </div>
  </div>
</template>

<script setup>
import FrenchyBar from './components/FrenchyBar.vue'

import song from './song.js'


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

  .stanza {
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    margin-bottom: 1em;
    box-shadow: 4px 4px cadetblue;
    border: 1px solid navy;
  }
  .line {
    display: inline-flex;
  }
  .bar {
    width: 5rem;
    height: 5rem;
    position: relative;
    flex-shrink: 0;
  }

</style>
