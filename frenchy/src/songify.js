const quotedRegex = /\"([^\"]*)\"/

const parseBar = barText => {

  let annotationsMatch = barText.match(quotedRegex)
  let annotations = annotationsMatch ? annotationsMatch[1] : ''

  let chords = barText.replace(quotedRegex, ' ').split(/\s+/)
    .map(chord => chord.trim())
    .filter(Boolean)
  
    chords = chords.map(chord => ({
    chordText: chord.replace(/\.$/, ''),
    isStop: /\.$/.test(chord)
  }))

  if (chords.length === 1) {
    return {
      chords: [
        {
          beats: '1234',
          chord: chords[0].chordText,
          isStop: chords[0].isStop,
        }
      ],
      annotation: annotations
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
      ],
      annotation: annotations
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
      chords,
      annotation: annotations
    }
  }

  return {
    chords: [],
    annotation: annotations
  }
}


const parseLine = lineText => {

  let isRhythms = false

  // if line starts with spaces, align right not left
  let align = /^\s+/.test(lineText) ? 'right' : 'left'

  // ignore annotations to test the line structure
  if (!/^\s*\|/.test(lineText.replace(quotedRegex, ' ').replace(/^rhythms:/, ''))) {
    // Line is not a line of bars
    return {
      isBars: false,
      isText: true,
      isRhythms: false,
      bars: [],
      align,
      text: lineText.trim()
    }
  }

  if (lineText.startsWith('rhythms:')) {
    // Rhythms, that pertain to the previous line
    isRhythms = true
  }

  let bars = lineText
    .replace(/^rhythms:/, '')
    .replace(/^\s*\"[^\"]\"\s*/, '') // remove any pre-cursor annotations
    .replace(/^\s*\|/, '')
    .replace(/\|\s*$/, '')
    .split('|')
    .map(barText => barText.trim())
  
  if (isRhythms) {
    bars = bars.map((bar, idx) => ({
      id: idx + 1,
      rhythms: bar
    }))
  } else {
    bars = bars.map((bar, idx) => ({
      id: idx + 1,
      ...parseBar(bar)
    }))
  }

  // if line starts with spaces and then a barline, align right not left
  // let align = /^\s+\|/.test(lineText) ? 'right' : 'left'
  console.log(bars)
  return {
    isBars: true,
    isText: false,
    isRhythms,
    bars,
    align,
    text: ''
  }

}


const totalPerspectiveVortexForBars = (bars, lineLayout, lineIdx) => {

  bars = bars.map((bar, barIdx) => {
    
    let startAt = lineLayout[lineIdx].indexOf('1')
    let myPos = startAt + barIdx
    let isBarAbove = lineIdx > 0 
      && lineLayout[lineIdx - 1].charAt(myPos) === '1'
    let isBarBelow = lineIdx < lineLayout.length - 1 
      && lineLayout[lineIdx + 1].charAt(myPos) === '1'

    return {
      ...bar,
      isLeftmost: barIdx === 0,
      isRightmost: barIdx === bars.length - 1,
      isTopmost: !isBarAbove,
      isBottommost: !isBarBelow
    }
  })

  return bars
}

const isLineMusic = lineText => {
  // Line is music if it has unquoted | symbols
  // For now this is a satisfactory definition but no doubt I'll have to change it
  // Also it can't start with rhythms
  // if (lineText.startsWith('rhythms:')) {
  //   return false
  // }
  return /^\s*\|/.test(lineText.replace(quotedRegex, ' ').replace(/^rhythms:/, ''))
}


const parseStanza = stanzaText => {

  let allLines = stanzaText.split(/\n+/).filter(line => line.trim().length)
  
  let title = isLineMusic(allLines[0]) ? '' : allLines[0].trim()

  let coordinates = title.match(/{(\-?[\d\.]*),(\-?[\d\.]*)}/)
  if (coordinates) coordinates = { x: parseInt(coordinates[1]), y: parseInt(coordinates[2]) }

  title = title.replace(/{(\-?[\d\.]*),(\-?[\d\.]*)}/, '').trim()

  let lines = []
  allLines.forEach((line, idx) => {
    if (!isLineMusic(line)) return
    let l = parseLine(line)
    if (l.isRhythms) {
      console.log(l)
    }
    if (l.isRhythms && lines.length > 0) {
      lines[lines.length - 1].rhythms = l.bars
    }
    else lines.push({
      id: lines.length + 1,
      ...l
    })
  })

  // let lines = allLines.filter(isLineMusic).map((line, idx) => ({
  //   id: idx + 1,
  //   ...parseLine(line)
  // }))

  let maxWidth = Math.max(...lines.map(line => line.bars?.length || 0))
  let lineLayout = lines.map(line => { 
    let on = '1'.repeat(line.bars.length)
    let off = '0'.repeat(Math.max(maxWidth - line.bars.length, 0))
    return line.align === 'right' ? `${off}${on}` : `${on}${off}`
  })

  lines = lines.map((line, lineIdx) => ({
    ...line,
    bars: totalPerspectiveVortexForBars(line.bars, lineLayout, lineIdx)
  }))

  return {
    title,
    lines,
    lineLayout,
    maxWidth,
    columnStart: (coordinates && coordinates.x > -1) ? coordinates.x + 1 : Math.max(9 - (maxWidth), 0),
    columnSpan: maxWidth * 2,
    rowStart: (coordinates && coordinates.y > -1) ? coordinates.y + 1 : null,
    rowSpan: lines.length * 2,

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