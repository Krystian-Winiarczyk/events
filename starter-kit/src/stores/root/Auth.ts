import { defineStore } from 'pinia'
import User from '@/globals/objects/root/User'
import Profile from '@/globals/objects/root/Profile'

export const useAuthStore = defineStore('kurwa', {
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
        const friend = new Profile(
          'Gostek Testowy',
          'PRONOUNS.HE',
          'LANGS.ANG',
          '',
          'Emptiness hurts when you experience with love.',
        )

        // ℹ️ Auto profile on login. ONLY FOR TESTING!!!
        const profile = new Profile(
          'Emily Totsu',
          'PRONOUNS.FLUID',
          'LANGS.ANG',
          'Neko1998',
          'Hello there! The pyramid is full of justice. Emptiness hurts when you experience with love.',
          'https://img.freepik.com/free-psd/3d-render-cat-emoji_23-2150311887.jpg?w=1380&t=st=1688156478~exp=1688157078~hmac=37083273c9f1885ce5ea0852394c2916397a41c27e522d0746f04994bb584c3a',
          [{ type: 'asd', url: 'https://www.google.com/e-totsu/' }, { type: 'SOCIAL_LINK.FACEBOOK', url: 'https://www.google.com/e-totsu' }],
          [friend, friend, friend],
        )

        // ℹ️ Auto profile on login. ONLY FOR TESTING!!!
        const profile2 = new Profile(
          'Testowy Gostek',
          'PRONOUNS.HE',
          'LANGS.ANG',
          '',
          'Emptiness hurts when you experience with love.',
        )

        // this.user = new User(Admin, email, [profile, profile2, profile2, profile2, profile2, profile2])

        console.log('Hello! <3', email, password)
      }
      catch (err) {
        return err
      }
    },
  },
})
