<template>
    <div class="pl-password">
        <div class="pl-password__container container">
            <div class="pl-password__panel col-8">
                <div class="pl-password__arrow--return col-12" v-if="windowWidth < 760">
                    <router-link to="/">
                        <svg
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z" fill="black"></path>
                        </svg>
                    </router-link>
                </div>
                <div class="pl-password__text">
                    <h1>{{ title }}</h1>
                    <div class="pl-password__subtitle">
                        <span>{{ subtitle }}</span>
                    </div>
                </div>
                <form class="pl-password__form container">
                    <div class="pl-password__formItem col-12">
                        <label class="pl-password__label pl-password__labelSenha">SENHA</label>
                        <input type="password" class="pl-password__input" placeholder="●●●●●●●●●●●" v-model="password"
                               name="password"
                               :class="{ 'has-error': errors.has('password') }"
                               v-validate="'required'">
                        <div v-show="errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                    </div>
                    <div class="pl-password__formItem col-12">
                        <label class="pl-password__label pl-password__labelSenha">CONFIRMAR SENHA</label>
                        <input type="password" class="pl-password__input" placeholder="●●●●●●●●●●●"
                               name="password_confirmation"
                               :class="{ 'has-error': errors.has('password_confirmation') }"
                               v-model="password_confirmation" v-validate="'required'">
                        <div v-show="errors.has('password_confirmation')" class="invalid-feedback">{{ errors.first('password_confirmation') }}</div>
                    </div>
                </form>
                <div class="pl-password__buttonArea container col-12">
                    <button class="pl-btn pl-btn--standard pl-recovery__button" @click="submit">Enviar</button>
                    <!--                    <pl-btn class="pl-password__button" text="Confirmar" @click="submit"></pl-btn>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from "sweetalert2";

    export default {
        data() {
            return {
                title: "DIGITE SUA NOVA SENHA",
                subtitle:
                    "Digite sua nova senha e aproveite novamente a praticidade de negociar com Posto Livre.",
                windowWidth: 0,
                password: '',
                password_confirmation: ''
            };
        },
        methods: {
            getWindowWidth() {
                this.windowWidth = document.documentElement.clientWidth;
            },
            submit() {
                const {email, token} = this.$route.query;
                const {password, password_confirmation} = this;
                if (email && token && password && password_confirmation) {
                    this.$store.dispatch('auth/resetForgottenPassword', {email, token, password, password_confirmation})
                        .then(() => {
                            Swal.fire({
                                title: "Senha redefinida com sucesso!\nVocê será redirecionado para a tela de login",
                                toast: true,
                                position: "bottom-end",
                                showConfirmButton: false,
                                type: "success",
                                timer: 3000,
                                onClose: () => this.$router.push({ name : 'login' })
                            });
                        })
                        .catch(error => {
                            let errorResponse = error.response.data;
                            let errorFields = Object.keys(errorResponse.error);
                            // insert laravel errors
                            for (let i = 0; i < errorFields.length; i++) {
                                let field = errorFields[i];

                                let errorString = errorResponse.error[field].join(', ');
                                this.$validator.errors.add({field: field, msg: errorString});
                            }
                        });
                }
            }
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener("resize", this.getWindowWidth);
                //Init
                this.getWindowWidth();
            });
        }
    };
</script>

<style lang="scss">
    .pl-password {
        margin: 5% 0;

        &__container {
            display: flex;
            justify-content: center;
        }

        &__panel {
            background: $white;
            border: 1px solid #f0f0f0;
            box-sizing: border-box;
            box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.05);
            padding: 4% 8% 6% 8%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: unset;
        }

        &__arrow--return {
            align-self: flex-start;
            margin-bottom: 10%;
        }

        &__text {
            text-align: center;
            margin-bottom: 5%;
            cursor: default;
            display: flex;
            flex-direction: column;
            align-items: center;

            h1 {
                @include barlowBold;
            }

            span {
                @include robotoNormal;
            }
        }

        &__subtitle {
            width: 65%;
        }

        &__form {
            width: 100%;
        }

        &__formItem {
            margin-bottom: 4%;
        }

        &__label {
            display: block;
            @include barlowNormal;
            margin-bottom: 3%;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.03em;
            text-transform: uppercase;
        }

        &__input {
            height: 40px;
            width: 100%;
            background: $white;
            border: 1px solid #f0f0f0;
            box-sizing: border-box;
            padding: 0 4%;

            &:active,
            &:focus {
                outline: none;
                border: 1px solid $yellow;
            }

            &::placeholder {
                @include robotoBold;
                font-style: normal;
                font-size: 14px;
                line-height: 16px;
                display: flex;
                align-items: center;
                letter-spacing: 0.03em;
                opacity: 0.3;
            }
        }

        &__buttonArea {
            display: flex;
            justify-content: flex-end;

            .pl-password__formItem {
                margin-left: unset;
                margin-bottom: unset;
                display: flex;
            }
        }

        &__button {
            @include barlowNormal;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.03em;
            width: 40%;
        }

        // Verificar tamanho de fonte nos tamanhos abaixo

        // @media (max-width: $max-lg) {
        //   &__panel p,
        //   &__panel span,
        //   &__panel label {
        //     font-size: 80%;
        //   }
        // }

        // @media (min-width: $max-xl) {
        //   &__panel p,
        //   &__panel h1,
        //   &__panel span,
        //   &__panel label {
        //     font-size: 120%;
        //   }
        // }
    }

    @media (min-width: $max-lg) {
        .pl-password {
            &__container {
                width: 100%;
            }
        }
    }

    @media (max-width: $max-md) {
        .pl-password {
            margin: unset;

            &__panel {
                padding: 5% 5% 8% 5%;
                width: 100%;
            }

            &__text {
                margin-bottom: 10%;
                width: 80%;
            }

            &__subtitle {
                width: 100%;
            }

            &__button {
                width: 100%;
                margin-top: 50%;
            }
        }
    }
</style>

