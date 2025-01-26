import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { useSongStore } from './song'
import { get, set } from 'idb-keyval'

const checkForFileHandle = async () => {
  const sessionId = sessionStorage.getItem('sessionId') ?? Math.random().toString(36).substring(2, 6)
  const savedHandle = await get('fh-' + sessionId)
  if (savedHandle) {
    return savedHandle
  }
}

const saveFileHandle = async (fh) => {
  const sessionId = sessionStorage.getItem('sessionId') ?? Math.random().toString(36).substring(2, 6)
  set('fh-' + sessionId, fh)
  sessionStorage.setItem('sessionId', sessionId)
}

const clearFileHandle = async () => {
  const sessionId = sessionStorage.getItem('sessionId')
  if (sessionId) {
    await set('fh-' + sessionId, null)
    sessionStorage.removeItem('sessionId')
  }
}


export const useLocalFileStore = defineStore('localFile', () => {

  const songStore = useSongStore()
  const fileHandle = ref(null)
  const fileName = computed(() => fileHandle.value?.name ?? null)
  const fileText = ref(null)
  const title = computed(() => (fileName.value || 'Untitled') + ' - Frenchbook.app')

  checkForFileHandle().then(fh => {
    if (fh) {
      fileHandle.value = fh
    }
  })

  if (sessionStorage.getItem('fileHandle')) {
    fileHandle.value = JSON.parse(sessionStorage.getItem('fileHandle'))
  }

  watch(fileHandle, async fh => {
    console.log('fileHandleChanged')
    console.log({ fileHandle: fh })
    if (fh) {
      fileText.value = await readTextFile(fh)
      console.log('read as:', fileText.value)
      songStore.songText = fileText.value
      saveFileHandle(fh).then(() => console.log('file handle saved'))
    } else {
      fileText.value = null
      clearFileHandle().then(() => console.log('file handle cleared'))
    }
  })

  async function readTextFile(fh) {
    const file = await fh.getFile()
    const text = await file.text()
    return text
  }

  async function consumeLaunchQueue(launchParams) {
    if (launchParams.files.length > 0) {
      fileHandle.value = launchParams.files[0]
    }
  }


  if ("launchQueue" in window) {
    launchQueue.setConsumer(consumeLaunchQueue)
  }

  async function openFile() {
    if (!confirmLosingChanges()) return
    if (!'showOpenFilePicker' in window) {
      console.log('not suppoorted')
    }
    const fileHandles = await window.showOpenFilePicker({
      types: [
        {
          description: 'Grid files',
          accept: {
            'text/plain': ['.grid', '.txt']
          }
        }
      ]
    })
    if (fileHandles.length > 0) {
      fileHandle.value = fileHandles[0]
    }
  }

  async function writeFile(fh, contents) {
    const writableStream = await fh.createWritable()
    await writableStream.write(contents)
    await writableStream.close()
  }

  const showSaveDialog = async () => {
    const fh = await window.showSaveFilePicker({
      types: [
        {
          description: 'Grid files',
          accept: {
            'text/plain': ['.grid', '.txt']
          }
        }
      ]
    })
    return fh
  }


  async function saveFile() {
    let thisFileHandle = fileHandle.value
    if (!thisFileHandle) {
      thisFileHandle = await showSaveDialog()
    }
    if (thisFileHandle) {
      await writeFile(thisFileHandle, songStore.songText)
      fileText.value = songStore.songText
      fileHandle.value = thisFileHandle
    }
  }

  async function saveAs() {
    const newFileHandle = await showSaveDialog()
    if (newFileHandle) {
      await writeFile(newFileHandle, songStore.songText)
      fileText.value = songStore.songText
      fileHandle.value = newFileHandle
    }
  }

  async function newFile() {
    if (!confirmLosingChanges()) return
    fileHandle.value = null
    songStore.songText = songStore.defaultSongText
  }

  const isPristine = computed(() => {
    if (fileHandle.value) {
      return fileText.value === songStore.songText
    }
    return (songStore.songText === songStore.defaultSongText || songStore.songText === '')
  })

  const isUnsaved = computed(() => !isPristine.value)

  const confirmLosingChanges = () => {
    if (isUnsaved.value) {
      return confirm('You have unsaved changes. Are you sure you want to continue?')
    }
    return true
  }

  window.addEventListener('beforeunload', event => {
    if (!isUnsaved.value) return
    event.preventDefault()
  })




  return {
    fileHandle,
    fileText,
    fileName,
    title,
    openFile,
    saveFile,
    saveAs,
    newFile,
    isPristine,
    isUnsaved
  }
})