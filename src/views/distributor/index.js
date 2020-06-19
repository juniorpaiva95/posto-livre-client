export default [
    {
        path: '/bids',
        name: 'distributor.bids',
        meta: {
            restricted: true
        },
        component: () => import('./pl-my-bids.vue')
    },
    {
        path: '/distributor-feed',
        name: 'distributor.feed',
        meta: {
            restricted: true
        },
        component: () => import('./pl-feed.vue')
    }
]