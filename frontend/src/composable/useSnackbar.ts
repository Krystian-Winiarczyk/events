import { Ref } from "vue"

// 👉 Single snackbar message interface
interface SnackbarMessage {
    message: string
    module: string
    id: number
    visible: boolean
}

// 👉 Snackbar messages definitions
const errors: Ref<Array<SnackbarMessage>> = ref([])
const successes: Ref<Array<SnackbarMessage>> = ref([])

export const useSnackbar = () => {
    // 👉 Snackbar helper methods
    const deleteSnackbar = (place: Ref, errorId: number): void => {
        const snackbarMessageIndex = place.value.findIndex((messageItem: SnackbarMessage) => messageItem.id === errorId)

        if (snackbarMessageIndex >= 0)
            place.value.splice(snackbarMessageIndex, 1)
    }

    const createSnackbar = (place: Ref, message: string, module: string): void => {
        const id = Math.round(Math.random() * 1000)

        place.value.push({ message, module, id, visible: true })

        setTimeout(() => {
            deleteSnackbar(place, id)
        }, 2500)
    }

    return {
        errors,
        successes,

        createSnackbar,
        deleteSnackbar,
    }
}