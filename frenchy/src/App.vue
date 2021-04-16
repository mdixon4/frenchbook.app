<template>
  <div class="controller" v-if="isEditing">
    <button class="end-edit" @click="isEditing = false">Close</button>
    <textarea v-model="songText"></textarea>
  </div>
  <button class="begin-edit" v-else @click="isEditing = true">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
  </button>
  <div class="desk">
    <div class="page-holder">
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

let song = {
  metadata: {
    title: 'Working on stanza annotations',
    key: '',
    number: '',
    credits: ''
  },
  parts: [
    {
      id: 0,
      type: 'stanza',
      title: 'Verse',
      classes: [],
      lines: [
        {
          bars: [
            {
              id: 1,
              textContent: ' F Dm7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'F',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'F',
                    modifierSymbols: [],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'F',
                    root: 'F',
                    modifier: '',
                    modifiers: [],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">F</span>',
                  beats: '12'
                },
                {
                  chord: 'Dm7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'D',
                    modifierSymbols: [ 'm', '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'Dm7',
                    root: 'D',
                    modifier: 'm7',
                    modifiers: [ 'm', '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">D</span><span class=\"modifier\">m<span class=\"mod-digit\">7</span></span>',
                  beats: '34'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: true,
              isRightmost: false,
              isTopmost: true,
              isBottommost: false
            },
            {
              id: 2,
              textContent: ' Gm7 C7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: "qry-ryQ",
              chords: [
                {
                  chord: 'Gm7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'G',
                    modifierSymbols: [ 'm', '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'Gm7',
                    root: 'G',
                    modifier: 'm7',
                    modifiers: [ 'm', '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">G</span><span class=\"modifier\">m<span class=\"mod-digit\">7</span></span>',
                  beats: '12'
                },
                {
                  chord: 'C7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'C',
                    modifierSymbols: [ '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'C7',
                    root: 'C',
                    modifier: '7',
                    modifiers: [ '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">C</span><span class=\"modifier\"><span class=\"mod-digit\">7</span></span>',
                  beats: '34'
                }
              ],
              classes: [],
              isLeftmost: false,
              isRightmost: false,
              isTopmost: true,
              isBottommost: false
            },
            {
              id: 3,
              textContent: ' F ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: "q  ry-q  Q",
              chords: [
                {
                  chord: 'F',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'F',
                    modifierSymbols: [],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'F',
                    root: 'F',
                    modifier: '',
                    modifiers: [],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">F</span>',
                  beats: '1234'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: false,
              isRightmost: false,
              isTopmost: true,
              isBottommost: false
            },
            {
              id: 4,
              textContent: ' C7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'C7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'C',
                    modifierSymbols: [ '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'C7',
                    root: 'C',
                    modifier: '7',
                    modifiers: [ '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">C</span><span class=\"modifier\"><span class=\"mod-digit\">7</span></span>',
                  beats: '1234'
                }
              ],
              annotation: 'fast',
              classes: [],
              isLeftmost: false,
              isRightmost: true,
              isTopmost: true,
              isBottommost: false
            }
          ],
          align: 'left'
        },
        {
          bars: [
            {
              id: 1,
              textContent: ' F Dm7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'F',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'F',
                    modifierSymbols: [],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'F',
                    root: 'F',
                    modifier: '',
                    modifiers: [],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">F</span>',
                  beats: '12'
                },
                {
                  chord: 'Dm7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'D',
                    modifierSymbols: [ 'm', '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'Dm7',
                    root: 'D',
                    modifier: 'm7',
                    modifiers: [ 'm', '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">D</span><span class=\"modifier\">m<span class=\"mod-digit\">7</span></span>',
                  beats: '34'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: true,
              isRightmost: false,
              isTopmost: false,
              isBottommost: true
            },
            {
              id: 2,
              textContent: ' Gm7 C7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'Gm7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'G',
                    modifierSymbols: [ 'm', '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'Gm7',
                    root: 'G',
                    modifier: 'm7',
                    modifiers: [ 'm', '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">G</span><span class=\"modifier\">m<span class=\"mod-digit\">7</span></span>',
                  beats: '12'
                },
                {
                  chord: 'C7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'C',
                    modifierSymbols: [ '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'C7',
                    root: 'C',
                    modifier: '7',
                    modifiers: [ '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">C</span><span class=\"modifier\"><span class=\"mod-digit\">7</span></span>',
                  beats: '34'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: false,
              isRightmost: false,
              isTopmost: false,
              isBottommost: true
            },
            {
              id: 3,
              textContent: ' F ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'F',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'F',
                    modifierSymbols: [],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'F',
                    root: 'F',
                    modifier: '',
                    modifiers: [],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">F</span>',
                  beats: '1234'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: false,
              isRightmost: false,
              isTopmost: false,
              isBottommost: true
            },
            {
              id: 4,
              textContent: ' C7 ',
              leftBarline: '|',
              rightBarline: '|',
              rhythm: null,
              chords: [
                {
                  chord: 'C7',
                  isStop: false,
                  isDitto: false,
                  parsedChord: {
                    rootSymbols: 'C',
                    modifierSymbols: [ '<span class=\"mod-digit\">7</span>' ],
                    alterationSymbols: '',
                    bassSymbols: '',
                    raw: 'C7',
                    root: 'C',
                    modifier: '7',
                    modifiers: [ '7' ],
                    alterations: '',
                    bass: ''
                  },
                  renderedChord: '<span class=\"root\">C</span><span class=\"modifier\"><span class=\"mod-digit\">7</span></span>',
                  beats: '1234'
                }
              ],
              annotation: '',
              classes: [],
              isLeftmost: false,
              isRightmost: true,
              isTopmost: false,
              isBottommost: true
            }
          ],
          align: 'left'
        }
      ],
      layout: [ '1111', '1111' ],
      exteriorSpans: [
        { 
          side: 'bottom',
          start: 3,
          end: 4,
          text: 'Careful here',
          align: 'end',
          type: 'volta',
        },
        { 
          side: 'top',
          start: 2,
          end: 4,
          text: 'cresc.',
          align: 'start',
          type: 'dotted',
        },
        { 
          side: 'top',
          start: 1,
          end: 1,
          text: 'Hello!',
          align: 'center',
          type: 'volta-dashed'
        },
        { 
          side: 'left',
          start: 2,
          end: 2,
          text: 'This is totally optional, and most people won’t worry about it, but in people won’t worry about it, but in people won’t worry about it, but in people won’t worry about it, but in case you do, here\'s a recipe',
          align: 'center',
          type: 'volta',
          // type: null,
          sideways: true
        },
        { 
          side: 'right',
          start: 1,
          end: 2,
          text: 'Only under vocals, and then quietly',
          align: 'center',
          type: 'volta-dashed',
          sideways: true
        },
        { 
          side: 'bottom',
          start: 1,
          end: 4,
          text: 'Wow this spans it all',
          align: 'center',
          type: 'dotted'
        },
        { 
          side: 'bottom',
          start: 1,
          end: 2,
          text: ' q.  e-q  q_\\q  q  q  Q',
          align: 'center',
          type: 'rhythms'
        }
      ],
      borderCoordinates: [
        [ 4, 0 ],
        [ 4, 1 ],
        [ 4, 1 ],
        [ 4, 2 ],
        [ 0, 2 ],
        [ 0, 1 ],
        [ 0, 1 ],
        [ 0, 0 ]
      ],
      indent: 2,
      width: 4,
      height: 2
    }
  ]
}

// let song = computed(() => {
//   try {
//     return songify(songText.value)
//   } catch {
//     return null
//   }
// })



// watch(song, () => {
//   window.song = song
// })

const isEditing = ref(false)

watch(pageElement, () => {
  if (pageElement.value) {
    panzoom(pageElement.value, {
      bounds: true,
      maxZoom: 4,
      minZoom: 0.25,
      // transformOrigin: {x: 0.5, y: 0.5}
    })
  }
})

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,500;0,600;0,800;1,500;1,600&display=swap');
  @font-face {
    font-family: 'LJC';
    font-style: normal;
    font-weight: normal;
    src: url('./assets/lilyjazz-chord.otf') format('opentype');
  }

  :root {
    --font-size: 4.25mm;
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
    --rhythm-font-size: 5mm;
  }


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
    :root {
      /* --bar-width: 5rem;
      --bar-height: 4.5rem; */
      /* --stroke-width: 2px; */
      /* --thick-stroke-width: 3px; */
    }

    /* body { display: flex; justify-content: center;} */

    #app {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      min-height: 100vh;
      background-color: #252600;
      /* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
      background-image: url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png");
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
      /* margin: var(--y-unit) auto; */
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
    color: black;
    font-size: var(--font-size);
    padding: 0px;
    margin: 0;
  }

  .page {
    --page-width: calc(8 * var(--bar-width) + 2 * var(--x-page-margin));
    --page-height: calc(1.41 * var(--page-width));
    width: var(--page-width);
    padding: var(--y-unit) var(--x-page-margin);
    overflow: hidden;
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
