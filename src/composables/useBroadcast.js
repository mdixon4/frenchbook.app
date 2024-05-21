import { ref, watch, toRef, computed } from 'vue'
import { useLocalStorage, useUrlSearchParams, useWebSocket, debouncedWatch } from '@vueuse/core'


// Share the song with "viewers" via websockets, mediated by a server.

const wsFromHttp = (url) => {
  const u = new URL(url)
  u.protocol = u.protocol.replace('http', 'ws')
  return u.toString()
}

export const useBroadcast = (server, myRef) => {

  const isBroadcasting = ref(false)
  const isListening = ref(false)
  const broadcastPassword = useLocalStorage('broadcastPassword', '')
  const websocketUrl = computed(() => {
    if (server) return wsFromHttp(server)
    return ''
  })

  const { status, data, send, open, close } = useWebSocket(websocketUrl, {
    immediate: false,
  })

  debouncedWatch(myRef, () => {
    if (isBroadcasting.value && broadcastPassword.value) {
      fetch(server, {
        method: 'POST',
        body: myRef.value,
        headers: {
          Authorization: `Basic ${btoa(`user:${broadcastPassword.value}`)}`,
        }
      })
    }
  }, {
    debounce: 1000,
    maxWait: 1000,
  })

  watch([isBroadcasting, broadcastPassword], () => {
    if (isBroadcasting.value) {
      isListening.value = false
    }
    if (isBroadcasting.value && broadcastPassword.value) {
      fetch(server, {
        method: 'POST',
        body: myRef.value,
        headers: {
          Authorization: `Basic ${btoa(`user:${broadcastPassword.value}`)}`,
        }
      })
    }
  })


  watch(isListening, (v) => {
    if (v) {
      isBroadcasting.value = false
      open()
    } else {
      close()
    }
  })

  watch(data, (v) => {
    if (isListening.value) {
      myRef.value = v
    }
  })

  return { isBroadcasting, isListening, broadcastPassword }
}
