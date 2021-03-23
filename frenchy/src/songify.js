const parseBar = barText => {

  let chords = barText.split(/\s+/)
    .map(chord => chord.trim())
    .filter(Boolean)
  chords = chords.map(chord => ({
    chordText: chord.replace(/\.$/, ''),
    isStop: /\.$/.test(chord)
  }))

  if (chords.length === 1) {
    return [
      {
        beats: '1234',
        chord: chords[0].chordText,
        isStop: chords[0].isStop
      }
    ]
  }

  if (chords.length === 2) {
    return [
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
    return chords
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
      lines: stanza.split(/\n+/).filter(line => line.trim().length).map((line, idx) => ({
        id: idx + 1,
        bars: line.split('|').filter(bar => bar.trim().length).map((bar, idx) => ({
          id: idx + 1,
          chords: parseBar(bar)
        }))
      }))
    }))

  console.log(stanzas)

  return {
    metadata,
    stanzas
  }
}