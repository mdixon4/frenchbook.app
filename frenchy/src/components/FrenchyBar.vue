<template>
  <div class="bar" :class="[
  {
    'is-topmost': barData.isTopmost,
    'is-rightmost': barData.isRightmost,
    'is-bottommost': barData.isBottommost,
    'is-leftmost': barData.isLeftmost,
    'is-ditto': isDitto,
    'has-bottom-annotation': hasBottomAnnotation,
    'has-top-annotation': hasTopAnnotation,
    'has-rhythm': hasRhythm,
    'is-slashed': isSlashed,
    'is-empty': isEmpty,
    'is-whole-bar-stop': isWholeBarStop,
    'has-left-double-barline': barData.leftBarline.includes('||'),
    'has-right-double-barline': barData.rightBarline.includes('||')
  }, ...barData.classes]">
    <svg class="shading" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g >
        <g class="borders-internal" fill="transparent">
          <path v-if="blocks==='╱'" vector-effect='non-scaling-stroke' d="M 100 0, 0 100"></path>
          <!-- <path v-if="blocks==='╱'" d="M 93 7, 7 93"></path> -->
          <path v-if="blocks==='┘'" vector-effect='non-scaling-stroke' d="M 50 0, 50 50, 0 50"></path>
          <path v-if="blocks==='┴'" vector-effect='non-scaling-stroke' d="M 50 0, 50 50 M 0 50, 100 50"></path>
          <path v-if="blocks==='┼'" vector-effect='non-scaling-stroke' d="M 50 0 50 100 M 0 50 100 50"></path>
          <path v-if="blocks==='┬'" vector-effect='non-scaling-stroke' d="M 0 50 100 50 M 50 50 50 100"></path>
          <path v-if="blocks==='┌'" vector-effect='non-scaling-stroke' d="M 100 50 50 50 50 100"></path>
        </g>
        <g class="borders" fill="transparent" vector-effect='non-scaling-stroke'>
          <!-- top -->
          <path class="top-barline crisp" d="M 0 0 100 0" vector-effect='non-scaling-stroke'></path>
          <!-- bottom -->
          <path class="bottom-barline crisp" d="M 0 100 100 100" vector-effect='non-scaling-stroke'></path>
          <!-- left -->
          <g class="left-barline-group">
            <path class="left-barline crisp" d="M 0 0 0 100" vector-effect='non-scaling-stroke'></path>
            <path v-if="barData.leftBarline.includes('(')" vector-effect='non-scaling-stroke' stroke="#F00" d="
              M 10 4
              C 5 6 3 12 3 20
              L 3 80
              C 3 88 5 94 10 96
            "></path>
            <g v-if="barData.leftBarline === '|:'">
              <circle cx="7" cy="40" r="2" fill="var(--gridline-color)"></circle>
              <circle cx="7" cy="60" r="2" fill="var(--gridline-color)"></circle>
            </g>
          </g>
          
          <!-- right -->
          <g class="right-barline-group">
            <path class="right-barline crisp" d="M 100 0 100 100" vector-effect='non-scaling-stroke'></path>
            <path v-if="barData.rightBarline.includes(')')" vector-effect='non-scaling-stroke' stroke="#F00" d="
              M 90 4
              C 95 6 97 12 97 20
              L 97 80
              C 97 88 95 94 90 96
            "></path>
            <g v-if="barData.rightBarline === ':|'">
              <circle cx="93" cy="40" r="2" fill="var(--gridline-color)"></circle>
              <circle cx="93" cy="60" r="2" fill="var(--gridline-color)"></circle>
            </g>
          </g>
        </g>
      </g>
    </svg>
    <div class="chords" :class="{ slash: isSlashed }">
      <frenchy-beat :key="chord.beats" v-for="chord in chords" :beats="chord.beats" :chord="chord" :isStop="chord.isStop" :isSlashed="isSlashed"></frenchy-beat>
    </div>
    <div v-for="annotation in barData.annotations" :key="annotation.text" class="annotation" :class="[ `annotation-${annotation.position}`, `annotation-${annotation.align}` ]" v-html="annotation.text"></div>
    <outlined-text class="rhythm" :text="barData.rhythm"></outlined-text>
    <svg class="stops" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g fill="var(--stop-color)">
        <rect v-if="stopOn(1) && !isSlashed" x="0" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(2) && !isSlashed" x="50" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(3) && !isSlashed" x="0" y="50" width="50" height="50"></rect>
        <rect v-if="stopOn(4) && !isSlashed" x="50" y="50" width="50" height="50"></rect>
        <path v-if="stopOn(1) && stopOn(2) && isSlashed" d="M 0 0 100 0 0 100 0 0"></path>
        <path v-if="stopOn(3) && stopOn(4) && isSlashed" d="M 100 0 100 100 0 100 100 0"></path>
      </g>
    </svg>
  </div>
</template>

<script>
import FrenchyBeat from './FrenchyBeat.vue'
import OutlinedText from './OutlinedText.vue'

export default {
  name: "FrBar",
  components: { 
    FrenchyBeat,
    OutlinedText
  },
  props: {
    barData: {
      type: Object
    }
  },
  computed: {
    isDitto () {
      return this.barData.chords.length === 1 && this.barData.chords[0].chord === '-'
    },
    chords () {
      return this.barData.chords
    },
    numChords () {
      return this.chords.length
    },
    isEmpty () {
      return this.barData.isEmpty
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
    hasBottomAnnotation () {
      return this.barData.annotations.some(a => a.position === 'bottom')
    },
    hasTopAnnotation () {
      return this.barData.annotations.some(a => a.position === 'top')
    },
    hasRhythm () {
      return this.barData.rhythm?.length
    },
    isWholeBarStop () {
      return (this.blocks === '' && this.stopOn(1))
    }

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


  g.borders path {
    stroke-width: var(--stroke-width);
    stroke: var(--gridline-color);
    stroke-linecap: square;
  }

  g.borders-internal path {
    stroke-width: var(--stroke-width);
    stroke: var(--gridline-color);
  }


  .shading, .stops {
    position: absolute;
    inset: 0;
    height: 100%;
    width: 100%;
    overflow: visible;
  }

  .bar > .chords {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bar.has-top-annotation > .chords {
    top: 10%;
  }
  .bar.has-bottom-annotation > .chords,
  .bar.has-rhythm > .chords {
    bottom: 10%;
    /* background: paleturquoise; */
  }
  .bar.is-slashed.has-rhythm > .chords {
    height: 78%;
  }

  .bar > .annotation {
    position: absolute;
    bottom: 0;
    line-height: 0.9;
    width: 100%;
    padding: 0.15em;
    text-align: center;
    font-family: var(--annotation-font);
    font-weight: 700;
    white-space: pre;
    /* font-style: italic; */
  }
  .bar > .annotation-top {
    top: 0;
  }
  .bar > .annotation-left {
    text-align: left;
  }
  .bar > .annotation-right {
    text-align: right;
  }

  .bar.is-empty {
    display: flex;
  }
  .bar.is-empty > .annotation {
    position: relative;
    align-self: center;
    bottom: 0;
  }

  .bar > .rhythm {
    font-size: var(--rhythm-font-size);
    position: absolute;
    white-space: pre;
    bottom: 0%;
    padding: 0.15em 0;
    line-height: 1;
    width: 100%;
    text-align: center;
    font-family: 'Rhythms';
    font-weight: normal;
    /* font-style: italic; */
  }


  .chords {
    z-index: 2;
  }
  .rhythm { 
    z-index: 1;
  }
  .annotation {
    z-index: 1;
  }
  .stops {
    z-index: 4;
    opacity: 0.5;
    mix-blend-mode: darken;
    pointer-events: none;
  }


  .is-leftmost .left-barline-group {
    transform: translateX(calc(0.5 * var(--stroke-width)));
  }
  .has-left-double-barline .left-barline-group {
    /* --gridline-color: red; */
    transform: translateX(calc(1.5 * var(--stroke-width)));
  }
  .is-leftmost.has-left-double-barline .left-barline-group {
    transform: translateX(calc(3.5 * var(--stroke-width)));
  }
  
  .is-rightmost .right-barline-group {
    transform: translateX(calc(-0.5 * var(--stroke-width)));
  }
  .has-right-double-barline .right-barline-group {
    /* --gridline-color: red; */
    transform: translateX(calc(-1.5 * var(--stroke-width)));
  }
  .is-rightmost.has-right-double-barline .right-barline-group {
    transform: translateX(calc(-3.5 * var(--stroke-width)));
  }

</style>