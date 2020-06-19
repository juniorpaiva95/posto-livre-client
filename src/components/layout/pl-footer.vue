<template class="container">
    <footer class="pl-footer__body">
        <div class="pl-footer__container">
            <div class="pl-footer__content col">
                <div class="pl-footer__logo ">
                    <div class="pl-footer__logo--box">
                        <pl-brand theme="yellow">
                        </pl-brand>
                    </div>
                </div>
                <div class="pl-footer__nav">
                      <pl-navlist
                        v-bind:options="options"
                        v-bind:links="links"
                        v-bind:hashes="hashes"
                        >
                      </pl-navlist>
                </div>    
                <div class="pl-footer__social">
                    <p class="pl-footer__text">Siga-nos</p>
                    <a href="https://google.com">
                        <img class="pl-footer__icon" src="images/icons/social/Youtube.svg">
                    </a>
                    <a href="https://google.com">
                        <img class="pl-footer__icon" src="images/icons/social/WhatsApp.svg">
                    </a>
                    <a href="https://google.com">
                        <img class="pl-footer__icon" src="images/icons/social/LinkedIn.svg">
                    </a>
                </div>
                <div class="pl-footer__credits">
                    <a href="http://qualitare.com.br/">
                        <p class="pl-footer__text">
                            Feito com <img src="images/icons/social/Qualitare.svg"> 
                        </p>
                    </a>    
                </div>    
                <div class="pl-footer__disclaimer">
                    © 2019 PostoLivre. All Rights Reserved. Cookie Policy. Terms &#38; Conditions. Privacy Policy.
                </div>    
            </div>    
        </div>   
    </footer>
</template>
<script>
import PLBrand from '@/components/atoms/pl-brand';
import PLNavList from '@/components/atoms/pl-navlist';

export default {
    components: {
        'pl-brand': PLBrand,
        'pl-navlist': PLNavList,
    },
    props: {
        options: Array,
        links: Array,
        hashes: Array,
    }
}
</script>
<style lang="scss">
.pl-footer{
    &__body{
        font-family: 'Barlow', sans-serif;
        z-index: 100;
        background-color: $grey;
        width: 100%;
        min-height: 300px;
        padding-bottom: 20px;
        @include grid-media($smartphone-grid){
            min-height: 400px;
        }
    }
    &__container{
       
        height: 100%;
        pl-brand{
            width: 200px;
        }
    }
    &__logo{
        text-align: center;
        align-content: center;
        align-items: center;
        @include grid-column(3);
        @include grid-push(4.5);
        @include grid-media($smartphone-grid){
            @include grid-column(8);
            @include grid-push(2);
        }
        margin-top: 60px;
        &--box{
            margin: auto;
            max-width: 200px;
        }
    }
    &__nav{
        margin-top: 20px;
        @include grid-column(12);
        @include grid-media($smartphone-grid){
            @include grid-column(12);
        }
    }
    &__social{
        text-align: center;
        @include grid-column(6);
        @include grid-push(3);
        @include grid-media($smartphone-grid){
            @include grid-column(12);
        }
    }
    &__icon{
        margin: 0 10px 0 10px;
        cursor: pointer;
    }
    &__credits{
        white-space: nowrap;
        a{
            widows: 50%;
            text-decoration: none;
        }
        a:visited{
            text-decoration: none;
        }
        text-align: center;
        @include grid-column(6);
        @include grid-push(3);
        p{
            vertical-align: middle;
        }
        img{
            display: inline;
            vertical-align: middle;
        }
    }
    &__text{
        color: #ffffff;
        text-transform: uppercase;
    }
    &__disclaimer{
        color: $middlegrey;
        text-align: center;
        @include grid-column(8);
        @include grid-push(2);
    }
}
</style>


