<template>
  <div class="pl-publish">
    <div class="pl-publish__text">
      <div class="pl-publish__text--title">
        <h3>{{ title }}</h3>
      </div>
      <div class="pl-publish__text--paragraph">
        <p>{{ paragraph1 }}</p>
        <p>{{ paragraph2 }}</p>
      </div>
    </div>
    <div class="pl-publish__buttonArea">
      <button class="pl-btn pl-publish__button" type="submit">ENVIAR</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "PUBLICAR LEILÃO",
    paragraph1: "Tudo pronto para publicar seu leilão para análise.",
    paragraph2: "Confira se todos os dados estão corretos."
  })
};
</script>

<style lang="scss">
.pl-btn {
    cursor: pointer;
    font-family: "Barlow", sans-serif;
    letter-spacing: 3%;
    font-weight: 500;
    text-transform: uppercase;
    padding-top: 12px;
    padding-bottom: 12px;
    display: inline;
    font-size: 14px;
    border: none;
    color: #fff;
    background-color: #FFB119;
}
.pl-publish {
  margin: 10% 0;

  &__text {
    text-align: center;
    margin-bottom: 1em;

    &--title {
      h3 {
        @include barlowBold;
        font-size: 22px;
        line-height: 26px;
        text-transform: uppercase;
        color: $blackBase;
      }
    }

    &--paragraph {
      p {
        font-family: $roboto-family;
        font-weight: 400;
        color: #434343;
        line-height: 150%;
        margin: unset;
      }
    }
  }

  &__buttonArea {
    display: flex;
    justify-content: center;
  }

  &__button {
      width: 45%;

      @media (max-width: $max-md) {
            width: 100%;
      }
  }
}
</style>
