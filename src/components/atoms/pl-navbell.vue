<template>
   <span class="pl-navbell" :class="['pl-navbell', 'pl-navbell--' + theme]">
        <svg width="16" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 19.5C9.1 19.5 10 18.6 10 17.5H6C6 18.6 6.9 19.5 8 19.5ZM14 13.5V8.5C14 5.43 12.37 2.86 9.5 2.18V1.5C9.5 0.67 8.83 0 8 0C7.17 0 6.5 0.67 6.5 1.5V2.18C3.64 2.86 2 5.42 2 8.5V13.5L0 15.5V16.5H16V15.5L14 13.5ZM12 14.5H4V8.5C4 6.02 5.51 4 8 4C10.49 4 12 6.02 12 8.5V14.5Z" fill="white"/>
        </svg>
   </span>
</template>
<script>
export default {
    props:{
        text: String,
        theme: {
            type: String, //white, default
            default: 'default',    
        }
    }
}
</script>
<style lang="scss">

.pl-navbell{
    cursor: pointer;
    vertical-align: middle;
    svg{
        path{
           fill: #ffffff;
        }
    }
    &:hover{
        svg{
           path{
               fill: $yellow!important;
           }
       }
    }
}
</style>

