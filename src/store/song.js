import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { songify } from "../songify/songify";
import { syncWithUrlHash } from "../composables/useBase64RouteHash";


export const useSongStore = defineStore('song', () => {

  const defaultSongText = "title: \nnumber: \ncredits: \n\n===\n\n"
  const songText = ref('')
  const song = computed(() => songify(songText.value))
  const songTitle = computed(() => song.value?.metadata?.title ?? null)
  syncWithUrlHash(songText)

  return {
    songText,
    song,
    songTitle,
    defaultSongText
  }
})