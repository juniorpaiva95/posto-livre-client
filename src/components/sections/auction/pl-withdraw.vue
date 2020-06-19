<template>
  <div class="pl-createAuction__withdraw">
    <pl-subsectionHeader :svg="svg" :text="text" :alt="alt"></pl-subsectionHeader>
    <div class="pl-createAuction__withdraw--content">
      <div class="pl-createAuction__withdraw--radioArea"
           v-for="(item, key) in radioButtons"
           :key="item.text">
        <input type="radio"
               name="withdraw"
               checked
               :value="item.value"
               :id="`pl-createAuction__withdraw--name` + key">
        <label :for="'pl-createAuction__withdraw--name' + key">{{ item.text }}</label>
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
    svg: "images/icons/create-auction/withdraw.svg",
    alt: "Retirada",
    text: "SELECIONE O LOCAL DE RETIRADA",
    radioButtons: {
      one: {
        text: "PORTO DE CABEDELO (PB)",
        value: 1
      },
      two: {
        text: "PORTO DE SUAPE (PE)",
        value: 2
      },
      three: {
        text: "PORTO DE GUAMORÉ (RN)",
        value: 3
      }
    }
  })
};
</script>

<style lang="scss">
.pl-createAuction {
  &__withdraw {
    &--content {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      margin: 0;
    }
    &--radioArea {
      input[type="radio"] + label {
        @include barlowBold;
        margin: 0 5px;
        color: $darkgrey;
        font-size: 22px;
        line-height: 26px;
        text-transform: uppercase;
        display: inline-block;
        width: 270px;
        height: 50px;
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