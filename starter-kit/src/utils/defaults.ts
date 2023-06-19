import type { App } from 'vue/dist/vue'
import flatpickr from 'flatpickr'
import { Polish } from "flatpickr/dist/l10n/pl"

export default {
  install(app: App<Element>): void {
    // Default Flatpicker config
    flatpickr.localize(Polish)
    flatpickr.defaultConfig = {
      time_24hr: true,
      altFormat: 'YYYY-mm-dd',
    }
  },
}
