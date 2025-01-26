<template>
  <div id="app" :class="[
    {
      'docked-left': uiStore.dockside === 'left',
      'docked-top': uiStore.dockside === 'top',
      'hide-rulers': !uiStore.showRulers
    },
    uiStore.backdrop
  ]">

    <title-bar></title-bar>
    <div id="work-area">
      <frenchy-edit-button v-if="!uiStore.isEditing"></frenchy-edit-button>
      <frenchy-controller v-if="uiStore.isEditing"></frenchy-controller>
      <frenchy-settings v-if="uiStore.isChangingSettings"></frenchy-settings>

      <div class="desk">
        <div class="page-holder">
          <div class="page-panzoom" ref="pagePanzoomEl">
            <slot></slot>
            <frenchy-page-rulers></frenchy-page-rulers>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits, onMounted, inject } from 'vue'
import { useHead } from '@unhead/vue'
import { useStorage, useVModel } from '@vueuse/core'
import panzoom from 'panzoom'
import FrenchyPageRulers from './FrenchyPageRulers.vue'
import FrenchySettings from './FrenchySettings.vue'
import FrenchyController from './FrenchyController.vue'
import FrenchyEditButton from './FrenchyEditButton.vue'
import TitleBar from './TitleBar.vue'
import { useUIStore } from '../../store/ui'
import { useSongStore } from '../../store/song'



const uiStore = useUIStore()
const songStore = useSongStore()
const pagePanzoomEl = ref(null)


onMounted(() => {
  panzoom(pagePanzoomEl.value, {
    bounds: true,
    maxZoom: 4,
    minZoom: 0.25
  })
})
</script>

<style>
@media screen {

  .docked-left #work-area {
    flex-direction: row;
  }

  .docked-top #work-area {
    flex-direction: column;
  }

  #app {
    display: flex;
    flex-direction: column;
    /* flex-wrap: wrap; */
    flex-grow: 1;
    background-color: #080f1f;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    align-items: stretch;
    overflow: hidden;
    height: 100%;
  }

  #work-area {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    align-items: stretch;
  }

  #app.backdrop-wood {
    background-color: #6a4d3d;
    background-image: url(/backgrounds/J2gEgTPM_OA.jpg)
  }

  #app.backdrop-blue-wall {
    background-color: #4772aa;
    background-image: url(/backgrounds/BawjznQ3Q8U.jpg)
  }

  #app.backdrop-nebula {
    background-color: #775318;
    background-image: url(/backgrounds/-hI5dX2ObAs.jpg)
  }

  #app.backdrop-bright-paper {
    background-color: #fec42d;
    background-image: url(/backgrounds/7OCUyev2M9E.jpg)
  }

  #app.backdrop-black-sand {
    background-color: #2c2c2c;
    background-image: url(/backgrounds/w1_4YH5IhDg.jpg)
  }

  #app.backdrop-music-stand {
    background-color: #0b0704;
    background-image: url(/backgrounds/njaQKSM365I.jpg)
  }

  .banner {
    background: black;
    color: white;
    border: 1px solid white;
    font-weight: bold;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    border-top: 0;
    border-radius: 0 0 4px 4px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding-inline: 8rem;
    padding-block-end: 0.15rem;
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

  .open-settings {
    border: 0;
    padding: 0.5rem;
    background: rgba(255, 255, 255, 0.329);
    box-shadow: black 4px 4px 18px;
    color: white;
    position: fixed;
    right: 1rem;
    top: 1rem;
    border-radius: 100%;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
    z-index: 50;
  }

  .open-settings svg {
    width: 2rem;
    height: 2rem;
  }

  .desk {
    flex-grow: 1;
    flex-shrink: 1;
    padding: 2rem;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }

  .page-panzoom {
    background: white;
    border: 1px solid black;
    box-shadow: 4px 4px black;
  }

}

/* Do not print UI, just page */
@media print {
  #app> :not(#work-area) {
    display: none;
  }

  #work-area> :not(.desk) {
    display: none;
  }

  .page-panzoom {
    transform: none !important;
  }

  .rulers {
    display: none;
  }
}
</style>