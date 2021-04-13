import markdownit from 'markdown-it'
import { renderChord } from './chord_renderer.js'

const MAX_BARS_PER_LINE = 8

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


const quotedRegex = /\"([^\"]*)\"/
const classesRegex = /\B\.\S+/g
const barlineRegex = /(\)?(\||\:)?\|\:?\(?)([^\|\:(?\|)\)(?\|)]*)/
const globalBarlineRegex = new RegExp(barlineRegex.source, 'g')


const parseBarContent = barText => {

  let annotationMatch = barText.match(quotedRegex)
  let annotation = annotationMatch ? annotationMatch[1] : ''
  barText = barText.replace(quotedRegex, ' ')
  let classes = barText.match(classesRegex)?.map(c => c.substr(1)) || []
  barText = barText.replace(classesRegex, ' ')

  let chords = barText.split(/\s+/)
    .map(chord => chord.trim())
    .filter(Boolean)
    .map(c => ({
      chord: c.replace(/\.$/, ''),
      isStop: /\.$/.test(c),
      isDitto: c === '-'
    }))
    .map(c => ({
      ...c,
      ...renderChord(c.chord)
    }))

  let beatPattern = chords.length === 1
    ? [ '1234' ]
    : chords.length === 2
      ? [ '12', '34' ]
      : chords.length === 4
        ? [ '1', '2', '3', '4' ]
        : undefined

  chords = chords.map((c, idx) => ({
    ...c, 
    beats: beatPattern[idx]
  }))

  chords = chords.reduce((chords, c, idx) => {
    if (chords.length && c.isDitto) {
      chords[chords.length - 1].beats = chords[chords.length - 1].beats + c.beats
    } else {
      chords.push(c)
    }
    return chords
  }, [])

  return {
    chords,
    annotation,
    classes
  }
}




const totalPerspectiveVortexForBars = (lines, layout) => {
  return lines.map((line, lineIdx) => {
    let lineLayout = layout[lineIdx]
    return {
      ...line,
      bars: line.bars.map((bar, barIdx) => {
        let startAt = lineLayout.indexOf('1')
        let myPos = startAt + barIdx
        let isBarAbove = lineIdx > 0 
          && layout[lineIdx - 1].charAt(myPos) === '1'
        let isBarBelow = lineIdx < layout.length - 1 
          && layout[lineIdx + 1].charAt(myPos) === '1'
        return {
          ...bar,
          isLeftmost: barIdx === 0,
          isRightmost: barIdx === line.bars.length - 1,
          isTopmost: !isBarAbove,
          isBottommost: !isBarBelow
        }
      })
    }
  })
}


const formulateLayout = (stanzaLines) => {
  let maxWidth = Math.max(...stanzaLines.map(line => line.bars?.length || 0))
  let layout = stanzaLines.map(line => { 
    let on = '1'.repeat(line.bars?.length || 0)
    let off = '0'.repeat(Math.max(maxWidth - line.bars.length, 0))
    return line.align === 'right' ? `${off}${on}` : `${on}${off}`
  })
  let indent = (MAX_BARS_PER_LINE - maxWidth) / 2
  return {
    layout,
    indent,
    width: maxWidth,
    height: stanzaLines.length
  }
}


const splitTextIntoBars = rawText => {
  let bars = rawText.match(globalBarlineRegex)
    .reduce((bars, barText, idx) => {
      let [,barline,,textContent] = barText.match(barlineRegex)
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
  return bars
}


const parseLineData = rawLine => {

  // if line starts with spaces, align right not left
  let align = /^\s+/.test(rawLine.text) ? 'right' : 'left'

  let rhythmBars = rawLine.rhythms ? splitTextIntoBars(rawLine.rhythms) : null
  
  let bars = splitTextIntoBars(rawLine.text).map((bar, idx) => {
    return {
      id: idx + 1,
      ...bar, //leftBarline, rightBarline, textContent
      rhythm: (rhythmBars?.length > idx) ? rhythmBars[idx].textContent : null,
      ...parseBarContent(bar.textContent.trim())
    }
  })

  return {
    bars,
    align
  }

}


const isLineMusic = lineText => {
  // Line is music if it starts with | (optionally white-space indented)
  return /^\s*\|/.test(lineText)
}

const isRhythms = lineText => {
  // Start with "rhythms"?
  return /^\s*rhythms\b/i.test(lineText)
}

const isAnnotations = lineText => {
  // If we're testing this, we can assume it *IS* an annotation line.
  return true
}



const getBorderCoordinates = lineLayout => {
  let coordinates = []
  // coordinates.push([ lineLayout[0].indexOf(1), 0 ])
  // Do the right end first
  for (let lineIdx = 0; lineIdx < lineLayout.length; lineIdx += 1) {
    let rightEdge = lineLayout[lineIdx].lastIndexOf('1')
    coordinates.push([ rightEdge + 1, lineIdx ], [ rightEdge + 1, lineIdx + 1 ])
  }
  // Do the left end, but in reverse
  for (let lineIdx = lineLayout.length - 1; lineIdx > -1; lineIdx -= 1) {
    let leftEdge = lineLayout[lineIdx].indexOf('1')
    coordinates.push([ leftEdge, lineIdx + 1 ], [ leftEdge, lineIdx ])
  }
  return coordinates
}

const extractStanzaMetadata = stanzaText => {
  let firstLine = stanzaText.split(/\n+/).filter(line => line.length)[0]
  // If the first line is music, we have no metadata
  if (isLineMusic(firstLine)) return {
    title: '',
    classes: [],
    rest: stanzaText
  }
  // Classes will be words starting with .
  let classes = firstLine.match(classesRegex)?.map(c => c.substr(1)) || []
  let title = firstLine.replace(classesRegex, '').split(/\s+/).join(' ').trim()
  return {
    title,
    classes,
    rest: stanzaText.split('\n').slice(1).join('\n')
  }
}


const parseStanza = stanzaText => {

  let { title, classes, rest } = extractStanzaMetadata(stanzaText)
  
  // The rest is the actual stanza body. Bundle up rhythm and annotation lines 
  // with the preceeding *actual* music line.
  let lines = rest.split(/\n+/)
    .filter(line => line.trim().length)
    .reduce((lines, line) => {
      if (isLineMusic(line)) {
        return [...lines, {
          text: line
        }]
      }
      if (isRhythms(line)) {
        lines[lines.length - 1].rhythmText = line.replace(/^\s*rhythms\:\s*/i)
        return lines
      }
      if (isAnnotations(line)) {
        lines[lines.length - 1].annotationText = line
        return lines
      }
    }, [])

  // Now that the lines are bundled:
  // { text, rhythmText, annotationText }
  // ...we can parse and organise the data
  lines = lines.map(line => parseLineData(line))

  // Get the basic layout of the stanza
  let { layout, indent, width, height } = formulateLayout(lines)
  // Total perspective vortex
  lines = totalPerspectiveVortexForBars(lines, layout)
  
  let borderCoordinates = getBorderCoordinates(layout)

  return {
    title,
    classes,
    lines,
    layout,
    borderCoordinates,
    indent,
    width, 
    height
  }

}


const parseMarkdown = markdownText => {
  return markdownit({
    typographer: true,
    linkify: true,
    html: true
  }).render(markdownText)
}


const parsePart = partText => {
  // If it's just one line, of 3 or more dashes, treat as a horizontal line
  if (partText.match(/^\-\-\-+$/)) {
    return {
      type: 'hr'
    }
  }

  // If the first and last non-whitespace character of the part is double quote, 
  // treat as plain text / markdown
  let plainText = partText.match(/^\s*\"(.*)\"\s*$/s)
  if (plainText) {
    return {
      type: 'plain-text',
      text: plainText[1],
      html: parseMarkdown(plainText[1])
    }
  }

  // Otherwise, treat it as a stanza
  return {
    type: 'stanza',
    ...parseStanza(partText)
  }
}


const parseFrontMatter = frontMatter => {
  let metadata = frontMatter.split(/\n+/)
    .filter(item => /\:/.test(item))
    .map(item => item.split(/([^:]*)\:(.*)/))
    .reduce((acc, item) => {
      acc[item[1].trim()] = item[2].trim()
      return acc
    }, {})
  if (metadata.title) {
    metadata.title = markdownit({
      typographer: true
    }).renderInline(metadata.title)
  }
  return metadata
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
    .map((parsePart, idx) => ({
      id: idx,
      ...parsePart
    }))
  
  return {
    metadata,
    parts,
    css
  }
}