<template>
    <div class="pl-header-station__profile dropdown">
        <button class="pl-header-station__profile--nav">
            <p class="pl-header-station__profile--nav--text">{{ user.social_reason }}</p>
            <span class="pl-header-station__profile--nav--expand"><img src="images/icons/other-icons/expand.svg"></span>
        </button>
        <div class="pl-header-station__profile--nav--expanded dropdown-content">
            <ul>
                <router-link to="/minhaconta" >
                    <li>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM5.07 16.28C5.5 15.38 8.12 14.5 10 14.5C11.88 14.5 14.51 15.38 14.93 16.28C13.57 17.36 11.86 18 10 18C8.14 18 6.43 17.36 5.07 16.28ZM16.36 14.83C14.93 13.09 11.46 12.5 10 12.5C8.54 12.5 5.07 13.09 3.64 14.83C2.62 13.49 2 11.82 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 11.82 17.38 13.49 16.36 14.83ZM10 4C8.06 4 6.5 5.56 6.5 7.5C6.5 9.44 8.06 11 10 11C11.94 11 13.5 9.44 13.5 7.5C13.5 5.56 11.94 4 10 4ZM10 9C9.17 9 8.5 8.33 8.5 7.5C8.5 6.67 9.17 6 10 6C10.83 6 11.5 6.67 11.5 7.5C11.5 8.33 10.83 9 10 9Z" fill="#949494"/>
                            </svg>
                        </span>Minha Conta
                    </li>
                </router-link> 
                <router-link to="/faq">
                     <li>
                        <span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 16H11V14H9V16ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z" fill="#949494"/>
                            </svg>
                        </span>Ajuda
                    </li>
                </router-link>
                <a @click.prevent="logout()">
                     <li>
                        <span>
                            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 22H5V20H3V22ZM7 22H9V20H7V22ZM9 0H7V10H9V0ZM12.56 2.44L11.11 3.89C12.84 4.94 14 6.83 14 9C14 12.31 11.31 15 8 15C4.69 15 2 12.31 2 9C2 6.83 3.16 4.94 4.88 3.88L3.44 2.44C1.36 3.88 0 6.28 0 9C0 13.42 3.58 17 8 17C12.42 17 16 13.42 16 9C16 6.28 14.64 3.88 12.56 2.44ZM11 22H13V20H11V22Z" fill="#949494"/>
                            </svg>
                        </span>Sair
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
		...mapGetters({
            user: 'auth/getUser',
        })
    },
    methods: {
        logout(){
            this.$store.dispatch('auth/logout')
        }
    }
}
</script>


<style lang="scss">
.dropdown-content{
    display: none;
}

.dropdown:hover .dropdown-content{
    display: block;
}

.pl-header-station{
    position: sticky;
    height: 100px;
    width: 100%;
    top:0;
    z-index: 3;
    &__start{
        margin-right: 20px;
    }
    &__header{
        background-color: $darkgrey;
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
    }
    &__container {
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        @include outer-container;
    }
    &__items{
        margin-right:20px;
    }
    &__content{
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        padding-left: 5%;
        img{
            max-width: 55px; 
        }
        @media screen and(max-width: 925px){
            padding-left: 0%;
        }
    }
    &__items{
        padding: 5px 20px 5px 0px;
        border-right: solid 1px white;
    }
    &__profile {
        height: 100px;
        padding: 10px;
        display: flex;
        align-content: center;
        align-items: center;
    div{
        margin-right: 20px;
    }
    img{
        width: 25%;
        height: 25%;
    }
    &--nav{
        display: flex;
        align-content: center;
        background-color: transparent;
        align-items: center;
        cursor: pointer;
        border: none;
        &:focus{
            outline: none;
        }
        &--text{
            font-family: $barlow-family;
            text-transform: uppercase;
            color: #ffffff ;
            font-size: 16px;
            font-weight: 500;
        }
        &--expand{
            margin-left: 5px;
            display: flex;
            align-items: center;
            align-content: center;
            width: 15%;
            font-weight: 500;
            img{
                width: 100%;
            }
            
        }
        &--expanded{
            position: absolute;
            top: 100px;
            @include grid-media($smartphone-grid){
                width: 100%;
            }
            &:focus{
                outline: none;
            }
            z-index: 20;
            box-shadow: 2px 2px 5px black;
            background-color: #ffffff;
            ul{
                list-style: none;
                padding: 0px;
                margin: 0px 5px;
                a{
                    text-decoration: none;
                    color: inherit;
                    display: flex;
                    align-content: center;
                    align-items: center;
                    span{
                        width: 30px;
                        padding-top: 5px;
                        margin-right: 10px;
                        text-align: center;
                        svg{
                            path{
                                fill: #949494;
                                &:hover{
                                    fill: $yellow;
                                }
                            }
                        }
                    }
                    li{
                        display: flex;
                        align-content: center;
                        align-items: center;
                        width: 100%;
                        cursor: pointer;
                        font-family: $barlow-family;
                        text-transform: uppercase;
                        padding: 15px 10px;
                        &:hover{
                            color: $yellow;
                            span{
                                svg{
                                    path{
                                        fill: $yellow;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    }
}


</style>