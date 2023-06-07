/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import i18n from '@/plugins/i18n'

loadFonts()

// Create vue app
const app = createApp(App)

// Filters
app.config.globalProperties.$filters = {
  truncate(value: string, length = 50, clamp = '...'): string {
    if (!value)
      return ''

    const _value = value.toString()

    return _value.length > length ? _value.slice(0, length) + clamp : _value
  },
}

// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)

// Mount vue app
app.mount('#app')
