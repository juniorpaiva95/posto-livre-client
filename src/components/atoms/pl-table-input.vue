<template>
    <div class="pl-table-input">
        <div class="pl-table-input__field">
            <div @click="decrement()">
                <img src="images/icons/other-icons/to-down.svg" alt="">
            </div>
            <input id="pl-input" placeholder="Ex.: 123..." type="text" v-model="value" @keydown="onKeydown"/>
            
            <div @click="increment()">
                <img src="images/icons/other-icons/to-up.svg" alt="">
            </div>
        </div>
        <div class="pl-table-input__button" @click="darLance()">
            <pl-btn class="btn" type="full" text="dar lance"></pl-btn>
        </div>
        <pl-modalb 
        v-if="showModalBid" @close="showModalBid = false"></pl-modalb>
    </div>
</template>
<script>
import PLBtn from '@/components/atoms/pl-btn';
import PLBidModal from '@/components/sections/pl-bidModal';
export default {
    components: {
        'pl-btn': PLBtn,
        'pl-modalb': PLBidModal,
    },
    props: {
        item: {
            type: Object
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        }
    },
    data: () => ({
        value: null,
        showModalBid: false,
    }),
    methods:{
        darLance() {
            this.$store.dispatch('bid/createBid', {auction_id: this.item.id, value: this.value}).then(() => {
                this.showModalBid = true;
                //Reload auctions
                this.$store.dispatch('auction/fetchAuctions');
            });
        },
        increment(){  
            if(this.value >= this.max){
                this.value = this.max;
                return;
            }
            
            this.value = +this.value + this.step; 
        },
        decrement(){
             if(this.value <= this.min){
                this.value = this.min;
                return;
            }
            this.value = +this.value - this.step; 
        }
    }
}
</script>
<style lang="scss">
.pl-table-input{
    width: 100%;
    &__field{
        width: 100%;
        height: 40px;
        background-color: #ffffff;
        border: 2px solid $middlegrey;
        display: flex;
        margin-bottom: 10px;
        align-items: center;
        input{
            width: 80%;
            background: transparent;
            border: none;
            text-align: center;
            color: $middlegrey;
            font-weight: bold;
            font-family: $roboto-family;
            font-size: 14px;
            height: 100%;
            &:focus{
                outline: none;
            }
        }
        div{
            width: 10%;
            height: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            cursor: pointer;
        }
        &:focus{
            outline: 1px $yellow;
        }
        img{
            margin: auto;
            max-width: 20px;
        }
    }
    &__button{
        width: 100%;
        height: 40px;
        pl-btn{
            width: 100%;
            height: 40px;
        }
        .btn{
            width: 100%;
            height: 40px;
        }
    }
}
</style>

