<template>
  <div class="beat" :class="[`b${beats}`, {
    'slash': isSlashed,
    'stop': isStop,
    'ditto': isDitto
   }]">
    <div class="chord-scaffold">
      <reprise-rendered-chord v-if="!isDitto" :shape="shape">{{ chord }}</reprise-rendered-chord>
      <div v-else class="ditto-symbol"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beat',
  props: [
    'beats',
    'chord',
    'isStop',
    'isSlashed',
  ],
  data () {
    return {
      canvas: null,
      ctx: null
    }
  },
  computed: {
    shape () {
      if (this.beats.length === 1) return 'smallSquare'
      if (this.beats === '12' && this.isSlashed) return 'leftTriangle'
      if (this.beats === '34' && this.isSlashed) return 'rightTriangle'
      if (this.beats === '1234') return 'fullSquare'
      return 'rectangle'
    },
    isDitto () {
      return this.beats === '1234' && this.chord === '-'
    }
  },
  mounted () {
  },
  methods: {
  },

}
</script>

<style>
.ditto-symbol {
  font-family: 'musejazz';
  font-size: 2.2rem;
  line-height: 5rem;
  
}

.beat {
  position: absolute;
  inset: 0;
  display: flex;
}



.chord-scaffold {
  grid-area: content;
  display: grid;
  grid-template-areas: 
    '. .       .'
    '. content .'
    '. .       .';
  grid-template-columns: 1fr minmax(8fr, max-content) 1fr;
  grid-template-rows: 1fr minmax(8fr, max-content) 1fr;
}

:root {
  --chord-size: 25px;
}

rendered-chord, reprise-rendered-chord {
  white-space: nowrap;
  height: 100%;
  /* background: #4F9A; */
  display: flex;
  align-items: center;
  text-shadow: white 1px 1px, white -1px -1px, white 1px -1px, white -1px 1px;
  /* outline: 1px dashed blue; */
  grid-area: content;
}
.stop rendered-chord, .stop reprise-rendered-chord {
  text-shadow: var(--stop-color) 1px 1px, var(--stop-color) -1px -1px;
}


.b1234 {
  display: flex;
  justify-content: center;
}

.b1 .chord-scaffold {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 0;
  top: 0;
}
.b2 .chord-scaffold {
  position: absolute;
  width: 50%;
  height: 50%;
  right: 0;
  top: 0;
}
.b3 .chord-scaffold {
  position: absolute;
  width: 50%;
  height: 50%;
  left: 0;
  bottom: 0;
}
.b4 .chord-scaffold {
  position: absolute;
  width: 50%;
  height: 50%;
  right: 0;
  bottom: 0;
}
.b12 {
  /* background: #58FA; */
}
.b34 {
  /* background: #97DA; */
}
.b12.slash {
  display: grid;
  grid-template-columns: 1fr minmax(50%, max-content) 11fr;
  grid-template-rows: 1fr minmax(50%, max-content) 31fr;
  grid-template-areas:
    ". .       ."
    ". content ."
    ". .       .";
  align-items: stretch;
  justify-items: center;
}

.b34:not(.slash) {
  width: 100%;
  height: 50%;
  top: 50%;
  display: flex;
  justify-content: center;
}
.b12:not(.slash) {
  width: 100%;
  height: 50%;
  top: 0;
  display: flex;
  justify-content: center;
}
.b34.slash {
  display: grid;
  grid-template-columns: 11fr minmax(50%, max-content) 1fr;
  grid-template-rows: 11fr minmax(50%, max-content) 1fr;
  grid-template-areas:
    ". .        ."
    ". content  ."
    ". .        .";
  align-items: stretch;
  justify-items: center;
}
.b12.slash > .chord-scaffold {
  justify-items: start;
  align-items: start;
  /* background: #58FA; */
}
.b34.slash > .chord-scaffold {
  /* background: #DF6A; */
  justify-items: end;
  align-items: end;
}





/* .b123 {
  width: 100%;
  height: 50%;
  top: 0;
}
  .b234 {
    width: 100%;
    height: 50%;
    bottom: 0;
  } */

</style>