<template>
    <div class="pl-advise">
        <div class="col">
            <pl-title>
                {{title}}
            </pl-title>
            <p>{{Subtext}}
            </p>
        </div>    
    </div>
</template>
<script>
import PLTitle from '@/components/atoms/pl-title';
export default {
    props: {
        title: String,
        Subtext: String,
    },
    components: {
        'pl-title': PLTitle,
    }    
}
</script>
<style lang="scss">
.pl-advise{
    @include grid-container();
    display: block;
    font-family: 'barlow', sans-serif;
    margin: 50px 0px 50px 0px;
    p{
        text-align: center;
    }
}
</style>
