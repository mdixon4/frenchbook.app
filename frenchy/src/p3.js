const getLast = arr => {
  if (arr.length === 0) return undefined
  return arr[arr.length - 1]
}


const processRhythmcontent = x => {
  // Array.from(x).reduce(i => {
  //   console.log(i)
  // })
  return x
}


const processBarcontent = x => {
  return x
}

const processMusicline = x => { 
  // If the last item is a rhythmline, pop it and save it
  let rhythmline = []
  if (getLast(x).tag === 'rhythmline') {
    rhythmline = getLast(x)
    x.pop()
  }
  console.log(rhythmline)
  
  // If the line is not flush against the left edge, then it can be indented and align right
  // with the other lines
  x.isIndented = x[0].tag === 'spaces' || x[0].tag === 'indentarrows'

  // Process each of the bars/barlines
  let barlines = x.filter(i => i.tag === 'barline')
  let barcontents = x.filter(i => i.tag === 'barcontent')

  let bars = barcontents.map((barcontent, idx) => {
    return {
      leftBarline: barlines[idx]?.value,
      rightBarline: barlines[idx + 1].value || '|',
      rhythm: rhythmline.length > idx
        ? rhythmline[idx]
        : undefined,
      barcontent: barcontent.value,
      classes: barcontent.classes
    }
  }).filter(Boolean)

  console.log({
    bars,
    classes: x.classes
  })

  return {
    bars,
    classes: x.classes
  }
}


const PROCESSORS = {
  'barcontent': processBarcontent,
  'rhythmcontent': processRhythmcontent,
  'musicline': processMusicline
}


export const process = obj => {
  if (obj.tag) {
    Array.from(obj).forEach(o => process(o))
    let processor = PROCESSORS[obj.tag]
    if (processor) return processor(obj)
    return obj
  } else {
    return obj
  }
}