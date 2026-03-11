<template>
  <header class="vertical" :class="totalPages > 1 ? 'with-page-number' : ''">
    <div class="title-bar">
      <div class="number">{{ metadata.number }}</div>
      <div class="title" v-html="metadata.title || '&nbsp;'"></div>
      <div class="page-number">Page {{ pageNumber }} of {{ totalPages }}</div>
      <div class="credits">{{ metadata.credits }}</div>
    </div>
    <div class="logo">
      <div class="shirazz-logo">
        <img :src="shirazzlogosvg" alt="Shirazz" />
      </div>
      <div class="french-book-logo">
        <img :src="frenchbooklogosvg" alt="frenchbook.app" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { defineProps } from 'vue'
import frenchbooklogosvg from '/src/assets/frenchbook-logo.svg'
import shirazzlogosvg from '/src/assets/shirazz-logo.svg'


defineProps({
  metadata: {
    type: Object,
    required: true
  },
  pageNumber: {
    type: Number,
    default: 1
  },
  totalPages: {
    type: Number,
    default: 1
  }
})


</script>

<style scoped>
header {
  height: var(--header-height);
  /* background: yellow; */
  width: var(--page-height);
  position: absolute;
  top: 0;
  left: calc(100%);
  transform-origin: top left;
  transform: rotate(90deg);
  justify-content: space-between;
}

.page-number {
  display: none;
}

.with-page-number .page-number {
  display: block;
  font-weight: bold;

  &::before {
    content: '(';
  }

  &::after {
    content: ')';
  }
}

.credits {
  height: 0.8em;
}

.title-bar {
  width: max-content;
  height: var(--title-bar-height);

  display: grid;
  grid-auto-columns: max-content;
  grid-auto-flow: column;
  column-gap: 3mm;
  align-items: baseline;
  align-content: start;
  padding: 1mm 3mm 1mm var(--top-page-margin);
  background: linear-gradient(to top right, rgb(219, 219, 219), rgb(243, 243, 243));
  border-radius: 2mm;
}

.logo {
  margin-right: var(--bottom-page-margin);
}

[data-template="frenchbook"] .french-book-logo {
  display: block;
}

.french-book-logo {
  width: 5rem;
  display: none;
}

[data-template="shirazz"] .shirazz-logo {
  display: block;
}

.shirazz-logo {
  width: 4rem;
  display: none;
}

/* 
.title-bar {
  display: grid;
  align-items: center;
  margin: 0 auto;
  padding: 0rem 0.2rem;
  line-height: 1;
  border-bottom: var(--thick-stroke-width) solid var(--gridline-color);
} */

.number {
  font-family: 'Open Sans Condensed';
  font-size: 1.5rem;
  line-height: 1.5rem;
  padding-top: 0mm;
}

.title-bar .title {
  font-family: var(--serif-font);
  text-align: center;
  font-size: 1.7rem;
  line-height: 1.5rem;
}
</style>