<template>
    <div class="pl-navlist">
        <router-link :to=links[index] v-for="(value, index) in options" :key="value.name" >
            {{options[index]}}
        </router-link>    
    </div>
</template>
<script>
export default {
    props:{
        options: Array,
        links: Array
    },
    methods: {
        goLink(link){
            window.open(link);
        }
    }
}
</script>
<style lang="scss">
.pl-navlist{
    font-family: $barlow-family;
    width: 100%;
    font-weight: 500;
    text-transform: uppercase;
    color: #ffffff;
    text-align: center;
    a{
        display: inline-block;
        margin: 0 15px 0 15px;
        text-decoration: none;
        &:hover{
            color: $yellow!important;
            cursor: pointer;
        }
        &:active{
            text-decoration: none;
            color: $yellow!important;
        }
        &:visited{
            text-decoration: none;
            color: #ffffff;
        }
    }
}
</style>