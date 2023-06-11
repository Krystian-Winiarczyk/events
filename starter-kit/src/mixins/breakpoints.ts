export default {
  data: () => ({
    breakpoints: {
      MD: 768,
      LG: 992,
      XL: 1200,
      XXL: 1400,
    },

    isSM: false,
    isMD: false,
    isLG: false,
    isXXL: false,
  }),

  mounted() {
    this.checkIsPageResize()

    this.resizeObserver = new ResizeObserver(this.checkIsPageResize)

    this.resizeObserver.observe(document.documentElement)
  },

  beforeUnmount() {
    this.resizeObserver.disconnect()
  },

  methods: {
    checkIsPageResize() {
      this.isSM = this.checkIsSM()
      this.isMD = this.checkIsMD()
      this.isLG = this.checkIsLG()
      this.isXXL = this.checkIsXXL()
    },

    checkIsSM(): boolean {
      return window.innerWidth <= this.breakpoints.MD
    },

    checkIsMD(): boolean {
      return window.innerWidth <= this.breakpoints.LG
    },

    checkIsLG(): boolean {
      return window.innerWidth <= this.breakpoints.XL
    },

    checkIsXXL(): boolean {
      return window.innerWidth <= this.breakpoints.XXL
    },
  },
}
