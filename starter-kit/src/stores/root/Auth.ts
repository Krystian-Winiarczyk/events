import { User } from '@/globals/objects/root/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    user(): User | null { return this.user },
  },

  actions: {
    async signIn(email: string, password: string) {
      try {
        const Admin = {
          name: 'admin',
        }

        this.$state.user = new User(Admin, email)

        console.log('Hello! <3', email, password)
      }
      catch (err) { return err }
    },
  },
})
