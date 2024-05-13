<script setup>
import { ref } from 'vue'
import { useFloating } from '@floating-ui/vue';
import { useUIStore } from '../../store/ui';
import { useLocalFileStore } from '../../store/localFile';
import { useSongStore } from '../../store/song';
const uiStore = useUIStore();
const localFileStore = useLocalFileStore()
const songStore = useSongStore()

const reference = ref(null)
const floating = ref(null)

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-start',
})

const toPdf = async () => {
  console.log('Exporting to PDF')
  console.log(uiStore.pdfApiKey)
  if (!songStore.songText) return
  if (!uiStore.pdfApiKey) return

  const resp = await fetch('/api/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'X-Api-Key': uiStore.pdfApiKey,
    },
    body: songStore.songText,
  })

  const json = await resp.json()
  if (json.url) {
    // Open in new tab
    window.open(json.url, '_blank')
  }
}

</script>

<template>
  <menu id="titlebar">
    <button id="file-button" popovertarget="file-menu" ref="reference">File</button>
    <div popover id="file-menu" ref="floating" :style="floatingStyles">
      <ul>
        <li><button @click="localFileStore.newFile">New</button></li>
        <li><button @click="localFileStore.openFile">Open</button></li>
        <li><button @click="localFileStore.saveFile">Save</button></li>
        <li><button @click="localFileStore.saveAs">Save As</button></li>
        <li><button @click="uiStore.isChangingSettings = true">Settings</button></li>
        <li><button @click="toPdf">Export to PDF</button></li>
        <li><a href="/docs/" target="_blank">Help</a></li>
      </ul>
    </div>

    <div id="broadcast-status">
      <div v-if="uiStore.isBroadcasting">
        BROADCASTING
      </div>
      <div v-if="uiStore.isListening">
        LISTENING
      </div>
    </div>

    <div id="drag-handle">
      <span>{{ localFileStore.fileName || '(untitled)' }}{{ localFileStore.isUnsaved ? '*' : '' }}</span>
    </div>
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
  height: env(titlebar-area-height);
  padding-right: calc(100% - env(titlebar-area-width));
  /* width: env(titlebar-area-width, 100%) */
  width: 100%;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px;
  background-color: hsla(0, 0%, 0%, 0.75);
  padding-inline-start: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  isolation: isolate;
  z-index: 1;
}

#drag-handle {
  -webkit-app-region: drag;
  flex-grow: 1;
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

#file-button {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  padding: 0.3rem 1rem;
  border-radius: 3px;

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.25);
  }


}

[popover] {
  margin: 0;
  margin-top: 0.1rem;
  border: 1px solid grey;
  border-radius: 3px;
  padding: 0;
  overflow: hidden;
}

[popover] ul {
  list-style-type: none;
  padding: 0;
  min-width: 20ch;
  margin: 0;
}

[popover] button,
[popover] a {
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  text-decoration: none;
  border: none;
  background-color: hsla(0, 0%, 0%, 0.75);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: hsla(0, 0%, 0%, 0.9);
  }
}

#broadcast-status {
  color: yellow;
}
</style>
