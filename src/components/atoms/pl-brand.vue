<template>
    <svg  class="pl-brand" 
    :class="[
        'pl-brand--' + theme,
    ]"
     viewBox="0 0 148 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M103.6 0V20.72H100.64V0H103.6Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M138.507 0H145.653L148 2.34696V5.92H145.04V3.57304L144.427 2.96H139.733L139.12 3.57304V8.26696L139.733 8.88H142.82V11.84H139.733L139.12 12.453V17.147L139.733 17.76H144.427L145.04 17.147V14.8H148V18.373L145.653 20.72H138.507L136.16 18.373V11.227L137.027 10.36L136.16 9.49304V2.34696L138.507 0Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M85.84 0H88.8V17.147L89.4131 17.76H94.107L94.72 17.147V14.8H97.68V18.373L95.3331 20.72H88.187L85.84 18.373V0Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M31.947 0H39.0931L41.44 2.34696V5.92H38.48V3.57304L37.867 2.96H33.1731L32.56 3.57304V8.26696L33.1731 8.88H39.0931L41.44 11.227V18.373L39.0931 20.72H31.947L29.6 18.373V14.8H32.56V17.147L33.1731 17.76H37.867L38.48 17.147V12.453L37.867 11.84H31.947L29.6 9.49304V2.34696L31.947 0Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.34696 0H9.49304L11.84 2.34696V9.49304L9.49304 11.84H2.96V20.72H0V2.34696L2.34696 0ZM2.96 3.57304L3.57304 2.96H8.26696L8.88 3.57304V8.26696L8.26696 8.88H2.96V3.57304Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M118.4 0H115.44V17.147L114.827 17.76H114.573L109.52 12.707V0H106.56V13.933L113.347 20.72H116.053L118.4 18.373V0Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M130.853 0H123.707L121.36 2.34696V20.72H124.32V11.84H125.187L130.24 16.893V20.72H133.2V15.667L129.373 11.84H130.853L133.2 9.49304V2.34696L130.853 0ZM124.933 2.96L124.32 3.57304V8.88H129.627L130.24 8.26696V3.57304L129.627 2.96H124.933Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M56.8531 0H46.747L44.4 2.34696V5.92H47.36V3.57304L47.9731 2.96H50.32V20.72H53.28V2.96H55.627L56.24 3.57304V5.92H59.2V2.34696L56.8531 0Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.293 0H17.147L14.8 2.34696V9.49304L15.667 10.36L14.8 11.227V18.373L17.147 20.72H24.293L26.64 18.373V11.227L25.773 10.36L26.64 9.49304V2.34696L24.293 0ZM18.373 2.96L17.76 3.57304V8.26696L19.24 9.74696V10.973L17.76 12.453V17.147L18.373 17.76H23.067L23.68 17.147V12.453L22.2 10.973V9.74696L23.68 8.26696V3.57304L23.067 2.96H18.373Z" fill="#333333"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M71.653 0H64.5069L62.16 2.34696V9.49304L63.0269 10.36L62.16 11.227V18.373L64.5069 20.72H71.653L74 18.373V11.227L73.133 10.36L74 9.49304V2.34696L71.653 0ZM65.733 2.96L65.12 3.57304V8.26696L66.6 9.74696V10.973L65.12 12.453V17.147L65.733 17.76H70.4269L71.04 17.147V12.453L69.56 10.973V9.74696L71.04 8.26696V3.57304L70.4269 2.96H65.733Z" fill="#333333"/>
    </svg>
</template>
<script>
export default {
    props: {
        theme: { 
            type: String,
            default : 'default', // default || yellow || white
        }
    }
}
</script>
<style lang="scss">
.pl-brand{
    &--default{
        path{
            fill: $grey;
        }
        &:hover{
            path{
                -webkit-transition: fill 0.25s;
                fill: $middlegrey;
            }
        }
    }
    &--yellow{
        path{
            fill: $yellow;
        }
        &:hover{
            path{
                -webkit-transition: fill 0.25s;
                fill: #F4CE82;
            }
        }
    }
    &--white{
        path{
            fill: $white;
        }&:hover{
            path{
                -webkit-transition: fill 0.25s;
                fill: $yellow;
            }
        }
    }
}
</style>



