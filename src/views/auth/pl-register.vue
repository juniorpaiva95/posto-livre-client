<template>
    <div class="pl-register">
        <div class="pl-register__container container">
            <div class="pl-register__panel col-10">
                <div class="pl-register__text">
                    <h1>{{ title }}</h1>
                    <span>{{ subtitle }}</span>
                </div>
                <form
                    class="pl-register__form container"
                    novalidate
                    v-on:submit.prevent="onSubmit"
                >
                    <div class="pl-register__form--row">
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label"
                            >RAZÃO SOCIAL</label
                            >
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="Exemplo LTDA"
                                v-model="form.social_reason"
                                name="razao"
                                :class="{ 'has-error': errors.has('social_reason') }"
                                v-validate="'required'"
                            />
                            <div v-show="errors.has('social_reason')" class="invalid-feedback">{{ errors.first('social_reason') }}</div>
                        </div>

                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">EMAIL</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="pessoa@gmail.com"
                                v-model="form.email"
                                name="email"
                                v-validate="'required'"
                                :class="{ 'has-error': errors.has('email') }"
                            />
                            <div v-show="errors.has('email')" class="invalid-feedback">{{ errors.first('email') }}</div>
                        </div>
                    </div>

                    <div class="pl-register__form--row">
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">CNPJ</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="29.000.000/0001-00"
                                v-model="form.cnpj"
                                name="cnpj"
                                :class="{
                                    'has-error': errors.has('cnpj')
                                }"
                                v-validate="'required'"
                                v-mask="'##.###.###/####-##'"
                            />
                            <div v-show="errors.has('cnpj')" class="invalid-feedback">{{
                                errors.first('cnpj') }}
                            </div>
                        </div>

                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Telefone</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="83 1234 4321"
                                v-model="form.phone"
                                name="tel"
                                :class="{ 'has-error': errors.has('tel') }"
                                v-validate="'required'"
                                v-mask="['(##) ####-####', '(##) #####-####']"
                            />
                        </div>
                    </div>

                    <div class="pl-register__form--row">
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label"
                            >INSCRIÇÃO ESTADUAL</label
                            >
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="29.000.0000"
                                v-model="form.state_registration"
                                name="inscricao"
                                :class="{
                                    'has-error': errors.has('inscricao')
                                }"
                                v-validate="'required'"
                                v-mask="['## ## ###### #', '## ###### #']"
                            />
                        </div>

                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Categoria</label>
                            <select
                                v-model="form.type"
                                name="tipo"
                                v-validate="'required'"
                                class="pl-register__input"
                                placeholder="Selecione"
                                :class="{ 'has-error': errors.has('tipo') }"
                            >
                                <option value disabled selected hidden
                                >Selecione
                                </option
                                >
                                <option
                                    v-for="option in options"
                                    :value="option.value"
                                >{{ option.text }}
                                </option
                                >
                            </select>
                        </div>
                    </div>

                    <div class="pl-register__address">
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">CEP</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="58.000-00"
                                v-mask="'##.###-###'"
                                v-model="form.address.cep"
                                name="cep"
                                :class="{ 'has-error': errors.has('cep') }"
                                v-validate="'required'"
                                @blur="loadDataCep()"
                            />
                            <pl-loading v-if="loading">
                                <clip-loader
                                    :loading="loading"
                                    :color="colorLoading"
                                    :size="sizeLoading"
                                ></clip-loader>
                            </pl-loading>
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Logradouro</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="Av. Presidente Nilo Peçanha"
                                v-model="form.address.street"
                                v-validate="'required'"
                                name="logradouro"
                                :class="{ 'has-error': errors.has('logradouro') }"
                            />
                        </div>

                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Número</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="178"
                                v-model="form.address.number"
                                v-validate="'required'"
                                name="numero"
                                :class="{ 'has-error': errors.has('numero') }"
                            />
                        </div>

                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label"
                            >Complemento</label
                            >
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder=""
                                v-model="form.complemento"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Bairro</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="Expedicionários"
                                v-model="form.address.neighborhood"
                                v-validate="'required'"
                                name="neighborhood"
                                :class="{ 'has-error': errors.has('neighborhood') }"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Cidade</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="João Pessoa"
                                v-model="form.address.city"
                                v-validate="'required'"
                                name="cidade"
                                :class="{ 'has-error': errors.has('cidade') }"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Estado</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="Paraíba"
                                v-validate="'required'"
                                v-model="form.address.state"
                                v-mask="'AA'"
                                name="estado"
                                :class="{ 'has-error': errors.has('estado') }"
                            />
                        </div>
                    </div>
                    <div v-if="form.type == 'distributor'" class="pl-register__bank">
                        <h2>Dados bancarios</h2>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">codigo</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="00"
                                v-validate="'required'"
                                v-model="form.bank.code"
                                v-mask="'##'"
                                name="codigo"
                                :class="{ 'has-error': errors.has('codigo') }"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Agência</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="00"
                                v-validate="'required'"
                                v-model="form.bank.agency"
                                v-mask="'####'"
                                name="agencia"
                                :class="{ 'has-error': errors.has('agencia') }"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Conta</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="00"
                                v-validate="'required'"
                                v-model="form.bank.account"
                                v-mask="'#####'"
                                name="conta"
                                :class="{ 'has-error': errors.has('conta') }"
                            />
                        </div>
                        <div class="pl-register__formItem col-6">
                            <label class="pl-register__label">Tipo</label>
                            <input
                                type="text"
                                class="pl-register__input"
                                placeholder="00"
                                v-validate="'required'"
                                v-model="form.bank.type"
                                v-mask="'##'"
                                name="tipo"
                                :class="{ 'has-error': errors.has('tipo') }"
                            />
                        </div>

                    </div>
                    <div v-if="form.type == 'station'" class="pl-register__form--row">
                        <div
                            class="pl-register__formItem pl-register__file col-12"
                        >
                            <label class="pl-register__label"
                            >ESCOLHA 2 IMAGENS DO POSTO</label
                            >
                            <input
                                type="file"
                                class="pl-register__input pl-register__fileInput"
                                ref="myVueDropzone"
                                id="dropzone"
                                name="photo1"
                                @change="carregandoArquivo1"
                            />
                            <input
                                type="file"
                                class="pl-register__input pl-register__fileInput"
                                name="photo2"
                                id="dropzone"
                                @change="carregandoArquivo2"
                                v-validate="'required'"
                            />
                        </div>
                    </div>
                    <div class="col-12 pl-register__terms">
                        <span
                            class="pl-register__terms--text"
                            @click="triggerModal()"
                        >Termos e Condições</span
                        >
                        <span class="pl-register__terms--agreement">
                            <input
                                class="styled-checkbox"
                                id="checkbox-1"
                                type="checkbox"
                                value="value1"
                            />
                            <label for="checkbox-1"
                            >Eu li e concordo com os Termos
                                apresentados.</label
                            >
                        </span>
                    </div>
                    <div class="pl-register__buttonArea col-12">
                        <pl-btn
                            class="pl-register__button"
                            text="Enviar"
                        ></pl-btn>
                    </div>
                </form>
            </div>
        </div>
        <pl-modal-terms
            v-if="showModal"
            @close="showModal = false"
        ></pl-modal-terms>
    </div>
</template>

<script>
    import PLBtn from "@/components/atoms/pl-btn";
    import Swal from "sweetalert2";

    import PLModalTerms from "@/components/sections/pl-modalTerms";
    import PlLoading from '@/components/atoms/pl-loading';

    export default {
        components: {
            "pl-loading": PlLoading,
            "pl-btn": PLBtn,
            "pl-modal-terms": PLModalTerms
        },
        data() {
            return {
                loading: false,
                colorLoading: "#F7A400",
                sizeLoading: "52px",
                title: "VAMOS COMEÇAR",
                subtitle: "Preencha os dados abaixo e aguarde pelo nosso contato.",
                form: {
                    social_reason: "",
                    email: "",
                    photo1: "",
                    photo2: "",
                    cnpj: "",
                    type: "",
                    phone: "",
                    state_registration: "",
                    address:{
                        cep: "",
                        street: "",
                        city: "",
                        state: "",
                        number: "",
                        neighborhood: "",
                    },
                    bank: {
                        code: "",
                        agency: "",
                        account: "",
                        type: ""
                    }
                },
                showModal: false,
                options: [
                    {value: "station", text: "Posto"},
                    {value: "distributor", text: "Distribuidor"}
                ]
            };
        },

        methods: {
            carregandoArquivo1(e) {
                this.form.photo1 = e.target.files[0];
            },
            carregandoArquivo2(e) {
                this.form.photo2 = e.target.files[0];
            },
            loadDataCep() {
                if (!this.form.address.cep) {
                    return false;
                }
                let cep = this.form.address.cep.replace(".", "").replace("-", "");
                this.loading = true;
                setTimeout(() => {
                    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(
                        response => {
                            response.json().then(data => {
                                let {logradouro, localidade, bairro, uf} = data;
                                this.form.address.street = logradouro;
                                this.form.address.city = localidade;
                                this.form.address.neighborhood = bairro;
                                this.form.address.state = uf;
                                this.loading = false;
                            });
                        }
                    ).catch(() => {
                        this.loading = false;
                    });
                }, 2000);
            },
            onSubmit() {
                this.$validator.validate().then(success => {
                    if (success) {
                        const config = {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                "Access-Control-Allow-Origin": "*"
                            }
                        };

                        this.loading = true;
                        this.$store
                            .dispatch("auth/register", this.form, config)
                            .then(user => {
                                Swal.fire({
                                    title: "Os dados foram enviados com sucesso!",
                                    toast: true,
                                    position: "bottom-end",
                                    showConfirmButton: false,
                                    type: "success",
                                    timer: 5000
                                });
                                this.loading = false;
                                this.$router.push({name: 'login'});

                                //if (user.roles.name === 'gas_station') {
                                //    this.$router.push({ name: "station.feed" });
                                //} else {
                                //    this.$router.push({ name: "distributor.feed" });
                                //}

                            }).catch(err => {
                            this.loading = false;
                            let errorResponse = err.response.data;
                            if (errorResponse.message) {
                                return Swal.fire({
                                    position: "bottom-end",
                                    type: "error",
                                    title: errorResponse.message,
                                    showConfirmButton: false,
                                    timer: 3500,
                                    toast: true
                                });
                            }
                            let errorFields = Object.keys(errorResponse.error);
                            // insert laravel errors
                            for (let i = 0; i < errorFields.length; i++) {
                                let field = errorFields[i];

                                let errorString = errorResponse.error[field].join(', ');
                                this.$validator.errors.add({field: field, msg: errorString});
                            }

                        });
                    } else {
                        this.loading = false;
                        // this.social_reason = "";
                        // this.email = "";
                        // this.photo1 = "";
                        // this.photo2 = "";
                        // this.phone = "";
                        // this.type = "";
                        // this.state_registration = "";
                        // this.cnpj = "";
                        // this.$validator.reset();
                        Swal.fire({
                            position: "bottom-end",
                            type: "error",
                            title:
                                "O preenchimento dos campos demarcados são obrigatórios",
                            showConfirmButton: false,
                            timer: 8500,
                            toast: true
                        });
                    }

                }).catch(() => {

                });
            },
            onMobile() {
                let textDesktop =
                    "(Arraste as imagens aqui ou clique para selecionar)";
                let textMobile = "Selecione suas imagens";
            },
            triggerModal() {
                this.showModal = true;
            }
        },
        mounted() {
            this.onMobile();
            window.addEventListener("resize", this.onMobile);
        },
        filters: {
            phone(e) {
                return e
                    .replace(/[^0-9]/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            }
        }
    };
</script>

<style lang="scss">
    .form-control.error {
        border-color: #e41414;
    }

    .pl-register {
        margin: 5% 0;

        &__input.has-error,
        &__input[select].has-error,
        &__input-text.has-error {
            border-color: #dc3545;
        }

        &__container {
            display: flex;
            justify-content: center;
        }

        &__address {
            margin-bottom: 10px;
            display: inline-block;
            width: 100%;
        }
        &__bank {
            margin-bottom: 50px;
            display: inline-block;
            width: 100%;
            h2 {
                @include barlowBold;
                text-align: center;
            }


        }

        &__modal {
            display: none;
            z-index: 100;
            width: 100vh;
            height: 100vh;
            position: absolute;

            &--backdrop {
                background-color: rgba(0, 0, 0, 0.05);
            }

            &--content {
                background-color: #fff;
                min-height: 500px;
                position: relative;

                .close {
                    color: $yellow;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            }
        }

        &__terms {
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &--text {
                color: $yellow;
                cursor: pointer;
                font-family: $barlow-family;
                display: inline-block;
                margin-bottom: 10px;
            }

            &--agreement {
                font-family: $roboto-family;
                text-align: center;
                display: inline-block;

                .styled-checkbox {
                    position: absolute;
                    opacity: 0;

                    & + label {
                        position: relative;
                        cursor: pointer;
                        padding: 0;
                    }

                    // Box.
                    & + label:before {
                        content: "";
                        margin-right: 5px;
                        display: inline-block;
                        vertical-align: middle;
                        margin-bottom: 2px;
                        width: 15px;
                        height: 15px;
                        border: 1px solid $grey;
                        border-radius: 2px;
                    }

                    // Box hover
                    &:hover + label:before {
                        background: $yellow;
                    }

                    // Box focus
                    &:focus + label:before {
                        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
                    }

                    // Box checked
                    &:checked + label:before {
                        background: $yellow;
                    }

                    // Disabled state label.
                    &:disabled + label {
                        color: #b8b8b8;
                        cursor: auto;
                    }

                    // Disabled box.
                    &:disabled + label:before {
                        box-shadow: none;
                        background: #ddd;
                    }

                    // Checkmark. Could be replaced with an image
                    &:checked + label:after {
                        content: "";
                        position: absolute;
                        left: 3px;
                        top: 9px;
                        background: white;
                        width: 2px;
                        height: 2px;
                        box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white,
                        4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
                        transform: rotate(45deg);
                    }
                }
            }
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

        &__text {
            text-align: center;
            width: 50%;
            margin-bottom: 5%;
            cursor: default;

            h1 {
                @include barlowBold;
            }

            span {
                @include robotoNormal;
            }
        }

        &__form {
            width: 100%;

            &--row {
                display: flex;
                @media (max-width: $max-md) {
                    display: unset;
                }
            }
        }

        &__error {
            display: block;
            color: #e41414;
            font-size: 50%;
        }

        &__formItem {
            margin-bottom: 4%;
        }

        &__label {
            display: block;
            @include barlowNormal;
            margin-bottom: 3%;
            font-size: 13px;
            line-height: 17px;
            letter-spacing: 0.03em;
            text-transform: uppercase;

            @media (max-width: $max-lg) {
                font-size: 13px;
            }
        }

        &__input {
            height: 40px;
            width: 100%;
            background: $white;
            border: 1px solid #f0f0f0;
            box-sizing: border-box;
            padding: 0 4%;

            &:active:not(.pl-register__fileInput),
            &:focus:not(.pl-register__fileInput) {
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

        &__fileInput {
            outline: none;
            border: 2px dashed #949494;
            color: dimgray;
            padding: 10px 10px;
            position: relative;
            cursor: pointer;
            min-height: 30px;
            margin-bottom: 2%;
            letter-spacing: 0.03em;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 10px;
            border: dashed 2px rgba($color: #ffb119, $alpha: 0.5);
            padding: 10px;
            position: relative;

            &:focus {
                border: dashed 2px rgba($color: #ffb119, $alpha: 1);
            }

            .dz-message {
                margin: unset;
            }

            &:hover,
            &:active,
            &:focus,
            &:visited {
                border: 2px dashed $yellow;
                background-color: unset;
            }

            &--placeholder {
                @include robotoBold;
                font-size: 10px;
                line-height: 12px;
                text-align: center;
            }
        }

        &__buttonArea {
            display: flex;
            justify-content: center;
            margin-top: 5%;
        }

        &__button {
            @include barlowNormal;
            font-size: 14px;
            line-height: 17px;
            letter-spacing: 0.03em;
            width: 50%;
        }

        .dropzone .dz-preview {
            min-height: 0 !important;
        }

        .vue-dropzone > .dz-preview .dz-details {
            background-color: transparent !important;
        }

        // @media (min-width: $max-xl) {
        //   &__panel p,
        //   &__panel h1,
        //   &__panel span,
        //   &__panel label {
        //     font-size: 120%;
        //   }
        // }
    }

    @media (max-width: $max-md) {
        .pl-register {
            margin: unset;

            &__panel {
                padding: 5% 5% 8% 5%;
                width: 100%;
            }

            &__text {
                margin-bottom: 10%;
                width: 80%;
            }

            &__file {
                // margin-bottom: 10%;
            }

            &__buttonArea {
                display: unset;
            }

            &__button {
                width: 100%;
            }
        }

        // @media (max-width: $max-lg) {
        //   &__panel p,
        //   &__panel span,
        //   &__panel label {
        //     font-size: 80%;
        //   }
        // }
    }
</style>
