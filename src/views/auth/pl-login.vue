<template>
  <div class="pl-login">
    <div class="pl-login__container container">
      <div class="pl-login__panel col-8">
        <div class="pl-login__text">
          <h1>{{ title }}</h1>
        </div>
        <form class="pl-login__form container" novalidate @submit.prevent="onSubmit">

          <div class="pl-login__formItem col-12">
            <label class="pl-login__label">CNPJ</label>
            <input type="text" 
                   v-model="username" 
                   name="username"
                   class="pl-login__input" 
                   placeholder="29.000.000/0001-00"
                   :class="{'has-error': errors.has('username')}"
                   v-validate="'required'"
                   v-mask="'##.###.###/####-##'">
          </div>

          <div class="pl-login__formItem col-12">
            <label class="pl-login__label pl-login__labelSenha">
              <span class="pl-login__labelSenha--primary">SENHA</span>
              <router-link :to="{ name: 'forgot-password' }" class="pl-login__labelSenha--secondary">Esqueceu sua senha?</router-link>
            </label>
            <input type="password"
                   name="password"
                   v-model="password" 
                   :class="{'has-error': errors.has('password')}"
                   v-validate="'required'"
                   class="pl-login__input"
                   placeholder="●●●●●●●●●●●">
          </div>

          <div class="pl-login__buttonArea container col-12">
            <div class="pl-login__formItem col-12">
              <input type="checkbox" class="pl-" id="pl-login__checkbox">
              <label
                class="pl-login__label--checkbox"
                for="pl-login__checkbox"
              >Manter a sessão iniciada neste computador</label>
            </div>

            <button class="pl-btn pl-login__button" type="submit">
              Enviar
            </button>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      title: "INICIAR SESSÃO",
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validate().then(success => {
        setTimeout(() => {
          this.$validator.reset();

        }, 2000);

        if (success) {
          this.$store.dispatch('auth/login', {
            username: this.username,
            password: this.password
          }).then((user) => {
            console.log("printing user inside login");
            console.log(user);
            if(user.roles[0].name == 'gas_station'){
                this.$store.dispatch('station/fetchStation');
                /* console.log("is a station"); */
                this.$router.push({ name: 'station.feed' })
            }else{
                /* console.log("is a distributor"); */
                this.$router.push({ name: 'distributor.feed' })
            }
          });
        }
        else {
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: "O preenchimento dos campos demarcados são obrigatórios",
            showConfirmButton: false,
            timer: 8500,
            toast: true
          });
        }
      });
    },
  },

};
</script>

<style lang="scss">
.pl-login {
  margin: 5% 0;

  &__input.has-error, &__input[select].has-error, &__input-text.has-error {
    border-color: #dc3545;
  }

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

  &__text {
    text-align: center;
    width: 100%;
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

    &Senha {
      display: flex;
      justify-content: space-between;
    }

    &Senha--secondary,
    &--checkbox {
      @include robotoNormal;
      color: $darkgrey;
      text-transform: none;
      letter-spacing: 0.03em;
      font-size: 14px;
      text-decoration: none;
      margin-left: unset;
    }

    &--checkbox {
      margin-right: 40%;
    }
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
    justify-content: center;

    .pl-login__formItem {
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
    width: 60%;
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
  .pl-login {
    &__container {
      width: 100%;
    }
  }
}

@media (max-width: $max-md) {
  .pl-login {
    margin: unset;

    &__panel {
      padding: 5% 5% 8% 5%;
      width: 100%;
    }

    &__text {
      margin-bottom: 5%;
      width: 80%;
    }

    &__formItem:first-child {
      margin-bottom: 10%;
    }

    &__label {

      &--checkbox {
        margin-right: unset;
      }

      &Senha--secondary,
      &--checkbox {
        font-size: 12px;
      }
    }

    &__buttonArea {
      display: unset;
      
      .pl-login__formItem {
        width: 100%;
      }
    }

    &__button {
      width: 100%;
    }
  }

}
</style>

