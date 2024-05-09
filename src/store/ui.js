import { ref } from 'vue'
import { defineStore, storeToRefs } from "pinia";
import { useSongStore } from './song';
import { useBroadcast } from '../composables/useBroadcast';

export const useUIStore = defineStore('ui', () => {
  const backdrop = ref('')
  const showRulers = ref(true)
  const controllerWidth = ref(null)
  const controllerHeight = ref(null)
  const isEditing = ref(false)
  const dockside = ref('left')
  const isControllerWrapped = ref(true)
  const isChangingSettings = ref(false)

  // const isBroadcasting = ref(false)
  // const isListening = ref(false)
  // const broadcastPassword = ref('')

  const songStore = useSongStore()
  const { songText } = storeToRefs(songStore)

  const { isBroadcasting, isListening, broadcastPassword } = useBroadcast(import.meta.env.VITE_BROADCAST_ROOM, songText)


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
    broadcastPassword
  }

}, {
  persist: true
  // {
  //   // serializer: {
  //   //   serialize: value => {
  //   //     console.log('serializing', value)
  //   //     return JSON.stringify(value)
  //   //   },
  //   //   deserialize: s => {
  //   //     console.log('deserializing', s)
  //   //     return JSON.parse(s)
  //   //   }
  //   // },
  //   // beforeRestore: context => console.log('beforeRestore', context),
  //   // afterRestore: context => console.log('afterRestore', context),
  //   // storage: window.localStorage
  // }
})