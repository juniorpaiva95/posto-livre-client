<template>
  <div class="pl-createAuction__fuel">
    <pl-subsectionHeader :svg="svg" :text="text" :alt="alt"></pl-subsectionHeader>
    <div class="pl-createAuction__fuel--box">
      <div class="pl-createAuction__fuel--buttons">
        <pl-buttonSelect v-for="item in fuel.fuels"
                        :color="item.slug"
                        :key="item.color_hex"
                        :value="item.id"
                        :idKey="item.id">
          {{ item.name }}
          </pl-buttonSelect>
      </div>
    </div>
  </div>
</template>

<script>
import PlSubsectionHeader from "./components/pl-subsectionHeader";
import PlButtonSelect from "./components/pl-buttonSelect";

export default {
  components: {
    "pl-subsectionHeader": PlSubsectionHeader,
    "pl-buttonSelect": PlButtonSelect
  },
  data: () => ({
    svg: "images/icons/create-auction/fuel.svg",
    alt: "Tipo de Combustível",
    text: "SELECIONE UM COMBUSTÍVEL",
    fuel: [],
    buttons: {
      gasolina: {
        size: "md",
        color: "gasolina",
        text: "GASOLINA COMUM",
        value: "1",
        key: "1"
      },
      gasolinaAdt: {
        size: "md",
        color: "gasolinaAdt",
        text: "GASOLINA ADITIVADA",
        value: "2",
        key: "2"
      },
      etanol: {
        size: "md",
        color: "etanol",
        text: "ETANOL",
        value: "3",
        key: "3"
      },
      diesels10: {
        size: "md",
        color: "diesel",
        text: "DIESELs10",
        value: "4",
        key: "4"
      },
      diesels500: {
        size: "md",
        color: "diesels500",
        text: "DIESELs500",
        value: "5",
        key: "5"
      }
    }
  }),
  mounted() {
    this.$store.dispatch('fuel/fetchFuels').then(fuels => { 
        this.fuel = fuels;
    });
  },
};
</script>

<style lang="scss">
.pl-createAuction {
  &__fuel {
    &--buttons {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }
  }
}
</style>
