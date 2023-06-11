export default {
  data() {
    return {
      isMobile: false,
    }
  },

  mounted() {
    this.checkIsMobile()
    window.addEventListener('resize', this.checkIsMobile)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkIsMobile)
  },

  methods: {
    checkIsMobile() {
      this.isMobile = window.innerWidth <= 768
    },
  },
}
