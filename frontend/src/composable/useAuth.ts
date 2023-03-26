import axiosIns from "@/plugins/axios"
import { useSnackbar } from "@composable/useSnackbar"

// Interfaces
interface LoginUserDto {
    email: string
    password: string
}

interface RegisterUserDto {
    firstName: string
    lastName: string
    email: string
    phone: string
    role?: string
    nickname?: string
    password: string
}

// Hold logged user state
export const currentUser = ref(null)

export const useAuth = () => {
    const { deleteSnackbar, createSnackbar, errors, successes } = useSnackbar()

    const loading = ref(false)

    const init = () => {
        if (localStorage.getItem('userData'))
            currentUser.value = JSON.parse(localStorage.getItem('userData'))

        currentUser.value = null
    }

    const login = async (user: LoginUserDto) => {
        loading.value = true

        try {
            const response = await axiosIns.post('auth/login', user)

            console.log(response);

            createSnackbar(successes, 'WelcomeTo', 'AUTH')
        } catch (error) {

            createSnackbar(errors, error, 'AUTH')
        } finally {
            loading.value = false
        }
    }

    const signup = async (user: RegisterUserDto) => {
        loading.value = true

        try {
            user.role = 'USER'

            const response = await axiosIns.post('auth/signup', user)

            createSnackbar(successes, 'WelcomeTo', 'AUTH')
        } catch (error) {

            createSnackbar(errors, error, 'AUTH')
        } finally {
            loading.value = false
        }
    }

    return {
        init,
        login,
        signup,
    }
}
