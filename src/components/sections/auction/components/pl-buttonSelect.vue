<template>
  <div class="pl-buttonSelect" :class="[`pl-buttonSelect--${color}`]" style="">
    <input class="pl-buttonSelect--input"
           type="radio"
           name="fuel_id"
           :value="value"
           :id="`pl-createAuction__freight--buttonSelect` + idKey">
      <label :for="'pl-createAuction__freight--buttonSelect' + idKey">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String
      // gasolina | gasolinaAdt | etanol | diesel
    },
    value: {
      type: String
    },
    idKey: {
      type: String
    }
  }

};
</script>

<style lang="scss">
.pl-buttonSelect {
  width: 150px;
  height: 70px;
  cursor: pointer;
  border-bottom: 1px solid $greyDisabled;
  border-right: 1px solid $greyDisabled;
  border-left: 1px solid $greyDisabled;
  text-align: center;
  margin-bottom: 10px;
  &:hover,
  &:active,
  &:focus {
    color: $white;
  }

  &--input {
    display: flex;
    margin: unset;
  }

  label {
    &:hover,
    &:active,
    &:focus {
      color: $white;
    }

    &.pl-buttonSelect {
    }
  }

  &--gasolina-comum {
    label {
      border-top: 5px solid #faa700;
    }

    input[type="radio"]:checked + label,
    input[type="radio"]:hover + label {
      background: #faa700;
    }
  }
  &--gasolina-aditivada {
    label {
      border-top: 5px solid #01a39d;
    }

    input[type="radio"]:checked + label,
    input[type="radio"]:hover + label {
      background: #01a39d;
    }
  }
  &--etanol {
    label {
      border-top: 5px solid #8d99ae;
    }
    input[type="radio"]:checked + label,
    input[type="radio"]:hover + label {
      background: #8d99ae;
    }
  }
  &--diesel-s10 {
    label {
      border-top: 5px solid #000000;
    }

    input[type="radio"]:checked + label,
    input[type="radio"]:hover + label {
      background: #000000;
    }
  }
  &--diesel-s500{
    label {
      border-top: 5px solid tomato;
    }
    input[type="radio"]:checked + label,
    input[type="radio"]:hover + label {
      background: tomato;
    }
  }
  input[type="radio"] + label {
    @include barlowBold;
    color: $darkgrey;
    font-size: 22px;
    line-height: 26px;
    text-transform: uppercase;
    display: inline-block;
    width: 150px;
    height: 70px;
    margin-bottom: 0;
    cursor: pointer;
    background-color: transparent;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.15s ease-in-out;
  }
  input[type="radio"]:checked + label {
    outline: 0;
    color: $white;
  }
  input[type="radio"]:hover + label {
    outline: 0;
    color: $white;
  }
  input,
  textarea {
    -webkit-appearance: none;
    appearance: none;
    -moz-appearance: none;
  }

  @media (max-width: $max-md) {
    margin-bottom: 3%;
  }
}
</style>
