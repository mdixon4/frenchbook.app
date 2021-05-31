<template>
  <div class="lily rendered-chord add-outline" :class="[ shape ]">
    <outlined-text :text="chord.renderedChord"></outlined-text>
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs } from 'vue'
import OutlinedText from './OutlinedText.vue'


const props = defineProps({
  chord: {
    type: Object
  }
})

const { chord } = toRefs(props)

const shape = computed(() => {
  if (chord.value.beats.length === 1) return 'small-square'
  if (chord.value.beats === '12' && chord.value.isSlashed) return 'left-triangle'
  if (chord.value.beats === '34' && chord.value.isSlashed) return 'right-triangle'
  if (chord.value.beats === '1234') return 'full-square'
  return 'rectangle'
})


</script>

<style>

.rendered-chord {
  font-family: 'LJC';
  font-size: calc(var(--chord-size) * 0.8);
  transform: scaleX(0.95) translateY(0.18em);
}
.rendered-chord.full-square {
  font-size: calc(var(--chord-size) * 1.3);
}
.lily .mod-digit {
  transform: translateY(-0.7em);
  font-size: 0.65em;
  /* margin: 0 -0.25em 0 -0.1em; */
}

.root {
  display: inline-block;
}
.modifier {
  display: inline-block;

}
.lily .mod-stack .mod-digit:first-child {
  transform: translateY(-0.7em);
  font-size: 0.65em;
}
.lily .mod-stack .mod-digit:not(:first-child) {
  transform: translateY(0.3em);
}

.lily .mod-stack {
  display: flex;
  flex-direction: column;
}

.lily .mod-stack .mod-sus {
  font-size: 0.65em;
}




.rendered-chord .outline {
  user-select: none;
  position: absolute;
  left: 0;
  z-index: -1;
}


.lily .bass-slash {
  margin-left: -0.1em;
}
.left-triangle .lily .bass-slash {
  top: .6em;
  left: 0.2em;
}
.left-triangle .lily .bass {
  top: 1.35em;
  font-size: 0.9em;
}
.lily .mod-triangle {
  font-size: 0.8em;
}

.rendered-chord {
  /* font-family: 'Reprise Chords'; */
  line-height: 0.1;
  display: inline-block;
  position: relative;
  /* font-size: calc(var(--chord-size) * 1.2); */
  margin: 0 auto;
  /* transform: translateY(0.1em); */
}

.full-square {
  /* font-size: calc(var(--chord-size) * 1.9); */
}





.bass {
  display: inline-block;
  transform: translateY(0.2em);
  font-size: 0.8em;
  margin-left: -0.15em;
}

.bass-slash {
  display: inline-block;
  transform: scale(0.8) translateY(0.05em);
  margin-left: -0.1em;
}

.mod-digit {
  display: inline-block;
  /* transform: scale(1.3) translateY(0.05em); */
}

.mod-symbol {
  display: inline-block;
  /* transform: scale(0.8) translateY(-0.15em); */
}

.mod-triangle {
  /* margin: 0 -0.08em; */
}

.mod-plus {
  transform: translateY(-0.3em);
  margin: 0 -0.1em 0 0;
}

.left-triangle .bass-slash {
  position: absolute;
  left: 0.4em;
  top: 0.45em;
  transform: scale(1) rotate(63deg);
  margin: 0;
}
.left-triangle .bass {
  position: absolute;
  left: 0.1em;
  top: 1.1em;
  margin: 0;
}
.left-triangle {
  height: 1.2em;
}

.right-triangle .bass-slash {
  position: absolute;
  left: 0;
  top: 0;
  transform: scale(1) rotate(63deg) translateY(-0.3em) translateX(0.7em);
}
.right-triangle .bass {
  position: absolute;
  right: 0;
  top: 1em;
}
.right-triangle .rendered-chord {
  height: 1.1em;
}
</style>

