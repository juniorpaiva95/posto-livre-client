<template>
    <form class="pl-account__form container">
        <div class="pl-account__profile">
            <div class="col-6">
                <label class="pl-account__label">NOME DO PERFIL</label>
                <span class="pl-account__profileName">{{ user.first_name }}</span>
            </div>

            <div class="col-6">
                <span class="pl-account__label" for="file-input"
                    >FOTO DO PERFIL</span
                >

                <label for="file-input">
                    <img
                        src="/images/icons/profile.svg"
                        alt="Foto de Perfil"
                        class="pl-account__profilePic"
                    />
                </label>

                <input
                    class="pl-account__profileInput"
                    id="file-input"
                    type="file"
                />
            </div>
        </div>
        <div class="pl-account__settings">
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Email</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Email"
                    v-model="user.email"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Telefone</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Telefone"
                    v-model="user.phone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Nova Senha</label>
                <input
                    type="password"
                    class="pl-account__input"
                    placeholder="******"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Confirmar Senha</label>
                <input
                    type="password"
                    class="pl-account__input"
                    placeholder="******"
                />
            </div>
        </div>
        <div class="pl-account__personal">
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">RAZÃO SOCIAL</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Exemplo LTDA"
                    v-model="user.social_reason"
                />
            </div>
            <div class="pl-account__formItem pl-account__file col-6">
                <label class="pl-account__label"
                    >ESCOLHA 2 IMAGENS DO POSTO</label
                >
                <input
                    type="file"
                    multiple
                    class="pl-account__input pl-account__fileInput"
                    placeholder="(Arraste as imagens aqui ou click para selecionar)"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">INSCRIÇÃO ESTADUAL</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="29.000.0000"
                    v-model="user.state_registration"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">CNPJ</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="29.000.000/0001-0"
                    v-model="user.cnpj"
                    v-mask="'##.###.###/####-##'"
                />
            </div>
        </div>
        <div class="pl-account__address">
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">CEP</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="58.000-00"
                    v-mask="'##.###-###'"
                    v-model="user.cep"
                    @blur="loadDataCep()"
                />
                <pl-loading v-if="loading">
                    <clip-loader :loading="loading" :color="colorLoading" :size="sizeLoading"></clip-loader>
                </pl-loading>

            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Logradouro</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Av. Presidente Nilo Peçanha"
                    v-model="user.logradouro"
                />
            </div>

            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Número</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="178"
                    v-model="user.numero"
                />
            </div>

            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Complemento</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder=""
                    v-model="user.complemento"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Bairro</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Expedicionários"
                    v-model="user.bairro"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Cidade</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="João Pessoa"
                    v-model="user.cidade"
                />
            </div>
            <div class="pl-account__formItem col-6">
                <label class="pl-account__label">Estado</label>
                <input
                    type="text"
                    class="pl-account__input"
                    placeholder="Paraíba"
                    v-model="user.estado"
                    v-mask="'AA'"
                />
            </div>
        </div>

        <div class="pl-account__buttonArea col-12">
            <pl-btn
                class="pl-account__button"
                type="standard"
                text="Enviar"
            ></pl-btn>
        </div>
    </form>
</template>

<script>
import PlBtn from "@/components/atoms/pl-btn";
import PlLoading from '@/components/atoms/pl-loading';

export default {
    components: {
        "pl-loading": PlLoading,
        "pl-btn": PlBtn,
    },
    async created() {
        let user = await this.$store.getters['auth/getUser'];
        // console.log(user);
        this.user.email = user.email;
        this.user.phone = user.phone;
        this.user.social_reason = user.distributor ? user.distributor.social_reason : user.station.social_reason;
        this.user.state_registration = user.distributor ? user.distributor.state_registration : user.station.state_registration;
        this.user.cnpj = user.distributor ? user.distributor.cnpj : user.station.cnpj;
        this.user.cep = user.adress.cep;
        this.user.logradouro = user.adress.street;
        this.user.bairro = user.adress.neighborhood;
        this.user.cidade = user.adress.city;
        this.user.numero = user.adress.number;
        this.user.estado = user.adress.state;
        this.user = { ...user, ...this.user };
    },
    methods: {
      loadDataCep() {
          if (!this.user.cep) {
              return false;
          }
          let cep = (this.user.cep.replace('.', '')).replace('-', '');
          this.loading = true;
          setTimeout(()=>{
              fetch(`https://viacep.com.br/ws/${cep}/json/`).then(response => {

                  response.json().then(data => {
                      // console.log(data);
                      let { logradouro, localidade, bairro, uf } = data;
                      this.user.logradouro = logradouro;
                      this.user.cidade = localidade;
                      this.user.bairro = bairro;
                      this.user.estado = uf;
                      this.loading = false;
                  });
              }).catch(() => {
                  this.loading = false;
                  // handle errors and timeout error
              })
          },2000);

      }
    },
    data: () => ({
        loading: false,
        colorLoading: "#F7A400",
        sizeLoading: "52px",
        user: {
            email: '',
            phone: '',
            social_reason: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            estado: '',
            complemento: '',
            numero: '',
        },
        title: "MINHA CONTA",
        subtitle: "Verifique seus dados, atualize senha etc.",
        settings: {
            email: {
                label: "E-MAIL",
                placeholder: "pessoa@gmail.com",
                class: "",
                type: "text"
            },
            telefone: {
                label: "TELEFONE",
                placeholder: "83 1234 4321",
                class: "",
                type: "text"
            },
            novaSenha: {
                label: "NOVA SENHA",
                placeholder: "•••••••••••••",
                class: "",
                type: "password"
            },
            confirmeSenha: {
                label: "CONFIRME SUA SENHA",
                placeholder: "•••••••••••••",
                class: "",
                type: "password"
            }
        },
        address: {
            cep: {
                label: "CEP",
                placeholder: "58041-000",
                class: "",
                type: "text"
            },
            endereco: {
                label: "ENDEREÇO",
                placeholder: "Av. Presidente Nilo Peçanha",
                class: "",
                type: "text"
            },
            bairro: {
                label: "BAIRRO",
                placeholder: "Expedicionários",
                class: "",
                type: "text"
            },
            cidade: {
                label: "CIDADE",
                placeholder: "João Pessoa",
                class: "",
                type: "text"
            },
            complemento: {
                label: "COMPLEMENTO",
                placeholder: "Apto. 15B",
                class: "",
                type: "text"
            },
            numero: {
                label: "Número",
                placeholder: "181",
                class: "",
                type: "text"
            },
            estado: {
                label: "Estado",
                placeholder: "Paraíba",
                class: "",
                type: "text"
            }
        }
    })
};
</script>

<style lang="scss">
.pl-account {
    &__form {
        background: #fff;
        border: 1px solid #f0f0f0;
        box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.05);
        padding: 8% 8% 6% 8%;

        @media (max-width: $max-md) {
            margin-bottom: 100px;
        }
    }

    &__profile,
    &__settings,
    &__personal,
    &__address {
        margin-bottom: 50px;
        display: inline-block;
        width: 100%;
    }

    &__formItem {
        margin-bottom: 2%;
    }

    &__profile {
        display: flex;
        margin-bottom: 37px;

        @media (max-width: $max-md) {
            display: inline-block;

            div:first-child {
                margin-bottom: 30px;
            }
        }
    }

    &__label {
        display: block;
        @include barlowBold;
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: $grey;
    }

    &__profileName {
        @include barlowBold;
        font-size: 40px;
        line-height: 114%;
        text-transform: uppercase;
        color: $blackBase;
    }

    &__profilePic {
        border-radius: 100%;
        cursor: pointer;
    }

    &__profileInput {
        display: none;
    }

    &__input {
        height: 40px;
        width: 100%;
        background: $white;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
        box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.05);
        padding: 0 4%;
        font-size: 14px;
        line-height: 16px;
        color: $darkgrey;
        letter-spacing: 0.03em;

        &:active:not(.pl-account__fileInput),
        &:focus:not(.pl-account__fileInput) {
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

        &:hover {
            border: 2px dashed $yellow;
        }

        p {
            font-size: 1.2em;
            text-align: center;
            padding: 50px 0;
        }
    }

    &__buttonArea {
        display: flex;
        justify-content: center;
    }

    &__button {
        @include barlowNormal;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.03em;
        width: 40%;
    }

    @media (max-width: $max-md) {
        &__file {
            margin-bottom: 10%;
        }

        &__buttonArea {
            display: unset;
        }

        &__button {
            width: 100%;
        }
    }
}
</style>
