<script setup>
import FileControls from './FileControls.vue';
import { useUIStore } from '../../store/ui';
const uiStore = useUIStore();

window.uiStore = uiStore

</script>

<template>
  <menu id="titlebar">
    <FileControls />
    <a href="/docs/">Help</a>
    <button @click="uiStore.isChangingSettings = true">Settings</button>
    <button @click="uiStore.isEditing = true">Edit</button>
    <div v-if="uiStore.isBroadcasting">
      BROADCASTING
    </div>
    <div v-if="uiStore.isListening">
      LISTENING
    </div>
    <div id="drag-handle">::::</div>
  </menu>
</template>

<style>
@media print {
  #titlebar {
    display: none;
  }
}

#titlebar {
  left: env(titlebar-area-x, 0);
  top: env(titlebar-area-y, 0);
  height: env(titlebar-area-height, 30px);
  width: env(titlebar-area-width, 100%);
  background: red;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px;
  background-color: black;
  color: white;
  padding-inline: 1.2rem;
  padding-block: 0.3rem;
  display: flex;
  gap: 0.5rem;
}

#drag-handle {
  -webkit-app-region: drag;
}
</style>
