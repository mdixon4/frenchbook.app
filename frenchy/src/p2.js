import { match, parse } from 'reghex'
import { process } from './p3.js'

const getLast = arr => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}


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




const newlinecharacter = match('newlinecharacter', x => `
`)`
${/\\n/}
`

const escapedcharacter = match('escapedcharacter', x => x[0][1])`
${/\\./}
`

const specialcharacter = match('specialcharacter', x => x[0])`
${newlinecharacter} | ${escapedcharacter}
`

const specialtoken = match('specialtoken', x => `₴${x[0]}₴`)`
${/\\(coda|segno|fermata)/}
`

const quoted = match('quoted', x => `₰${x[0]}₰`)`
${/"/}
( ${specialtoken} | ${specialcharacter} | ${/[^"]/} )*
${/"/}
`

const inlinerhythm = match('inlinerhythm', x => x[0])`
${/{/}
( ${specialtoken} | ${specialcharacter} | ${/[^}]/} )*
${/}/}
`

const space = match('space', x => x[0])`
${/[ \t]+/}
`

const spaces = match('spaces', x => x[0])`
${/[ \t]+/}
`

const br = match('br')`
${/\r?\n/}
`


const classname = match('classname', x => ({ type: 'class', value: x[0].slice(1) }))`
${/(?<=[\s^])\.[a-z]+[a-z-]*/g}
`

// Non-barline
const nonbarlinecharacter = match('nonbarlinecharacter', x => x[0])`
${regex`
  (
    [^
      \s
      \|
      (\:(?>!\|)) //no colon followed immediately by a pipe
      \n
    ]
    // for some reason brackets aren't matched by the above, so include them here
    |\(|\)
  )
`}
`
// const nonbarlinecharacter = match('nonbarlinecharacter')`
// ${/[^\s\|(\:(?>!\|))\n]/}
// `

const chord = match(`chord`, x => x[0])`
${regex`
  [A-G]
  (#|b)?
  [a-z0-9^+#-]*
  (
    /
    [A-G]
    (#|b)?
  )?
  \.?
`}
`

// Baritem - any non-space, non-barline character.
const baritem = match('baritem', x => x[0])`
( ${specialtoken} | ${specialcharacter} | ${nonbarlinecharacter} )+
`

const chordrepeat = match('chordrepeat', x => x[0])`
${/[-]\.?/}
`

const barcontent = match('barcontent', x => {
  let value = Array.from(x)
    .filter(i => typeof i === 'string')
    .filter(i => i.trim().length)

  return {
    tag: 'barcontent',
    value,
    classes: x.filter(i => i.type === 'class').map(i => i.value)
  }
})`
(:${spaces} | ${quoted} | ${inlinerhythm} | ${classname} | ${chord} | ${chordrepeat} | ${baritem})+
`

const onlyclasses = match('onlyclasses')`
(:${spaces} | ${classname})+
`

const barline = match('barline', x => ({ tag: 'barline', type: 'barline', value: x[0] }))`
${/(?<!\\):?\|\|?\:?/}
`

const rhythmcontent = match('rhythmcontent', x => x.join('').trim() === '' ? '' : x.join(''))`
( ${space} | ${specialcharacter} | ${nonbarlinecharacter} )+
`

const rhythmline = match('rhythmline')`
:${/rhythms:\s*/} (:${barline} ${rhythmcontent})+ :${barline}?
`

const indentarrows = match('indentarrows')`
${/[ \t]*>+[ \t]*/}
`

const outerbarcontent = match('outerbarcontent', x => {
  x[0].tag = 'outerbarcontent'
  return x[0]
})`
${barcontent}
`

const musicline = match('musicline', x => {
  // If the last barcontent item is beyond the last barline (i.e. outerbarcontent)
  // And there are ONLY classnames present
  // ...we consider these classnames for the line as a whole
  let outerbarcontent = x.find(i => i.tag === 'outerbarcontent')
  if (outerbarcontent.value.length === 0) {
    x.classes = outerbarcontent.classes
    x.splice(x.indexOf(outerbarcontent), 1)
  }
  return x
})`
(${spaces} | ${indentarrows})? ${barline} (${barcontent} ${barline})* ${outerbarcontent}?
(:${br} ${rhythmline})?
`

const generaltext = match('generaltext')`
( ${spaces} | ${quoted} | ${specialtoken} | ${specialcharacter} | ${classname} | ${nonbarlinecharacter} )+
`

const titleline = match('titleline')`
${generaltext}
`

const keyword = match(`keyword`)`
${/(top|bottom|left|right)/}
`

const number = match(`number`, x => x[0])`
${/\d+(\.\d+)?/}
`


const coordinates = match(`coordinates`)`
  ( ${/\(/} ${number} :${spaces}? :${/\,/}? ${number}? ${/\)/} )
`

const metadatum = match(`metadatum`)`
${keyword} :${spaces}? ${coordinates}? :${spaces}? :${/\:/} ${generaltext}
`

const invalidline = match(`invalidline`)`
(${generaltext} | ${barline})+
`

const stanzamusic = match(`stanzamusic`)`
(${titleline} :${br})?
${musicline} 
(:${br} ${musicline})*
(:${br} (${metadatum} | ${invalidline})*
`

const hr = match(`hr`)`
${spaces}? ${/---+/} ${spaces}?
`

const songpart = match(`songpart`)`
( ${stanzamusic} | ${hr} | ${generaltext} )
`

const songstructure = match(`songstructure`)`
${/^/}
:${br}*
${songpart}?
(:${br}+ ${songpart})*
:${br}*
${/$/}
`

const SONG = `
So\\ng
| Am | - | \\coda -  | E7 | .classic-rock
rhythms: |q q qq| q q q q| | |
`


let song = parse(songstructure)(SONG)
process(song)
// console.log(JSON.stringify(process(song), null, 2))



// console.log(song)

// console.log(song)
const printObject = (obj, indent = 0) => {
  if (obj.tag) {
    if (Array.from(obj.tag).length > 1) {
      console.log(`${' '.repeat(indent)}${obj.tag}`)
      Array.from(obj).forEach(o => printObject(o, indent + 1))
    }
    else {
      console.log(`${' '.repeat(indent)}${obj.tag}: ${obj[0]}`)
    }
  } else {
    console.log(`${' '.repeat(indent-1)}${obj}`)
  }
}


// printObject(song)
