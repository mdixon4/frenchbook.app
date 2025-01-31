import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from "pinia";
import { useSongStore } from './song';
import { useBroadcast } from '../composables/useBroadcast';
import { useCssVar, syncRef, useLocalStorage } from '@vueuse/core';

export const useUIStore = defineStore('ui', () => {
  const backdrop = ref('')
  const showRulers = ref(true)
  const controllerWidth = ref(null)
  const controllerHeight = ref(null)
  const isEditing = ref(false)
  const dockside = ref('left')
  const isControllerWrapped = ref(true)
  const isChangingSettings = ref(false)
  const pdfApiKey = useLocalStorage('pdfApiKey', '')
  const isWaitingForPdf = ref(false)

  // const isBroadcasting = ref(false)
  // const isListening = ref(false)
  // const broadcastPassword = ref('')

  const songStore = useSongStore()
  const { songText } = storeToRefs(songStore)

  const { isBroadcasting, isListening, broadcastPassword } = useBroadcast(import.meta.env.VITE_BROADCAST_ROOM, songText)

  const metaThemeColor = computed(() => {
    const theme = backdrop.value
    if (theme === 'backdrop-wood') return '#6a4d3d'
    if (theme === 'backdrop-blue-wall') return '#4772aa'
    if (theme === 'backdrop-nebula') return '#775318'
    if (theme === 'backdrop-bright-paper') return '#fec42d'
    if (theme === 'backdrop-black-sand') return '#2c2c2c'
    if (theme === 'backdrop-music-stand') return '#0b0704'
    return '#080f1f'
  })

  const themeColorCss = useCssVar('--theme-color', document.body)
  syncRef(themeColorCss, metaThemeColor, {
    direction: 'rtl'
  })


  return {
    backdrop,
    showRulers,
    controllerWidth,
    controllerHeight,
    isEditing,
    dockside,
    isControllerWrapped,
    isChangingSettings,
    isBroadcasting,
    isListening,
    broadcastPassword,
    metaThemeColor,
    pdfApiKey,
    isWaitingForPdf
  }

}, {
  persist: true
})