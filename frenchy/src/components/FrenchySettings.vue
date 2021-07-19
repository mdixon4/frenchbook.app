<template>
  <div class="settings">
    <div class="settings-window">
      <div id="settings-toolbar">
        <button class="close-settings" @click="$emit('stopChangingSettings')" title="Close">
          <svg height="100%" class="close-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <strong>Settings</strong>
      </div>
      <form>
        <div>
          <label for="backdrop">Backdrop</label>
          <select v-model="backdrop" name="backdrop">
            <option value="">Default</option>
            <option value="backdrop-wood">Wood</option>
            <option value="backdrop-blue-wall">Blue Wall</option>
          </select>
        </div>
        <div>
          <label for="show-rulers">Show Rulers?</label>
          <input type="checkbox" v-model="showRulers" value="on" name="show-rulers">
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmit, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object
  }
})

const emit = defineEmit(['update:modelValue'])

const backdrop = computed({
  get: () => props.modelValue.backdrop,
  set: val => emit('update:modelValue', { ...props.modelValue, backdrop: val })
})
const showRulers = computed({
  get: () => props.modelValue.showRulers,
  set: val => emit('update:modelValue', { ...props.modelValue, showRulers: val })
})

</script>

<style>
.settings {
  background: hsla(0,0%,0%,0.75);
  position: absolute;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings form {
  background: black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-window {
  min-width: 400px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.settings label {
  margin-right: 1rem;
}

#settings-toolbar {
  background: black;
  color: white;
  display: flex;
  flex-direction: row-reverse;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
}

#settings-toolbar strong {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin-left: 1rem;
}

#settings-toolbar button {
  appearance: none;
  border: 0;
  background: transparent;
  color: #BBB;
  height: 2rem;
  min-width: 2rem;
  padding: 0.25rem;
  cursor: pointer;
}
#settings-toolbar button:hover {
  color: white;
}



</style>