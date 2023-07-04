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
import prototypes from './utils/prototypes'
import properties from './utils/properties'
import defaults from './utils/defaults'

/*    END::Utils    */

/*    START::Mixins    */
import breakpointsMixin from '@/mixins/breakpoints'

/*    END::Mixins    */

await loadFonts()

// Create vue app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(layoutsPlugin)
app.use(vuetify)
app.use(router)
app.use(i18n)
app.use(defaults)

app.use(properties)
app.use(prototypes)

app.mixin(breakpointsMixin)

// Mount vue app
app.mount('#app')
