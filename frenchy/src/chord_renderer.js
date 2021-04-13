import { elementToSVG } from 'dom-to-svg'

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


const MODIFIER_SYMBOLS = {
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

const dictionaryReplace = (inputStr, dictionary) => {
  let outputStr = inputStr
  if (!outputStr) return outputStr
  Object.entries(dictionary).forEach(([key, val]) => {
    outputStr = outputStr.replace(key, val)
  })
  return outputStr
}

const dictionaryReplaceToken = (token, dictionary) => {

}


const arrayEquals = (arrA, arrB) => {
  return Array.isArray(arrA) &&
    Array.isArray(arrB) &&
    arrA.length <= arrB.length &&
    arrA.every((val, index) => val === arrB[index]);
}

const preParser = chordText => {
  return chordText.replace('halfdim', 'Ø')
}

const catchHalfDim = chord => {
  // if (chord.formatted.descriptor === 'mi7' && chord.formatted.chordChanges.includes('b5')) {
  if (chord.input.descriptor === 'Ø') {
    console.log('HALFDIM!')
    chord.formatted.chordChanges = chord.formatted.chordChanges.filter(cc => cc !== 'b5')
    chord.formatted.descriptor = 'Ø'
  }
  return chord
}


const chordParserRegex = regex`^
  (?<root>[A-G](#|b)?)
  (?<modifier>(m|M|ma|mi|\^|MI|Maj|dim|halfdim|Ø|sus|o|0)?\d*)?
  (?<alterations>.*?)
  (/(?<bass>[A-G](#|b)?))?
$`

const modifierRegex = regex`^
  (mi|m|min|minor|Mi|-)?
  (M|Ma|ma|maj|MA|MAJ|major|\^)?
  (dim|o|halfdim|0)?
  (\d+)?
$`


const tokeniseModifier = modifier => {
  let matches = (modifier || '').match(modifierRegex)
  if (matches.length) {
    return matches.slice(1).filter(Boolean)
  }
  return []
}


const parse = chordText => {
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


const swapSymbols = parsedChord => {
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


// chords = chords.map(chordText => {
//   let chord = parse(chordText)
//   chord = swapSymbols(chord)
//   console.log(chord)
//   let outputStr = `<span class="root">${ chord.rootSymbols }</span>`
//   if (chord.modifiers.length) outputStr += `<span class="modifier">${ chord.modifierSymbols.join('') }</span>`
//   if (chord.alterations) outputStr += `<span class="alterations">${ chord.alterationSymbols }</span>`
//   if (chord.bass) outputStr += `<span class="bass-slash">/</span><span class="bass">${ chord.bassSymbols }</span>`
//   return outputStr
// })


export const renderChord = chordText => {
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




// class RepriseRenderedChord extends HTMLElement {
//   connectedCallback () {
//     let chord = this.innerHTML
//     chord = parse(chord)
//     chord = swapSymbols(chord)
//     this.classList.add(this.getAttribute('shape'))
//     let innerDiv = document.createElement('div')
//     innerDiv.classList.add('rendered-chord', this.getAttribute('shape'), 'lily')
//     if (this.getAttribute('shape') === 'leftTriangle' && chord.bass) {
//       this.classList.add('compact-left')
//     }
//     if (this.getAttribute('shape') === 'rightTriangle' && chord.bass) {
//       // this.classList.add('compact-right')
//     }

//     innerDiv.innerHTML = outputStr
    
//     this.innerHTML = `
//       <style>
//         .pori.rendered-chord {
//           font-family: 'Pori Chords Std';
//           font-size: calc(var(--chord-size) * 0.9);
//         }
//         .pori.fullSquare {
//           font-size: calc(var(--chord-size) * 1.5);
//         }

//         .lily.rendered-chord {
//           font-family: 'LJC';
//           font-size: calc(var(--chord-size) * 0.8);
//           transform: scaleX(0.95) translateY(0.18em);
//         }
//         .lily.fullSquare {
//           font-size: calc(var(--chord-size) * 1.3);
//         }
//         .lily .mod-digit {
//           transform: translateY(-0.3em) scale(0.65);
//           margin: 0 -0.25em 0 -0.1em;
//         }
//         .lily .bass-slash {
//           margin-left: -0.1em;
//         }
//         .compact-left .lily .bass-slash {
//           top: .6em;
//           left: 0.2em;
//         }
//         .compact-left .lily .bass {
//           top: 1.35em;
//           font-size: 0.9em;
//         }
//         .lily .mod-triangle {
//           font-size: 0.8em;
//         }

//         .rendered-chord {
//           font-family: 'Reprise Chords';
//           line-height: 0.1;
//           display: inline-block;
//           position: relative;
//           font-size: calc(var(--chord-size) * 1.2);
//           margin: 0 auto;
//           transform: translateY(0.1em);
//         }

//         .fullSquare {
//           font-size: calc(var(--chord-size) * 1.9);
//         }
        
        

        
    
//         .bass {
//           display: inline-block;
//           transform: translateY(0.2em);
//           font-size: 0.8em;
//           margin-left: -0.15em;
//         }
    
//         .bass-slash {
//           display: inline-block;
//           transform: scale(0.8) translateY(0.05em);
//           margin-left: -0.1em;
//         }
    
//         .mod-digit {
//           display: inline-block;
//           /* transform: scale(1.3) translateY(0.05em); */
//         }
    
//         .mod-symbol {
//           display: inline-block;
//           /* transform: scale(0.8) translateY(-0.15em); */
//         }
    
//         .mod-triangle {
//           /* margin: 0 -0.08em; */
//         }

//         .compact-left .bass-slash {
//           position: absolute;
//           left: 0.4em;
//           top: 0.45em;
//           transform: scale(1) rotate(63deg);
//           margin: 0;
//         }
//         .compact-left .bass {
//           position: absolute;
//           left: 0.1em;
//           top: 1.1em;
//           margin: 0;
//         }
//         .compact-left {
//           height: 1.2em;
//         }

//         .compact-right .bass-slash {
//           position: absolute;
//           left: 0;
//           top: 0;
//           transform: scale(1) rotate(63deg) translateY(-0.3em) translateX(0.7em);
//         }
//         .compact-right .bass {
//           position: absolute;
//           right: 0;
//           top: 1em;
//         }
//         .compact-right .rendered-chord {
//           height: 1.1em;
//         }
//       </style>
//       ${ innerDiv.outerHTML }
//     `
//   }
// }

// customElements.define('reprise-rendered-chord', RepriseRenderedChord)