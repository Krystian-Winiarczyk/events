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

/*    START::Utils    */
import extensions from './utils/extensions'
import properties from './utils/properties'

/*    END::Utils    */

/*    START::Mixins    */
import breakpointsMixin from '@/mixins/breakpoints'

/*    END::Mixins    */

await loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(vuetify)
app.use(extensions)
app.use(properties)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)

app.mixin(breakpointsMixin)

// Mount vue app
app.mount('#app')
