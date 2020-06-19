<template>
    <h1 class="pl-title"
    :class="[
        'pl-title--' + theme
    ]"
    >
        <slot></slot>    
    </h1>
</template>
<script>
export default {
    props:{
        theme:{
            type: String,
            default: 'default',//  default || darker || white
        },
        text: String,
    }
}
</script>
<style lang="scss">
h1{
    font-family: 'Barlow', sans-serif;
    text-transform: uppercase;
    text-align: center;
    font-size: 40px;
    color: #434343!important;
    @include grid-media($smartphone-grid){
        font-size: 26px;
        @media (max-width: 320px){
            font-size: 24px;
        }
    }
}
.pl-title{
    &--yellow{
        color: $yellow!important;
    }
    &--default{
        color: $blackBase;
    }
    &--blackBase{
        color: $blackBase;
    }
    &--bid{
        color: $greenSuccess;
        margin-bottom: 0px;
        margin-top: 0px;
        font-size: 20px;
        text-align: left;
    }
}
</style>