export type Chord = {
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

export type SymbolList = {
  [key: string]: string
}


export type PreparedChord = {
  parsedChord: Chord
  renderedChord: string
  chord: string
  isStop: boolean
  isDitto: boolean
  isBlank: boolean
  isBracketed: boolean
  beats: string
}

export type BarContent = {
  chords: Array<{}>
  annotations: Array<{}>
  classes: Array<string>
  isEmpty: boolean
}

export type Bar = {
  leftBarline: string
  rightBarline: string | undefined
  textContent: string
  classes?: Array<string>
  
  isLeftmost?: boolean
  isRightmost?: boolean
  isTopmost?: boolean
  isBottommost?: boolean
}

export type UnparsedMusicLine = {
  rhythmText: string
  text: string
}

export type MusicLine = {
  bars: Array<Bar>
  indent: number | null
  align: string
  classes: Array<string>
}

export type AnnotationLine = string

export type Line = MusicLine | AnnotationLine

export type StanzaLayout = {
  layout: Array<string>
  indent: number
  width: number
  fullWidth: number
  height: number
}

export type Annotation = {
  align: 'start' | 'middle' | 'end'
  style: 'dotted' | 'volta' | 'volta-dashed' | 'wayfinding' | ''
  side: string
  text: string
  classes: Array<string>
  start: number | null
  end: number | null
}

export type TextBlock = {
  type: 'plain-text'
  topMargin?: number
  bottomMargin?: number
  classes: Array<string>
  text: string
  html: string
}


export type Stanza = {
  type: 'stanza'
  topMargin?: number
  bottomMargin?: number
  classes: Array<string>
  title: {}
  lines: Array<MusicLine>
  layout: Array<string>
  borderCoordinates: Array<[number, number]>
  indent: number
  width: number
  fullWidth: number
  height: number
  annotations: Array<Annotation>
}

export type HR = {
  type: 'hr'
  topMargin?: number
  bottomMargin?: number
  classes: Array<string>
}

export type MetaData = {
  [key: string]: string
}

export type SongPart = Stanza | TextBlock | HR

export type Song = {
  metadata: MetaData
  parts: Array<SongPart>
  css: string
}

