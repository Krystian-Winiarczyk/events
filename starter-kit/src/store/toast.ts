import type { Ref } from 'vue'

interface ToastAlert {
  id: string
  color: string
  message: string
  title: string
  icon?: string
}

export const useToastStore = defineStore('toast', () => {
  const messages: Ref<Array<ToastAlert>> = ref([])

  const clearMessage = (id: string) => {
    const index: number = messages.value.findIndex((element: ToastAlert) => element.id === id)
    if (index >= 0)
      messages.value.splice(index, 1)
  }

  const showMessage = (color: string, message: string, title: string) => {
    const id = (Math.random() + 1).toString(36).substring(2)

    messages.value.push({
      id,
      color,
      message,
      title,
    })
  }

  return {
    clearMessage,
    showMessage,

    messages,
  }
})
