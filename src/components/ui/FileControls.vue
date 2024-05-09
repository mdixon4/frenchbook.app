<script setup>
import { inject, watch, computed } from 'vue'
import { useMagicKeys, whenever } from '@vueuse/core';
import { useLocalFile } from '../../composables/useLocalFile';
import { useSongStore } from '../../store/song'
const { fileName, fileHandle, openFile, saveFile, saveAs, onFileLoaded, fileText } = useLocalFile();

const songStore = useSongStore()

const keys = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === 's' && e.type === 'keydown') {
      e.preventDefault()
    }
  }
})

whenever(keys.ctrl_s, () => {
  console.log('ctrl_s')
  saveFile(songStore.songText)
})


onFileLoaded(ft => {
  console.log(ft)
  if (ft !== null) {
    songStore.songText = ft
  }
})

const isSaved = computed(() => {
  if (!fileHandle.value) {
    return songStore.songText === ''
  }
  if (fileText.value === null) {
    return true
  }
  if (fileText.value === songStore.songText) {
    return true
  }
  return false
})

const isUnsaved = computed(() => !isSaved.value)
</script>

<template>
  <div id="file-controls">
    <button id="open-file" @click="openFile">Open File</button>
    <button id="save-file" @click="() => saveFile(songStore.songText)">Save File</button>
    <button id="save-as" @click="() => saveAs(songStore.songText)">Save As</button>
    <span>{{ fileName || '(untitled)' }}{{ isUnsaved ? '*' : '' }}</span>
  </div>
</template>
