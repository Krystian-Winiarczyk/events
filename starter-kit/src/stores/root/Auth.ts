import { defineStore } from 'pinia'
import User from '@/globals/objects/root/User'
import { LANGS, PRONOUNS } from '@/globals/enums/enums'
import Profile from '@/globals/objects/root/Profile'

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

        // ℹ️ Auto profile on login. ONLY FOR TESTING!!!
        const profile = new Profile(
          'Emily Totsu',
          PRONOUNS.FLUID,
          LANGS.ANG,
          'Neko1998',
          'Hello there! The pyramid is full of justice. Emptiness hurts when you experience with love.',
        )

        // ℹ️ Auto profile on login. ONLY FOR TESTING!!!
        const profile2 = new Profile(
          'Testowy Gostek',
          PRONOUNS.HE,
          LANGS.ANG,
        )

        this.user = new User(Admin, email, [profile, profile2])

        console.log('Hello! <3', email, password)
      }
      catch (err) {
        return err
      }
    },
  },
})
