<template>
  <div class="span" :style="{
    '--start': span.start,
    '--end': span.end,
  }" :class="{
    'align-start': span.align === 'start',
    'align-end': span.align === 'end',
    'align-middle': span.align === 'center'
  }">
    <span class="span-start"></span>
    <span class="span-text">{{ span.text }}</span>
    <div class="span-end"></div>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: Object
    }
  }
}
</script>

<style>

  .exterior.top .span,
  .exterior.bottom .span {
    grid-column-start: var(--start);
    grid-column-end: calc(var(--end) + 1);
    display: flex;
    flex-direction: row;
  }

  .exterior.left .span,
  .exterior.right .span {
    grid-row-start: var(--start);
    grid-row-end: calc(var(--end) + 1);
    display: flex;
    flex-direction: column;
  }

  .exterior.top .span,
  .exterior.left .span {
    align-items: flex-end;
  }

  .exterior .span-text {
    font-family: 'EB Garamond';
    line-height: 1;
  }


  .span-start, .span-end {
    border: calc(var(--stroke-width)/2) dashed var(--gridline-color);
  }

  .exterior .span.align-middle .span-start,
  .exterior .span.align-middle .span-end {
    flex-grow: 1;
  }
  .exterior .span.align-start .span-end {
    flex-grow: 1;
  }
  .exterior .span.align-end .span-start {
    flex-grow: 1;
  }

  .exterior.top {
    text-align: center;
    margin-bottom: calc(2 * var(--stroke-width));
  }
  .exterior.left {
    text-align: right;
    margin-right: calc(2 * var(--stroke-width));
  }
  .exterior.right {
    text-align: left;
    margin-left: calc(2 * var(--stroke-width));
  }
  .exterior.bottom {
    text-align: center;
    margin-top: calc(2 * var(--stroke-width));
  }


  .exterior.top .span-start {
    border-right: 0;
    border-bottom: 0;
    align-self: flex-end;
    height: 0.3em;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
    min-width: 0.5ch;
  }

  .exterior.top .span-end {
    border-left: 0;
    border-bottom: 0;
    align-self: flex-end;
    height: 0.3em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
  }

  .exterior.left .span-start {
    border-bottom: 0;
    border-right: 0;
    align-self: flex-end;
    width: 1ch;

    min-height: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.left .span-end {
    border-top: 0;
    border-right: 0;
    align-self: flex-end;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-right: 0.5ch;
    margin-bottom: 0.5ch;
  }
  .exterior.right .span-start {
    border-bottom: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;
    
    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.right .span-end {
    border-top: 0;
    border-left: 0;
    align-self: flex-start;
    width: 1ch;

    min-height: 0.5ch;
    margin-left: 0.5ch;
    margin-bottom: 0.5ch;
  }
  .exterior.bottom .span-start {
    border-right: 0;
    border-top: 0;
    align-self: flex-start;
    height: 0.5em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
  }
  .exterior.bottom .span-end {
    border-left: 0;
    border-top: 0;
    align-self: flex-start;
    height: 0.5em;
    min-width: 0.5ch;
    margin-left: 0.5ch;
    margin-right: 0.5ch;
    margin-top: 0.5ch;
  }

    
</style>