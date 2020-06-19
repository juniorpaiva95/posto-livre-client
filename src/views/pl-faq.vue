<template>
    <section class="pl-faq">
        <div class="container">
            <pl-title>
                Em que podemos te ajudar?
            </pl-title>
            <p class="pl-faq__excerpt">
                Encontre aqui informações sobre nossa plataforma
            </p>
            <div class="col-6">
                <div class="pl-faq__bar" id="searchBar">
                    <input class="pl-faq__bar--input" type="text">
                    <!-- <svg class="pl-faq__bar--icon" id="search-img" :src="linkImg" alt=""> -->
                    <svg class="pl-faq__bar--icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#F0F0F0"/>
                    </svg>
                </div>
            </div>
        </div>
        <pl-questions title="DÚVIDAS FREQUENTES"></pl-questions>
    </section>
</template>
<script>
import PLQuestions from '@/components/sections/pl-questions';
import PLTitle from '@/components/atoms/pl-title';

export default {
    components: {
        'pl-questions': PLQuestions,
        'pl-title': PLTitle,
    },
    data: () => ({
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
                Nulla congue orci id consequat iaculis. Donec lobortis vitae leo vel consectetur.\
                Mauris rhoncus justo nisl. Sed orci tortor, mollis sed mauris at, pulvinar egestas nibh.\
                Vivamus commodo leo vel mauris volutpat pulvinar. Phasellus tempor egestas est, eu elementum\
                nulla convallis sit amet. Maecenas ut laoreet neque. Donec faucibus purus sed vestibulum ultricies.',
        linkImg: 'images/icons/other-icons/search.svg',
    }),
    methods: {
        doSearch(){
            var search = document.getElementById("search-img");
            search
        }
    }
}
</script>
<style lang="scss">
.pl-faq{
    display: inline-block;
    width: 100%;

    .col-6{
        @include grid-push(3);
        @include grid-media($smartphone-grid){
            @include grid-push(0);
        }
    }
    &__excerpt{
        text-align: center;
        margin-top: -20px;
        font-family: $roboto-family;
        color: #2B2D42;
        font-size: 16px;
        font-weight: 400;
    }
    &__bar{
        margin-top: 20px;
        padding: 5px;
        cursor: text;
        height: 40px;
        border: 1px solid #C4C4C4;
        display: flex;
        align-items: center;
        &:hover{
            border-color: $yellow;
            .pl-faq__bar--icon{
                path{
                    fill: $yellow!important;
                }
            }
        }
        &--input{
            width: 90%;
            border: none;
            background: transparent;
            font-size: 14px;
            &:focus{
                outline: none;
                .pl-faq__bar{
                    border-color: $yellow!important;
                }
                .pl-faq__bar--icon{
                    path{
                        fill: $yellow!important;
                    }
                }
            }
        }
        &--icon{
            margin: auto;
            path{
                fill: #C4C4C4;
            }
        }
    }
}
</style>

