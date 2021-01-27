<template>
  <div class="beat" :class='`b${beats}`'>
    <div class="chord" ref="chord">
      <div class="chord-text">
        <span class="root">G#</span>
        <!-- <span class="quality">Í, í</span> -->
      </div>
      <div class="shape"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beat',
  props: [
    'beats',
    'chord',
    'isStop'
  ],
  data () {
    return {
      canvas: null,
      ctx: null
    }
  },
  computed: {
    shape () {
      return null
    }
  },
  mounted () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.scaleToFit(this.$refs.chord, this.$refs.chord.parentElement, this.beats === '34')
    delete this.canvas
  },
  methods: {
    scaleToFit (el, parentEl, fromBottom) {
      
      console.log(el)
      // el.style.transform='scale(1)'
      
      let style = getComputedStyle(el)

      this.ctx.font = `${style.fontSize} / ${style.fontSize} ${style.fontFamily}`
      let text = el.textContent
      let metrics = this.ctx.measureText(text)

      let totalConsideredHeight = fromBottom ? metrics.actualBoundingBoxDescent + metrics.actualBoundingBoxAscent : metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
      let verticalShift = fromBottom ? metrics.actualBoundingBoxDescent * -1 : metrics.actualBoundingBoxAscent - 80
      let scaleFactor = parentEl.clientWidth / (metrics.width + totalConsideredHeight)

      console.log({
        text, parentEl, ctx: this.ctx, metrics,
        totalConsideredHeight,
        verticalShift,
        scaleFactor
      })
      
      el.style.transform=`translateY(${verticalShift}px) scale(${scaleFactor})`
      el.style.transformOrigin = fromBottom ? `${80}px ${80 - verticalShift}px` : '0px 0px'
      
      // let width = el.getBoundingClientRect().width
      // let maxWidth = parentEl.getBoundingClientRect().width
      // let scale = Math.min(1, maxWidth/width)
      // el.style.transform=`scaleX(${scale})`
    },
    scaleToFitRightTriangle (el, chordsEl) {
      console.log({ el, chordsEl })
      // console.log(el, chordsEl)
      // let chordsRect = chordsEl.getBoundingClientRect()
      // let minXPlusY = chordsRect.top + chordsRect.right
      // minXPlusY = chordsRect.width
      // el.style.transform='scaleX(1)'
      // let rect = el.getBoundingClientRect()
      // console.log(chordsRect, rect)
      // if (rect.width + (rect.height * 3) > minXPlusY) {
      //   let difference = (rect.width + rect.height * 3) - minXPlusY
      //   let scale = 1 - (difference / rect.width)
      //   el.style.transform = `scale(${scale})`
      //   el.style.transformOrigin = 'right'
      // }
    }
  }

}
</script>

<style lang="scss">
  .beat {
    position: absolute;
    inset: 0;
    display: flex;
  }
  .b12 {
    .chord {
      transform-origin: 0 0;
    }
  }
  .b34 {
    align-content: flex-end;
    .chord {
      transform-origin: 100% 100%;
    }
  }


  .b1234 {
    // font-size: 100px;
  }
  .b1 {
    width: 50%;
    height: 50%;
    left: 0;
    top: 0;
  }
  .b2 {
    width: 50%;
    height: 50%;
    right: 0;
    top: 0;
  }
  .b3 {
    width: 50%;
    height: 50%;
    left: 0;
    bottom: 0;
  }
  .b4 {
    width: 50%;
    height: 50%;
    right: 0;
    bottom: 0;
    justify-content: center;
  }
  .b12 {
    // width: 100%;
    // height: 100%;
    // left: 0;
    // top: 0;
    // background: #58FA;
    // position: relative;
  }
  .b34 {
    // width: 100%;
    // height: 50%;
    // left: 0;
    // bottom: 0;
  }
  .b123 {
    width: 100%;
    height: 50%;
    left: 0;
    top: 0;
  }
  .b234 {
    width: 100%;
    height: 50%;
    bottom: 0;
  }


  .slash .b12,
  .b123 {
    justify-content: flex-start;
    align-items: flex-start;
    height: 50%;
    .chord {
      flex-basis: 50%;
      flex-shrink: 0;
    }
  }
  .slash .b34,
  .b234 {
    justify-content: flex-end;
    align-items: flex-end;
    .chord {
      text-align: right;
      flex-basis: 50%;
      flex-shrink: 0;
    }
  }

  .chord {
    display: inline;
    vertical-align: bottom;
    justify-content: center;
    font-size: 100px;
    // transform: translateY(52px);
    line-height: 100px;
    height: 80px;
    vertical-align: top;
    .quality {
      // font-size: 0.2em;
      // line-height: 0.2em;
    }
  }

  .chord-text {
    transform: translateY(2px);
  }


  .shape {
    // background: red;
  }
</style>