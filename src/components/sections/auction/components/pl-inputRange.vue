<template>
<div class="pl-register">
    <select
      name="duration"
      placeholder="Selecione"
      v-validate="'required'"
      class="pl-register__input"
      :class="{'has-error': errors.has('duration')}">

      <option value="00:30:00" selected="selected">30 min</option>
      <option value="00:01:00">1h</option>
      <option value="01:30:00">1h30min</option>
      <option value="02:00:00">2h</option>
      <option value="02:30:00">2h30min</option>
      <option value="03:00:00">3h</option>
      <option value="03:30:00">3h30min</option>
      <option value="04:00:00">4h</option>
      <option value="04:30:00">4h30min</option>
      <option value="05:00:00">5h</option>
      <option value="05:30:00">5h30min</option>
      <option value="06:00:00">6h</option>
    </select>
</div>
</template>

<script>
export default {
  data: () => ({
    value: 50
  }),
  computed: {
    total: function() {
      return this.value * 10;
    }
  },
};
</script>

<style lang="scss">
.pl-register {
  margin-top: 1%;
  display: flex;
  justify-content: center;

  &__input.has-error, &__input[select].has-error, &__input-text.has-error {
    border-color: #dc3545;
  }

  &__container {
    display: flex;
    justify-content: center;
  }
  &__modal{
    display: none;
    z-index: 100;
    width: 100vh;
    height: 100vh;
    position: absolute;
    &--backdrop{
        background-color: rgba(0, 0, 0, 0.05);
    }
    &--content{
      background-color: #fff;
      min-height: 500px;
      position: relative;
      .close{
        color: $yellow;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  &__terms{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &--text{
      color: $yellow;
      cursor: pointer;
      font-family: $barlow-family;
      display: inline-block;
      margin-bottom: 10px;
    }
    &--agreement{
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
          content: '';
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
          content: '';
          position: absolute;
          left: 3px;
          top: 9px;
          background: white;
          width: 2px;
          height: 2px;
          box-shadow: 
            2px 0 0 white,
            4px 0 0 white,
            4px -2px 0 white,
            4px -4px 0 white,
            4px -6px 0 white,
            4px -8px 0 white;
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
    margin-bottom: 5%;
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
    width: 50%;
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
    min-height: 60px;
    letter-spacing: 0.03em;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;

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

  // @media (min-width: $max-xl) {
  //   &__panel p,
  //   &__panel h1,
  //   &__panel span,
  //   &__panel label {
  //     font-size: 120%;
  //   }
  // }
}
</style>
