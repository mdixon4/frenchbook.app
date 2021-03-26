<template>
  <div class="bar" :class="{
    'is-topmost': barData.isTopmost,
    'is-rightmost': barData.isRightmost,
    'is-bottommost': barData.isBottommost,
    'is-leftmost': barData.isLeftmost
  }">
    <svg class="shading" viewBox="0 0 100 100">
      <g class="stops" fill="var(--stop-color)">
        <rect v-if="stopOn(1) && !isSlashed" x="0" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(2) && !isSlashed" x="50" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(3) && !isSlashed" x="0" y="50" width="50" height="50"></rect>
        <rect v-if="stopOn(4) && !isSlashed" x="50" y="50" width="50" height="50"></rect>
        <path v-if="stopOn(1) && stopOn(2) && isSlashed" d="M 0 0 100 0 0 100 0 0"></path>
        <path v-if="stopOn(3) && stopOn(4) && isSlashed" d="M 100 0 100 100 0 100 100 0"></path>
      </g>
      <g class="borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="2">
        <path d="M 0 0 100 0 100 100 0 100 0 0"></path>
        <path v-if="blocks==='╱'" d="M 100 0, 0 100"></path>
        <path v-if="blocks==='┘'" d="M 50 0, 50 50, 0 50"></path>
        <path v-if="blocks==='┴'" d="M 50 0, 50 50 M 0 50, 100 50"></path>
        <path v-if="blocks==='┼'" d="M 50 0 50 100 M 0 50 100 50"></path>
        <path v-if="blocks==='┬'" d="M 0 50 100 50 M 50 50 50 100"></path>
        <path v-if="blocks==='┌'" d="M 100 50 50 50 50 100"></path>
      </g>
    </svg>
    <svg class="ext-borders" viewBox="0 0 100 100">
      <g class="extra-borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="6">
        <path v-if="barData.isTopmost" d="M 0 0 100 0"></path>
        <path v-if="barData.isRightmost" d="M 100 0 100 100"></path>
        <path v-if="barData.isBottommost" d="M 100 100 0 100"></path>
        <path v-if="barData.isLeftmost" d="M 0 100 0 0"></path>
      </g>
    </svg>
    <div class="chords" :class="{ slash: isSlashed }">
      <frenchy-beat :key="chord.beats" v-for="chord in chords" :beats="chord.beats" :chord="chord.chord" :isStop="chord.isStop" :isSlashed="isSlashed"></frenchy-beat>
    </div>
    <div class="to-coda" v-if="barData.annotation === 'to coda'">
      <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path></svg>
      <svg class="coda-symbol" width="24" height="32" viewBox="0 0 245 321" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M133 10.5C133 4.70101 128.299 0 122.5 0C116.701 0 112 4.70101 112 10.5V50.0988C78.104 57.2549 51.5368 98.5512 48.326 150H10.5C4.70101 150 0 154.701 0 160.5C0 166.299 4.70101 171 10.5 171H48.326C51.5368 222.449 78.104 263.745 112 270.901V310.5C112 316.299 116.701 321 122.5 321C128.299 321 133 316.299 133 310.5V270.901C166.896 263.745 193.463 222.449 196.674 171H234.5C240.299 171 245 166.299 245 160.5C245 154.701 240.299 150 234.5 150H196.674C193.463 98.5512 166.896 57.2549 133 50.0988V10.5ZM112 71.0436C97.8529 76.6923 87.16 93.4661 85.2909 114H85.0618C83.5282 125.255 82.5288 137.353 82.1598 150H112V71.0436ZM133 150V71.0436C147.147 76.6923 157.84 93.4661 159.709 114H159.938C161.472 125.255 162.471 137.353 162.84 150H133ZM112 171H82.1319C82.4667 183.635 83.4302 195.732 84.9273 207H85.2909C87.16 227.534 97.8529 244.308 112 249.956V171ZM133 249.956V171H162.868C162.533 183.635 161.57 195.732 160.073 207H159.709C157.84 227.534 147.147 244.308 133 249.956Z"/>
      </svg>
    </div>
    <div class="annotation" v-else>{{ barData.annotation }}</div>
  </div>
</template>

<script>
import FrenchyBeat from './FrenchyBeat.vue'

export default {
  name: "FrBar",
  components: { 
    FrenchyBeat
  },
  props: {
    barData: {
      type: Object
    }
  },
  computed: {
    chords () {
      return this.barData.chords
    },
    isSlashed () {
      return this.blocks === '╱'
    },
    blocks () {
      return {
        '1234': '',
        '12-34': '╱',
        '1-234': '┘',
        '1-2-34': '┴',
        '1-2-3-4': '┼',
        '12-3-4': '┬',
        '123-4': '┌'
      }[this.chords.map(c => c.beats).join('-')]
    },
  },
  methods: {
    stopOn(beatNum) {
      return this.chords.length && this.chords.find(c => c.beats.includes(beatNum)).isStop
    }
  },
  created () {

  }
}
</script>

<style>
  .shading {
    position: absolute;
  }
  .ext-borders {
    position: absolute;
    inset: -1px;
  }

  .bar > .chords {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bar > .annotation {
    font-size: 0.9em;
    position: absolute;
    bottom: 0.15em;
    width: 100%;
    text-align: center;
  }

  .bar.is-bottommost .to-coda {
    position: absolute;
    top: 100%;
    right: 0%;
  }

  .bar.is-bottommost .to-coda .coda-symbol {
    right: -0.755em;
    position: absolute;
    top: -2em;
    /* position: absolute;
    right: -50%; */
  }
/*
  .beat {
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 30px;
  }

  .bar > .chords {
    
  }

  .bar > .chords.slash {
    // background-image: linear-gradient(-45deg, white 0%, white calc(50% - 1px), black calc(50% - 1px), black calc(50% + 2px), white calc(50% + 2px));
  }
  .bar > .chords.slash > .onetwo,
  .bar > .chords > .onetwothree {
    display: flex;
    justify-content: flex-start;
  }
  .bar > .chords.slash > .threefour,
  .bar > .chords > .twothreefour {
    display: flex;
    justify-content: flex-end;
  }
  .bar > .chords.slash > .onetwo,
  .bar > .chords.slash > .threefour {
    border: 0;
  }
  .bar > .chords.slash > .onetwo > .chord,
  .bar > .chords.slash > .threefour > .chord,
  .bar > .chords > .onetwothree > .chord,
  .bar > .chords > .twothreefour > .chord {
    flex-basis: 50%;
    flex-shrink: 0;
    text-align: center;
  }
    
*/


</style>