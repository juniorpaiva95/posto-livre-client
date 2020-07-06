<template>
<div class="pl-input " :class="[
    `pl-input--${size}`,
    `pl-input--${type}`
]">
    <input type="text" v-model="search" @keyup="submitFilter" class="pl-input__field" :placeholder="placeholder">
</div>
</template>
<script>
export default {
    props:{
        size: {
            type: String,
            default: 'medium',
        },  //  larger, smaller
        theme: {
            type: String,
            default: 'default'
        }, 
        type: {
            type: String,
            default: 'default'    
        },//  default
        label: String,
        placeholder: String,
    },
    data: () => {
        return {
            search: "",
        }
    },
    methods: {
        submitFilter() {
            this.$store.commit('auction/setConcat', false);
            this.$store.commit('auction/setFilters', { search: "fuel.name:" + this.search, page: 1 });
            this.$store.dispatch(this.getDispatchName());
        },
        getDispatchName() {
            const urlAtual = window.location.pathname;
            let dispatchName = "";
            switch (urlAtual) {
                case "/distributor-feed":
                    dispatchName = "auction/fetchAuctions";
                    break;
                case "/bids":
                    dispatchName = "auction/fetchDistributorAuctionsWins";
                    break;
                case "/station-feed":
                    dispatchName = "auction/fetchAuctions";
                    break;
                case "/auctions":
                    dispatchName = "auction/fetchAuctions";
            }
            return dispatchName;
        },
    }
}
</script>
<style lang="scss">
.pl-input{
    &__field{
        padding: 10px;
        color: rgba($color: #fff, $alpha: 0.6);
        text-transform: uppercase;
        width: 200px;
        background: transparent;
        border: none;
        &:focus{
            outline: none;
        }
        @include grid-media($smartphone-grid){
            width: 100px;
        }
        &::placeholder{
            color: rgba($color: #fff, $alpha: 0.6);
        }
    }
    // size
    &--medium{

    }
    &--large{
    }
    &--smaller{

    }
    // type
    &--dark{

    }
    &--default{

    }
    &--table{
        //url("../../../public/images/icons/social/LinkedIn.svg");
        color: #fff;
        
    }
}
</style>