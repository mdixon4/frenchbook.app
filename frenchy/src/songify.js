//build regexes without worrying about
// - double-backslashing
// - adding whitespace for readability
// - adding in comments
let clean = (piece) => (piece
  .replace(/((^|\n)(?:[^\/\\]|\/[^*\/]|\\.)*?)\s*\/\*(?:[^*]|\*[^\/])*(\*\/|)/g, '$1')
  .replace(/((^|\n)(?:[^\/\\]|\/[^\/]|\\.)*?)\s*\/\/[^\n]*/g, '$1')
  .replace(/\n\s*/g, '')
);
const regex = ({raw}, ...interpolations) => (
  new RegExp(interpolations.reduce(
      (regex, insert, index) => (regex + insert + clean(raw[index + 1])),
      clean(raw[0])
  ))
);


const barlines = [
  '|',
  '||',
  ':|',
  '|:',
  '||(',
  ')||',
]

const quotedRegex = /\"([^\"]*)\"/

const barlineRegex = regex`^
  (?<precursor>.*?)             //precursor
  (
    (?<barline>\)?(\||\:)?\|\:?\(?)   //barline
    (?<barcontent>.*?)
  )*
$`


const parseBar = barText => {

  let classes = barText.match(classesRegex)?.map(c => c.substr(1)) || []
  barText = barText.replace(classesRegex, '')

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
      annotation: annotations,
      classes
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
      annotation: annotations,
      classes
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
      annotation: annotations,
      classes
    }
  }

  return {
    chords: [],
    annotation: annotations,
    classes
  }
}


const parseLine = lineText => {

  console.log(lineText)

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

  // let bars = lineText
  //   .replace(/^rhythms:/, '')
  //   .replace(/^\s*\"[^\"]\"\s*/, '') // remove any pre-cursor annotations
  //   .replace(/^\s*\|/, '')
  //   .replace(/\|\s*$/, '')
  //   .split('|')
  //   .map(barText => barText.trim())
  
  let barTexts = lineText.match(/(\)?(\||\:)?\|\:?\(?)([^\|\:(?\|)\)(?\|)]*)/g)
  let bars = barTexts.reduce((bars, barText, idx) => {
    let [,barline,,textContent] = barText.match(/(\)?(\||\:)?\|\:?\(?)([^\|\:(?\|)\)(?\|)]*)/)
    if (idx > 0) {
      bars[idx - 1].rightBarline = barline
    }
    if (textContent.length) {
      bars.push({
        textContent,
        leftBarline: barline,
        rightBarline: '|'
      })
    }
    return bars
  }, [])



  if (isRhythms) {
    bars = bars.map((bar, idx) => ({
      id: idx + 1,
      rhythms: bar
    }))
  } else {
    bars = bars.map((bar, idx) => ({
      id: idx + 1,
      ...bar,
      ...parseBar(bar.textContent.trim())
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

const classesRegex = /\B\.\S+/g


const extractStanzaMetadata = stanzaText => {
  let firstLine = stanzaText.split(/\n+/).filter(line => line.length)[0]
  // If the first line is music, we have no metadata
  if (isLineMusic(firstLine)) return {}
  // Classes will be words starting with .
  console.log(firstLine)
  let classes = firstLine.match(classesRegex)?.map(c => c.substr(1)) || []
  let title = firstLine.replace(classesRegex, '').split(/\s+/).join(' ').trim()
  console.log({ title, classes })
  return {
    title,
    classes
  }

  // let title = isLineMusic(allLines[0]) ? '' : allLines[0].trim()

  // let coordinates = title.match(/{(\-?[\d\.]*),(\-?[\d\.]*)}/)
  // if (coordinates) coordinates = { x: parseInt(coordinates[1]), y: parseInt(coordinates[2]) }

  // title = title.replace(/{(\-?[\d\.]*),(\-?[\d\.]*)}/, '').trim()
}


const parsePart = partText => {
  console.log({ partText })
  
  // If it's just one line, of 3 or more dashes, treat as a horizontal line
  if (partText.match(/^\-\-\-+$/)) {
    return {
      type: 'hr'
    }
  }

  // If the first and last non-whitespace character of the part is double quote, treat as plain text
  // (or markdown, one day?)
  let plainText = partText.match(/^\s*"(.*)"\s*$/)
  if (plainText) {
    return {
      type: 'plain-text',
      text: plainText[1]
    }
  }

  // Otherwise, treat it as a stanza
  return {
    type: 'stanza',
    ...parseStanza(partText)
  }
}

const getBorderCoordinates = lineLayout => {
  let coordinates = []
  // Do the right end first
  for (let lineIdx = 0; lineIdx < lineLayout.length; lineIdx += 1) {
    let rightEdge = lineLayout[lineIdx].lastIndexOf('1')
    coordinates.push([ rightEdge, lineIdx ], [ rightEdge, lineIdx + 1 ])
  }
  // Do the left end, but in reverse
  for (let lineIdx = lineLayout.length - 1; lineIdx; lineIdx -= 1) {
    let leftEdge = lineLayout[lineIdx].indexOf('1')
    coordinates.push([ leftEdge, lineIdx + 1 ], [ leftEdge, lineIdx ])
  }
  return coordinates
}

const parseStanza = stanzaText => {

  let { title, classes, coordinates } = extractStanzaMetadata(stanzaText)
  let allLines = stanzaText.split(/\n+/).filter(line => line.trim().length)
  
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

  // let borderCoordinates = getBorderCoordinates(lineLayout)
  let borderCoordinates = []

  console.log(borderCoordinates)

  return {
    title,
    classes,
    lines,
    lineLayout,
    borderCoordinates,
    maxWidth,
    columnStart: (coordinates && coordinates.x > -1) ? coordinates.x + 1 : Math.max(9 - (maxWidth), 0),
    columnSpan: maxWidth * 2,
    rowStart: (coordinates && coordinates.y > -1) ? coordinates.y + 1 : null,
    rowSpan: lines.length * 2,
  }

}


const parseFrontMatter = frontMatter => {
  return frontMatter.split(/\n+/)
    .filter(item => /\:/.test(item))
    .map(item => item.split(/([^:]*)\:(.*)/))
    .reduce((acc, item) => {
      acc[item[1].trim()] = item[2].trim()
      return acc
    }, {})
}


export const songify = (songText) => {
  if (!/^\=+$/m.test(songText)) {
    throw new Error('Song file does not include ===== separator')
  }

  let [frontMatter, songMatter, css, ...otherMatter] = songText.split(/^=+$/m)
  let metadata = parseFrontMatter(frontMatter)

  let parts = songMatter.split(/^$/m)
    .filter(part => part.trim().length)
    .map(part => part.replace(/^\n|\n$/g, ''))
    .map(parsePart)
  
  return {
    metadata,
    parts,
    css
  }
}