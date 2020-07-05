<template>
    <div class="pl-my-bids">
        <div>
            <pl-advise title="MEUS LANCES" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>  
        <div class="container">
            <div>
                <pl-auctions :data="auctions"></pl-auctions>
            </div>
        </div> 
    </div>
</template>

<script>
import PLAdvise from '@/components/sections/pl-advise';
import PlAuctions from '@/components/sections/pl-auction-table';

export default {
    components: {
        'pl-advise': PLAdvise,
        'pl-auctions': PlAuctions,
    },
    data: () => ({
        auctions: [],
        showModal: false,
    }),
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
