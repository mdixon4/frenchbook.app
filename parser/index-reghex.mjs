import { match, parse } from 'reghex'

const string = match('string')`
  ${/[^=\n\:]+/}
`

const emptyLine = match('emptyLine')`
  ${/^\s*$/}
`

const invalidLine = match('invalidLine')`
  ${/^/} ${string} ${/$/}
`

const globalDivider = match('globalDivider')`
  ${/^=+$/}
`

const keyValue = match('keyValue')`
  ${/\w+/}
  ${string} ${/\:/} ${string}
`

const frontMatter = match('frontMatter')`
  (${emptyLine} | ${keyValue} | ${invalidLine}) ${globalDivider}?
`

const song = match('song')`
  (${emptyLine} | ${invalidLine})*
`

const style = match('style')`
  ${globalDivider} (${emptyLine} | ${invalidLine})
`

// const songFile = match('songFile')`
//   ${/^/} ${frontMatter}? ${song}? ${style}? ${/$/}
// `

const songFile = match('songFile')`
  ${keyValue}+
`



const songText = `title: Faith`
let rest = `
number: 126
credits: Michael, 1987
===

Verse
| Bb | - | - | - | Eb | - | Bb | - |
| Bb | - | - | - | Eb | - | Bb | - |
bottom 6:  Last time: <<<
bottom 7,8: {   q  Q  H   \       W }<<<

Bridge
| Eb | - | Bb | - | Eb | - | Bb | - |
| Eb | - | Bb | Gm | Cm7 | - | F7. | . |
{| | | | | | | qEe Q q | |
bottom 6,7:  Last time:    \caesura <<<

Chorus
| Bb | - | - | - | - | - | - | . |
{| qEe Q q | | qEe Q q | | qEe Q q | | qEe Q q | |


"
Well I guess it would be nice
if I could touch your body
I know not everybody
has got a body like you.  
But I've got to think twice
before I give my heart away
and I know all the games you play
because I played them too.
"
`



console.log(parse(songFile)(songText))