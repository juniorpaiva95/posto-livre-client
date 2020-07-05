<template>
    <div class="pl-feed">
        <div>
            <pl-advise title="Acontecendo agora" Subtext="Confira todas as suas transações">
            </pl-advise>
        </div>    
        
        <div v-if="!isMobile()">
            <pl-table class="container" :data='auctions'>
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
/* eslint-disable */ 
import PLTitle from '@/components/atoms/pl-title';
import PLAdvise from '@/components/sections/pl-advise';
import PLTable from '@/components/sections/pl-table';
import PLTableMobile from '@/components/sections/pl-table-mobile';
import PLQuestions from '@/components/sections/pl-questions';

export default {
    components: {
        'pl-title': PLTitle,
        'pl-advise': PLAdvise,
        'pl-table': PLTable,
        'pl-questions': PLQuestions,
        'pl-table-mobile': PLTableMobile
    },
    data: () => ({
        auctions: [],
        showModal: false,
    }),
    methods: {
        isMobile() {
            if(window.outerWidth <= 1000) {
                return true
            } else {
                return false
            }
        }
    },
    async created() {
        await this.$store.commit('auction/setFilters', { status : 1 });
        this.$store.dispatch('auction/fetchAuctions').then(auctions => {
            this.auctions = auctions;
        });
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
