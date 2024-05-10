import { useLocalFileStore } from "../store/localFile";
import { useMagicKeys, whenever } from "@vueuse/core";

export function useKeyboardShortcuts() {
  const keys = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (e.ctrlKey && e.key === 's' && e.type === 'keydown') {
        e.preventDefault()
      }
      if (e.ctrlKey && e.key === 'n' && e.type === 'keydown') {
        e.preventDefault()
      }
    }
  })

  const localFileStore = useLocalFileStore()

  whenever(keys.ctrl_s, () => {
    localFileStore.saveFile()
  })

  whenever(keys.ctrl_o, () => {
    localFileStore.openFile()
  })

  whenever(keys.ctrl_e, () => {
    localFileStore.openFile()
  })

  whenever(keys.ctrl_n, () => {
    localFileStore.newFile()
  })

}
