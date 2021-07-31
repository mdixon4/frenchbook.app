import { regex } from './util'

// Match either a space, backslash, lowercase-word, or end-of-string that 
// follows one or three backslashes, or the start of the string, or just one 
// character after the start of the string
const snippetRegex = /(?:(?<=(?:.[^\\]|\\\\))|^|(?<=^.))\\( |\\|[a-z-]+|$)/g


const snippetList: { [key: string]: string } = {
  // '': `&ZeroWidthSpace;`,
  '\\': '&#92;',
  ' ': `&nbsp;`,
  'caesura': `<span class="smufl-symbol caesura">&#xE4D1;</span>`,
  'coda': `<span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>`,
  'segno': `<span class="smufl-symbol segno" data-outline="&#xE04A;">&#xE04A;</span>`,
  'fermata': `<span class="smufl-symbol fermata">&#xE4C0;</span>`,
  'fermata-plain': `<span class="unicode-symbol fermata">&#x1d110;</span>`,
  'fermata-up': `<span class="smufl-symbol fermata-up">&#xE4C1;</span>`,
  'fermata-up-plain': `<span class="unicode-symbol fermata-up">&#x1d111;</span>`,
  // Arrows
  // 'right-down':
  //   `<svg class="right-down" width="20" viewBox="0 0 47 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
  //     <path d="M5 13H18.7083C20.7859 13 22.7783 13.8253 24.2473 15.2943C25.7164 16.7634 26.5417 18.7558 26.5417 20.8333V44.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  //     <path d="M16.75 34.5417L26.5417 44.3334L36.3333 34.5417" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  //   </svg>`,
  'left-down':
    `<svg class="arrow left-down" viewBox="-50 -30 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M-22 30 L0 55 L22 30" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M 40 0 
        L 20 0
        A -20 20 0 0 0 0 20 
        L 0 50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg><svg class="arrow left-down-squished" viewBox="-50 15 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M-20 15 L0 35 L20 15" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M 40 0 
        L 20 0
        A -20 20 0 0 0 0 20 
        L 0 30" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'right-down':
    `<svg class="arrow right-down" viewBox="-50 -30 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M22 30 L0 55 L-22 30" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M-40 0 
        L -20 0
        A 20 20 0 0 1 0 20 
        L 0 50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg><svg class="arrow right-down-squished" viewBox="-50 15 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M20 15 L0 35 L-20 15" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M-40 0 
        L -20 0
        A 20 20 0 0 1 0 20 
        L 0 30" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'right-up':
    `<svg class="arrow right-up" viewBox="-50 -60 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M22 -30 L0 -55 L-22 -30" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M-40 0 
        L -20 0
        A 20 20 0 0 0 0 -20 
        L 0 -50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg><svg class="arrow right-up-squished" viewBox="-50 15 100 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M20 -15 L0 -35 L-20 -15" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="
        M-40 0 
        L -20 0
        A 20 20 0 0 0 0 -20 
        L 0 -30" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'down-right':
    `<svg class="arrow down-right" viewBox="-55 -30 110 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M30 22 L55 0 L30 -22" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M0 -40 L0 -20 A 20 20 0 0 0 20 0 L50 0" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    // `
    // `<svg class="down-right" width="20" viewBox="0 0 47 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
    //   <path d="M29.5417 3.75L39.3334 13.5417L29.5417 23.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    //   <path d="M8 -8L8 5.70833C8 7.78586 8.8253 9.7783 10.2943 11.2473C11.7634 12.7164 13.7558 13.5417 15.8333 13.5417L39.3333 13.5417" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    // </svg>`,
  'right-down-right':
    `<div class="arrow right-down-right">
      <svg class="top" viewBox="-55 0 110 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
        <path d="
          M-40 0 
          L -20 0
          A 20 20 0 0 1 0 20 
          L 0 50" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <svg class="middle" viewBox="-55 -1 110 2" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: hidden" preserveAspectRatio="none">
        <line x1="0" y1="-1" x2="0" y2="1" stroke="black" stroke-width="6" stroke-linecap="flat" stroke-linejoin="round"/>
      </svg>
      <svg class="bottom" viewBox="-55 -30 110 30" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
        <path d="M30 22 L55 0 L30 -22" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M0 -40 L0 -20 A 20 20 0 0 0 20 0 L50 0" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>`
}


export const replaceSnippets = (text: string) => {
  return text.replace(snippetRegex, (match, p1, p2) => {
    return snippetList[p1] || match
  })
}
