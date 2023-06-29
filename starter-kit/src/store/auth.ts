import axiosIns from "@axios";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') ?? ''))
  const loggedIn = ref(false)
  const refreshTokenTimeout = ref(null)

  const refreshToken = () => {
    this.user = await axiosIns.post(`/refresh-token`, {  });
    this.startRefreshTokenTimer();
  },
  const startRefreshTokenTimer = () => {
    refreshTokenTimeout.value = setTimeout(refreshToken, timeout);
  }
  const login = async (email: string, password: string) => {
    user.value = await axiosIns.post('login', { email, password })
    startRefreshTokenTimer();
  }



  return {}
})

async login(username, password) {
  this.user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password }, { credentials: 'include' });
  this.startRefreshTokenTimer();
},
logout() {
  fetchWrapper.post(`${baseUrl}/revoke-token`, {}, { credentials: 'include' });
  this.stopRefreshTokenTimer();
  this.user = null;
  router.push('/login');
},
stopRefreshTokenTimer() {
  clearTimeout(this.refreshTokenTimeout);
}
