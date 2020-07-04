<template>
  <div class="pl-subsectionHeader">
    <img :alt="alt" :src="svg" />
    <h2 v-if="text" class="pl-titleSecondary">{{ text }}</h2>
    <div v-if="timeStart" class="d-flex">
      <h2 class="pl-titleSecondary mr-26">{{ timeStart }} <span>{{ timeStartTime }}</span> </h2>
      <h2 class="pl-titleSecondary">{{ timeEnd }} <span>{{ timeEndTime }}</span> </h2>

    </div>
  </div>
</template>

<script>
export default {
  props: ["svg", "alt", "text", "timeStart", "timeStartTime", "timeEnd", "timeEndTime" ]
};
</script>

<style lang="scss">
.pl-subsectionHeader {
  display: flex;
  justify-content: center;
  align-items: center;
  .d-flex{
    display: flex;
  }
  .mr-26{
    margin-right: 26px;
  }
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
    span{
      color: #949494;
    }
  }
  @media (max-width: $max-md) {
    h2 {
      font-size: 18px;
      line-height: 27px;
    }
  }
}
</style>
