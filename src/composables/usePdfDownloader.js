import { computed } from 'vue'
import { useSongStore } from '../store/song'
import { useUIStore } from '../store/ui'
import { useLocalFileStore } from '../store/localFile'


export const usePdfDownloader = () => {
  const songStore = useSongStore()
  const uiStore = useUIStore()
  const localFileStore = useLocalFileStore()

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

    const resp = await fetch('/api/export', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'X-Api-Key': uiStore.pdfApiKey,
      },
      body: songStore.songText,
    })

    if (resp.status === 200 && resp.headers.get('Content-Type') === 'application/pdf' && resp.headers.get('Content-Disposition').startsWith('attachment')) {
      // Prompt for download
      const blob = await resp.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = pdfFileName.value
      a.click()
      URL.revokeObjectURL(url)
      return
    }

    console.error('Failed to export to PDF', resp)
  }

  return {
    toPdf,
    canExport,
    pdfFileName,
  }
}