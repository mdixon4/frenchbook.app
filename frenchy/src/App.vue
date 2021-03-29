d<template>
  <div>
    <div class="header">
      <div class="logo">Shirazz</div>
      <div class="id">{{ song.metadata.number }}. {{ song.metadata.title }} - {{ song.metadata.key}}</div>
      <div class="copyright"></div>
    </div>
    <div class="title-bar">
      <div class="number">{{ song.metadata.number }}</div>
      <div class="title">
        {{ song.metadata.title }}
      </div>
      <div class="number">{{ song.metadata.number }}</div>
    </div>

    <div class="song">
      <div class="song-grid">
        <template v-for="(stanza, stanzaIdx) in song.stanzas" :key="stanzaIdx">
          <template v-if="stanza.isMusic">
            <div class="stanza" :style="{
              '--column-start': stanza.columnStart,
              '--column-span': stanza.columnSpan,
              '--row-start': stanza.rowStart,
              '--row-span': stanza.rowSpan + 1
            }">
              <div class="stanza-break"></div>
              <template v-for="(line, lineIdx) in stanza.lines" :key="lineIdx">
                <div class="line" :class="{ 'align-right': line.align === 'right' }">
                  <div v-if="lineIdx === 0 && (stanza.title === 'CODA' || stanza.title === 'TAG')" class="coda-arrow">
                    <svg viewBox="0 0 24 24" width="32px" height="32px" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                  </div>
                  <div v-if="lineIdx === 0" class="stanza-title">{{ stanza.title }}</div>
                  <frenchy-bar v-for="(bar, barIdx) in line.bars" :key="bar.id" :barData="bar" :barIdx="barIdx" :lineIdx="lineIdx" :lineLayout="stanza.lineLayout"></frenchy-bar>
                  <div v-if="line.rhythms" class="line-rhythms">
                    <div v-for="(rhythm, rhythmIdx) in line.rhythms" :key="rhythmIdx">
                      <span>{{ rhythm.rhythms.textContent }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </template>
          <template v-else>
            <div class="non-music">
              {{ stanza.text }}
            </div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { songify } from './songify.js'
import FrenchyBar from './components/FrenchyBar.vue'

import songText from './out_of_nowhere.js'
let song = songify(songText)

</script>

<style>

  * {
    box-sizing: border-box;
  }
  html, body {
    background: white;
    color: black;
    font-family: 'Patrick Hand';
    font-size: 16px;
    padding: 10px;
  }

  .header {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    font-family: 'Century Schoolbook';
    width: 40rem;
    margin: 0 auto;
  }
  .logo {
    font-weight: bold;
  }

  .title-bar {
    display: grid;
    grid-template-columns: max-content auto max-content;
    border: 3px solid var(--gridline-color);
    width: 40rem;
    margin: 0 auto;
  }

  .number {
    font-family: 'Arial Narrow';
    font-weight: bold;
    color: red;
    padding: 0.5rem;
    font-size: 1.8rem;
    align-self: center;
  }
  

  .title {
    font-family: 'reprise title';
    text-align: center;
    padding: 0.5rem;
    font-size: 3rem;
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

  .song-grid {
    display: grid;
    grid-template-columns: repeat(16, 2.5rem);
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

  .stanza-title {
    position: absolute;
    white-space: nowrap;
    bottom: calc(100%);

    /* padding: 0.5rem; */
    /* right: 100%; */
    /* bottom: 100%; */
    /* transform: rotate(-90deg); */
    /* transform-origin: 100% 100%; */
    /* font-weight: bold; */
  }

  .stanza {
    display: inline-flex;
    flex-direction: column;
    align-items: start;
    page-break-inside: avoid;
    grid-column: var(--column-start) / span var(--column-span);
    grid-row: var(--row-start, auto) / span var(--row-span);

    /* page-break-after: always; */
    /* box-shadow: 4px 4px #EEE; */
    /* filter: drop-shadow(2px 0 var(--gridline-color)) drop-shadow(-2px 0 var(--gridline-color)) drop-shadow(0 -2px var(--gridline-color)) drop-shadow(0 2px var(--gridline-color)); */
    /* border: 1px solid var(--gridline-color); */
    /* background: white; */
  }
  .stanza-title {
    font-size: calc(18/16 * 1rem);
  }
  .stanza-break {
    height: 2.5rem;
  }
  .line {
    display: inline-flex;
    background: white;
    position: relative;
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

  .coda-arrow {
    padding: 0 0.5em;
    align-self: center;
    /* background: red; */
  }
  .non-music {
    white-space: pre;
    font-size: calc(20/16 * 1rem);
  }
</style>
