import axiosIns from '@axios'

export const useUserStore = defineStore('users', () => {
  const items = ref([])

  const loading = ref(false)
  const error = ref(null)

  const getData = computed(() => {
    return items
  })

  async function fetch() {
    try {
      const response = await axiosIns.get('https://jsonplaceholder.typicode.com/users')

      items.value = response.data
    }
    catch (err) {
      error.value = err
    }
  }

  return { loading, getData, fetch }
})
