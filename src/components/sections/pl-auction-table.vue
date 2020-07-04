<template>
    <section class="pl-bidTable">
        <div class="container">
            <table class="pl-bidTable__body col-12">
                <tr>
                    <td colspan="9" class="pl-bidTable__header">
                        <div class="pl-bidTable__showMore" @click="onToggle" id="filterBtn">
                            <img :src=link>
                            <p class="pl-bidTable__header--text">
                                Mostrar Filtros
                            </p>
                        </div>
                        <div class="pl-bidTable__search">
                            <div class="pl-bidTable__search--content">
                                <img src="images/icons/other-icons/search.svg" alt="">
                                <pl-input size="large" placeholder="EX.: Diesel">
                                </pl-input>   
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="8" class="pl-bidTable__filters">
                        <div class="pl-bidTable__filters--component">
                            <pl-filters></pl-filters>
                        </div>
                    </td>
                </tr>
                <tr class="pl-bidTable__labels" >
                    <td class="pl-bidTable__cod">
                        <p>#COD.</p>
                    </td>    
                    <td>
                        <p>DATA</p>
                    </td>    
                    <td>
                        <p>COMBUSTÍVEL</p>
                    </td>   
                    <td>
                        <p>QUANTIDADE</p>
                    </td>    
                    <td>
                        <p>DATA DE ENTREGA</p>
                    </td>    
                    <td>
                        <p>FRETE</p>
                    </td>    
                    <td>
                        <p>POSTO</p>
                    </td>    
                    <td>
                        <p>LOCAL</p>
                    </td>   
                    <td>
                        <p>LANCES</p>
                    </td>
                </tr>
                <tr class="pl-bidTable__item" v-for="(item, i) in items" :key="i" :v-if="item.station.user_id == user.id" :class="`${item.fuel.slug}`">
                    <!--@click="showModal = true"-->
                    <td>
                        {{i}}
                    </td>
                    <td>
                        {{ new Date(item.created_at).getDay()}}/{{ new Date(item.created_at).getMonth()}}/{{ new Date(item.created_at).getFullYear()}}
                    </td>
                    <td>
                        {{item.fuel.name}}
                    </td>
                    <td>
                        {{item.fuel_amount}} L
                    </td>
                    <td>
                        {{ new Date(item.date_finish).getDay()}}/{{ new Date(item.date_finish).getMonth()}}/{{ new Date(item.date_finish).getFullYear()}}
                    </td>

                    <td>
                        {{item.freight_type}}
                    </td>
                    <td>
                        {{user.social_reason}}
                    </td>
                    <td>
                        <!-- use the modal component, pass in the prop -->
                        {{item.pickup_location}}
                    </td>   
                    <td class="bid-div" colspan="2">
                        <div class="bid-item">
                            <span class="bid-value"><!-- {{item.bid.formatted || item.bid}} --></span>
                            <button class="bid-btn" type="button" @click="openModal(item)">...</button>
                        </div>    
                    </td>
                </tr>
            </table>
            <div class="col-12" v-if="btnShowMoreIsVisible">
                <div class="pl-bidTable__button">
                    <button class="pl-btn pl-btn--standard" @click="handleShowMore">Mostrar Mais</button>
                </div>
            </div>
            <pl-modal
                :item='modalData'
                v-if="showModal" @close="showModal = false">
            </pl-modal>
        </div>
    </section> 
</template>

<script>
import PLInput from '@/components/atoms/pl-input';
import PLModal from '@/components/sections/pl-modal';
import PLBtn from '@/components/atoms/pl-btn';
import PLFilters from '@/components/sections/pl-filters';
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        value: null,
        showModal: false,
        showModalBid: false,
        modalData: '',
        link : 'images/icons/other-icons/plus.svg',
        items: [],
        user: [],
    }),
    components: {
        'pl-modal': PLModal,
        'pl-btn': PLBtn,
        'pl-input': PLInput,
        'pl-filters': PLFilters,
    },
    computed: {
        ...mapGetters({ auctionPagination: 'auction/getPagination' }),
        btnShowMoreIsVisible: function() {
            // @TODO: Melhorar
            return this.auctionPagination.hasOwnProperty('links') && !!this.auctionPagination.links.next
        }
    },
    methods: {
        onToggle(event){
            var item = event.target.closest(".pl-bidTable__body--desktop");
            $(".pl-bidTable__filters--component", item).slideToggle(500);
            
            var btn = document.getElementById("filterBtn");
            btn.classList.toggle("plus-active");
            if(this.link == 'images/icons/other-icons/plus.svg'){
                this.link = 'images/icons/other-icons/minus.svg';
            } else {
                this.link = 'images/icons/other-icons/plus.svg';
            }
        },
        openModal(item) {
            this.modalData = item;
            this.showModal = true;
        },
        showModalBidF(){
            this.showModalBid = true;
        },
        handleShowMore() {
            this.$store.commit('auction/setConcat', true);
            this.$store.dispatch('auction/fetchAuctions');
        }
    },
    async created() {
        this.$store.commit('auction/resetState');
        if(window.location.pathname === '/bids'){
            this.items = await this.$store.getters['auction/getAuctions'];
        } else {
            this.user = await this.$store.getters['auth/getUser'];
            
            await this.$store.commit('auction/setFilters', { status : 2, limit: 30, search: `station_id:${this.user.station.id}`, searchFields: 'station_id:=' });
            await this.$store.dispatch('auction/fetchAuctions');
            this.items = await this.$store.getters['auction/getAuctions'];
            console.log("testing to get the user inside my auctions");
            console.log(this.user);

        }

        this.$store.watch(
            (state, getters) => getters["auction/getAuctions"],
            (newValue) => {
                this.items = newValue;
            },
        );
    }

}
</script>
<style lang="scss">
.pl-bidTable{
    font-family: 'Roboto', sans-serif;
    margin-bottom: 50px;
    table{
        border-collapse: collapse;
        background-color: #ffffff;
    }
    td{
        padding:  0 10px 0 10px;
        vertical-align: middle;
        text-align: center;
        font-size: 14px;
        font-family: $roboto-family;
        .bid-btn{
            display: inline-block;
            width: 20px;
            padding: 0px;
            text-align: center;
            border: 2px solid grey!important;
            background-color: #fff;
            border-radius: 2px!important;
            cursor: pointer;
            outline: none;
        }
        .bid-value{
            display: inline-block;
            margin-right: 5px;
        }
    }
    .gasolina-comum{
        border-left: 5px solid $yellow!important;
    }
    .gasolina-aditivada{
        border-left: 5px solid #01A39D!important;
    }
    .etanol{
        border-left: 5px solid #8D99AE!important;
    }
    .diesel-s10{
        border-left: 5px solid #000000!important;
    }
    .diesel-s500{
        border-left: 5px solid tomato!important;
    }
    &__header{
        width: 100%;
        background-color: $grey;
        height: 50px;
        text-align: left;
        color: $greyTable;
        text-transform: uppercase;
        
    }
    &__labels{
        color: #949494;
        border: 1px solid $middlegrey;
        font-family: roboto;
        font-weight: bold;
        td{
            font-size: 12px !important;
        }
    }
    &__button{
        width: 100%;
        text-align: center;
        padding-top: 20px;
    }
    &__filters{
        &--component{
            display: none;
        }
    }
    &__item{
        height: 100px;
        border: 1px solid $middlegrey;
        border-left: 5px solid $greenSuccess;
        font-family: $roboto-family, sans-serif;
        font-weight: 700;
        color: #333333;
        &--default{
            padding: 4px;
            line-height: 20px;
            background-color: $yellow;
            color: #fff;
        }
        &--danger{
            padding: 4px;
            line-height: 20px;
            color: #fff;
            background-color: $redDanger;
        }
        &--success{
            padding: 4px;
            line-height: 20px;
            color: #fff;
            background-color: $greenSuccess;
        }
    }
     &__showMore{
        display: flex;
        color: #ffffff;
        align-items: center;
        cursor: pointer;
        height: 100%;
        float: left;
        width: 18%;
        padding-left: 10px;
        p{
            line-height: 20px;
            padding-left: 10px;
        }
    }
    &__search{
        line-height: 100%;
        width: 30%;
        height: 100%;
        padding: 10px;
        margin-left: 18%;
        &--content{
            display: flex;
            background-color: rgba(white, 0.3);
            img{
                padding-right: 10px;
                padding-left: 10px;
            }
            &:focus{
                outline: 1px solid $yellow;
            }
        }
    }
    &__button{
        width: 100%;
        text-align: center;
        padding-top: 20px;
       
    }
    .bid-item {
        display: flex;
        justify-content: space-between;
    }
}
</style>
