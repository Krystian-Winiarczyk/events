import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...setupLayouts(routes),
  ],
})

/* Logged in:
    access: [*, !login, !signup]
      login, signup -> my/profile

   Logged out:
     access: [/, login, signup]
     * ->
*/
router.beforeEach((route, from, next) => {
  const { loggedIn } = useAuthStore()
  const authRequired = route.meta?.authRequired ?? true

  if (loggedIn && (route.name === 'login' || route.name === 'signup')) {
    console.log('1')
    return next('/my/profile')
  }

  if (!loggedIn && authRequired && (route.name !== 'login' && route.name !== 'signup')) {
    // eslint-disable-next-line sonarjs/no-gratuitous-expressions
    console.log('2', '!loggedIn && authRequired && (route.name !== \'login\' && route.name !== \'signup\')', !loggedIn && authRequired && (route.name !== 'login' && route.name !== 'signup'))
    return next('/login')
  }

  console.log('3', 'authRequired && loggedIn', authRequired && loggedIn)
  if (authRequired && loggedIn) return next()

  console.log('4', '!authRequired)', !authRequired)
  if (!authRequired) return next()

  console.log('5')
  return next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
