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
router.beforeEach((route, from , next) => {
  const { loggedIn } = useAuthStore()
  const authRequired = route.meta?.authRequired ?? true

  if (loggedIn && (route.name === 'login' || route.name === 'signup')) {
    return next('/my/profile')
  }

  if (!loggedIn && authRequired && (route.name !== 'login' && route.name !== 'signup')) {
    // eslint-disable-next-line sonarjs/no-gratuitous-expressions
    return next('/login')
  }

  if (authRequired && loggedIn) return next()

  if (!authRequired) return next()

  return next()
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
