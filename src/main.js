import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { router } from './router'

import './frenchbook.css'

const app = createApp(App)
const pinia = createPinia()
const head = createHead()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(head)
app.use(router)
app.mount('#apphost')

