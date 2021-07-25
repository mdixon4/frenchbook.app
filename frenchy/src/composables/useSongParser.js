import { computed } from 'vue'
import { songify } from '../songify'


export function useSongParser(songText) {
  return computed(() => songify(songText.value))
}
