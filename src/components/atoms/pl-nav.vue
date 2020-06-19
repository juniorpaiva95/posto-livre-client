<template>
    <nav class="pl-nav">
        <a class="pl-nav__link" v-scroll-to="'#howItWorks'">COMO FUNCIONA</a>
        <a class="pl-nav__link" v-scroll-to="'#pros'">VANTAGENS</a>
        <router-link to="cadastro" class="router">
            <a class="pl-nav__link">COMEÇAR</a>
        </router-link>    
        
    </nav>    
</template>
<script>
export default {
    
}
</script>

<style lang="scss">
.pl-nav{
    text-transform: uppercase;
    min-width: 200px;
    text-align: center;
    .router{
        text-decoration: none;
    }
    &__link{
        text-decoration: none;
        white-space: nowrap;
        color: #ffffff;
        margin: 0 10px 0 10px;
        font-size: 14px;
        cursor: pointer;
        @include grid-media($smartphone-grid){
            font-size: 12px;
        }
    }   
  
}
</style>
