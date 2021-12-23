<script setup>
import { ref, computed, onBeforeUpdate, onBeforeUnmount, defineComponent, onMounted, watch } from 'vue'
import { songify } from '../../songify/songify'
import FrenchyHr from '../renderer/FrenchyHr.vue'
import FrenchyStanza from '../renderer/FrenchyStanza.vue'
import FrenchyTextBlock from '../renderer/FrenchyTextBlock.vue'

const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})

const slot = ref(null)
const slotContent = ref('')
const songText = computed(() => props.text || slotContent.value || '')
const part = computed(() => {
  console.log('getting part')
  return songText.value ? songify(songText.value)?.parts?.[0] : {}
})

let mutationObserver
onMounted(() => {
  mutationObserver = new MutationObserver((mutations) => {
    slotContent.value = slot.value.textContent
  })
  mutationObserver.observe(slot.value, {
    characterData: true,
    subtree: true,
    childList: true
  })
  slotContent.value = slot.value.textContent
})
onBeforeUnmount(() => {
  mutationObserver.disconnect()
})
</script>

<template>
  <div class="part">
    <pre ref="slot" class="hidden">
    <slot></slot>
    </pre>
    <pre>{{ songText }}</pre>
    <pre>{{ part }}</pre>
    <frenchy-hr v-if="part.type === 'hr'" :part="part"></frenchy-hr>
    <frenchy-stanza v-if="part.type === 'stanza'" :stanza="part"></frenchy-stanza>
    <frenchy-text-block v-if="part.type === 'plain-text'" :part="part"></frenchy-text-block>
  </div>
</template>

<style scoped>
.part {
  max-width: 100%;
  display: flex;
    flex-direction: column;
    align-items: start;
    position: relative;
    margin-top: calc(var(--y-unit)/ 2);
--bar-width: calc(1 * var(--root-bar-width));
  --bar-height: calc(1 * var(--root-bar-height));
  --chord-size: 1;
}
.hidden {
  /* display: none; */
}

pre {
  background: mediumaquamarine;
}
</style>