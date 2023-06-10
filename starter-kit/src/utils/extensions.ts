import type { App } from 'vue/dist/vue'

export default {
  install(app: App<Element>): void {
    /*    START::Math -> Round    */
    Number.prototype.round = function (place = 0): number {
      return +(`${Math.round(`${this}e+${place}`)}e-${place}`)
    }

    /*    END::Math -> Round    */
  },
}
