<template>
  <div class="pl-createAuction__freight">
    <pl-subsectionHeader :svg="svg" :text="text" :alt="alt"></pl-subsectionHeader>
    <div class="pl-createAuction__freight--content">
      <div class="pl-createAuction__freight--radioArea"
           v-for="(item, key) in radioButtons"
           :key="item.text">
        <input type="radio"
               name="freight_type"
               checked
               :value="item.value"
               :id="`pl-createAuction__freight--name` + key">
        <label :for="'pl-createAuction__freight--name' + key">{{ item.text }}</label>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import PlSubsectionHeader from "./components/pl-subsectionHeader";

export default {
  components: {
    "pl-subsectionHeader": PlSubsectionHeader
  },
  data: () => ({
    svg: "images/icons/create-auction/updown.svg",
    alt: "Tipo de Frete",
    text: "SELECIONE O TIPO DE FRETE",
    radioButtons: {
      two: {
        text: "FOB",
        value: "FOB"
      }
    }
  })
};
</script>

<style lang="scss">
.pl-createAuction {
  &__freight {
    &--content {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      margin: 0 20%;
    }
    &--radioArea {
      input[type="radio"] + label {
        @include barlowBold;
        color: $darkgrey;
        font-size: 22px;
        line-height: 26px;
        text-transform: uppercase;
        display: inline-block;
        width: 185px;
        height: 50px;
        margin-bottom: 0;
        cursor: pointer;
        background-color: transparent;
        border: 1px solid $greyDisabled;
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input[type="radio"]:checked + label {
        outline: 0;
        background-color: $yellow;
        color: $white;
      }
      input[type="radio"]:hover + label {
        outline: 0;
        background-color: $yellow;
        color: $white;
      }
      input,
      textarea {
        -webkit-appearance: none;
        appearance: none;
        -moz-appearance: none;
      }
    }
  }
}
</style>