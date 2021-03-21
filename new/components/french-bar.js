import { makeSvg } from './bar-division.js'

class FrenchBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="french-bar">
      ${ makeSvg({
        stopOn1: true,
        stopOn2: true,
        stopOn3: false,
        stopOn4: false,
        isSlashed: true,
        blocks: '╱'
      }) }
    </div>
    <slot></slot>`
  }
}

customElements.define('french-bar', FrenchBar)