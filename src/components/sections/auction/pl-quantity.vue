<template>
  <div class="pl-createAuction__quantity">
    <pl-subsectionHeader :svg="svg" :text="text" :alt="alt"></pl-subsectionHeader>
    <div class="pl-createAuction__quantity--formItem">
      <input  v-model.lazy="price"
            v-money="price !== null ? money : null"
             class="pl-createAuction__quantity--input" 
             placeholder="EX: 8.000" 
             name="fuel_amount">
    </div>
  </div>
</template>

<script>
import PlSubsectionHeader from "./components/pl-subsectionHeader";
import {VMoney} from 'v-money'

export default {
  components: {
    "pl-subsectionHeader": PlSubsectionHeader
  },
  data: () => ({
    svg: "images/icons/create-auction/chart.svg",
    alt: "Quantidade de Combustível",
    text: "QUANTOS LITROS?",
      price: null,
        money: {
          decimal: ',',
          thousands: '.',
          /* prefix: 'R$ ',
          suffix: ' #', */
          precision: 0,
          masked: true /* doesn't work with directive */
        }

  }),
  directives: {money: VMoney}
};
</script>

<style lang="scss">
.pl-createAuction {
  &__quantity {
    &--formItem {
      display: flex;
      justify-content: center;
    }
    &--input {
      height: 40px;
      width: 50%;
      background: transparent;
      border: 1px solid #c8c8c8;
      box-sizing: border-box;
      box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.05);
      // padding: 0 4%;
      text-align: center;
      font-size: 22px;
      line-height: 26px;
      letter-spacing: 0.03em;

      &:active,
      &:focus {
        outline: none;
        border: 1px solid $yellow;
      }

      &::placeholder {
        @include robotoBold;
        font-style: normal;
        font-size: 22px;
        line-height: 26px;
        display: flex;
        align-items: center;
        letter-spacing: 0.03em;
        opacity: 0.5;
      }
    }
  }

  @media (max-width: $max-md) {
    &__quantity {
      &--input {
        width: 80%;
      }
    }
  }
}
</style>
