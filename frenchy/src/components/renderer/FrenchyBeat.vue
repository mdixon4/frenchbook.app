<template>
  <div class="beat" :class="[`b${beats}`, {
    'slash': isSlashed,
    'stop': isStop,
    'ditto': isDitto
   }]">
    <div class="chord-scaffold">
      <frenchy-chord v-if="!isDitto" :chord="chord"></frenchy-chord>
      <div v-else class="ditto-symbol">
        <svg width="15%" viewBox="0 -10 62 46" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <path d="M15.4 14.472C16.744 15.432 17.416 16.008 17.992 16.008C18.664 16.008 19.24 15.336 20.392 14.088C21.256 13.224 22.792 12.648 22.504 11.208C22.504 9.768 21.928 8.712 20.296 6.696C18.952 5.064 17.896 4.2 16.84 4.2C15.784 4.2 14.824 4.872 13.48 6.216C13.192 6.6 12.808 6.888 12.52 7.272C11.848 8.04 11.464 8.808 11.464 9.672C11.464 10.344 11.752 11.016 12.616 11.784C13.576 12.552 14.344 13.704 15.4 14.472ZM6.088 43.272C8.392 42.024 10.888 41.16 13.096 40.008C27.4 32.232 41.896 24.84 56.392 17.544C58.024 16.776 58.6 15.528 58.504 13.416C58.024 11.688 58.024 9.288 56.2 7.56C55.72 7.08 55.336 6.792 54.856 6.792C54.568 6.792 54.28 6.888 53.896 7.08L29.128 19.752C20.392 24.168 11.944 29.256 2.728 32.904C1.672 33.384 1 34.056 1 35.208C1 35.592 1 35.976 1.192 36.456C1.96 38.664 3.496 40.584 4.456 42.696C4.648 43.08 4.936 43.464 5.416 43.464C5.608 43.464 5.8 43.368 6.088 43.272ZM52.264 45C52.936 45 56.296 39.912 56.296 38.568C55.816 36.456 54.28 34.344 52.264 32.712C51.688 32.136 51.016 31.848 50.44 31.848C49.864 31.848 49.192 32.232 48.712 33.288C48.232 34.44 47.176 35.208 46.504 36.168C46.024 36.744 45.832 37.32 45.832 37.896C45.832 38.472 46.024 39.048 46.504 39.72C47.848 41.544 49.768 42.792 51.112 44.52C51.4 44.808 51.88 45 52.264 45Z" fill="currentColor"/>
        </svg>
        <!-- <svg width="25%" height="25%" viewBox="0 0 69 74" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.1538 8.62848C12.0897 8.62848 9.73077 9.50594 8.69872 11.1146L6.92949 13.8933C6.78205 14.0395 6.63462 14.1858 6.63462 14.332V14.4783L4.86538 18.2806C4.86538 18.4269 4.71795 18.5731 4.71795 18.5731V18.7194V18.8656L3.6859 22.8142C3.53846 23.253 3.53846 23.6917 3.6859 24.2767C4.57051 27.7866 4.86538 27.2016 7.37179 28.079L8.84615 28.5178C10.3205 28.9565 11.9423 29.249 13.5641 29.249C15.3333 29.249 17.3974 28.3715 18.2821 27.0553L20.0513 24.2767C20.1987 24.1304 20.1987 23.8379 20.1987 23.8379V23.6917L20.3462 23.5455L21.9679 19.0119V18.8656L22.7051 15.9407C22.8526 15.6482 22.8526 15.2095 22.7051 14.7707C22.4103 13.3083 21.6731 12.1383 20.641 11.2609L19.609 10.3834C17.6923 8.77472 17.8397 8.62848 16.8077 8.62848H14.1538ZM51.1603 41.9723C49.2436 42.2648 47.1795 43.2885 46.2949 44.751L44.5256 47.5296C44.3782 47.6759 44.2308 47.8221 44.2308 47.9684L42.4615 51.917C42.4615 52.0633 42.3141 52.2095 42.3141 52.2095V52.3557L41.282 56.3044C41.1346 56.8893 41.1346 57.4743 41.4295 58.0593C43.0513 61.5692 42.4615 60.8379 45.4103 61.8617H45.5577L47.032 62.3004C48.0641 62.7391 49.2436 62.8854 50.5705 62.8854C51.1603 62.8854 51.8974 62.8854 52.4872 62.7391C54.6987 62.3004 57.0577 61.1304 58.2372 59.3755L60.0064 56.5968C60.1538 56.3044 60.3013 56.3044 60.3013 56.1581C60.3013 56.1581 60.3013 56.0119 60.4487 55.8656V55.7194L62.0705 51.1858V51.0395L62.8077 48.1146C62.9551 47.3834 62.9551 46.6522 62.6603 45.921C62.3654 45.1897 61.9231 44.4585 61.3333 44.0198H61.1859L60.1538 43.1423C59.1218 42.1186 58.2372 41.5336 55.8782 41.5336C54.6987 41.5336 53.2244 41.6799 51.1603 41.9723ZM68.2628 3.80237L69 0.877469L67.9679 0C44.6731 18.1344 23.1474 38.6087 4.57051 62.8854L2.80128 65.6641L1.03205 69.6127L0 73.415L1.47436 74C20.0513 49.7233 41.5769 29.249 64.8718 11.1146L66.641 8.33596L68.2628 3.80237Z" fill="currentColor"/>
        </svg> -->
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
.beat.stop {
  /* --text-outline-color: var(--stop-color); */
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

.ditto-symbol {
  color: inherit;
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