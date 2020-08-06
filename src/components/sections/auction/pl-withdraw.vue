<template>
  <div class="pl-createAuction__withdraw">
    <pl-subsectionHeader :svg="svg" :text="text" :alt="alt"></pl-subsectionHeader>
    <div class="pl-createAuction__withdraw--content">
      <div class="pl-createAuction__withdraw--confirm col-12">
        <input type="checkbox" name="confirm_price" class="styled-checkbox" id="pl-createAuction__withdraw--checkbox">
        <label
          class="pl-createAuction__withdraw__label--checkbox"
          for="pl-createAuction__withdraw--checkbox"
        ><b>Concordo</b> que o valor do litro do combustível poderá sofrer variações em decorrência do frete e da tributação aplicada em cada Estado.</label>
      </div>
      <div class="pl-createAuction__withdraw--radioArea"
           v-for="(item, key) in ports"
           :key="item.id">
        <input type="radio"
               name="port_id"
               checked
               :value="item.id"
               :id="`pl-createAuction__withdraw--name` + key">
        <label :for="'pl-createAuction__withdraw--name' + key">{{ item.name }} ({{item.unit.state_abbreviation}})</label>
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
  props: {
    ports: {
        type: Array
    }
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
    &__label--checkbox {
      @include robotoNormal;
      color: $darkgrey;
      text-transform: none;
      letter-spacing: 0.03em;
      font-size: 14px;
      text-decoration: none;
      margin-left: unset;
    }
    &--confirm{
      text-align: center;

    }

    &--checkbox {
      margin-right: 40%;
    }
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