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
            <!-- file input -->
            <div v-if="showInputFile" class="pl-modal__content--itens--data">
              <div v-if="item.uploads.uploads[0] == null" class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title mb-10">COMPROVANTE DE PAGAMENTO</p>
                <input 
                  type="file" 
                  @change="carregandoComprovante"
                  id="file" 
                  accept=".pdf">
                <label for="file" id="comprovante-pagamento-btn">Enviar Agora</label>
                <p class="file_input_text file-sending">Enviando Arquivo..</p>
                <p class="file_input_text file-sent">Arquivo Enviado</p>
              </div>
              <div v-else class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title mb-10">COMPROVANTE DE PAGAMENTO</p>
                <p class="file_input_text">Aguardando Aprovação</p>
                <input 
                  type="file" 
                  @change="carregandoComprovante"
                  id="file" 
                  accept=".pdf">
                <label for="file" id="comprovante-pagamento-btn">Enviar Novo Comprovante</label>
                <p class="file_input_text file-sending">Enviando Arquivo..</p>
                <p class="file_input_text file-sent">Arquivo Enviado</p>
              </div>
              <div class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">FRETE</p>
                <p class="pl-modal__content--itens--text">{{ item.freight_type }}</p>
              </div>
            </div>

            <!-- file output -->
            <div v-if="showOutputFile" class="pl-modal__content--itens--data">
              <div class="pl-modal__content--itens--code">
                <p class="pl-modal__content--itens--title mb-10">COMPROVANTE DE PAGAMENTO</p>
                <!-- <p class="file_input_text">Recebido
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.06665" width="9.80519" height="1.50849" transform="rotate(45 1.06665 0)" fill="#01A32E"/>
                    <rect y="6.93335" width="9.80519" height="1.50849" transform="rotate(-45 0 6.93335)" fill="#01A32E"/>
                  </svg>
                </p> -->
                <!-- <p class="file_input_text">Aprovado
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.346624 5.10127L1.88679 3.5611L4.35151 6.02583L4.52829 6.20261L4.70507 6.02583L10.3606 0.370353L11.9259 2.24881L4.5355 9.63923L0.346624 5.10127Z" fill="#FFB119" stroke="white" stroke-width="0.5"/>
                  </svg>
                </p> -->
              </div>
              <div v-if="current_auction" class="pl-modal__content--itens--freight">
                <p class="pl-modal__content--itens--title">Download comprovante</p>
                <a @click="downloadComp()" class="btn-download-comp">Visualizar</a>
                <!-- <p class="pl-modal__content--itens--text">{{ item.freight_type }}</p> -->
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
    showInputFile: false,
    showOutputFile: false,
    current_auction: {}
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
    async carregandoComprovante(e){
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*"
        }
      };

      e.path[1].classList.add("file-being-sent");
      console.log(e.target.files[0]);
      var formData = new FormData();
      formData.append('file', e.target.files[0]); 
      for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
      await this.$store.commit('auction/setAuctionId', this.item.id);

      await this.$store.dispatch('auction/sendPaymentVoucher', formData, config);
      e.path[1].classList.remove("file-being-sent");
      e.path[1].classList.add("file-added");
    },
    async downloadComp(){

      /* var fileURL = window.URL.createObjectURL(new Blob([this.current_auction[0].uploads.uploads[0].url]));
      var fileLink = document.createElement('a');

      fileLink.href = fileURL;
      fileLink.setAttribute('download', 'file.pdf');
      document.body.appendChild(fileLink);

      fileLink.click(); */

      await this.$store.dispatch('auction/downloadPaymentVoucher', {download_url: this.current_auction[0].uploads.uploads[0].url});

    }
  },
  async created() {
    if(window.location.pathname === '/auctions') {
      this.showInputFile = true;

    }else if(window.location.pathname === '/bids'){
      this.showOutputFile = true;
      await this.$store.commit('auction/setFilters', {include:"station,fuel,uploads" ,search: `id:${this.item.id}`, searchFields: 'id:=' });
      await this.$store.dispatch('auction/fetchAuction');
      this.current_auction = await this.$store.getters['auction/getAuction'];

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
.btn-download-comp{
    font-family: $roboto-family;
  color: #333333;
  padding: 7px;
  border: 1px solid #8D99AE;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  background: transparent;
  /* identical to box height */

  letter-spacing: 0.03em;
  margin-top: 20px;

}
.btn-download-comp:hover{
  color: #fff;
  background: #8D99AE;
  cursor: pointer;
  /* identical to box height */

}
.file_input_text{
  font-family: $roboto-family;
  color: #333333;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;

}
.file-sent{
  display: none;
}
.file-sending{
  display: none;
}
.file-being-sent{
  .file-sending{
    display: inline;
  }
  label{
    display: none;
  }

}
.file-added{
  .file-sent{
    display: inline;
  }
  label{
    display: none;
  }
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
    height: 640px;
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
        height: 19%;
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
