<template>
  <div class="beat" :class="[`b${beats}`, {
    'slash': isSlashed,
    'ditto': isDitto
   }]">
    <div class="chord-scaffold">
      <frenchy-chord v-if="!isDitto" :chord="chord" :shape="shape"></frenchy-chord>
      <div v-else class="ditto-symbol">
        <svg width="15%" viewBox="0 -10 62 46" fill="none" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          <path d="M15.4 14.472C16.744 15.432 17.416 16.008 17.992 16.008C18.664 16.008 19.24 15.336 20.392 14.088C21.256 13.224 22.792 12.648 22.504 11.208C22.504 9.768 21.928 8.712 20.296 6.696C18.952 5.064 17.896 4.2 16.84 4.2C15.784 4.2 14.824 4.872 13.48 6.216C13.192 6.6 12.808 6.888 12.52 7.272C11.848 8.04 11.464 8.808 11.464 9.672C11.464 10.344 11.752 11.016 12.616 11.784C13.576 12.552 14.344 13.704 15.4 14.472ZM6.088 43.272C8.392 42.024 10.888 41.16 13.096 40.008C27.4 32.232 41.896 24.84 56.392 17.544C58.024 16.776 58.6 15.528 58.504 13.416C58.024 11.688 58.024 9.288 56.2 7.56C55.72 7.08 55.336 6.792 54.856 6.792C54.568 6.792 54.28 6.888 53.896 7.08L29.128 19.752C20.392 24.168 11.944 29.256 2.728 32.904C1.672 33.384 1 34.056 1 35.208C1 35.592 1 35.976 1.192 36.456C1.96 38.664 3.496 40.584 4.456 42.696C4.648 43.08 4.936 43.464 5.416 43.464C5.608 43.464 5.8 43.368 6.088 43.272ZM52.264 45C52.936 45 56.296 39.912 56.296 38.568C55.816 36.456 54.28 34.344 52.264 32.712C51.688 32.136 51.016 31.848 50.44 31.848C49.864 31.848 49.192 32.232 48.712 33.288C48.232 34.44 47.176 35.208 46.504 36.168C46.024 36.744 45.832 37.32 45.832 37.896C45.832 38.472 46.024 39.048 46.504 39.72C47.848 41.544 49.768 42.792 51.112 44.52C51.4 44.808 51.88 45 52.264 45Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import FrenchyChord from './FrenchyChord.vue'

const props = defineProps({
  beats: {
    type: String,
    required: true,
  },
  chord: {
    type: Object,
    required: true
  },
  isSlashed: {
    type: Boolean,
    required: true
  }
})

const shape = computed(() => {
  if (props.beats.length === 1) return 'small-square'
  if (props.beats === '12' && props.isSlashed) return 'left-triangle'
  if (props.beats === '34' && props.isSlashed) return 'right-triangle'
  if (props.beats === '1234') return 'full-square'
  return 'rectangle'
})

const isDitto = computed(() => props.beats === '1234' && props.chord.isDitto)

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