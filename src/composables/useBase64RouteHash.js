import { computed, ref, watch } from 'vue'
import { fromUrlHash, toUrlHash } from '../songify/util'


export function useBase64RouteHash () {
  const encodedValue = ref(window.location.hash.substr(1))
  watch(encodedValue, v => window.location.hash = v)
  const decodedValue = computed({
    get: () => fromUrlHash(encodedValue.value),
    set: (v) => encodedValue.value = toUrlHash(v)
  })
  return decodedValue
}
