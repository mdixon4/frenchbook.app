const parseBar = barText => {

  let chords = barText.split(/\s+/)
    .map(chord => chord.trim())
    .filter(Boolean)
  chords = chords.map(chord => ({
    chordText: chord.replace(/\.$/, ''),
    isStop: /\.$/.test(chord)
  }))

  console.log(chords)

  if (chords.length === 1) {
    return {
      chords: [
        {
          beats: '1234',
          chord: chords[0].chordText,
          isStop: chords[0].isStop
        }
      ]
    }
  }

  if (chords.length === 2) {
    return {
      chords: [
        {
          beats: '12',
          chord: chords[0].chordText,
          isStop: chords[0].isStop
        },
        {
          beats: '34',
          chord: chords[1].chordText,
          isStop: chords[1].isStop
        }
      ]
    }
  }

  if (chords.length === 4) {
    chords = chords.reduce((chords, c, idx) => {
      if (c.chordText === '-') {
        chords[chords.length - 1].beats += String(idx + 1)
      } else {
        chords.push({
          beats: String(idx + 1),
          chord: c.chordText,
          isStop: c.isStop
        })
      }
      return chords
    }, [])
    return  {
      chords
    }
  }

  return {
    chords: []
  }
}


const parseLine = lineText => {

  // if line starts with spaces, align right not left
  let align = /^\s+/.test(lineText) ? 'right' : 'left'

  if (!/\s*\|/.test(lineText)) {
    // Line is not a line of bars
    return {
      isText: true,
      bars: [],
      align,
      text: lineText.trim()
    }
  }

  let bars = lineText
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map(barText => barText.trim())
  
  bars = bars.map((bar, idx) => ({
    id: idx + 1,
    ...parseBar(bar)
  }))

  // if line starts with spaces and then a barline, align right not left
  // let align = /^\s+\|/.test(lineText) ? 'right' : 'left'
  
  return {
    isText: false,
    bars,
    align,
    text: ''
  }

}


const parseStanza = stanzaText => {

  // let textLines = stanzaText
  //   .split(/\n+/)
  //   .filter(line => line.trim.length)

  // // lines with bars, first non-whitespace character is |
  // let linesWithBars = textLines.filter(/^\s*|/.test(textLines))



  return {
    lines: stanzaText.split(/\n+/).filter(line => line.trim().length).map((line, idx) => ({
      id: idx + 1,
      ...parseLine(line)
    }))
  }

}


export const songify = (songText) => {
  if (!/^\=+$/m.test(songText)) {
    throw new Error('Song file does not include ===== separator')
  }

  let frontMatter = songText.split(/^=+$/)[0]
  let metadata = frontMatter.split(/\n+/)
    .filter(item => /\:/.test(item))
    .map(item => item.split(/([^:]*)\:(.*)/))
    .reduce((acc, item) => {
      acc[item[1].trim()] = item[2].trim()
      return acc
    }, {})
  console.log(metadata)

  let parts = songText.split(/^\~+$/m)
  let stanzas = parts.slice(1).filter(part => part.trim().length)
  
  stanzas = stanzas
    .map((stanza, idx) => ({
      id: idx + 1,
      ...parseStanza(stanza)
    }))

  console.log(stanzas)

  return {
    metadata,
    stanzas
  }
}