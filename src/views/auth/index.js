export default [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ './pl-login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "cadastrar" */ './pl-register.vue')
    },
    {
        path: '/forgot-password',
        name: 'forgot-password',
        component: () => import(/* webpackChunkName: "recuperar-senha" */ './pl-recovery.vue')
    },
    {
        path: '/reset-password',
        name: 'reset-password',
        component: () => import('./pl-password.vue')
    }
]