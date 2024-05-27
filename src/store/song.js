import { defineStore } from "pinia";
import { ref, computed, onMounted } from 'vue'
import { songify } from "../songify/songify";
import { syncWithUrlHash } from "../composables/useBase64RouteHash";


export const useSongStore = defineStore('song', () => {

  const defaultSongText = "title: \nnumber: \ncredits: \n\n===\n\n"
  const songText = ref('')
  const song = computed(() => songify(songText.value))
  const songTitle = computed(() => song.value?.metadata?.title ?? null)
  syncWithUrlHash(songText)

  onMounted(() => {
    console.log('mounted, adding message event listener')

    // If we're in an iframe, get the songtext attribute from the iframe
    // and set it as the songText value
    window.addEventListener('message', (event) => {
      console.log('message received', event.data)
      if (event.data.type === 'song') {
        songText.value = event.data.text
      }
    })
    if (window.self !== window.top) {
      window.parent.postMessage('ready', '*')
    }
  })

  return {
    songText,
    song,
    songTitle,
    defaultSongText
  }
})