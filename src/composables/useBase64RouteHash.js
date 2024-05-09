import { computed, ref, watch } from 'vue'
import { fromUrlHash, toUrlHash } from '../songify/util'
import { syncRef } from '@vueuse/core'

/**
 * 
 * @param {import('vue').Ref<string>} textRef 
 */
export function syncWithUrlHash(textRef) {
  const hash = computed({
    get: () => window.location.hash.substring(1),
    set: v => window.location.hash = v
  })

  try {
    textRef.value = fromUrlHash(hash.value)
  } catch {
  }

  watch(textRef, (v) => {
    hash.value = toUrlHash(v)
  })
}
