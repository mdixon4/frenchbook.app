import { ref, watch, computed } from "vue";
import { useMagicKeys, whenever, useTitle } from '@vueuse/core'

const fileHandle = ref(null)
const fileName = computed(() => fileHandle.value ? fileHandle.value.name : null)
const fileText = ref(null)
const title = computed(() => (fileName.value || 'Untitled') + '- Frenchbook.app')
useTitle(title)

const subscribers = []

const onFileLoaded = cb => {
  subscribers.push(cb)
  return () => {
    const index = subscribers.indexOf(cb)
    if (index >= 0) {
      subscribers.splice(index, 1)
    }
  }
}

const callSubscribers = () => {
  subscribers.forEach(cb => cb(fileText.value))
}

watch(fileHandle, async fh => {
  console.log('fileHandleChanged')
  console.log({ fileHandle: fh })
  if (fh) {
    fileText.value = await readTextFile(fh)
    callSubscribers()
  } else {
    fileText.value = null
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

async function saveFile(text) {
  console.log('saveFile', text)
  if (!fileHandle.value) {
    fileHandle.value = await window.showSaveFilePicker({
      types: [
        {
          description: 'Grid files',
          accept: {
            'text/plain': ['.grid', '.txt']
          }
        }
      ]
    })
  }

  const writableStream = await fileHandle.value.createWritable()
  await writableStream.write(text)
  await writableStream.close()
  fileText.value = await readTextFile(fileHandle.value)
}

async function saveAs(text) {
  fileHandle.value = null
  await saveFile(text)
  if (fileHandle.value) {
    fileText.value = await readTextFile(fileHandle.value)
  }
}


export function useLocalFile() {
  return {
    fileHandle,
    fileText,
    fileName,
    openFile,
    saveFile,
    saveAs,
    onFileLoaded,
  }
}