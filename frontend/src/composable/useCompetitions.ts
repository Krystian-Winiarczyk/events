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

  // 👉 Snackbar helper methods
  const load = async () => {
    loading.value = true
    try {
      const response = await axiosIns.get('competitions')

      if (response.data?.items) {
        items.value = response.data.items
        createSnackbar(successes, 'Success', 'COMPETITIONS')
      }
    }
    catch (error) {
      createSnackbar(errors, 'error', 'COMPETITIONS')
    }
    finally {
      loading.value = false
    }
  }

  return {
    load,
    loading,
    items,
  }
}
