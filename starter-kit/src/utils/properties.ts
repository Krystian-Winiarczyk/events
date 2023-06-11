import type { App } from 'vue'
import type { UnwrapRef } from 'vue/dist/vue'

export default {
  install(app: App<Element>): void {
    /*    START::Filters    */
    app.config.globalProperties.$filters = {
      truncate(value: string, length = 50, clamp = '...'): string {
        if (!value)
          return ''

        const _value = value.toString()

        return _value.length > length ? _value.slice(0, length) + clamp : _value
      },
    }

    /*    END::Filters    */

    /*    START::Scroll    */
    app.config.globalProperties.$scroll = {
      binary: (reverse = true): number => {
        const scroll = Math.max(window.scrollY, 0)

        const level = !reverse ? scroll : 1 - scroll

        return level.range(0, 1)
      },

      breakPoint: (point: number, reverse = true): number => {
        const scroll = Math.max(window.scrollY, 0)

        const level = !reverse ? (scroll / point) : (1 - scroll / point)

        return level.range(0, 1)
      },

      getLevelOf: (element: UnwrapRef<null>): number => {
        if (!element)
          return 0

        const windowHeight = window.innerHeight
        const elementTop = element.offsetTop
        const scrollPosition = window.scrollY

        let scrollLevel = (scrollPosition + windowHeight - elementTop) / windowHeight

        scrollLevel = Math.max(0, Math.min(1, scrollLevel)).round(1)

        return Number(scrollLevel).round(2)
      },
    }

    /*    END::Scroll    */
  },
}
