<template>
    <section class="pl-bidTable-mobile">
        <div class="container">
            <div class="pl-bidTable-mobile__body">
                <div class="pl-bidTable-mobile__header">
                    <div class="pl-bidTable-mobile__plus" @click="onToggleFilter">
                        <img :src=link>
                        <span class="pl-bidTable-mobile__header--text" id="btnFilters">
                            Mostrar Filtros
                        </span>
                    </div>
                    <div class="pl-bidTable-mobile__search">
                            <div class="pl-bidTable-mobile__search--content">
                                <img src="images/icons/other-icons/search.svg" alt="">
                                <pl-input size="large" placeholder="EX.: Diesel">
                                </pl-input>   
                            </div>
                    </div> 
                </div>
                <div class="pl-bidTable-mobile__filters--component" id="filters">
                    <pl-filters></pl-filters>
                </div>
                <div class="pl-bidTable-mobile__item"
                :class="`${item.categoryClass}`"
                 v-for="(item, i) in data" :key="i">
                    <table class="pl-bidTable-mobile__item--content">
                        <tr>
                            <td class="pl-bidTable-mobile__item--left">
                                <p class="pl-bidTable-mobile__item--title">Data</p>
                                <div class="pl-bidTable-mobile__item--slot" >
                                    <!--v-html="item.time_left"-->
                                    <p> 31/08/2002</p>
                                </div>
                                <div class="expand__code">
                                    <p class="pl-bidTable-mobile__item--title">COD.</p>
                                    <p>{{item.code}}</p>
                                </div>
                            </td>
                            <td class="pl-bidTable-mobile__item--props" >
                                <p class="pl-bidTable-mobile__item--title">Distribuidor</p>
                                <p>Posto Parahyba</p>
                                <p class="pl-bidTable-mobile__item--title">Quantidade</p>
                                <p>{{item.amount}}</p>
                            </td>
                            <td class="pl-bidTable-mobile__item--cod" >
                                <p class="pl-bidTable-mobile__item--title">Melhor Lance</p>
                                <p>{{item.low_bid}}</p>
                                <p class="pl-bidTable-mobile__item--title">Frete</p>
                                <p>{{item.freight}}</p> 

                            </td>
                            <td class="pl-bidTable-mobile__item--bid">
                                <p>{{item.category}}</p>
                                <p>{{item.address}}</p>
                                 
                            </td>
                            <td class="pl-bidTable-mobile__item--ico">
                                <button class="pl-bidTable-mobile__expand"  @click="onToggle">
                                    <p>...</p>
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col-12">
                <div class="pl-bidTable-mobile__button">
                    <pl-btn type="standard" text="Mostrar Mais">
                    </pl-btn>
                </div>
            </div>
        </div>
    </section>    
</template>
<script>
/* eslint-disable */ 
// due to annoying eslint pseudo errors
import PLInput from '@/components/atoms/pl-input';
import PLTableInput from '@/components/atoms/pl-table-input';
import PLFilters from '@/components/sections/pl-filters';
import PLBtn from '@/components/atoms/pl-btn';

export default {
    props: {
        data: {
            type: Array,
            default: () => ([]),
        }
    }, components: {
        'pl-input': PLInput,
        'pl-filters': PLFilters,
        'pl-btn': PLBtn,
        
    },
    data: () =>  ({
       link : 'images/icons/other-icons/plus.svg',
    }),
    methods: {
        onToggle(event){
            console.log("Todo");
        }, 
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
    }
}

</script>
<style lang="scss">
.flip{
  transform: rotate(-180deg);
}
.plus-active{
    color: $yellow!important;
}
.pl-bidTable-mobile{
    font-family: $roboto-family;
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
    .pl-bidTable-mobile__item{
        &--success{
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
        }
        &--danger{
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
        }
        &--default{
            padding: 4px 0px 4px 4px;
            display: inline-block;
            width: calc(100% - 4px);
        }
    }
    .-gasolinaComum{
        border-left: 5px solid $yellow!important;
    }
    .-gasolinaAditivada{
        border-left: 5px solid #01A39D!important;
    }
    .-etanol{
        border-left: 5px solid #8D99AE!important;
    }
    .-diesel{
        border-left: 5px solid #000000!important;
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
        display: flex;
        align-items: center;
        width: 75%;
        height: 100%;
        padding: 10px;
        &--content{
            width: 100%;
            border: 1px solid rgba(white, 0.3);
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
            color: $baseBlack;
        }
        &--left{
            width: 15%;
            color: $baseBlack;
        }
        &--cod{
            width: 20%;
            color: $baseBlack;
        }
        &--props{
            width: 20%;
            color: $baseBlack;
        }
        &--bid{
            width: 25%;
            color: $baseBlack;
            p{
                margin-bottom: 5px;
            }
        }
        &--ico{
            width: 5%;
            button{
                width: 80%;
                border: 2px solid grey;
                border-radius: 5px;
                display: flex;
                align-content: center;
                align-items: center;
            }
            -moz-transition: transform 0.5s;
            -webkit-transition: transform 0.5s;
            transition: transform s;
        }
        
    }
}
</style>
