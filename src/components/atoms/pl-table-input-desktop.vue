<template>
    <div class="pl-table-input-desktop">
        <div class="pl-table-input-desktop__field">
            <div @click="decrement()">
                <img src="images/icons/other-icons/to-down.svg" alt="">
            </div>
            <input type="number" v-model="value" v-mask="'#.###'" @keypress="onKeydown" @blur="validateBlur"/>
            <div @click="increment()">
                <img src="images/icons/other-icons/to-up.svg" alt="">
            </div>
        </div>
        <div class="pl-table-input-desktop__button" id="show-modal" @click="darLance()">
            <pl-btn class="btn" type="full" text="dar lance">
            </pl-btn>
        </div>
        <pl-modalb v-if="showModalBid" @close="showModalBid = false"></pl-modalb>
    </div>
</template>
<script>
import PlBtn from '@/components/atoms/pl-btn';
import PlBidModal from '@/components/sections/pl-bidModal';
import Swal from 'sweetalert2';

export default {
    components: {
        'pl-btn': PlBtn,
        'pl-modalb': PlBidModal,
       
    },
    props: {
        item: {
            type: Object
        },
        min: {
            type: Number,
            default: 0.000,
        },
        max: {
            type: Number,
            default: 10.000,
        },
        step: {
            type: Number,
            default: .0011,
        }
    },
    data: () => ({
        value: 0.000,
        showModalBid: false,
    }),
    methods:{
        darLance() {
            if(this.value < 0.001) {
                Swal.fire({
                            position: "bottom-end",
                            type: "error",
                            title:
                                "O valor do lance deve ser maior que 0",
                            showConfirmButton: false,
                            timer: 3000,
                            toast: true
                        });
                return ;
            }

            this.$store.dispatch('bid/createBid', { auction_id: this.item.id, value: this.value }).then(() => {
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
            console.log(this.value)
            

        },
        decrement(){
             if(this.value <= this.min){
                this.value = this.min;
                return;
            }
            this.value = +this.value - this.step;
        },
        validateBlur(e) {
            //    Validate number
            let number = parseFloat(e.target.value);
            if (number > this.max) {
                this.value = this.max;
            } else if (number < this.min) {
                this.value = this.min;
            }
        },
        onKeydown(e) {
            // Up key: Increase the value
            if (e.keyCode === 38) {
                this.increment()
                e.preventDefault()
                return
            }

            // Down key: Decrease the value
            if (e.keyCode === 40) {
                this.decrement()
                e.preventDefault()
                return
            }

            // Allow these keys only:
            if (
                // backspace, delete, tab, escape, enter, dot
                [46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) >= 0 ||
                // Ctrl/cmd+A
                (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
                // Ctrl/cmd+C
                (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
                // Ctrl/cmd+R
                (e.keyCode === 82 && (e.ctrlKey || e.metaKey)) ||
                // Ctrl/cmd+X
                (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
                // home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)
            ) {
                return
            }

            if (
                (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
                (e.keyCode < 96 || e.keyCode > 105)
            ) {
                e.preventDefault()
            }
        },
    }
}
</script>
<style lang="scss">

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button
{
  -webkit-appearance: none;
  margin: 0;
}

.pl-table-input-desktop{
    display: flex;
    align-items: center;
    align-content: center;
    &__field{
        margin: 0;
        border: 1px solid $greyDisabled;
        height: 40px;
        width: 60%;
        display: flex;
        align-items: center;
        input{
            width: 60%;
            border: none;
            background: transparent;
            text-align: center;
            color: $greyDisabled;
            font-weight: bold;
            font-family: $roboto-family;
            font-size: 14px;
            height: 100%;
            &:focus{
                outline: none;
            }
            &::placeholder{
                color: $greyDisabled;
                opacity: 1; /* Firefox */
            }
        }
        div{
            width: 20%;
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
            max-width: 8px;
        }
    }
    p{
        margin: 0;
        padding: 0;
    }
    &__button{
        cursor: pointer;
        width: 40%;
        .btn{
            width: 100%;
            height: 40px;
            &:focus{
                outline: $yellow;
            }
        }
    }
}
</style>
