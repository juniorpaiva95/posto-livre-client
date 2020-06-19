<template>
    <div class="pl-header-distributor">
        <header class="pl-header-distributor__header">
            <div class="pl-header-distributor__container">
                
                <div class="pl-header__logo">
                    <router-link to="/"><pl-brand theme="yellow"></pl-brand></router-link>
                </div>
                <div class="pl-header-distributor__content">
                    <div class="box">
                        <div class="pl-header-distributor__items">
<!--                            <router-link :to="{name: 'notificacoes'}">-->
<!--                                <pl-navbell/>-->
<!--                            </router-link>-->
                            <router-link :to="{ name: 'distributor.feed' }">
                                <pl-navItem>Leilões</pl-navItem>
                            </router-link>
                            <router-link :to="{ name: 'distributor.bids' }">
                                <pl-navItem>Meus lances</pl-navItem>
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
.pl-header-distributor{
    position: sticky;
    height: 100px;
    width: 100%;
    top:0;
    z-index: 2;
    &__start{
        margin-right: 20px;
    }
    &__header{
        background-color: $grey;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
    }
    &__container {
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        @include outer-container;
    }
    &__items{
        margin-right:20px;
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
        padding: 5px 20px 5px 0px;
        border-right: solid 1px white;
    }
    
}
@include grid-media($smartphone-grid) {
  .pl-header-distributor{
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
