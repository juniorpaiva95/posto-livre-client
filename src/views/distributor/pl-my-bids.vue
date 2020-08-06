<template>
    <div class="pl-my-bids">
        <div>
            <pl-advise title="MEUS LANCES" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>  
        <div class="container">
            <div v-if="!isMobile()">
                <!-- <pl-auctions :data="auctions"></pl-auctions> -->
                <pl-table class="container" :data='auctions'></pl-table>

            </div>
            <div v-else>
                <pl-table-mobile :data="auctions"></pl-table-mobile>
            </div>
        </div> 
    </div>
</template>

<script>
import PLAdvise from '@/components/sections/pl-advise';
/* import PlAuctions from '@/components/sections/pl-auction-table'; */
import PLTable from '@/components/sections/pl-table';
/* import PlAuctionsMobile from '@/components/sections/pl-auction-table-mobile'; */
import PLTableMobile from '@/components/sections/pl-table-mobile';

export default {
    components: {
        'pl-advise': PLAdvise,
        /* 'pl-auctions': PlAuctions, */
        'pl-table': PLTable,
        /* 'pl-auctions-mobile': PlAuctionsMobile, */
        'pl-table-mobile': PLTableMobile,
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
        await this.$store.commit('auction/setFilters', { search: `bids.distributor_id:${user.distributor.id}`, searchFields: `bids.distributor_id:=`, include: "fuel,port.unit,auctions,bids" })
        await this.$store.dispatch('auction/fetchLot').then(auctions => {
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
