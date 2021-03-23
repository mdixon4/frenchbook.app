<template>
  <div class="bar">
    <svg class="shading" viewBox="0 0 100 100">
      <g class="stops" fill="var(--stop-color)">
        <rect v-if="stopOn(1) && !isSlashed" x="0" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(2) && !isSlashed" x="50" y="0" width="50" height="50"></rect>
        <rect v-if="stopOn(3) && !isSlashed" x="0" y="50" width="50" height="50"></rect>
        <rect v-if="stopOn(4) && !isSlashed" x="50" y="50" width="50" height="50"></rect>
        <path v-if="stopOn(1) && stopOn(2) && isSlashed" d="M 0 0 100 0 0 100 0 0"></path>
        <path v-if="stopOn(3) && stopOn(4) && isSlashed" d="M 100 0 100 100 0 100 100 0"></path>
      </g>
      <g class="borders" fill="transparent" stroke="var(--gridline-color)" stroke-width="2px">
        <path d="M 0 0 100 0 100 100 0 100 0 0"></path>
        <path v-if="blocks==='╱'" d="M 100 0, 0 100"></path>
        <path v-if="blocks==='┘'" d="M 50 0, 50 50, 0 50"></path>
        <path v-if="blocks==='┴'" d="M 50 0, 50 50 M 0 50, 100 50"></path>
        <path v-if="blocks==='┼'" d="M 50 0 50 100 M 0 50 100 50"></path>
        <path v-if="blocks==='┬'" d="M 0 50 100 50 M 50 50 50 100"></path>
        <path v-if="blocks==='┌'" d="M 100 50 50 50 50 100"></path>
      </g>
    </svg>
    <div class="chords" :class="{ slash: isSlashed }">
      <frenchy-beat :key="chord.beats" v-for="chord in chords" :beats="chord.beats" :chord="chord.chord" :isStop="chord.isStop" :isSlashed="isSlashed"></frenchy-beat>
    </div>
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

  .bar > .chords {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
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