

interface Chord {
  input?: {
    descriptor: string
  }
  formatted?: {
    descriptor: string
    chordChanges: Array<string>
  }
  raw?: string
  root?: string
  rootSymbols?: string
  modifier?: string
  modifiers?: Array<string>
  modifierSymbols?: Array<string>
  alterations?: string
  alterationSymbols?: string
  bass?: string
  bassSymbols?: string
}

type SymbolList = {
  [key: string]: string
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





const RENDER_PARAMS = {
  sizing: {
    text: 0.85,
    extn: 1.3,
    ext: 2.5,
    mod: 4.5,
    mod2: 0.85,
    modn: 1
  }
}

const DEFAULT_SYMBOLS = {
  // '##': '&#x1d12a;',
  // '#': '&#x266f;',
  '#': '&lt;',
  // bb: '&#x1d12b;',
  // b: '&#x266d;',
  b: '&gt;',
  // // ma: '&#xe180;',
  // ma: '&#xe18a;', // triangle
  // // mi: '&#xe181;',
  // mi: 'm',
  // halfdim: '&#xe18f;',
  // // dim: '&#xe18e;',
  // // m: '&#xe181;',
  // sus: '&#xe185;',
  // '+': '&#xe186;',
  // degree: '&#xe187;',
  // triangle: '&#xe18a;',
  // '^': '&#xe18a;',
  // sus4: '&#xe18d;',
  // circle: '&#xe18e;',
  // 'Ø': '&#xe18f;',
  // natural: '&#x266e;'
}

const BASS_SYMBOLS = {
  // '##': '&#x1d12a;',
  // '#': '&#x266f;',
  '#': '&lt;',
  // bb: '&#x1d12b;',
  // b: '&#x266d;',
  b: '&gt;',
  // natural: '&#x266e;'
}


const SWAPSIES = Object.entries(DEFAULT_SYMBOLS).reduce((acc, [key, val]) => {
  acc[key] = `<b>${ val }</b>`
  return acc
}, {})


const MODIFIER_SYMBOLS: SymbolList = {
  // 'b': '&#xe188;',
  // '#': '&#xe189;',
  // 'add': '&#xe18b;',
  // 'add11': '&#xe18c;',
  // '11': '<span class="mod-digit">&#xe182;</span>',
  // '13': '<span class="mod-digit">&#xe183;</span>',
  // 'dim': '&#xe184;',
  // '0': '<span class="mod-digit">&#xe190;</span>',
  // '1': '<span class="mod-digit">&#xe191;</span>',
  // '2': '<span class="mod-digit">&#xe192;</span>',
  // '3': '<span class="mod-digit">&#xe193;</span>',
  // '4': '<span class="mod-digit">&#xe194;</span>',
  // '5': '<span class="mod-digit">&#xe195;</span>',
  // '6': '<span class="mod-digit">&#xe196;</span>',
  // '7': '<span class="mod-digit">&#xe197;</span>',
  // '8': '<span class="mod-digit">&#xe198;</span>',
  // '9': '<span class="mod-digit">&#xe199;</span>',
  // halfdim: '<span class="mod-symbol">Ø</span>',
  halfdim: '<span class="mod-symbol">@</span>',
  // '^': '<span class="mod-symbol mod-triangle">&#xe18a;</span>',
  '^': '<span class="mod-symbol mod-triangle">^</span>',
  '+': '<span class="mod-symbol mod-plus">+</span>',
  'sus': '<span class="mod-sus">sus</span>',
  'sus4': '<span class="mod-sus">sus4</span>',
  'sus2': '<span class="mod-sus">sus2</span>',
  '7sus': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus</span></span>',
  '9sus': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus</span></span>',
  '11sus': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus</span></span>',
  '13sus': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus</span></span>',
  '7sus2': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus2</span></span>',
  '9sus2': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus2</span></span>',
  '11sus2': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus2</span></span>',
  '13sus2': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus2</span></span>',
  '7sus4': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus4</span></span>',
  '9sus4': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus4</span></span>',
  '11sus4': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus4</span></span>',
  '13sus4': '<span class="mod-stack"><span class="mod-digit">7</span><span class="mod-sus">sus4</span></span>',
  '69': '<span class="mod-stack"><span class="mod-digit">6</span><span class="mod-digit">9</span></span>',
  '6/9': '<span class="mod-stack"><span class="mod-digit">6</span><span class="mod-digit">9</span></span>',
  // dim: '<span class="mod-symbol">º</span>',
  dim: '<span class="mod-symbol">°</span>',
  '1': '<span class="mod-digit">1</span>',
  '2': '<span class="mod-digit">2</span>',
  '3': '<span class="mod-digit">3</span>',
  '4': '<span class="mod-digit">4</span>',
  '5': '<span class="mod-digit">5</span>',
  '6': '<span class="mod-digit">6</span>',
  '7': '<span class="mod-digit">7</span>',
  '8': '<span class="mod-digit">8</span>',
  '9': '<span class="mod-digit">9</span>',
  '0': '<span class="mod-digit">0</span>',
}


const ALTERATION_SYMBOLS = {
  // '##': '&#x1d12a;',
  // '#': '&#x266f;',
  // bb: '&#x1d12b;',
  // b: '&#x266d;',
  // // ma: '&#xe180;',
  // ma: '&#xe18a;', // triangle
  // // mi: '&#xe181;',
  // mi: 'm',
  // halfdim: '&#xe18f;',
  // // dim: '&#xe18e;',
  // // m: '&#xe181;',
  // sus: '&#xe185;',
  // '+': '&#xe186;',
  // degree: '&#xe187;',
  // triangle: '&#xe18a;',
  // '^': '&#xe18a;',
  // sus4: '&#xe18d;',
  // circle: '&#xe18e;',
  // 'Ø': '&#xe18f;',
  // natural: '&#x266e;',
  // '0': '&#xe190;',
  // '1': '&#xe191;',
  // '2': '&#xe192;',
  // '3': '&#xe193;',
  // '4': '&#xe194;',
  // '5': '&#xe195;',
  // '6': '&#xe196;',
  // '7': '&#xe197;',
  // '8': '&#xe198;',
  // '9': '&#xe199;',
  // add: '&#xe18b;',
  // add11: '&#xe18c;'
}


const EXTENSION_SYMBOLS = {
}

const MODIFIER2_SYMBOLS = {
  // 'striangle': '&#xe18a;'
}

const dictionaryReplace = (inputStr: string, dictionary: {}): string => {
  let outputStr = inputStr
  if (!outputStr) return outputStr
  Object.entries(dictionary).forEach(([key, val]: [string, string]) => {
    outputStr = outputStr.replace(key, val)
  })
  return outputStr
}


const arrayEquals = (arrA: Array<any>, arrB: Array<any>): boolean => {
  return Array.isArray(arrA) &&
    Array.isArray(arrB) &&
    arrA.length <= arrB.length &&
    arrA.every((val, index) => val === arrB[index]);
}

const preParser = (chordText: string): string => {
  return chordText.replace('halfdim', 'Ø')
}

const catchHalfDim = (chord: Chord): Chord => {
  // if (chord.formatted.descriptor === 'mi7' && chord.formatted.chordChanges.includes('b5')) {
  if (chord.input.descriptor === 'Ø') {
    chord.formatted.chordChanges = chord.formatted.chordChanges.filter(cc => cc !== 'b5')
    chord.formatted.descriptor = 'Ø'
  }
  return chord
}


const chordParserRegex = regex`^
  (?<root>[A-G](#|b)?)
  (?<modifier>(maj|ma|mi|m|MI|Maj|M|\^|dim|halfdim|Ø|(\d?sus\d*)|o|0|\+)?\d*)?
  (?<alterations>.*?)
  (/(?<bass>[A-G](#|b)?))?
$`

const modifierRegex = regex`^
  (mi|m|min|minor|Mi|-)?
  (M|Ma|ma|maj|MA|MAJ|major|\^)?
  (dim|o|halfdim|0)?
  (\+)?
  (\d*sus\d?)?
  (\d+)?
$`


const tokeniseModifier = (modifier: string) => {
  let matches = (modifier || '').match(modifierRegex)
  if (matches && matches.length) {
    return matches.slice(1).filter(Boolean)
  }
  return []
}


const parse = (chordText: string): Chord => {
  let matches = chordText.match(chordParserRegex)
  if (!matches) return { raw: chordText }
  let modifiers = tokeniseModifier(matches.groups.modifier)
  return {
    raw: chordText,
    root: matches.groups.root,
    modifier: matches.groups.modifier || '',
    modifiers,
    alterations: matches.groups.alterations || '',
    bass: matches.groups.bass || ''
  }
}


const swapSymbols = (parsedChord: Chord): Chord => {
  let rootSymbols = dictionaryReplace(parsedChord.root, DEFAULT_SYMBOLS)
  let modifierSymbols = parsedChord.modifiers?.map(modifier => MODIFIER_SYMBOLS[modifier] ?? modifier)
  let alterationSymbols = dictionaryReplace(parsedChord.alterations, ALTERATION_SYMBOLS)
  let bassSymbols = dictionaryReplace(parsedChord.bass, BASS_SYMBOLS)
  // let alterationsSymbols = dictionaryReplace(parsedChord.alterations, ALTERATION)
  return {
    rootSymbols,
    modifierSymbols,
    alterationSymbols,
    bassSymbols,
    ...parsedChord
  }
}


export const renderChord = (chordText: string): { parsedChord: Chord, renderedChord: string } => {
  let chord = parse(chordText)
  chord = swapSymbols(chord)
  
  let outputStr = ''
  if (chord.rootSymbols) {
    outputStr += `<span class="root">${ chord.rootSymbols }</span>`
  } else {
    outputStr += chord.raw
  }
  if (chord.modifiers?.length) outputStr += `<span class="modifier">${ chord.modifierSymbols.join('') }</span>`
  if (chord.alterations) outputStr += `<span class="alterations">${ chord.alterationSymbols }</span>`
  if (chord.bass) outputStr += `<span class="bass-slash">/</span><span class="bass">${ chord.bassSymbols }</span>`

  return {
    parsedChord: chord,
    renderedChord: outputStr
  }
}

