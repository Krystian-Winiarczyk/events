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

router.beforeEach((route, from, next) => {
  const { loggedIn } = useAuthStore()
  const authRequired = route.meta?.authRequired ?? true

  if (loggedIn && (route.name === 'login' || route.name === 'signup')) {
    return next('/my/profile')
  }

  if (!authRequired) return next()
  if (authRequired && !loggedIn && (route.name !== 'login' && route.name !== 'signup')) {
    return next('/login')
  }

  if (authRequired && loggedIn) return next()

  // Redirect to login if not authorized
  // if (!loggedIn && authRequired && route.name !== 'login')
  //   next({ name: 'login' })

  // Logged user try to redirect to login/signup pages
  // else if (loggedIn && !authRequired && (route.name !== 'login' || route.name !== 'signup'))
  //   next(from)

  return next()

  console.log(route, loggedIn)
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

export default router
