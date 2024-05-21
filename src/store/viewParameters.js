import { defineStore } from 'pinia'
import { computed, watch } from 'vue'
import { useUrlSearchParams, useCssVar, syncRef } from '@vueuse/core'

const syncToCssVar = (cssVar, ref) => {
  watch(ref, (value) => {
    document.documentElement.style.setProperty(cssVar, value)
  }, { immediate: true })
}

const syncToDataSet = (key, ref) => {
  watch(ref, (value) => {
    if (value === undefined) {
      delete document.documentElement.dataset[key]
      return
    }
    document.documentElement.dataset[key] = value
  }, { immediate: true })
}

export const useViewParametersStore = defineStore('viewParameters', () => {
  const searchParams = useUrlSearchParams()
  const pageSize = computed(() => searchParams.pageSize || 'a4')
  const isIpad = computed(() => pageSize.value === 'ipad')
  const fit = computed(() => searchParams.fit || '')
  const template = computed(() => searchParams.template || 'frenchbook')

  const logoClass = computed(() =>
    template.value === 'shirazz' ? 'with-shirazz-logo' : 'with-french-book-logo'
  )
  const fitStrategy = computed(() => {
    return fit.value === 'width' ? 'FIT-WIDTH'
      : fit.value === 'height' ? 'FIT-HEIGHT'
        : fit.value === 'screen' ? 'FIT-SCREEN'
          : ''
  })

  syncToCssVar('--page-size', pageSize)
  syncToCssVar('--fit', fit)
  syncToCssVar('--template', template)
  syncToCssVar('--fit-strategy', fitStrategy)

  syncToDataSet('pageSize', pageSize)
  syncToDataSet('fit', fit)
  syncToDataSet('template', template)
  syncToDataSet('fitStrategy', fitStrategy)

  return {
    pageSize,
    isIpad,
    fit,
    template,
    logoClass,
    fitStrategy,
  }
})