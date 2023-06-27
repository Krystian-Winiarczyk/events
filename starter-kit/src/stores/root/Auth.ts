import { defineStore } from 'pinia'
import { User } from '@/globals/objects/root/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    getUser: state => state.user,
  },

  actions: {
    async signIn(email: string, password: string) {
      try {
        const Admin = {
          name: 'admin',
        }

        this.user = new User(Admin, email)

        console.log('Hello! <3', email, password)
      }
      catch (err) {
        return err
      }
    },
  },
})
