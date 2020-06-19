<template>
    <button class="pl-toTop" @click="topFunction()">
        <img src="images/icons/other-icons/btn-arrow.svg" alt="">
    </button>
</template>
<script>
export default {
    methods: {
        topFunction() {
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
    }
}
</script>
<style lang="scss">
.pl-toTop{
    cursor: pointer;
    background-color: $yellow;
    border: 1px solid $yellow;
    margin-top: -20px;
    width: 50px;
    height: 50px;
    align-content: center;
    display: none;
    position: absolute;
    right: 5%;
    &:focus{
        outline: $yellow;
    }
    @include grid-media($smartphone-grid){
        display: block;
    }
}
</style>
