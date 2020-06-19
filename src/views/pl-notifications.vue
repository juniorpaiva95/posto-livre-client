<template>
  <div class="pl-notifications">

    <div class="pl-notifications__container container">
      <div class="pl-notifications__header">
        <pl-title>Notificações</pl-title>
        <span class="pl-createAuction__top--subtitle">Confira todas as suas notificações.</span>
      </div>
      <pl-box></pl-box>
    </div>
    
  </div>
</template>

<script>
import PlTitle from "@/components/atoms/pl-title";
import PlBox from "@/components/sections/notifications/pl-box";

export default {
  components: {
    "pl-title": PlTitle,
    "pl-box": PlBox
  }
};
</script>

<style lang="scss">
.pl-notifications {
  &__container {
    width: 50%;
    margin-bottom: 5%;
    margin-top: 5%;

    @media (max-width: $max-lg) {
      width: 70%;
    }
    @media (max-width: $max-md) {
      width: unset;
    }

  }
  &__header {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 5%;

    h1 {
      margin: 0 0 1% 0;
    }
    span{
      font-family: $roboto-family;
      font-size: 16px;
      line-height: 150%;
      letter-spacing: 0.5px!important;
      color: #2B2D42;
    }
  }
}
</style>
