<script setup>
import { ref } from 'vue'
import { useFloating } from '@floating-ui/vue';
import { useUIStore } from '../../store/ui';
import { useLocalFileStore } from '../../store/localFile';
import { useSongStore } from '../../store/song';
import { usePdfDownloader } from '../../composables/usePdfDownloader'
const uiStore = useUIStore();
const localFileStore = useLocalFileStore()
const songStore = useSongStore()
const pdfDownloader = usePdfDownloader()

const reference = ref(null)
const floating = ref(null)

const { floatingStyles } = useFloating(reference, floating, {
  placement: 'bottom-start',
})

</script>

<template>
  <menu id="titlebar">
    <button id="file-button" popovertarget="file-menu" ref="reference">File</button>
    <div popover id="file-menu" ref="floating" :style="floatingStyles" @click="floating.togglePopover()">
      <ul>
        <li><button @click="localFileStore.newFile">New</button></li>
        <li><button @click="localFileStore.openFile">Open</button></li>
        <li><button @click="localFileStore.saveFile">Save</button></li>
        <li><button @click="localFileStore.saveAs">Save As</button></li>
        <li><button @click="uiStore.isChangingSettings = true">Settings</button></li>
        <li><button :disabled="!pdfDownloader.canExport.value" @click="pdfDownloader.toPdf">Export to PDF</button></li>
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

      <svg v-if="uiStore.isWaitingForPdf" class="download-icon" viewBox="0 0 32 32" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 5.33335H6.66667V26.6667H25.3333V10.6667H20V5.33335ZM4 3.98935C4 3.25869 4.596 2.66669 5.332 2.66669H21.3333L28 9.33335V27.9907C28.0012 28.1658 27.968 28.3394 27.9021 28.5016C27.8362 28.6639 27.739 28.8116 27.6161 28.9362C27.4931 29.0609 27.3468 29.1602 27.1855 29.2283C27.0242 29.2964 26.8511 29.3321 26.676 29.3334H5.324C4.97384 29.3309 4.63869 29.1908 4.39096 28.9433C4.14322 28.6959 4.00279 28.3608 4 28.0107V3.98935Z"
          fill="currentColor" />
        <path class="down-arrow" d="M21.3333 16H17.3333V10.6667H14.6666V16H10.6666L16 21.3334L21.3333 16Z"
          fill="currentColor" />
      </svg>


    </div>
  </menu>
</template>

<style>
.download-icon {
  width: 1.25rem;
  height: 1.25rem;
  display: inline-block;
  margin-left: 0.5rem;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.download-icon .down-arrow {
  animation: pulse 2s infinite;
}

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

  &:disabled {
    color: grey;
    cursor: default;
  }
}


#broadcast-status {
  color: yellow;
}
</style>
