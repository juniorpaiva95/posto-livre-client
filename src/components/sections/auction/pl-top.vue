<template>
  <div class="pl-createAuction__top">
    <pl-title theme="blackBase">{{ title }}</pl-title>
    <span class="pl-createAuction__top--subtitle">{{ subtitle }}</span>
  </div>
</template>

<script>
import PlTitle from "@/components/atoms/pl-title";

export default {
  components: {
    "pl-title": PlTitle
  },
  data: () => ({
    title: "CRIE SEU LEILÃO",
    subtitle: "Mostre sua bandeira, preencha os dados abaixo e crie seu leilão. Tudo simples e com facilidade."
  })
};
</script>

<style lang="scss">
.pl-createAuction__top {
  margin-left: unset;
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;

  h1 {
    font-size: 40px;
    line-height: 114%;
    font-weight: bold;
  }

  &--subtitle {
    @include robotoNormal;
    color: $black90;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.03em;
  }
}
</style>
