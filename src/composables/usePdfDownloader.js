import { computed } from 'vue'
import { useSongStore } from '../store/song'
import { useUIStore } from '../store/ui'
import { useLocalFileStore } from '../store/localFile'

const fetchPdf = async () => {
  const songStore = useSongStore()
  const uiStore = useUIStore()
  const resp = await fetch('/api/export', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
      'X-Api-Key': uiStore.pdfApiKey,
    },
    body: songStore.songText,
  })
  if (resp.status === 200 && resp.headers.get('Content-Type') === 'application/pdf' && resp.headers.get('Content-Disposition').startsWith('attachment')) {
    return resp
  }
  return null
}

const promptForSave = (filename) => {
  return window.showSaveFilePicker({
    suggestedName: filename,
    types: [
      {
        description: 'PDF files',
        accept: {
          'application/pdf': ['.pdf']
        }
      }
    ]
  })
}

const autoDownload = async (resp, filename) => {
  const blob = await resp.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
  alert('downloading...')
}

export const usePdfDownloader = () => {
  const songStore = useSongStore()
  const uiStore = useUIStore()
  const localFileStore = useLocalFileStore()
  const canSave = 'showOpenFilePicker' in window

  const canExport = computed(() => {
    return songStore.songText && uiStore.pdfApiKey
  })

  const pdfFileName = computed(() => {
    if (localFileStore.fileName) {
      return localFileStore.fileName.replace(/\.[^.]+$/, '.pdf')
    }
    if (songStore.songTitle) {
      return songStore.songTitle + '.pdf'
    }
    return 'untitled-chart.pdf'
  })


  const toPdf = async () => {
    console.log('Exporting to PDF')
    if (!canExport.value) return
    const NOT_SUPPORTED = Symbol('NOT_SUPPORTED')

    const [resp, fileHandle] = await Promise.all([
      fetchPdf(),
      canSave ? promptForSave(pdfFileName.value) : Promise.resolve(NOT_SUPPORTED)
    ])

    if (!fileHandle) {
      return
    }

    if (!resp) {
      alert('Failed to export PDF')
      return
    }

    if (fileHandle === NOT_SUPPORTED) {
      await autoDownload(resp, pdfFileName.value)
      return
    }

    if (fileHandle instanceof FileSystemFileHandle) {
      const writableStream = await fileHandle.createWritable()
      const blob = await resp.blob()
      writableStream.write(blob)
      writableStream.close()
    }
  }

  return {
    toPdf,
    canExport,
    pdfFileName,
  }
}