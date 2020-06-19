<template>
  <div class="pl-account">
    
    <div class="pl-account__container container">

      <div class="pl-account__panel col-10">
        <div class="pl-account__text">
          <h1>{{ title }}</h1>
          <span>{{ subtitle }}</span>
        </div>
        <account-form></account-form>
      </div>
      
    </div>

  </div>
</template>

<script>
import PlAccount from "@/components/sections/account/pl-form";

export default {
  components: {
    "account-form": PlAccount
  },
  data: () => ({
    title: "MINHA CONTA",
    subtitle: "Verifique seus dados, atualize senha etc."
  })
};
</script>

<style lang="scss">
.pl-account {
  margin: 5% 0;

  &__container {
    display: flex;
    justify-content: center;
  }

  &__panel {
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
      font-size: 40px;
      line-height: 114%;
      color: $blackBase;
      margin-bottom: 14px;
    }
    span {
      @include robotoNormal;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0.03em;
      color: $black90;
    }
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
  .pl-account {
    margin: unset;

    &__panel {
      
      width: 100%;
    }

    &__text {
      margin-bottom: 10%;
      width: 80%;
    }

    &__file {
      margin-bottom: 10%;
    }
  }

  @media (max-width: $max-lg) {
    &__panel p,
    &__panel span,
    &__panel label {
      font-size: 80%;
    }
  }
}
</style>
