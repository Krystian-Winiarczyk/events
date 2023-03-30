import { Ref } from 'vue'
import { useSnackbar } from '@composable/useSnackbar'
import axiosIns from '@/plugins/axios'

// 👉 Single competition interface
interface Competition {
  message: string
  module: string
  id: number
  visible: boolean
}

// 👉 Competitions definitions
const items = ref([])

export const useCompetitions = () => {
  const loading = ref(false)
  const { createSnackbar, errors, successes } = useSnackbar()

  // 👉 Load all Competitions
  const load = async () => {
    loading.value = true
    try {
      const response = await axiosIns.get('competitions')

      if (response.data?.items) {
        items.value = response.data.items
        createSnackbar(successes, 'Success', 'COMPETITIONS')
      }

      return response?.data?.items || []
    }
    catch (error) {
      createSnackbar(errors, 'error', 'COMPETITIONS')
    }
    finally {
      loading.value = false
    }
  }

  // 👉 Load single Competitions
  const loadSingle = async (id: string | number) => {
    loading.value = true
    try {
      const response = await axiosIns.get(`competitions/${id}`)

      if (response.data?.items) {
        items.value = response.data.items
        createSnackbar(successes, 'Success', 'COMPETITIONS')

        return response?.data?.items[0]
      }
    }
    catch (error) {
      createSnackbar(errors, 'error', 'COMPETITIONS')
    }
    finally {
      loading.value = false
    }
  }

  // 👉 Edit or create Competitions
  const editOrCreate = async (item: any, showSnackbar = false) => {
    loading.value = true
    try {
      const { id = null, ...itemDetails } = item

      const response = await axiosIns({
        url: id ? `competitions/${id}` : 'competitions',
        method: id ? 'PATCH' : 'POST',
        data: { ...itemDetails },
      })

      if (response.data?.items) {
        items.value = response.data.items
        if (showSnackbar)
          createSnackbar(successes, 'Success', 'COMPETITIONS')

        return response?.data?.items[0]
      }

      return null
    }
    catch (error) {
      if (showSnackbar)
        createSnackbar(errors, 'error', 'COMPETITIONS')

      return null
    }
    finally {
      loading.value = false
    }
  }

  return {
    load,
    loadSingle,
    editOrCreate,

    loading,
    items,
  }
}
