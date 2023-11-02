import type { App } from 'vue'
import type { UnwrapRef } from 'vue/dist/vue'

export default {
  install(app: App<Element>): void {
    /*    START::Filters    */
    app.config.globalProperties.$filters = {
      priceFormat(value: string | number): string {
        const formater = new Intl.NumberFormat('pl-pl', { style: 'currency', currency: 'PLN' })

        return formater.format(Number(value))
      },

      truncate(value: string, max = 50, clamp = '…'): string {
        if (!value)
          return ''

        const STR = value.toString()
        const LENGTH = STR.length

        if (LENGTH < max) return STR

        const VALUE = STR.slice(0, max).trim()

        return `${VALUE}${clamp}`
      },

      island(value: string, max = 50, clamp = '…'): string {
        if (!value)
          return ''

        const STR = value.toString()
        const LENGTH = STR.length
        const MID = Math.floor(LENGTH / 2)

        if (LENGTH < max) return STR

        const START = STR.slice(0, MID - max / 2).trim()
        const END = STR.slice(MID + max / 2).trim()

        return `${START}${clamp}${END}`
      },
    }

    /*    END::Filters    */

    /*    START::Scroll    */
    app.config.globalProperties.$scroll = {
      binary: (reverse = true): number => {
        const SCROLL = Math.max(window.scrollY, 0)

        const LEVEL = !reverse ? scroll : 1 - SCROLL

        return LEVEL.range(0, 1)
      },

      breakPoint: (point: number, reverse = true): number => {
        const SCROLL = Math.max(window.scrollY, 0)

        const LEVEL = !reverse ? (SCROLL / point) : (1 - SCROLL / point)

        return LEVEL.range(0, 1)
      },

      getLevelOf: (element: UnwrapRef<null>): number => {
        if (!element)
          return 0

        const WINDOW_HEIGHT = window.innerHeight
        const ELEMENT_TOP = element.offsetTop
        const SCROLL_POSITION = window.scrollY

        let scrollLevel = (SCROLL_POSITION + WINDOW_HEIGHT - ELEMENT_TOP) / WINDOW_HEIGHT

        scrollLevel = Math.max(0, Math.min(1, scrollLevel)).round(1)

        return Number(scrollLevel).round(2)
      },
    }

    /*    END::Scroll    */

    /*    START::Generators    */
    app.config.globalProperties.$gen = {

    }
    /*    END::Generators    */
  },
}
