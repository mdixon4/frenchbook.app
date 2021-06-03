import markdownit from 'markdown-it'
import { renderChord } from './chord_renderer.js'
import { replaceSnippets } from './snippets.js';

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
const globalQuotedRegex = new RegExp(quotedRegex.source, 'g')
const classesRegex = /(?<![\.\w\d])\.([^\s|\.])+/g
// const classesRegex = /(?<!(\w|\d|\.))\.\S+/g
const barlineRegex = /(\)?(\||\:)?\|\:?\(?)([^\|\:(?\|)\)(?\|)]*)/
const globalBarlineRegex = new RegExp(barlineRegex.source, 'g')


// const replacePitches = text => text
//   .replaceAll(new RegExp("[A-G][b#]?(?:(?:5|dim(5|7)?|aug5?|\\+5?|-5?)|(?:(?:mi?n?)?(?:(?:4|6|7|9|11|13|6\\/9)|(?:maj?|Ma?j?)?(?:6|7|9|11|13))?)(?:\\((?:[b-](5|6|9|13)|[#+](4|5|9|11))\\)|(?:[b-](5|6|9|13)|[#+](4|5|9|11)))*(?:sus(2|4|24|2sus4)?)?(?:\\((?:[b-](5|6|9|13)|[#+](4|5|9|11))\\)|(?:[b-](5|6|9|13)|[#+](4|5|9|11)))*(?:add[b#]?(?:2|4|6|7|9|11|13))?)(?:\\/[A-G][b#]?)?(?=$| )", 'g'), '[[CHAORD]]')

const replacePitches = text => text
  .replaceAll(/\b([A-G])(?:#)(?:\b|(?<=#))/g, '$1♯')
  .replaceAll(/\b([A-G])b\b/g, '$1♭')

const parseBarContent = barText => {

  let annotationMatches = Array.from(barText.matchAll(globalQuotedRegex) || [])
  let annotations = annotationMatches.map(match => {
    let text = match[1]
    let position = match.index === 0 ? 'top' : 'bottom'
    let align = text.startsWith(' ') && !text.endsWith(' ')
      ? 'right'
      : text.endsWith(' ') && !text.startsWith(' ')
        ? 'left'
        : 'center'
    text = replaceSnippets(text)
    text = replacePitches(text)
    return {
      text,
      position,
      align
    }
  })
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
      : chords.length === 3
        ? [ '1', '2', '34' ]
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
    annotations,
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
    let indent = line.indent || (line.align === 'left' ? 0 : Math.max(maxWidth - line.bars.length, 0))
    let off = '0'.repeat(indent)
    let on = '1'.repeat(line.bars?.length || 0)
    let offAgain = '0'.repeat(Math.max(maxWidth - line.bars.length - indent, 0))
    return [off, on, offAgain].join('')
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
          leftBarline: barline
        })
      }
      return bars
    }, [])
  return bars
}


const parseLineData = rawLine => {

  let classes = rawLine.text.split('|').slice(-1)[0].match(classesRegex)?.map(c => c.substr(1)) || []
  
  let beforeFirstBar = rawLine.text.split(barlineRegex)[0]
  let indent = beforeFirstBar.match(/(\s|^)(>+)(\s|$)/)?.[2]?.length || null
  if (indent) {
    classes.push(`indent-${indent}`)
  } else {
    let indentClass = classes.find(c => c.startsWith('indent-'))
    let indentFromClass = indentClass && indentClass.match(/indent-(?<digits>\d+(\-\d+)?)/)?.groups?.digits?.replace('-', '.')
    if (indentFromClass) {
      indent = parseFloat(indentFromClass, 10) || null
    }
  }

  // if line starts with spaces, align right not left
  let align = indent !== null 
    ? 'left' // align left if there's an indent class!
    : /^\s+/.test(rawLine.text) ? 'right' : 'left'

  let rhythmBars = rawLine.rhythmText ? splitTextIntoBars(rawLine.rhythmText) : null
  
  let bars = splitTextIntoBars(rawLine.text).map((bar, idx, allBars) => {
    let rhythmText = (rhythmBars?.length > idx) ? rhythmBars[idx].textContent : ''
    if (rhythmText.trim().length === 0) {
      rhythmText = ''
    }

    if (!bar.rightBarline) {
      // This bar is the last bar, and it isn't closed. We shouldn't count it if it's just classes
      if (!bar.textContent.replace(classesRegex, '').trim().length) {
        return null
      }
      bar.rightBarline = '|'
    }
    
    return {
      id: idx + 1,
      ...bar, //leftBarline, rightBarline, textContent
      rhythm: rhythmText,
      ...parseBarContent(bar.textContent.trim())
    }
  }).filter(Boolean)

  return {
    bars,
    align,
    indent,
    classes
  }

}

const parseInlineMarkdown = text => {
  return markdownit({
    typographer: true,
    html: true
  }).renderInline(text)
}


const parseAlignmentClues = inputText => {

  let text = inputText.trim()

  if (text.endsWith('...') && text.startsWith('...')) {
    return {
      align: 'middle',
      style: 'dotted',
      text: text.replace(/(^\.\.\.|\.\.\.$)/g, '').trim()
    }
  }
  if (text.startsWith('...')) {
    return {
      align: 'end',
      style: 'dotted',
      text: text.replace(/(^\.\.\.|\.\.\.$)/g, '').trim()
    }
  }
  if (text.endsWith('...')) {
    return {
      align: 'start',
      style: 'dotted',
      text: text.replace(/(^\.\.\.|\.\.\.$)/g, '').trim()
    }
  }

  if (text.endsWith('<<<') && text.startsWith('>>>')) {
    return {
      align: 'middle',
      style: '',
      text: text.replace(/(^\>\>\>|\<\<\<$)/g, '').trim()
    }
  }
  if (text.startsWith('>>>')) {
    return {
      align: 'end',
      style: '',
      text: text.replace(/(^\>\>\>|\<\<\<$)/g, '').trim()
    }
  }
  if (text.endsWith('<<<')) {
    return {
      align: 'start',
      style: '',
      text: inputText.replace(/\s?\<\<\<\s*$/g, '')
    }
  }
  
  if (text.endsWith('---') && text.startsWith('---')) {
    return {
      align: 'middle',
      style: 'volta-dashed',
      text: text.replace(/(^---|---$)/g, '').trim()
    }
  }
  if (text.startsWith('---')) {
    return {
      align: 'end',
      style: 'volta-dashed',
      text: text.replace(/(^---|---$)/g, '').trim()
    }
  }
  if (text.endsWith('---')) {
    return {
      align: 'start',
      style: 'volta-dashed',
      text: text.replace(/(^---|---$)/g, '').trim()
    }
  }

  if (text.endsWith('___') && text.startsWith('___')) {
    return {
      align: 'middle',
      style: 'volta',
      text: text.replace(/(^___|___$)/g, '').trim()
    }
  }
  if (text.startsWith('___')) {
    return {
      align: 'end',
      style: 'volta',
      text: text.replace(/(^___|___$)/g, '').trim()
    }
  }
  if (text.endsWith('___')) {
    return {
      align: 'start',
      style: 'volta',
      text: text.replace(/(^___|___$)/g, '').trim()
    }
  }

  return {
    align: 'middle',
    style: '',
    text: inputText
  }

}


const parseStanzaAnnotation = lineText => {
  /*
  Lines like:
  top (1, 3): Gradually getting faster .dotted
  right: Ignore time signature
  left (1): 1st time only .volta
  */
  lineText = lineText.trim()
  let classes = lineText.match(classesRegex)?.map(c => c.substr(1)) || []
  // Split at first colon:
  let [placement, rawText] = lineText.replace(classesRegex, '').split(/:\s?(.+)/).slice(0, -1)
  if (!rawText) return {}
  let { align, style, text } = parseAlignmentClues(rawText)
  text = text.replace(/\\n/g, '<br>')
  console.log({ text })

  text = parseInlineMarkdown(text)
  text = replaceSnippets(text)
  text = replacePitches(text)
  let side = placement.match(/((topleft)|(topright)|(bottomleft)|(bottomright)|(top)|(left)|(right)|(bottom))/i)[0].toLowerCase()
  let startMatch = placement.match(/\W(\d+)/)
  let start = startMatch && parseInt(startMatch[1], 10) || null
  let endMatch = placement.match(/\W\d+\D(\d+)/)
  let end = endMatch && parseInt(endMatch[1], 10) || start

  // let alignment = classes.find(c => c.startsWith('align-'))
  // if (!alignment) {
  //   if (classes.includes('dotted') && (side === 'top' || side === 'bottom')) {
  //     classes.push('align-start')
  //   } else {
  //     classes.push('align-middle')
  //   }
  // }
  classes.push(`align-${align}`, style)

  return {
    classes,
    side,
    start,
    end,
    text
  }
}


const isLineMusic = lineText => {
  // line is music if it has | character (unescaped)
  return /(?<!\\)\|/.test(lineText)
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
  title = parseInlineMarkdown(title)
  return {
    title,
    classes,
    rest: stanzaText.split('\n').slice(1).join('\n')
  }
}


const getWayfinding = (lines) => {

  let bars = lines.map(
    (line, idx) => line.bars.map((b, barIdx) => ({ ...b, lineNo: idx + 1, barNo: barIdx + 1 }))
  ).flat()

  let wayfindingBars = bars.filter(bar => bar.classes?.includes('to-coda') || bar.classes?.includes('to-segno'))

  return wayfindingBars.map(bar => {
    let position = null
    if (bar.classes.includes('to-right')) {
      position = 'to-right'
    } else if (bar.classes.includes('to-bottom')) {
      position = 'to-bottom'
    } else if (bar.isRightmost && !bar.isBottommost) {
      position = 'to-right'
    } else if (bar.isRightmost && lines[bar.lineNo - 1] < 8) {
      position = 'to-right'
    } else if (bar.isBottommost) {
      position = 'to-bottom'
    }
    
    return {
      type: bar.classes?.includes('to-coda') 
        ? 'to-coda' 
        : bar.classes?.includes('to-segno')
          ? 'to-segno'
          : null,
      position,
      lineNo: bar.lineNo,
      barNo: bar.barNo
    }
  })
}


const parseStanza = stanzaText => {

  let { title, classes, rest } = extractStanzaMetadata(stanzaText)
  
  let annotations = []
  // The rest is the actual stanza body. Bundle up rhythm and annotation lines 
  // with the preceeding *actual* music line.
  let lines = rest.split(/\n+/)
    .filter(line => line.trim().length)
    .reduce((lines, line) => {
      if (isRhythms(line)) {
        lines[lines.length - 1].rhythmText = line.replace(/^\s*rhythms\:\s*/i)
        return lines
      }
      if (isLineMusic(line)) {
        return [...lines, {
          text: line
        }]
      }
      if (isAnnotations(line)) {
        try {
          annotations.push(parseStanzaAnnotation(line))
        } catch (err) {
          console.warn(err)
        }
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

  let wayfinding = getWayfinding(lines)
  
  // let layoutHintClasses = {
  //   'no-top-business': (title === '' || classes.includes('title-left')) && !annotations.some(a => annotation.side === 'top') && (classes.includes('wayfinding')))
  // }

  return {
    title,
    classes,
    lines,
    layout,
    borderCoordinates,
    indent,
    width, 
    height,
    annotations,
    wayfinding
  }

}


const parseMarkdown = markdownText => {
  return markdownit({
    typographer: true,
    linkify: true,
    html: true
  }).render(markdownText)
}


const formatDecimalWithHyphen = num => {
  console.log(num)
  console.log(num.toString().replace('.', '-'))
  return num.toString().replace('.', '-')
}


const parsePart = partText => {
  // If it's just one line, of 3 or more dashes, treat as a horizontal line
  // Allow classnames here though
  if (partText.replace(classesRegex, '').match(/^[\s>]*\-\-+[\s<]*$/)) {
    let indentLeft = partText.match(/^\s*(>+)/)?.[1]?.length || 0
    let indentRight = partText.match(/(<+)\s*$/)?.[1]?.length || 0
    let width = Math.max(16 - indentLeft - indentRight, 0)
    let indentClasses = [
      indentLeft ? `indent-${formatDecimalWithHyphen(indentLeft/2)}` : '',
      indentRight ? `width-${formatDecimalWithHyphen(width/2)}` : ''
    ].filter(Boolean)
    
    return {
      type: 'hr',
      classes: [
        indentClasses,
        partText.match(classesRegex)?.map(c => c.substr(1)) || []
      ]
    }
  }

  // If the first and last non-whitespace character of the part is double quote, 
  // treat as plain text / markdown
  let plainText = partText.replace(classesRegex, '').match(/^\s*\"(.*)\"\s*$/s)
  if (plainText) {
    return {
      type: 'plain-text',
      text: plainText[1],
      html: parseMarkdown(plainText[1]),
      classes: partText.match('classesRegex')?.map(c => c.substr(1)) || []
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


const handleInterpartSpacing = (parts, metadata) => {
  // Default to "2", unless we change it later
  parts.forEach(p => p.topMargin = 2)

  // For the first stanza, add space before only if
  // There's a title (but it's not a side title) or
  // there is a top annotation
  if (parts[0]?.type === 'stanza') {
    if (parts[0].title && !parts[0].classes.includes('title-left')) {
      parts[0].topMargin = 1
    }
    else if (parts[0].annotations.some(a => a.side?.startsWith('top'))) {
      console.log(parts[0].annotations)
      parts[0].topMargin = 1
    }
    else {
      parts[0].topMargin = 0
    }
  }

  // Loop through each part. If there's a class, apply that.
  // If it's a HR, apply the class from the next stanza if it doesn't have its own
  parts.forEach((p, idx, parts) => {
    if (p.classes.includes('flush')) {
      p.topMargin = 0
    }
    else if (p.classes.includes('tight')) {
      p.topMargin = 1
    }
    else if (p.classes.includes('comfortable')) {
      p.topMargin = 2
    }
    else if (p.classes.includes('roomy')) {
      p.topMargin = 4
    }
    else if (p.type === 'hr') {
      let nextClasses = parts[idx + 1]?.classes || []
      if (nextClasses.includes('flush')) {
        p.topMargin = 0
      } else if (nextClasses.includes('tight')) {
        p.topMargin = 1
      } else if (nextClasses.includes('comfortable')) {
        p.topMargin = 2
      } else if (nextClasses.includes('roomy')) {
        p.topMargin = 4
      }
    }
  })

  return parts
}


export const songify = (songText) => {
  let [frontMatter, songMatter, css, ...otherMatter] = songText.split(/^=+$/m)
  if (songMatter === undefined) {
    songMatter = frontMatter
    frontMatter = ''
  }
  let metadata = parseFrontMatter(frontMatter)

  let parts = songMatter.split(/^$/m)
    .filter(part => part.trim().length)
    .map(part => part.replace(/^\n|\n$/g, ''))
    .map(parsePart)
    .map((parsePart, idx) => ({
      id: idx,
      ...parsePart
    }))

  parts = handleInterpartSpacing(parts, metadata)
  
  return {
    metadata,
    parts,
    css
  }
}