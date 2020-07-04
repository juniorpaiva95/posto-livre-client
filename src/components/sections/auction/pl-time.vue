<template>
  <div class="pl-createAuction__time">
    <pl-subsectionHeader 
      :svg="svg" 
      :text="text" 
      :timeStart="timeStart" 
      :timeStartTime="timeStartTime" 
      :timeEnd="timeEnd" 
      :timeEndTime="timeEndTime" 
      :alt="alt">
    </pl-subsectionHeader>
    <!-- <pl-inputRange></pl-inputRange> -->
  </div>
</template>

<script>
import PlSubsectionHeader from "./components/pl-subsectionHeader"
/* import PlInputRange from "./components/pl-inputRange" */

export default {
  components: {
    "pl-subsectionHeader": PlSubsectionHeader,
    /* "pl-inputRange": PlInputRange */
  },
  data: () => ({
    svg: "images/icons/create-auction/clock.svg",
    alt: "Tempo de Duração",
    text: "", /* SELECIONE O TEMPO DE DURAÇÃO */
    timeStart: "INÍCIO",
    timeStartTime: "12H",
    timeEnd: "encerramento",
    timeEndTime: "17H"
  })
};
</script>

<style lang="scss">
</style>