<template>
    <div class="pl-navitem">
        <slot></slot>
    </div>    
</template>

<style lang="scss">

.pl-navitem{
    cursor: pointer;
    display: inline-block;
    position: relative;
    font-size: 16px;
    margin-left: 30px;
    text-transform: uppercase;
    font-family:  'Barlow', sans-serif;
    font-weight: 500;
    color: #ffffff;
    &:hover{
        color: $yellow;
    }
}
</style>
