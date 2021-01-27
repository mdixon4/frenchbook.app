<template>
  <div class="line">
    <fr-bar v-for="bar in line.bars" :key="bar.id" :barData="bar"></fr-bar>
  </div>
</template>

<script>
import FrBar from './bar'

export default {
  components: { FrBar },
  data () {
    return {
      line: {
        bars: [
          {
            id: 1,
            chords: [
              {
                beats: '12',
                chord: 'C,7',
                isStop: false
              },
              {
                beats: '34',
                chord: 'Dm7b5',
                isStop: true
              }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  html, body {
    background: white;
    color: black;
    font-family: 'Inkpen2 Chords Std';
    font-size: 16px;
    padding: 10px;
  }

  .line {
    display: flex;
    border: 1px solid black;
  }
  .bar {
    width: 10rem;
    height: 10rem;
    // border: 2px solid black;
    position: relative;
    flex-shrink: 0;
  }

</style>