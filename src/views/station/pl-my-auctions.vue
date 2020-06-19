<template>
    <div class="pl-my-auctions">
        <div>
            <pl-advise title="Meus Leilões" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>  
        <div class="container">
            <div>
                <pl-auctions></pl-auctions>
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
        showModal: false,
    }),
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
