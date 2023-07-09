import type { App } from 'vue/dist/vue'

export default {
  install(app: App<Element>): void {
    /*    START::Math -> Range    */
    Number.prototype.range = function (min = 0, max = 0): number {
      if (min > Number(this))
        return min
      if (max < Number(this))
        return max

      return Number(this)
    }

    /*    END::Math -> Range    */

    /*    START::Math -> Round    */
    Number.prototype.round = function (place = 0): number {
      return +(`${Math.round(Number(`${Number(this)}e+${place}`))}e-${place}`)
    }

    /*    END::Math -> Round    */

    /*    START::String -> Capitalize    */
    String.prototype.capitalize = function (): string {
      if (this.length === 0 || /^[A-Z]/.test(this.toString()))
        return this.toString()

      return this.charAt(0).toUpperCase() + this.slice(1)
    }
    /*    END::String -> Capitalize    */
  },
}
