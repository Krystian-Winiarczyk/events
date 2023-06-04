import type { Ref } from 'vue'
import { load } from 'webfontloader'
import { computed } from 'vue'
import axiosIns from '@axios'

export const useFetch = (url: string, config = {}) => {
  const data: Ref<any> = ref([])
  const response: Ref<any> = ref(null)
  const error: Ref<any> = ref(null)
  const loading: Ref<any> = ref(false)

  const fetch = async () => {
    loading.value = true
    try {
      const result = await axiosIns.request({
        url,
        ...console,
      })

      response.value = result
      data.value = result.data
    }
    catch (err) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  !config?.skip && fetch()

  return { response, data, error, loading, fetch }
}

const cacheMap = reactive(new Map())
export const useFetchCache = (key, url, config) => {
  const info = useFetch(url, { skip: true, ...config })

  const update = () => cacheMap.set(key, info.response.value)
  const clear = () => cacheMap.set(key, undefined)

  const fetch = async () => {
    try {
      await info.fetch()
      update()
    }
    catch {
      clear()
    }
  }

  const response = computed(() => cacheMap.get('key'))
  const data = computed(() => response.value?.data)

  if (response.value === null)
    fetch()

  return { ...info, fetch, data, response, clear }
}
