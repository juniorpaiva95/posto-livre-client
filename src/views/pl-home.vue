<template>
    <main class="pl-home" id="pageTop">
        <section class="pl-home__presentation">
            <div class="container">
                    <div class="pl-home__presentation--content col">
                        <pl-title>Arremate e venda <br class="on-mobile-only"> lotes com os melhores preços por litro</pl-title>
                        <p class="pl-home__presentation--excerpt">
                            Participe de leilões de combustíveis com os melhores preços. 
                            Crie sua conta, faça <br> anúncios com sua necessidade e aguarde pelas 
                            melhores propostas de negócio.
                        </p>
                        <router-link :to="{ name: 'register'}" class="pl-home__link">
                            <pl-btn text="Começar agora" type="wider"></pl-btn>
                        </router-link>
                    </div>
            </div>
            <img src="images/section-images/presentation-img.svg">
        </section>
        <section class="pl-home__info" id="howItWorks">
            <div class="container" >
                <div  id="funciona" class="pl-home__info--content col">
                    <pl-title>Como o Posto Livre funciona?</pl-title>
                    <p class="pl-home__info--text">
                        A plataforma opera com postos bandeira branca,
                        proporcionando leilões anônimos para postos e distribuidoras,
                        garantindo menor preço de compra de combustíveis. Quando o processo do leilão termina,
                        ambos entram em contato para finalizar a negociação.
                    </p>
                </div>

                <div class="pl-home__info--cards col-12">
                    <div class="col-4 card">
                        <img src="images/cards/Card1.svg">
                    </div>
                    <div class="col-4 card">
                        <img src="images/cards/Card2.svg">
                    </div>
                    <div class="col-4 card">
                        <img src="images/cards/Card3.svg">
                    </div>
                </div>
            </div>
        </section>
        <section class="pl-home__about" id="pros">

            <div id="about" class="container">
                <pl-title theme="yellow" class="pl-home__about--title">
                    O surgimento de um novo mercado.<br> melhores acordos de compra e venda.
                </pl-title>
            </div>

            <pl-gallery />
        
            <div class="container pl-home__about--second">
                <div class="col" >
                    <pl-title class="pl-home__about--title">
                    posto bandeira branca e distribuidor encontram-se aqui.
                    </pl-title>
                </div>
                <div class="pl-home__about--icons col-12">
                    <div class="pl-home__about--icons--card col-4">
                        <div class="pl-home__about--icons--card--content">
                            <img class="pl-home__about--icons--card--image" src="images/icons/icon-cards/gasolina.svg">
                        </div>
                        <div class="pl-home__about--icons--card--text">
                            <p>Encontre as melhores oportunidades de negócios em combustíveis</p>
                        </div>
                    </div>
                    <div class="pl-home__about--icons--card col-4">
                        <div class="pl-home__about--icons--card--content pl-home__about--icons--dotted">
                            <img class="pl-home__about--icons--card--image" src="images/icons/icon-cards/escudo.svg">
                        </div>
                        <div class="pl-home__about--icons--card--text">
                            <p>Compre e venda com a segurança e praticidade do Posto Livre</p>
                        </div>
                    </div>
                    <div class="pl-home__about--icons--card pl-home__about--icons--last col-4 ">
                        <div class="pl-home__about--icons--card--content">
                            <img class="pl-home__about--icons--card--image" src="images/icons/icon-cards/bandeira.svg">
                        </div>
                        <div class="pl-home__about--icons--card--text">
                            <p>Encontre as melhores oportunidades de negócios em combustíveis</p>
                        </div>
                    </div>
                </div>
            </div>    
        </section>
        <div class="pl-home__city">
            <img class="pl-home__city--image" :src=link>
        </div>
        <pl-toTop />
    </main>
</template>

<script>

import PLTitle from '@/components/atoms/pl-title';
import PLGallery from '@/components/sections/pl-gallery';
import PLBtn from '@/components/atoms/pl-btn';
import PLTop from '@/components/atoms/pl-toTop';

const TIMEOUT = 1;

export default {
    components: {
        'pl-title': PLTitle,
        'pl-gallery': PLGallery,
        'pl-btn': PLBtn,
        'pl-toTop': PLTop,
    },
    computed: {
        currentRouteName() {
            return this.$route;
        }
    },
    data: () =>  ({
       link : 'images/section-images/urban.svg',
       info: null,
    }),
    mounted(){
        this.onMobile();
        window.addEventListener('resize', this.onMobile);
        // route hash
        if (this.$route.hash) {
            setTimeout(() => this.scrollTo(this.$route.hash), TIMEOUT)
        }
    },
    methods: {
        onMobile(){
            var newlink = 'images/section-images/urban-mobile.svg';
            if(window.outerWidth < 764){
                this.link = newlink;
            }
        }, 
        scrollTo: function (hashtag) {
			setTimeout(() => { location.href = hashtag }, TIMEOUT)
		},
    }
}
</script>

<style lang="scss">

.pl-home{
    font-family: $roboto-family;
    @include grid-container;
    &__link{
        text-decoration: none;
    }
    h1{
        font-weight: bold;
        color: #333333;
        text-align: center;
        margin-left: 10px;
        margin-right: auto;
    }
    &__presentation{
        min-height: calc(100vh - 100px);
        text-align: center;
        position: relative;
        &--content{
            margin-top: 50px;
            @media (max-width: 764px){
                margin-top: 0px;
                position: static;
            }
            @media (max-width: 375px) and (min-height: 810px){
                margin-top: 50px;
            }
        }
        &--excerpt{
            margin-bottom: 40px;
            line-height: 150%;
            letter-spacing: 3%;
            font-weight: 400;
            font-size: 16px;
            @media (max-width: 320px){
                line-height: 100%;
                margin-bottom: 20px;
            }
        }
        img{
            width: 100%;
            @media(max-height: 635px){
                max-height: 240px!important;
            }
            @media(max-height: 680px){
                max-height: 270px;
            }
            max-width:700px;
            @media (min-width: 991px){
                max-width:800px;
            }
            @media (min-height: 800px){
                max-width: 900px;
            }
            @media (min-height: 825px){
                max-width: 1000px;
            }
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            margin: 0 auto;
        }
        @media (max-height: 730px){
            &--content{
                margin-top: 0px;
                @media (max-width: 764px){
                    margin-top: 0px;
                    position: static;
                }
            }
        }
    }

    &__info{
        padding: 100px 0 100px 0;
        @media (max-width: 764px) {
            padding: 0px 0 0px 0;
            @include grid-container;
        }
        min-height: calc(100vh - 200px);
        background-color: rgba($yellow, 0.1);
        &--text{
            text-align: center;
        }
        &--cards{
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            text-align: center;
            justify-content: center;
            margin-top: 50px;
            .card{
                margin-left: auto;
                margin-right: auto;
                max-height: 400px;
                max-width: 288px;
                img{
                    width: 100%;
                    margin: auto;
                    text-align: center;
                }
                margin-bottom: 20px;
            }
        }
    }
    &__about{
        padding-top: 100px;
        &--second{
            margin-top: 0px;
            padding-top: 0px !important;
            col{
                padding-top: 0px !important;
            }
        }
        &--title{
            padding-top: 0px !important;
            margin-top: 0px !important;
        }
        @include grid-media($smartphone-grid){
            padding-top: 20px;
            br{
                display: none;
            }
        }
    }
    &__city{
      width: 100%;
      img{
        width: 100%;
        margin-top: -100px;
        margin-bottom: -2px;
        z-index: 0;
      }
    }
    &__about--icons{
      margin-top: 20px;
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      &--card{
          position: relative;
          text-align: center;
          &--text{
                padding: 0 ;
                font-size: 16px;
                width: 300px;
                line-height: 150%;
                margin: auto;
                @include grid-media($smartphone-grid){
                    width: 100%;
                }
                @media screen and(min-width: 768px) and (max-width: 934px){
                    width: 200px;
                }
          }
          &--image{
                width: 70px;
                height: 100px;
          }
          @include grid-media($smartphone-grid){
                margin-bottom: 150px;
          }
      }
      &--last{
          @include grid-media($smartphone-grid){
                margin-bottom: 50px!important;
          }
      }
      &--dotted{
          &:before{
                content: ' ';
                position: absolute;
                width: 70%;
                right: 70%;
                border-bottom: 10px $middlegrey dotted;
                top: 45px;
          }
          &:after{
                content: ' ';
                position: absolute;
                width: 70%;
                left: 70%;
                border-bottom: 10px $middlegrey dotted;
                top: 45px;
                @media (max-width: 320px){
                    width: 60%!important;
                    left: 20%!important;
                    top: 20px;
                }
          }
          @include grid-media($smartphone-grid){
                &:before{
                    content: ' ';
                    position: absolute;
                    transform: rotate(90deg);
                    width: 50%;
                    right: 25%;
                    @media (max-width: 768px) and (min-width: 424px){
                        width: 25%;
                        right: 37%;
                    }
                    margin-top: -130px;
                    //right: 70%;
                    border-bottom: 10px $middlegrey dotted;
                }
                &:after{
                    content: ' ';
                    position: absolute;
                    transform: rotate(90deg);
                    width: 50%;
                    left: 25%;
                     @media (max-width: 768px) and (min-width: 424px){
                        top: 75px;
                        width: 25%;
                        left: 37%;
                    }
                    top: 95px;
                    margin-top: 150px;
                    //right: 70%;
                    border-bottom: 10px $middlegrey dotted;
                }
          }
      }
    }
}
</style>