<template>
    <div class="pl-header-station">
        <header class="pl-header-station__header">
            <div class="pl-header-station__container">
                
                <div class="pl-header__logo">
                    <router-link to="/"><pl-brand theme="white"></pl-brand></router-link>
                </div>
                <div class="pl-header-station__content">
                    <div class="box">

                        <router-link :to="{ name: 'station.createauction' }">
                            <pl-btn class='pl-header-station__start' text="Criar Leilão" type="standard"></pl-btn>
                        </router-link>

                        <div class="pl-header-station__items">
<!--                            <router-link :to="{ name: 'notificacoes'}">-->
<!--                                <pl-navbell />-->
<!--                            </router-link>-->
                            <router-link :to="{ name: 'station.feed' }">
                                <pl-navItem>Lances</pl-navItem>
                            </router-link>
                            <router-link :to="{ name: 'station.auctions' }">
                                <pl-navItem>Meus Leilões</pl-navItem>
                            </router-link>
                        </div>
                        <pl-control />
                        <div>
                            <img src="images/section-images/Avatar.png" alt="">
                        </div>  
                    </div>
                   
                </div>
            </div>
        </header>
    </div>
</template>
<script>
import PlBrand from "@/components/atoms/pl-brand";
import PlBtn from "@/components/atoms/pl-btn";
import PlNavItem from "@/components/atoms/pl-navItem";
import PlNavBell from "@/components/atoms/pl-navbell";
import PlControl from "./pl-control";

export default {
    components:{
        "pl-brand": PlBrand,
        "pl-navItem": PlNavItem,
        "pl-btn": PlBtn,
        "pl-navbell": PlNavBell,
        "pl-control": PlControl
    }
}
</script>

<style lang="scss">
.pop{
    @media screen and(max-width: 925px){
        display: none;
    }
}
.box{
    display: flex;
    position: absolute;
    right: 0;
    align-content: center;
    align-items: center;
    a {
        text-decoration: none;
    }
}
.pl-header-station{
    position: sticky;
    height: 100px;
    width: 100%;
    top:0;
    z-index: 2;
    &__start{
        margin-right: 20px;
    }
    &__header{
        background-color: $darkgrey;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
    }
    &__container {
        width: 100%;
        height: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        @include outer-container;
    }
    &__content{
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        padding-left: 5%;
        img{
            max-width: 55px; 
        }
        @media screen and(max-width: 925px){
            padding-left: 0%;
        }
    }
    &__items{
        text-decoration: none;
        margin-right:20px;
        padding: 5px 20px 5px 0px;
        border-right: solid 1px white;
        a {
            color: white;
        }
    }
    
}
@include grid-media($smartphone-grid) {
  .pl-header-station{
    &__profile{
        padding-right: 1px;
        img{
            margin-left: 5px;
        }
    }
    &__profile--nav {
      display: none;
    }
    &__logo {
      width: 160px;
    }
    &__start{
        margin-right: 6px;
    }
    &__items{
        border: none;
        text-align: right;
        align-content: right;
        padding: 0px;
        margin-right: 0px;
    }
    &__content{
        width: 100%;
        padding-left: 5%;
        img{
            max-width: 45px; 
        }
    }
  }
}
</style>
