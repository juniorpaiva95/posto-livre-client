<template>
    <section class="pl-notfound">
        <div class="container">
            <div class="col">
                <section class="pl-notfound__main">
                    <pl-title>
                        ERRO
                    </pl-title>
                    <div class="pl-notfound__404">
                        <img src="images/section-images/not-found.svg" alt="">
                    </div>
                    <pl-title class="pl-notfound__subtitle">
                        essa página não pode ser encontrada ou teve
                        o endereço alterado
                    </pl-title>
                </section>
            </div>
        </div>
        <div class="pl-notfound__image">
            <img :src=link alt="">
        </div>
        <pl-toTop></pl-toTop>
    </section>
</template>
<script>
import PLTitle from '@/components/atoms/pl-title';
import PLTop from '@/components/atoms/pl-toTop';

export default {
    components: {
        'pl-title': PLTitle,
        'pl-toTop': PLTop,
    },
    data: () =>  ({
       link : 'images/section-images/gasoline.png',
    }),
    mounted(){
        this.onMobile();
        window.addEventListener('resize', this.onMobile);
    },
    methods: {
        onMobile(){
            var newlink = 'images/section-images/gasoline-mobile.png';
            if(window.outerWidth < 764){
                this.link = newlink;
            }
        }
    }
}
</script>
<style lang="scss">
.pl-notfound{
    overflow: hidden;
    .col{
        text-align: center;
        align-content: center;
        align-items: center;
    }
    &__404{
        text-align: center;
        img{
            height: 100px;
            margin-right: auto;
            margin-left: auto;
            width: 100%;
        }
    }
    &__subtitle{
        font-size: 24px;
    }
    &__image{
        margin-bottom: -10px;
        height: 50%;
    }
}
</style>
