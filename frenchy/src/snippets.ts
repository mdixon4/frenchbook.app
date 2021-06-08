const snippetRegex = /(^|\s)\\(\S+)/g

const snippetList: { [key: string]: string }= {
  'caesura': `<span class="smufl-symbol caesura">&#xE4D1;</span>`,
  'coda': `<span class="smufl-symbol coda" data-outline="&#xE049;">&#xE049;</span>`,
  'segno': `<span class="smufl-symbol segno" data-outline="&#xE04A;">&#xE04A;</span>`,
  'fermata': `<span class="smufl-symbol fermata">&#xE4C0;</span>`,
  'fermata-plain': `<span class="unicode-symbol fermata">&#x1d110;</span>`,
  'fermata-up': `<span class="smufl-symbol fermata-up">&#xE4C1;</span>`,
  'fermata-up-plain': `<span class="unicode-symbol fermata-up">&#x1d111;</span>`,
  // Arrows
  'right-down':
    `<svg class="right-down" width="20" viewBox="0 0 47 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M5 13H18.7083C20.7859 13 22.7783 13.8253 24.2473 15.2943C25.7164 16.7634 26.5417 18.7558 26.5417 20.8333V44.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M16.75 34.5417L26.5417 44.3334L36.3333 34.5417" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'left-down':
    `<svg class="left-down" width="20" viewBox="0 0 47 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M30.25 34.5417L20.4583 44.3334L10.6667 34.5417" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M42 13H28.2917C26.2141 13 24.2217 13.8253 22.7527 15.2943C21.2836 16.7634 20.4583 18.7558 20.4583 20.8333V44.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'down-right':
    `<svg class="down-right" width="20" viewBox="0 0 47 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible">
      <path d="M29.5417 3.75L39.3334 13.5417L29.5417 23.3333" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 -8L8 5.70833C8 7.78586 8.8253 9.7783 10.2943 11.2473C11.7634 12.7164 13.7558 13.5417 15.8333 13.5417L39.3333 13.5417" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
}


export const replaceSnippets = (text: string) => {
  return text.replace(snippetRegex, (match, p1, p2) => {
    return snippetList[p2] || match
  })
}
