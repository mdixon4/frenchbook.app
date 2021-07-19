<template>
  <div class="controller" ref="controller" :class="{
    'docked-left': isDockedLeft,
    'docked-top': isDockedTop
  }">
    <div id="code-toolbar">
      <button class="end-edit" @click="$emit('stopEditing')" title="Close">
        <svg height="100%" class="close-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
      </button>
      <button v-if="isDockedLeft" @click="dockElsewhere" title="Dock to top">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line></svg>
      </button>
      <button v-if="isDockedTop" @click="dockElsewhere" title="Dock to left">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sidebar"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
      </button>
    </div>
    <div id="code-editor" ref="codeEditor">
      <textarea id="code-input" v-model="songText" spellcheck="false"></textarea>
      <!-- <pre id="code-display" aria-hidden="true"><code>{{ songText }}</code></pre> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmit, computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String
  },
  dockside: {
    type: String
  }
})

const emit = defineEmit(['update:modelValue', 'update:dockside'])

const songText = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const codeEditor = ref(null)
const controller = ref(null)

const isDockedLeft = computed(() => {
  return props.dockside === 'left'
})
const isDockedTop = computed(() => {
  return props.dockside === 'top'
})

const dockElsewhere = () => {
  delete controller.value.style.removeProperty('width')
  delete controller.value.style.removeProperty('height')
  emit('update:dockside', props.dockside === 'left' ? 'top' : 'left')
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
    max-height: 100vh;
    max-width: 100vw;
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
}

#code-input:focus {
  -moz-focus-ring: none;
  outline: none;
}

</style>
