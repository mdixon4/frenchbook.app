import { h, computed } from 'vue'
import FrenchyHr from '../renderer/FrenchyHr.vue'

import FrenchyStanza from '../renderer/FrenchyStanza.vue'
import FrenchyTextBlock from '../renderer/FrenchyTextBlock.vue'
import { songify } from '../../songify/songify'

export const FunctionalComponent = (props, context) => {
  let slotContent = context.slots.default?.()?.[0]?.children || ''

  // Where all non-empty lines have some leading whitespace, trim whatever whitespace is on each line
  slotContent = slotContent.replaceAll('\r\n', '\n')
  let indent = Math.min(...slotContent.split('\n').map(l => l.match(/^(\s*)\S/)?.[1].length ?? Infinity))
  console.log({ indent })
  slotContent = slotContent.split('\n').map(l => l.substr(indent)).join('\n')
  
  const song = songify(slotContent || '')
  const part = song.parts?.[0]
  console.log({ slotContent, song, part })
  let component = h(FrenchyStanza, { stanza: part })
  if (part.type === 'hr') component = h(FrenchyHr, { part })
  if (part.type === 'plain-text') component = h(FrenchyTextBlock, { part })

  return h(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
      }
    },
    component
  )
}