export const makeSvg = (divisionData) => `
  <svg class="shading" viewBox="0 0 100 100">
    <g class="stops" fill="silver">
      ${ (divisionData.stopOn1 && !divisionData.isSlashed)
        ? `<rect x="0" y="0" width="50" height="50"></rect>`
        : ''
      }
      ${ (divisionData.stopOn2 && !divisionData.isSlashed)
        ? `<rect x="50" y="0" width="50" height="50"></rect>`
        : ''
      }
      ${ (divisionData.stopOn3 && !divisionData.isSlashed)
        ? `<rect x="50" y="0" width="50" height="50"></rect>`
        : ''
      }
      ${ (divisionData.stopOn4 && !divisionData.isSlashed)
        ? `<rect x="50" y="50" width="50" height="50"></rect>`
        : ''
      }
      ${ (divisionData.stopOn1 && divisionData.stopOn2 && divisionData.isSlashed)
        ? `<path d="M 0 0 100 0 0 100 0 0"></path>`
        : ''
      }
      ${ (divisionData.stopOn3 && divisionData.stopOn4 && divisionData.isSlashed)
        ? `<path d="M 100 0 100 100 0 100 100 0"></path>`
        : ''
      }
    </g>
    <g class="borders" fill="transparent" stroke="black" stroke-width="2px">
      <path d="M 0 0 100 0 100 100 0 100 0 0"></path>
      ${ divisionData.blocks==='╱' ? `<path d="M 100 0, 0 100"></path>` : '' }
      ${ divisionData.blocks==='┘' ? `<path d="M 50 0, 50 50, 0 50"></path>` : '' }
      ${ divisionData.blocks==='┴' ? `<path d="M 50 0, 50 50 M 0 50, 100 50"></path>` : '' }
      ${ divisionData.blocks==='┼' ? `<path d="M 50 0 50 100 M 0 50 100 50"></path>` : '' }
      ${ divisionData.blocks==='┬' ? `<path d="M 0 50 100 50 M 50 50 50 100"></path>` : '' }
      ${ divisionData.blocks==='┌' ? `<path d="M 100 50 50 50 50 100"></path>` : '' }
    </g>
  </svg>
`
