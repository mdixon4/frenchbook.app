import { defineStore } from "pinia";
import { ref, computed } from 'vue'
import { songify } from "../songify/songify";
import { syncWithUrlHash } from "../composables/useBase64RouteHash";


export const useSongStore = defineStore('song', () => {


  const songText = ref('')
  const song = computed(() => songify(songText.value))
  syncWithUrlHash(songText)

  return {
    songText,
    song
  }
})