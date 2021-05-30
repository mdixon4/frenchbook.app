import jison from 'jison'
import fs from 'fs'

let grammar = fs.readFileSync('./grammar.jison', { encoding: 'utf-8' })

const parser = new jison.Parser(grammar)

const text = fs.readFileSync('./songtext.txt', { encoding: 'utf-8' })

console.log(parser.parse(text))