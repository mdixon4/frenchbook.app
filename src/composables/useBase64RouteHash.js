import { computed, ref, watch } from 'vue'
import { fromUrlHash, toUrlHash } from '../songify/util'
import { syncRef } from '@vueuse/core'

/**
 * 
 * @param {import('vue').Ref<string>} textRef 
 */
export function syncWithUrlHash(textRef) {
  const hash = ref(window.location.hash.substring(1))

  try {
    textRef.value = fromUrlHash(hash.value)
  } catch {
  }

  watch(textRef, (v) => hash.value = toUrlHash(v))

  watch(hash, (v) => {
    const newText = fromUrlHash(v)
    if (newText !== textRef.value) {
      textRef.value = newText
    }
    if (window.location.hash.substring(1) !== v) {
      window.location.hash = v
    }
  })

  window.addEventListener('hashchange', () => {
    const hashValue = window.location.hash.substring(1)
    if (hash.value !== hashValue) {
      hash.value = hashValue
    }
  })
}
