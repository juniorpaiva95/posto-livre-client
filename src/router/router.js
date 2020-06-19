import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import authRoutes from '@/views/auth'
import stationRoutes from '@/views/station'
import distributorRoutes from '@/views/distributor'
import tokenService from '@/services/storage.js'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...stationRoutes,
    ...distributorRoutes,
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/pl-home.vue')
    },
    {
      path: '/minhaconta',
      name: 'minhaconta',
      component: () => import('@/views/pl-account.vue'),
      meta: {
        restricted: true
      },
    },
    {
      path: '/notificacoes',
      name: 'notificacoes',
      component: () => import('@/views/pl-notifications.vue'),
      meta: {
        restricted: true
      },
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/pl-faq.vue'),
      meta: {
        restricted: true
      },
    },
    {
      path: '/*',
      name: '404',
      component: () => import('@/views/pl-notfound.vue')
    }
  ],
  // eslint-disable-next-line
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeEach (async (to, from, next) => {
  const restricted = to.matched.some(record => record.meta.restricted)
  const loggedIn = !!tokenService.getToken();

  if (restricted && !loggedIn && to.path != '/login') {
    return next('login')
  }

  if (tokenService.getToken() && store.state.auth.user == null) {
    let user = await store.dispatch('auth/fetchUser');

    if (user.last_name == 'Station') {
      store.dispatch('station/fetchStation');
    }

    return next()
  }

  // Check if page is restricted
  if (to.matched.some(record => record.meta.restricted)) {
    store.commit('auth/setRoute', to.name)

    // We have a token, fetch user data
    if (localStorage.getItem('token') && localStorage.getItem('token') != undefined) {
      // TODO: Check if token is expired
      // If is expired, then refresh it
      // If is not valid, then return an error
      return next()
    } else {
      // User is not logged in, redirect to login form
      store.commit('logger/error', 'Área restrita!')
      return next('login')
    }
  } else {
    // Page is not restricted, proceed to next
    return next()
  }
})

export default router
