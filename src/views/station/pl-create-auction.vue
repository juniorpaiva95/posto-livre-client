<template>
  <div class="pl-createAuction">
    <form class="pl-createAuction__form container" novalidate @submit.prevent="onSubmit">
      <div class="pl-createAuction__panel col-9">
        <pl-top></pl-top>
        <pl-fuel></pl-fuel>
        <pl-quantity></pl-quantity>
        <pl-time></pl-time>
        <pl-freight></pl-freight>
        <pl-withdraw :ports="ports"></pl-withdraw>
        <pl-publish></pl-publish>
      </div>
    </form>
  </div>
</template>

<script>
import PlTop from "@/components/sections/auction/pl-top"
import PlFuel from "@/components/sections/auction/pl-fuel"
import PlQuantity from "@/components/sections/auction/pl-quantity"
import PlTime from "@/components/sections/auction/pl-time"
import PlFreight from "@/components/sections/auction/pl-freight"
import PlWithdraw from "@/components/sections/auction/pl-withdraw"
import PlPublish from "@/components/sections/auction/pl-publish"
import Swal from "sweetalert2"

export default {
  data: () => ({
    ports: [],
  }),
  components: {
    "pl-top": PlTop,
    "pl-fuel": PlFuel,
    "pl-quantity": PlQuantity,
    "pl-time": PlTime,
    "pl-freight": PlFreight,
    "pl-withdraw": PlWithdraw,
    "pl-publish": PlPublish
  },
  methods: {
    onSubmit() {
      let form    = document.querySelector('.pl-createAuction__form');
      let payload = Object.fromEntries(new FormData(form));
      /* appending data to form */
      payload.fuel_amount = payload.fuel_amount.replace('.','');
      payload.fuel_amount = payload.fuel_amount.replace(',','');

      let checkForPrice    = document.querySelector('#pl-createAuction__withdraw--checkbox');
      if(!checkForPrice.checked){
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: "É necessário concordar com a possível variação do preço do combustível",
            showConfirmButton: false,
            timer: 8500,
            toast: true
          });
        return;
      }
      if(!payload.fuel_id){
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: "É necessário selecionar um tipo de combustível",
            showConfirmButton: false,
            timer: 8500,
            toast: true
          });
        return;
      }
      if(payload.fuel_amount == "0" || payload.fuel_amount == ""){
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: "É necessário informar a quantidade de litros",
            showConfirmButton: false,
            timer: 8500,
            toast: true
          });
        return;
      }


      
      this.$validator.validate().then(success => {
        setTimeout(() => {
          this.$validator.reset();
        }, 2000);

        if (success) {
          this.$store.dispatch('auction/create', 
            payload
          ).then(() => {
            this.$router.push({ name: 'station.feed' })
          });
        }
        else {
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: "O preenchimento dos campos demarcados são obrigatórios",
            showConfirmButton: false,
            timer: 8500,
            toast: true
          });
        }
      });
    },
  },
  async created(){
    await this.$store.dispatch('auction/fetchPorts');
    this.ports = await this.$store.getters['auction/getPorts'];

  }
};
</script>

<style lang="scss">
.pl-createAuction {
  &__form {
    display: flex;
    justify-content: center;
  }
  &__panel {
      margin-left: unset;

      &> div:not(.pl-createAuction__freight):not(.pl-faq):not(.pl-publish) {
        margin-bottom: 35px;
      }
  }
}
</style>
