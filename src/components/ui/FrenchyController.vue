<template>
  <div class="controller" ref="controller" :class="{
    'docked-left': uiStore.dockside === 'left',
    'docked-top': uiStore.dockside === 'top'
  }">
    <div id="code-toolbar">
      <button class="end-edit" @click="uiStore.isEditing = false" title="Close">
        <svg height="100%" class="close-icon" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <button v-if="uiStore.dockside === 'left'" @click="dockToTop" title="Dock to top">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
        </svg>
      </button>
      <button v-if="uiStore.dockside === 'top'" @click="dockToLeft" title="Dock to left">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="3" x2="9" y2="21"></line>
        </svg>
      </button>
      <button v-if="uiStore.isControllerWrapped" @click="uiStore.isControllerWrapped = false" title="Do not wrap">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
          focusable="false" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <g class="icon-tabler" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M4 6h10" />
            <path d="M4 18h10" />
            <path d="M4 12h17l-3-3m0 6l3-3" />
          </g>
        </svg>
      </button>
      <button v-if="!uiStore.isControllerWrapped" @click="uiStore.isControllerWrapped = true" title="Wrap">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
          focusable="false" height="100%" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <g class="icon-tabler" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round">
            <path d="M4 6h16" />
            <path d="M4 18h5" />
            <path d="M4 12h13a3 3 0 0 1 0 6h-4l2-2m0 4l-2-2" />
          </g>
        </svg>
      </button>
    </div>
    <div id="code-editor" ref="codeEditor">
      <textarea id="code-input" v-model="songStore.songText" spellcheck="false"
        :class="[uiStore.isControllerWrapped ? 'wrap' : 'no-wrap']" ref="textareaEl"
        @keydown.tab.prevent="handleTabPress"></textarea>
      <!-- <pre id="code-display" aria-hidden="true"><code>{{ songText }}</code></pre> -->
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from 'vue'
import { useUIStore } from '../../store/ui'
import { useSongStore } from '../../store/song'
import { storeToRefs } from 'pinia';

const uiStore = useUIStore()
const songStore = useSongStore()

const codeEditor = ref(null)
const controller = ref(null)
const textareaEl = ref(null)

const { controllerWidth: width, controllerHeight: height } = storeToRefs(uiStore)

const dockToTop = () => {
  controller.value.style.removeProperty('width')
  controller.value.style.height = height.value + 'px'
  uiStore.dockside = 'top'
}
const dockToLeft = () => {
  controller.value.style.removeProperty('height')
  controller.value.style.width = width.value + 'px'
  uiStore.dockside = 'left'
}

const editorResizeObserver = new ResizeObserver(entries => {
  if (uiStore.dockside === 'left') {
    width.value = entries[0].contentRect.width
  }
  if (uiStore.dockside === 'top') {
    height.value = entries[0].contentRect.height
  }
})

onMounted(() => {
  if (uiStore.dockside === 'left') controller.value.style.width = width.value + 'px'
  if (uiStore.dockside === 'top') controller.value.style.height = height.value + 'px'
  editorResizeObserver.observe(controller.value)
})

const handleTabPress = () => {
  let start = textareaEl.value.selectionStart
  let end = textareaEl.value.selectionEnd
  songText.value = (
    songText.value.substring(0, start)
    + "\t"
    + songText.value.substring(end)
  )
  nextTick(() => textareaEl.value.selectionStart = textareaEl.value.selectionEnd = start + 1)
}


</script>

<style>
.controller {
  color: white;
  /* background: rgba(255, 255, 255, 0.329); */
  padding: 0;
  /* flex-grow: 1; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 100%;
  max-width: 100%;
  min-height: 10rem;
  min-width: 20rem;
  z-index: 500;
  overflow: hidden;
  flex-shrink: 0;
}

.docked-left .controller {
  resize: horizontal;
  height: 100vh;
}

.docked-top .controller {
  resize: vertical;
  width: 100vw;
}

/* 
  #code-editor {
    height: 100%;
    flex-grow: 1;
  } */

#code-toolbar {
  background: black;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
}

#code-toolbar button {
  appearance: none;
  border: 0;
  background: transparent;
  color: #BBB;
  height: 2rem;
  min-width: 2rem;
  padding: 0.25rem;
  cursor: pointer;
}

#code-toolbar button:hover {
  color: white;
}


#code-editor {
  /* margin: 4px; */
  flex-grow: 1;
  position: relative;
  background: rgba(0, 0, 0, 0.719);
  width: 100%;
  color: #BBB;
  overflow: visible;
}


#code-editor:focus-within {
  background: rgba(0, 0, 0, 0.918);
  color: white;
}

#code-input {
  padding: 10px;
  border: 0;
  margin: 0;
  font-size: 1rem;
  font-family: monospace;
  resize: none;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: inherit;
  /* color: transparent; */
  background: transparent;
  /* background: yellow; */
  caret-color: white;
  tab-size: 4;
}

#code-input.no-wrap {
  white-space: nowrap;
}

#code-input:focus {
  -moz-focus-ring: none;
  outline: none;
}
</style>
