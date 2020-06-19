<template>
    <transition class="pl-bid">
        <div class="pl-bid__backdrop">
            <div class="pl-bid__body">
                <div class="pl-bid__body--text">
                    <pl-title theme="bid">
                    LANCE OFERTADO COM SUCESSO
                    </pl-title>
                    <p>Agora resta aguardar e continuar competindo</p>
                </div>
                <div class="pl-bid__body--icon" @click="$emit('close')">
                    <img src="images/icons/other-icons/close-modal.svg" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import PLTitle from '@/components/atoms/pl-title';
export default {
    components: {
        'pl-title': PLTitle,
    },
    name: 'modal',
    data: () => ({
        showModalBid: false,
    })
}
</script>
<style lang="scss">
.pl-bid{
    &__backdrop{
        position: fixed;
        z-index: 10;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: opacity .3s ease;
    }
    &__body{
        background-color: #fff;
        border-left: 5px solid $yellow;
        padding: 10px;
        width: 400px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        &--text{
            width: 90%;
            text-align: left;
            p{
                margin: 0px;
            }
        }
        &--icon{
            width: 10%;
            cursor: pointer;
        }
    }
}
</style>
