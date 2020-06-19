export default [
    {
        path: '/auctions',
        name: 'station.auctions',
        meta: {
            restricted: true
        },
        component: () => import('./pl-my-auctions.vue')
    },
    {
        path: '/station-feed',
        name: 'station.feed',
        meta: {
            restricted: true
        },
        component: () => import('./pl-feed.vue')
    },
    {
        path: '/create-auction',
        name: 'station.createauction',
        meta: {
            restricted: true
        },
        component: () => import('./pl-create-auction.vue')
    }
]