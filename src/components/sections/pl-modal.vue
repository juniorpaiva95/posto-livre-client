<template>
  <transition name="pl-modal" id="modal-lances">
    <div class="pl-modal__backdrop">
      <div class="pl-modal__body">
        <div class="pl-modal__header">
          <div class="pl-modal__header--title">
            <pl-title>Detalhes do Leilão</pl-title>
            <p>Verifique todos os detalhes deste leilão.</p>
          </div>
          <div class="pl-modal__header--btn">
            <button id="btn-close-modal" @click="close">
              <img src="images/icons/other-icons/close-modal.svg" alt />
            </button>
          </div>
        </div>
        <div class="pl-modal__content">
          <div class="pl-modal__content--itens">
            <div class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title">ID</p>
                <p class="pl-modal__content--itens--text">{{ item.id }}</p>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">frete</p>
                <p class="pl-modal__content--itens--text">{{ item.freight_type }}</p>
              </div>
            </div>
            <div class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title">Data</p>
                <p class="pl-modal__content--itens--text">{{ item.created_at | datetime }}</p>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">Combustível</p>
                <p class="pl-modal__content--itens--text">{{ item.fuel.name }}</p>
              </div>
            </div>
            <div class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title">status</p>
                <p class="pl-modal__content--itens--text--stats">
                  {{ item.status }}
                  <pl-countdown :auction="item" :date="new Date(item.date_finish)" :isActive="item.status"></pl-countdown>
                </p>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">Revendedor</p>
                <p v-if="item.station">{{ item.station.user.social_reason }}</p>
                <p v-else>-</p>
              </div>
            </div>
            <div class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title">Quantidade</p>
                <p>{{ item.fuel_amount }}L</p>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">local</p>
                <p>{{ item.pickup_location }}</p>
              </div>
            </div>
            <div v-if="showFile" class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title mb-10">COMPROVANTE DE PAGAMENTO</p>
                <!-- <p>{{ item.fuel_amount }}L</p> -->
                <input 
                  type="file" 
                  @change="carregandoComprovante"
                  id="file" 
                  accept=".pdf">
                <label for="file" id="comprovante-pagamento-btn">Enviar Agora</label>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">FRETE</p>
                <p class="pl-modal__content--itens--text">{{ item.freight_type }}</p>
              </div>
            </div>
          </div>
          <div v-if="item.bids" class="pl-modal__content--bids">
            <div
              
              v-bind:key="index"
              class="pl-modal__content--bids--item"
              v-for="(value, index) in sortBidsByAmount"
            >
              <div class="pl-modal__content--bids--item--title">
                <p>{{ value.created_at | datetime }}</p>
              </div>
              <div class="pl-modal__content--bids--item--bid">
                <p
                  :class="{ 'pl-modal__content--bids--item--bid--first': index === 0, 'pl-modal__content--bids--item--bid': index !== 0 }"
                >{{ value.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import PLTitle from "@/components/atoms/pl-title";
import PlCountdown from "../atoms/pl-countdown";
export default {
  components: {
    PlCountdown,
    "pl-title": PLTitle
  },
  props: {
    item: {
      type: Object
    }
  },
  name: "modal",
  data: () => ({
    showModal: false,
    showFile: false,
  }),
  computed: {
    sortBidsByAmount: function() {
      let item = this.item;
      return item.bids.bids.sort((a, b) => {
        console.log(a);
        return a.value - b.value;
      });
    }
  },
  methods: {
    close: function() {
      return this.$emit("close");
    },
    carregandoComprovante(e){
      /* console.log(e); */
      this.$store.dispatch('auction/sendPaymentVoucher', { auction_id: this.item.id })

    }
  },
  created() {
    if(window.location.pathname === '/auctions') {
      this.showFile = true;
    }else if(window.location.pathname === '/bids'){
      this.showFile = true;
    }

  }
};
</script>
<style lang="scss" scoped>
input[type="file"]{
  display: none;
}
#comprovante-pagamento-btn{
  font-family: $roboto-family;
  color: #333333;
  padding: 7px;
  border: 1px solid #8D99AE;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height */

  letter-spacing: 0.03em;
  margin-top: 20px;
}
.mb-10{
  margin-bottom: 10px !important;
}
.pl-modal {
  &__backdrop {
    position: fixed;
    z-index: 10;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  &__body {
    width: 600px;
    height: 600px;
    background-color: #ffffff;
    text-align: left;
    border: 1px solid black;
    @include grid-media($smartphone-grid) {
      width: 90%;
    }
  }
  &__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    padding-left: 40px;
    height: 20%;
    &--title {
      width: 85%;
      h1 {
        text-align: left;
        margin-bottom: 0px;
      }
      p {
        margin-top: 0px;
      }
    }
    &--btn {
      text-align: right;
      button {
        cursor: pointer;
        width: 60px;
        height: 60px;
        position: relative;
        display: flex;
        align-content: center;
        align-items: center;
        text-align: center;
        border: none;
        background-color: #f0f0f0;
        img {
          margin: auto;
        }
        border-radius: 20px;
        &:active {
          border-radius: 20px;
        }
        &:focus {
          outline: none;
          box-shadow: 0 0 3pt 2pt $yellow;
        }
      }
    }
  }
  &__content {
    height: 80%;
    display: flex;
    &--itens {
      width: 70%;
      height: 100%;
      border-right: 1px solid rgba(0, 0, 0, 0.08);
      &--data {
        height: 20%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        padding: 0px 0px 0px 40px;
        display: flex;
        align-content: center;
        align-items: center;
        p {
          margin: 0;
        }
        div {
          width: 50%;
        }
      }
      &--title {
        color: $darkgrey;
        font-family: $roboto-family;
        font-weight: bold;
        text-transform: uppercase;
        padding-bottom: 2px;
      }
      &--text {
        color: $grey;
        font-weight: bold;
        font-family: $roboto-family;
        &--stats {
          color: #ffffff !important;
          font-weight: bold;
          font-family: $roboto-family;
        }
      }
    }
    &--bids {
      height: 100%;
      padding: 40px;
      overflow: auto;
      &--item {
        &--title {
          color: $darkgrey;
          font-family: $roboto-family;
          font-weight: bold;
          text-transform: uppercase;
          p {
            margin-bottom: 3px;
          }
        }
        &--bid {
          p {
            margin-top: 0px;
          }
          &--first {
            background-color: $greenSuccess;
            color: #ffffff !important;
            padding: 2px 10px;
            font-weight: bold;
            font-family: $roboto-family;
          }
          font-family: $roboto-family;
          font-weight: bold;
          color: $grey;
        }
      }
    }
  }
}
</style>
