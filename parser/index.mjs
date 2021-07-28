import jison from 'jison'
import fs from 'node:fs'

let grammar = fs.readFileSync('./grammar.jison', { encoding: 'utf-8' })

const parser = new jison.Parser(grammar, {
  type: 'lalr'
})

let out = ''

parser.yy = {
  append: t => out += '' + t
}


const songText = `| Bb | - | - | - | Eb | - | Bb | 1 |
| Bb | - | - | - | Eb | - | Bb | 2 |


`

// bottom 6:  Last time: <<<
// bottom 7,8: {   q  Q  H   \       W }<<<

// Bridge
// | Eb | - | Bb | - | Eb | - | Bb | - |
// | Eb | - | Bb | Gm | Cm7 | - | F7. | . |
// {| | | | | | | qEe Q q | |
// bottom 6,7:  Last time:    \caesura <<<

// Chorus
// | Bb | - | - | - | - | - | - | . |
// {| qEe Q q | | qEe Q q | | qEe Q q | | qEe Q q | |

console.log(parser.parse(songText))
