<template>
    <section class="pl-table-mobile">
        <div class="container">
            <div class="pl-table-mobile__body">
                <div class="pl-table-mobile__header">
                    <div class="pl-table-mobile__plus" @click="onToggleFilter">
                        <img :src=link>
                        <span class="pl-table-mobile__header--text" id="btnFilters">
                            Mostrar Filtros
                        </span>
                    </div>
                    <div class="pl-table-mobile__search">
                            <div class="pl-table__search--content">
                                <img src="images/icons/other-icons/search.svg" alt="">
                                <pl-input size="large" placeholder="EX.: Diesel">
                                </pl-input>   
                            </div>
                    </div> 
                    
                </div>
                <div class="pl-table-mobile__filters--component" id="filters">
                        <pl-filters></pl-filters>
                </div>
                <!-- MOBILE -->
                <template v-for="(item, i) in items" >
                <div class="pl-table-mobile__item"
                :class="`${item.fuel.slug}`"
                 v-if="!isOverdue(item.date_finish)" :key="i">
                    <table class="pl-table-mobile__item--content">
                        <tr>
                            <td class="pl-table-mobile__item--left">
                                <p class="pl-table-mobile__item--title">Data</p>
                                <div class="pl-table-mobile__item--slot" v-html="formatDate(item.date_start)">
                                    {{new Date(item.date_start).getDay()}}
                                </div>
                                <p class="pl-table-mobile__item--title">COD</p>
                                <div class="pl-table-mobile__item--slot" v-html="item.id">
                                    {{item.id}}
                                </div>
                                
                            </td>
                            <td class="pl-table-mobile__item--left">
                                <p class="pl-table-mobile__item--title">Posto</p>
                                <div class="pl-table-mobile__item--slot" v-html="(item.station.social_reason)? item.station.social_reason : '-'">
                                    {{item.station.social_reason}}
                                </div>
                                <p class="pl-table-mobile__item--title">Quantidade</p>
                                <div class="pl-table-mobile__item--slot" v-html="item.fuel_amount + ' L'">
                                    {{item.fuel_amount}} L
                                </div>
                                
                            </td>
                            <td class="pl-table-mobile__item--left">
                                <p class="pl-table-mobile__item--title">Melhor lance</p>
                                <div class="pl-table-mobile__item--slot" v-html="(item.low_bid)? item.low_bid : '-'">
                                    {{item.low_bid}}
                                </div>
                                <p class="pl-table-mobile__item--title">frete</p>
                                <div class="pl-table-mobile__item--slot" v-html="item.freight_type">
                                    {{item.freight_type}}
                                </div>
                                
                            </td>

                            <td class="pl-table-mobile__item--type">
                                <p class="pb-10">{{item.fuel.name}}</p>
                                <p>{{item.lot.port.name}}</p>
                            </td>
                            <td class="pl-table-mobile__item--bid">
                                <!-- <p class="pl-table-mobile__item--title">Seu lance</p> -->
                                <!-- <p v-html="item.bid">{{item.bid}}</p> -->
                                <div class="bid-item">
                                    <button class="btn pl-btn--table bid-btn" type="button" @click="openModal(item)">...</button>
                                    <!-- <button class="pl-btn btn pl-btn--table" type="button" @click="cancelarPedido(item)">Cancelar Pedido</button> -->
                                </div>    

                            </td>
                            <td class="pl-table-mobile__item--ico">
                                <button class="pl-table-mobile__expand"  @click="onToggle">
                                    <img src="images/icons/other-icons/expand.svg">
                                </button>
                            </td>
                        </tr>
                    </table>
                        
                </div>
                </template>
                <!-- LEGACY -->
                <!-- <tr class="pl-bidTable__labels" >
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
                        <p>REVENDEDOR</p>
                    </td>    
                    <td>
                        <p>LOCAL</p>
                    </td>   
                    <td>
                        <p>LANCES</p>
                    </td>
                </tr>
                <tr class="pl-bidTable__item" v-for="(item, i) in items" :key="i" :v-if="item.station.user_id == user.id" :class="`${item.fuel.slug}`">
                    <td>
                        {{i}}
                    </td>
                    <td>
                        {{ item.created_at | datetime }}
                    </td>
                    <td>
                        {{item.fuel.name}}
                    </td>
                    <td>
                        {{item.fuel_amount}} L
                    </td>
                    <td>
                        {{ item.date_finish | datetime }}
                    </td>

                    <td>
                        {{item.freight_type}}
                    </td>
                    <td>
                        {{item.station.user.social_reason}}
                    </td>
                    <td>
                        {{item.pickup_location}}
                    </td>   
                    <td class="bid-div" colspan="2">
                        <div class="bid-item">
                            <button class="btn pl-btn--table bid-btn" type="button" @click="openModal(item)">...</button>
                            <button class="pl-btn btn pl-btn--table" type="button" @click="cancelarPedido(item)">Cancelar Pedido</button>
                        </div>    
                    </td>
                </tr> -->
            </div>
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
import Swal from 'sweetalert2';
import moment from 'moment'

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
        },

    },
    methods: {
        formatDate(date){
            return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
        },
        onToggle(event){
            var item = event.target.closest('.pl-table-mobile__item');
            // eslint-disable-next-line
            $('.pl-table-mobile__item--expanded', item).slideToggle(500);
            var arrow = item.querySelector(".pl-table-mobile__item--ico");
            if(arrow.classList.contains("flip")){
                arrow.classList.remove('flip');
                return;
            }
            arrow.className += ' flip'; 
        }, 
        // eslint-disable-next-line
        onToggleFilter(event){       
            var item = document.getElementById("btnFilters");
            console.log(item.style.color.toString);
            item.classList.toggle("plus-active");
            
            $( "#filters" ).slideToggle( "slow", function() {
            });
            if(this.link == 'images/icons/other-icons/plus.svg'){
                this.link = 'images/icons/other-icons/minus.svg';
            }else{
                this.link = 'images/icons/other-icons/plus.svg';
            }
        },
        isOverdue(date_finish) {
            var eventTimeFinish = moment(date_finish);
            var currentTime = moment();
            var diffTime = eventTimeFinish.unix() - currentTime.unix();
            return diffTime < 0;
        },

        openModal(item) {
            this.modalData = item;
            this.showModal = true;
        },
        cancelarPedido(item) {
            let self = this;
            Swal.fire({
                title: 'Deseja realmente cancelar ?',
                text: "Esta ação não poderá ser revertida.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FFB119',
                // cancelButtonColor: '#d33',
                confirmButtonText: 'Sim',
                cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.value) {
                        self.$store.dispatch('auction/deleteAuction', { auction_id: item.id })
                    }
                })
            
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
        await this.$store.commit('auction/resetState');
        if(window.location.pathname === '/bids') {
            await this.$store.dispatch('auction/fetchAuctions');
            this.items = await this.$store.getters['auction/getAuctions'];
        } else {
            this.user = await this.$store.getters['auth/getUser'];
            
            await this.$store.commit('auction/setFilters', { status : 2,include: "station,fuel,uploads,lot.port,lot.bids", limit: 30, search: `station_id:${this.user.station.id}`, searchFields: 'station_id:=' });
            await this.$store.dispatch('auction/fetchAuctions');
            this.items = await this.$store.getters['auction/getAuctions'];
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
.flip{
  transform: rotate(-180deg);
}
.bid-btn{
    display: inline-block;
    width: 30px;
    height: 30px;
    padding: 0px;
    margin-right: 10px;
    text-align: center;
    border: 2px solid grey!important;
    background-color: #fff;
    border-radius: 2px!important;
    cursor: pointer;
    outline: none;
}
.plus-active{
    color: $yellow!important;
}
.pl-table__search--content{
    display: flex !important;
}
.pb-10{
    padding-bottom: 10px;
}
.pl-table-mobile{
    &__button{
        width: 100%;
        text-align: center;
        padding-top: 20px;
    }
    &__filters--component{
        width: 100%;
        display: block;
        border: 1px solid black;
        display: none;
    }
    .pl-table__item{
        &--success{
            line-height: 12px;
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
        }
        &--danger{
            line-height: 12px;
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
        }
        &--default{
            line-height: 12px;
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
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
    .container{
        width: 100%;
    }
    &__body{
        margin-bottom: 50px;
        background: $grey;
        width: 100%;
    }
    &__header{
        padding: 10px;
        height: 50px;
        text-transform: uppercase;
        &--text{
            color: #ffffff;
            padding-left: 5px;
            line-height: 20px;
        }
    }
    &__plus{
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 100%;
        float: left;
        width: 25%;
        font-size: 12px;
        padding-left: 10px;
        @include grid-media($smartphone-grid){
            width: 40%;
        }
    }
    &__search{
        line-height: 100%;
        display: flex !important;
        align-items: center;
        width: 75%;
        height: 100%;
        padding: 10px;
        &--content{
            display: flex !important;
            width: 100%;
            border: 1px solid rgba(white, 0.3);
            background-color: rgba(white, 0.3);
            img{
                padding-right: 10px;
                padding-left: 10px;
            }
            &:focus{
                outline: 1px solid $yellow;
            }
        }
        @include grid-media($smartphone-grid){
            width: 60%;
        }
    }
    &__expand{
        background: none;
        border: none;
        img{
            width: 100%;
            height: 100%;
        }
        &:visited{
            outline: none;
        }
        &:focus{
            outline: none;
        }
    }
    &__item{
        flex-flow: row;
        padding: 10px;
        background-color: #ffffff;
        border-left: 5px solid $yellow;
        border-bottom: 1px solid $darkgrey;
        border-right: 1px solid $darkgrey;
        font-size: 12;
        p{
            margin: 0 0 0 0;
            font-size: 12px;
        }
        table{
            width: 100%;

        }
        @include grid-media($smartphone-grid){
            padding: 10px 2px;
        }
        &--content{
            font-family: $roboto-family;
            font-weight: 600;
            td{
                padding: 0 10px;
                vertical-align: top;
            }@include grid-media($smartphone-grid){
                td{
                    padding: 0px 1px;
                }
            }
        }
        &--slot{
            width: 100%;
            height: 50%;
        }
        &--title{
            color: $darkgrey;
            font-family: $roboto-family;
            text-transform: uppercase;
            font-size: 10px;
            font-weight: 700;
            margin-top: 10px;
            margin-bottom: 0px;
            padding: 0;
            @include grid-media($smartphone-grid){
                font-size: 8px!important;
            }
        }
        &--default{
            padding: 0px 0px 0px 0px!important;
            width: 100%;
            text-align: center;
            margin: 0 0 0 0;
            text-transform: uppercase;
            background-color: $yellow;
            color: #fff;
        }
        &--danger{
            padding: 4px 1px 4px 1px;
            width: 100%;
            margin: 0 0 0 0;
            background-color: $redDanger;
            @include grid-media($smartphone-grid){
                font-size: 10px;
            }
        }
        &--success{
            padding: 4px 1px 4px 1px;
            width: 100%;
            margin: 0 0 0 0;
            background-color: $greenSuccess;
        }
        //table cols
        &--type{
            width: 15%;
            vertical-align: middle!important;
            color: $baseBlack;
            @include grid-media($smartphone-grid){
                span{
                    font-size: 10px;
                }
                width: 15%;
            }
        }
        &--left{
            width: 25%;
            color: $baseBlack;
            p{
                margin-bottom: 5px;
            }
            @include grid-media($smartphone-grid){
                font-size: 10px;
                
               p{
                   margin-bottom: 0px;
               }
                width: 25%;
            }
        }
        &--cod{
            width: 10%;
            color: $baseBlack;
        }
        &--props{
            width: 15%;
        }
        &--bid{
            width: 15%;
            p{
                margin-bottom: 5px;
            }
            @include grid-media($smartphone-grid){
                width: 15%;
                p{
                    margin-bottom: 0px;
                }
            }
        }
        &--ico{
            width: 10%;
            vertical-align: middle!important;
            -moz-transition: transform 0.5s;
            -webkit-transition: transform 0.5s;
            transition: transform s;
        }
        &--expanded{
            display: none;
            .expand{
                display: flex;
                align-items: center;
                padding: 10px 0 10px 0;
                &__address{
                    width: 30%;
                }
                &__code{
                    margin-left: 5%;
                    width: 20%;
                }&__freight{
                    width: 45%;
                }
                &__input{
                    width: 100%;
                }
                &__button{
                    width: 100%;
                    background-color: $yellow;
                }
            }
        }
    }
}
</style>
