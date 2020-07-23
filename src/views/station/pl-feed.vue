<template>
    <div class="pl-feed">
        <div>
            <pl-advise title="PEDIDOS FINALIZADOS" Subtext="Confira todas as suas transações já realizadas">
            </pl-advise>
        </div>    
        
        <div v-if="!isMobile()"><!-- isMobile() -->
            <pl-table class="container" ><!-- :data='auctions' -->
            </pl-table>
        </div>
        <div v-else>
            <pl-table-mobile :data='auctions'> 
            </pl-table-mobile> 
        </div>
        <pl-questions title="Perguntas frequentes"></pl-questions> 
       
    </div>
</template>
<script>
import PLAdvise from '@/components/sections/pl-advise';
import PLTable from '@/components/sections/pl-table';
import PLTableMobile from '@/components/sections/pl-table-mobile';
import PLQuestions from '@/components/sections/pl-questions';

export default {
    components: {
        'pl-advise': PLAdvise,
        'pl-table': PLTable,
        'pl-questions': PLQuestions,
        'pl-table-mobile': PLTableMobile,
    },
    data: () => ({
        auctions: [],
        faqs: [],
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
        /* this.$store.commit('auction/resetState'); */
        this.$store.dispatch('faq/fetchFaqs').then(faqs => { 
            this.faqs = faqs;
        });

        await this.$store.commit('auction/setFilters', { status : 1, include: "fuel,port,auctions,bids" });
        this.$store.dispatch('auction/fetchLot').then(auctions => {
            console.log(" this is the auctions returned");
            console.log(auctions);
            this.auctions = auctions;
        }) 
    }
}
</script>
<style lang="scss">
.pl-feed{
    @include grid-container();
    font-family: 'Barlow', sans-serif;
    &__row{
        width: 100%;
        height: 100px;
        border: 1px solid black;
        display: block;
    }
}
</style>
