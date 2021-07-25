<template>
  <div id="app" :class="[
    {
      'docked-left': uiSettings.dockside === 'left',
      'docked-top': uiSettings.dockside === 'top',
      'hide-rulers': !uiSettings.showRulers
    }, 
    uiSettings.backdrop
  ]"
  >
    <frenchy-controller 
      v-show="uiSettings.isEditing" 
      @stopEditing="uiSettings.isEditing = false" 
      v-model:dockside="uiSettings.dockside"
      v-model:controllerWidth="uiSettings.controllerWidth"
      v-model:controllerHeight="uiSettings.controllerHeight"
      v-model="songText"
    ></frenchy-controller>
    <button class="begin-edit" v-show="!uiSettings.isEditing" @click="uiSettings.isEditing = true">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
    </button>
    <frenchy-settings v-show="isChangingSettings" @stopChangingSettings="isChangingSettings = false" v-model="uiSettings"></frenchy-settings>
    <button class="open-settings" @click="isChangingSettings = true">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="desk">
      <div class="page-holder">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmit } from 'vue'
import { useStorage, useVModel } from '@vueuse/core'

import FrenchyController from './FrenchyController.vue'
import FrenchySettings from './FrenchySettings.vue'

const props = defineProps({
  songText: {
    type: String,
    required: true
  }
})
const emit = defineEmit(['update:songText'])
const songText = useVModel(props, 'songText', emit)

const isChangingSettings = ref(false)

const uiSettings = useStorage('frenchbook-settings', {
  backdrop: '',
  showRulers: true,
  controllerWidth: null,
  controllerHeight: null,
  isEditing: false,
  dockside: 'left'
})
</script>
