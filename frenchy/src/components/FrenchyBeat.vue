<template>
  <div class="beat" :class="[`b${beats}`, {
    'slash': isSlashed,
    'stop': isStop,
    'ditto': isDitto
   }]">
    <div class="chord-scaffold">
      <frenchy-chord v-if="!isDitto" :chord="chord"></frenchy-chord>
      <div v-else class="ditto-symbol">
        <svg width="25%" height="25%" viewBox="0 0 69 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1538 8.62848C12.0897 8.62848 9.73077 9.50594 8.69872 11.1146L6.92949 13.8933C6.78205 14.0395 6.63462 14.1858 6.63462 14.332V14.4783L4.86538 18.2806C4.86538 18.4269 4.71795 18.5731 4.71795 18.5731V18.7194V18.8656L3.6859 22.8142C3.53846 23.253 3.53846 23.6917 3.6859 24.2767C4.57051 27.7866 4.86538 27.2016 7.37179 28.079L8.84615 28.5178C10.3205 28.9565 11.9423 29.249 13.5641 29.249C15.3333 29.249 17.3974 28.3715 18.2821 27.0553L20.0513 24.2767C20.1987 24.1304 20.1987 23.8379 20.1987 23.8379V23.6917L20.3462 23.5455L21.9679 19.0119V18.8656L22.7051 15.9407C22.8526 15.6482 22.8526 15.2095 22.7051 14.7707C22.4103 13.3083 21.6731 12.1383 20.641 11.2609L19.609 10.3834C17.6923 8.77472 17.8397 8.62848 16.8077 8.62848H14.1538ZM51.1603 41.9723C49.2436 42.2648 47.1795 43.2885 46.2949 44.751L44.5256 47.5296C44.3782 47.6759 44.2308 47.8221 44.2308 47.9684L42.4615 51.917C42.4615 52.0633 42.3141 52.2095 42.3141 52.2095V52.3557L41.282 56.3044C41.1346 56.8893 41.1346 57.4743 41.4295 58.0593C43.0513 61.5692 42.4615 60.8379 45.4103 61.8617H45.5577L47.032 62.3004C48.0641 62.7391 49.2436 62.8854 50.5705 62.8854C51.1603 62.8854 51.8974 62.8854 52.4872 62.7391C54.6987 62.3004 57.0577 61.1304 58.2372 59.3755L60.0064 56.5968C60.1538 56.3044 60.3013 56.3044 60.3013 56.1581C60.3013 56.1581 60.3013 56.0119 60.4487 55.8656V55.7194L62.0705 51.1858V51.0395L62.8077 48.1146C62.9551 47.3834 62.9551 46.6522 62.6603 45.921C62.3654 45.1897 61.9231 44.4585 61.3333 44.0198H61.1859L60.1538 43.1423C59.1218 42.1186 58.2372 41.5336 55.8782 41.5336C54.6987 41.5336 53.2244 41.6799 51.1603 41.9723ZM68.2628 3.80237L69 0.877469L67.9679 0C44.6731 18.1344 23.1474 38.6087 4.57051 62.8854L2.80128 65.6641L1.03205 69.6127L0 73.415L1.47436 74C20.0513 49.7233 41.5769 29.249 64.8718 11.1146L66.641 8.33596L68.2628 3.80237Z" fill="black"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import FrenchyChord from './FrenchyChord.vue'

export default {
  name: 'Beat',
  components: {
    FrenchyChord
  },
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
      return this.beats === '1234' && this.chord.isDitto
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
  display: flex;
  align-items: center;
  justify-content: center;
  grid-row: 1 / -1;
  
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

.rendered-chord {
  white-space: nowrap;
  height: 100%;
  /* background: #4F9A; */
  display: flex;
  align-items: center;
  /* outline: 1px dashed blue; */
  grid-area: content;
}
.stop .rendered-chord {
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





.b123 {
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
.b234 {
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

</style>