<template >
  <header class="pl-header default" id="pageTop">
    <div class="pl-header__container">
      <div class="pl-header__logo">
        <router-link to="/">
          <pl-brand theme="default"></pl-brand>
        </router-link>
      </div>

      <div class="pl-header__content">
        <div class="pl-header__nav">
          <pl-navItem v-scroll-to="'#howItWorks'">COMO FUNCIONA</pl-navItem>
          <pl-navItem v-scroll-to="'#pros'">VANTAGENS</pl-navItem>
        </div>

        <div class="pl-header__auth">
          <div class="pl-auth">
            <div class="pl-auth__enter">
              <router-link :to="{ name: 'login'}">
                Entrar
                <span>
                  <img src="images/icons/other-icons/arrow-right.svg" alt />
                </span>
              </router-link>
            </div>
            <router-link :to="{ name: 'register' }">
              <pl-btn text="CRIAR CONTA" type="auth"></pl-btn>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import PlBrand from "@/components/atoms/pl-brand";
import PlNavItem from "@/components/atoms/pl-navItem";
import PlBtn from "@/components/atoms/pl-btn";
import router from "@/router/router";

export default {
  components: {
    "pl-brand": PlBrand,
    "pl-navItem": PlNavItem,
    "pl-btn": PlBtn
  }
};
</script>

<style lang="scss">
.pl-header {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  background-color: #fafafa;
  position: sticky;
  top: 0;
  z-index: 2;
  &--distributor {
    background-color: $grey !important;
  }
  &__container {
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    @include outer-container;
  }
  &__content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
  &__logo {
    cursor: pointer;
    width: 200px;
  }
  &__nav {
    color: #b7b7b7;
  }
  &__auth {
    margin-left: 20px;

    .pl-auth {
      display: inline-block;
      &__enter {
        cursor: pointer;
        display: inline-block;
        margin-right: 20px;
        text-transform: uppercase;
        font-family: "Barlow", sans-serif;
        a {
          color: #949494;
          position: relative;
          font-size: 16px;
          font-weight: 500;
          padding-right: 15px;
          &:hover {
            color: $yellowHover;
          }
          @media (max-width: 320px) {
            font-size: 14px;
            padding-right: 10px;
          }
          span {
            position: absolute;
            right: 0;
            top: 30%;
            @media (min-width: 768px) {
              top: 0%;
            }
            @media (max-width: 320px) {
              top: 25%;
            }
          }
        }
      }
      a {
        text-decoration: none;

        button {
          text-decoration: none;
          &:visited {
            color: $grey;
            text-decoration: none;
          }
        }
      }
      @media (max-width: 330px) {
        font-size: 12px;
      }
    }
  }
}
@include grid-media($smartphone-grid) {
  .pl-header {
    &__content {
      * {
        font-size: 0.7rem;
      }
      svg {
        height: 7px;
        width: 7px;
      }
    }
    &__nav {
      display: none;
    }
    &__logo {
      width: 160px;
    }
  }
}
</style>
