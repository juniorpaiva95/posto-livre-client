<template>
    <div class="pl-my-bids">
        <div>
            <pl-advise title="MEUS LANCES" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>  
        <div class="container">
            <div v-if="!isMobile()">
                <pl-auctions :data="auctions"></pl-auctions>
            </div>
            <div v-else>
                <pl-auctions-mobile :data="auctions"></pl-auctions-mobile>
            </div>
        </div> 
    </div>
</template>

<script>
import PLAdvise from '@/components/sections/pl-advise';
import PlAuctions from '@/components/sections/pl-auction-table';
import PlAuctionsMobile from '@/components/sections/pl-auction-table-mobile';

export default {
    components: {
        'pl-advise': PLAdvise,
        'pl-auctions': PlAuctions,
        'pl-auctions-mobile': PlAuctionsMobile,

    },
    data: () => ({
        auctions: [],
        showModal: false,
    }),
    methods: {
        isMobile() {
            if(window.innerWidth <= 1000) {
                return true
            } else {
                return false
            }
        }
    }, 
    async created() {
        let user = await this.$store.getters['auth/getUser'];
        await this.$store.commit('auction/setFilters', { search: `bids.distributor_id:${user.distributor.id}`, searchFields: `bids.distributor_id:=` })
        await this.$store.dispatch('auction/fetchAuctions').then(auctions => {
            this.auctions = auctions;
        })
    }
};
</script>
<style lang="scss">
.plus-active{
    color: $yellow!important;
}
.pl-my-bids{
    @include grid-container();
}
</style>
