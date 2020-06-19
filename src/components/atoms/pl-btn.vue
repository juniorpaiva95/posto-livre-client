<template>
    <button class="pl-btn" :class="[`pl-btn--${type}`]">{{ text }}</button>       
</template>

<script>
export default {
    props:{
        text: String,
        theme: String, //  default
        type: String,
    }
}
</script>
<style lang="scss">
.pl-btn{
    cursor: pointer;
    font-family: $barlow-family;
    letter-spacing: 3%;
    font-weight: 500;
    text-transform: uppercase;
    padding-top: 12px;
    padding-bottom: 12px;
    display: inline;
    font-size: 14px;
    border: none;
    color: #fff;
    background-color: $yellow;
    &--standard{
        padding: 13px 29px;
        margin: auto;
        @include grid-media($smartphone-grid) {
             padding: 11px 8px;
             @media screen and(max-width: 370px) {
                 padding: 10px 7px;
                 font-size: 12px;
             }
        }
    }
    &:hover{
        background-color: #F7A400;
    }
    &--shorter{
        width: 30%;
    }
    &--wider{
        padding: 13px 84px;
        @include grid-media($smartphone-grid){
            width: 256px;
            padding: 13px 0px;
        }
    }
    &--full{
        width: 100%;
    }
    &--auth{
        padding: 13px 35px;
        @include grid-media($smartphone-grid){
            padding: 11px 8px;
        }
        @media (max-width:  330px){
            font-size: 12px;
            padding: 10px 2px;
        }
    }
    &--table{   
        @include grid-media($small-desktop-grid){
            padding: 2px;
            font-size: 12px;
        }
    }
    &--tableBid{
        width: 100%;
    }
}
</style>