<template>
  <div class="pl-subsectionHeader">
    <img :alt="alt" :src="svg">
    <h2 class="pl-titleSecondary">
      {{ text }}
   </h2>
  </div>
</template>

<script>
export default {
  props: ["svg", "alt", "text"]
};
</script>

<style lang="scss">
.pl-subsectionHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 2%;
  }
  h2 {
    @include barlowBold;
    text-transform: uppercase;
    text-align: center;
    font-size: 26px;
    line-height: 31px;
    color: $blackBase;
  }
  @media (max-width: $max-md) {
    h2 {
        font-size: 18px;
        line-height: 27px;
    }
  }
}
</style>
