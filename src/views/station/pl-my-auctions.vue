<template>
    <div class="pl-my-auctions">
        <div>
            <pl-advise title="Meus Leilões" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>  
        <div class="container">
            <div v-if="!isMobile()">
                <pl-auctions></pl-auctions>
            </div>
            <div v-else>
                <pl-auctions-mobile></pl-auctions-mobile>
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

};
</script>
<style lang="scss">
.plus-active{
    color: $yellow!important;
}
.pl-my-auctions{
    @include grid-container();
}
</style>
