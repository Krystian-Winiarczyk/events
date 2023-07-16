import { useRouter } from 'vue-router'
import axiosIns from '@axios'
import { useToastStore } from '@/store/toast'

const toastStore = useToastStore()
export const useAuthStore = defineStore('auth', () => {
  const user = ref(localStorage.getItem('userDetails') ? JSON.parse(localStorage.getItem('userDetails') ?? '') : null)
  const userRefreshToken = ref(localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : null)
  const loggedIn = ref(false)
  const refreshTokenTimeout = ref()

  const router = useRouter()

  const startRefreshTokenTimer = () => {
    // refreshTokenTimeout.value = setTimeout(refreshToken, process.env.REFRESH_TOKEN_TIMEOUT);
    refreshTokenTimeout.value = setTimeout(reloadRefreshToken, 5000)
  }

  const stopRefreshTokenTimer = () => {
    if (refreshTokenTimeout.value)
      clearTimeout(refreshTokenTimeout.value)
  }

  const reloadRefreshToken = async () => {
    if (!userRefreshToken.value)
      return

    const tokensResponse = await axiosIns.get('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${userRefreshToken.value}`,
      },
    })

    const [data] = tokensResponse?.data?.items

    if (!data)
      return

    const { refreshToken, accessToken, ...userDetails } = data

    user.value = userDetails
    localStorage.setItem('userDetails', JSON.stringify(userDetails))

    userRefreshToken.value = refreshToken
    localStorage.setItem('refreshToken', refreshToken)

    localStorage.setItem('accessToken', accessToken)

    startRefreshTokenTimer()
  }

  const logout = async () => {
    await axiosIns.post('/auth/logout')

    stopRefreshTokenTimer()

    user.value = null
    userRefreshToken.value = ''
    loggedIn.value = false

    await router.push('/login')
  }

  const login = async (email: string, password: string) => {
    try {
      const authResponse = await axiosIns.post('/auth/login', { email, password })

      const [userData] = authResponse?.data?.items
      if (!userData)
        return

      const { refreshToken, accessToken, ...userDetails } = userData

      userRefreshToken.value = refreshToken
      localStorage.setItem('refreshToken', refreshToken)

      localStorage.setItem('accessToken', accessToken)

      user.value = userDetails
      localStorage.setItem('userDetails', JSON.stringify(userDetails))

      loggedIn.value = true

      startRefreshTokenTimer()

      toastStore.showMessage('success', 'Za chwilę zostaniesz przeniesiony do panelu', 'Pomyślnie zalogowano')

      setTimeout(async () => {
        await router.push('/my/profile')
      }, 1000)
    }
    catch (err) {
      console.log(err)
      toastStore.showMessage('error', 'Napotkano nieznany problem podczas logowania spróbuj ponownie', 'Problem z logowaniem')
    }
  }

  const signup = async (payload: any) => {
    try {
      const authResponse = await axiosIns.post('/auth/signup', payload)

      const [userData] = authResponse?.data?.items
      if (!userData)
        return

      const { refreshToken, accessToken, ...userDetails } = userData

      userRefreshToken.value = refreshToken
      localStorage.setItem('refreshToken', refreshToken)

      localStorage.setItem('accessToken', accessToken)

      user.value = userDetails
      localStorage.setItem('userDetails', JSON.stringify(userDetails))

      loggedIn.value = true

      startRefreshTokenTimer()

      toastStore.showMessage('success', 'Za chwilę zostaniesz przeniesiony do panelu', 'Pomyślnie utworzono konto')

      setTimeout(async () => {
        await router.push('/my/profile')
      }, 1000)
    }
    catch (err) {
      toastStore.showMessage('error', 'Napotkano nieznany problem podczas rejestracji spróbuj ponownie', 'Problem z rejestracją')
      console.log(err)
    }
  }

  return {
    login,
    signup,
    logout,
    reloadRefreshToken,

    user,
    userRefreshToken,
    loggedIn,
  }
})
