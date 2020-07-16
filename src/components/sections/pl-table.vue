<template>
  <section class="pl-table">
    <table class="pl-table__body--desktop col-12" style="border-bottom: 1px solid gray">
      <tr>
        <td colspan="9" class="pl-table__header">
          <div class="pl-table__showMore" @click="onToggle" id="filterBtn">
            <img :src="link" />
            <p class="pl-table__header--text">Mostrar Filtros</p>
          </div>
          <div class="pl-table__search">
            <div class="pl-table__search--content">
              <img src="images/icons/other-icons/search.svg" alt />
              <pl-input size="large" placeholder="EX.: Diesel"></pl-input>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="9" class="pl-table__filters">
          <div class="pl-table__filters--component">
            <pl-filters></pl-filters>
          </div>
        </td>
      </tr>
      <tr class="pl-table__labels">
        <td class="pl-table__cod">
          <p>#COD.</p>
        </td>
        <td>
          <p>COMBUSTÍVEL</p>
        </td>
        <!-- <td>
          <p>QUANTIDADE</p>
        </td> -->
        <!-- <td>
          <p>FRETE</p>
        </td> -->
        <!-- <td>
          <p>
            TEMPO
            <br />RESTANTE
          </p>
        </td> -->
        <td>
          <p>LOCAL DE RETIRADA</p>
        </td>
        <td>
          <p>MELHOR LANCE</p>
        </td>
        <!-- <td>
                        <p>SEU LANCE</p>
        </td>-->
        <td></td>
      </tr>
      <template v-for="(item, i) in items">
        <tr
          class="pl-table__item"
          style="border-bottom: 0"
          :key="i"
          :class="`-${item.fuel.slug}`"
        >
          <!--@click="showModal = true"-->
          <td>
            <p class="itemTitle">#COD.</p>
            {{i}}
            <!-- item.id -->
          </td>
          <td>
            <p class="itemTitle">COMBUSTÍVEL</p>
            {{item.fuel.name}}
          </td> 
          <!-- <td>
            {{item.fuel_amount}}
          </td> -->
          <!-- <td
                        {{item.low_bid}}
          </td>-->
          <!-- <td>
            {{item.freight_type}}
          </td> -->
          <!-- <td slot="time_left">
            <pl-countdown @handleOverdue="disableBtnDarLance(item)" :auction="item"></pl-countdown>
          </td> -->
          <td>
            <!-- use the modal component, pass in the prop -->
            <!-- <pl-modal 
                            :data='[
                                item.code,
                                item.category, 
                                item.amount, 
                                item.low_bid, 
                                item.freight, 
                                item.time_left, 
                                item.address, 
                                item.bid
                            ]'
            v-if="showModal" @close="showModal = false"></pl-modal>-->
            <!-- <pl-modal 
                            :data='[
                                i,
                                item.fuel.name, 
                                item.fuel_amount, 
                                0, 
                                item.freight_type, 
                                new Date(item.date_finish), 
                                item.pickup_location, 
                                item.bid
                            ]'
            v-if="showModal" @close="showModal = false"></pl-modal>-->
            <p class="itemTitle">LOCAL DE RETIRADA</p>
            {{item.port.name}} ({{item.port.state_abbreviation}})
          </td>
          <td>
            <p class="itemTitle">MELHOR LANCE</p>
              <!-- {{ item.bestBid ||  'Sem lances' }} -->
              <p v-if="getBestBid(item.bids.bids) != 9999" v-html="getBestBid(item.bids.bids)" class="bestbit-text"></p>
              <p v-else>
                Sem lances
              </p>

          </td>

          <!-- <td>
          </td>-->
          <td class="pl-table__input">
            <template v-if="distributor && !btnIsBlocked(item)">
              <pl-table-input-desktop :item="item" />
            </template>
          </td>

        </tr>        
        <tr
          colspan="9"
          class="pl-table__item no-border"
          style="height: 50px; padding-bottom: 10px"
          v-for="(auction, j) in item.auctions.auctions"
          :key="'auction-'+j+'-'+i"
          :class="`-${item.fuel.slug}`"
        >
        
            <td>
              <p v-if="j==0">
                Pedidos:
              </p>
            </td>
            <td>
                <p class="itemTitle">FRETE</p>
                {{auction.freight_type}}
            </td>
            <td class="pb-10">
                <p class="itemTitle">TEMPO RESTANTE</p>

                <pl-countdown @handleOverdue="disableBtnDarLance(auction)" :auction="auction"></pl-countdown>
            </td>
            <td>
                <p class="itemTitle">QUANTIDADE</p>

                {{auction.fuel_amount}} L
            </td>
            <td>
              <div class="bid-item">
                  <!-- <span class="bid-value">{{item.bid.formatted || item.bid}}</span> -->
                  <button class="btn pl-btn--table bid-btn" type="button" @click="openModal(auction, item)">...</button>
              </div>    
            </td>



        </tr>
      </template>
    </table>
    <div class="col-12" v-if="btnShowMoreIsVisible">
      <div class="pl-table__button">
        <button class="pl-btn pl-btn--standard" @click="handleShowMore">Mostrar Mais</button> 
      </div>
    </div>
    <pl-modal
      :item='modalData'
      v-if="showModal" @close="showModal = false">
    </pl-modal>

  </section>
</template> 
<script>
/* eslint-disable */

// eslint disable is due to JQuery conflicts
import PLInput from "@/components/atoms/pl-input";
import PLModal from "@/components/sections/pl-modal";
import PLBtn from "@/components/atoms/pl-btn";
import PLTableInputDesktop from "@/components/atoms/pl-table-input-desktop";
import PLFilters from "@/components/sections/pl-filters";
import PLCountdown from "@/components/atoms/pl-countdown";
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auctionPagination: "auction/getPagination"
    }),
    distributor: function() {
      return this.user && this.user.roles[0].name == "distributor";
    },
    btnShowMoreIsVisible: function() {
      // @TODO: Melhorar
      return (
        this.auctionPagination.hasOwnProperty("links") &&
        !!this.auctionPagination.links.next
      );
    }
  },
  data: () => ({
    value: null,
    showModal: false,
    showModalBid: false,
    modalData: '',
    link: "images/icons/other-icons/plus.svg",
    items: [],
    btnsBlocked: []
  }),
  components: {
    "pl-input": PLInput,
    "pl-filters": PLFilters,
    "pl-table-input-desktop": PLTableInputDesktop,
    "pl-modal": PLModal,
    "pl-btn": PLBtn,
    "pl-countdown": PLCountdown
  },
  methods: {
    getBestBid(bids){
      let bestBid = 9999;
      bids.forEach(e => {
        if(e.value < bestBid){
          bestBid = e.value;
        }
      });
      return bestBid
    },
    handleShowMore() {
      this.$store.commit("auction/setConcat", true);
      this.$store.dispatch("auction/fetchLot");
    },
    openModal(auction, item) {

      var modalItem = auction;
      modalItem.fuel = item.fuel;
      modalItem.bids = item.bids;
      console.log("this is what is being passed to the modal");
      console.log(modalItem);
      this.modalData = modalItem;
      this.showModal = true;
    },

    disableBtnDarLance(item) {
      this.btnsBlocked.push(item.id);
    },
    btnIsBlocked(item) {
      return this.btnsBlocked.filter(itemData => itemData === item.id).length;
    },
    onToggle(event) {
      var item = event.target.closest(".pl-table__body--desktop");
      $(".pl-table__filters--component", item).slideToggle(500);
      var item = document.getElementById("filterBtn");
      item.classList.toggle("plus-active");
      if (this.link == "images/icons/other-icons/plus.svg") {
        this.link = "images/icons/other-icons/minus.svg";
      } else {
        this.link = "images/icons/other-icons/plus.svg";
      }
    },
    showModalBidF() {
      showModalBid = true;
    },
    formatDate(data) {
      return moment(data.date).format("LTS");
    }
  },
  created() {
    this.$store.commit("auction/resetState");
    this.items = this.$store.getters["auction/getAuctions"];
    this.$store.watch(
      (state, getters) => getters["auction/getAuctions"],
      (newValue, oldValue) => {
        this.items = newValue;
      }
    );
  }
};
</script>
<style lang="scss" scoped>
.itemTitle{
  font-size: 10px;
  color: gray;
}
.no-border{
  border-top: 0 !important;
  border-bottom: 0 !important;
}
.bestbit-text{
  background-color: #01A32E;
  color: #fff;
  display: inline;
  padding: 2px;
}
.pb-10{
  padding-bottom: 10px !important;
}
.bid-btn{
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 0px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 5px;
    text-align: center;
    border: 2px solid grey!important;
    background-color: #fff;
    border-radius: 2px!important;
    cursor: pointer;
    outline: none;
}
.plus-active {
  color: $yellow !important;
}
.pl-table {
  margin-bottom: 50px;
  table {
    border-collapse: collapse;
    background-color: #ffffff;
  }
  tr {
    border: 1px solid $middlegrey;
  }
  td {
    padding: 0 10px 0 10px;
    font-size: 14px;
    font-family: $roboto-family;
    font-weight: bold;
  }
  .-gasolina-comum {
    border-left: 5px solid $yellow !important;
  }
  .-gasolina-aditivada {
    border-left: 5px solid #01a39d !important;
  }
  .-etanol {
    border-left: 5px solid #8d99ae !important;
  }
  .-diesel-s10 {
    border-left: 5px solid #000000 !important;
  }
  .-diesel-s500 {
    border-left: 5px solid tomato !important;
  }
  &__header {
    width: 100%;
    background-color: $grey;
    height: 50px;
    text-align: left;
    color: $greyTable;
    padding-left: 20px;
    text-transform: uppercase;
  }
  &__labels {
    color: #949494;
    font-family: roboto;
    font-weight: bold;
    td {
      font-size: 12px !important;
    }
  }
  &__button {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }
  // table filters
  &__filters {
    &--component {
      display: none;
    }
  }
  &__item {
    height: 100px;
    border-left: 5px solid $greenSuccess;
    border-bottom: 1px solid $middlegrey;
    border-right: 1px solid $middlegrey;
    &--default {
      padding: 4px;
      line-height: 20px;
      background-color: $yellow;
      color: #fff;
    }
    &--danger {
      padding: 4px;
      line-height: 20px;
      color: #fff;
      background-color: $redDanger;
    }
    &--success {
      padding: 4px;
      line-height: 20px;
      color: #fff;
      background-color: $greenSuccess;
    }
  }
  &__bid--input {
    font-size: 14px;
    max-width: 80px;
    text-transform: uppercase;
    border: solid 1px $middlegrey;
    color: $middlegrey;
    padding: 13px;
    &:focus {
      border: 2px solid color $yellow !important;
      outline: none;
    }
    @include grid-media($small-desktop-grid) {
      padding: 11px 2px 12px 2px;
    }
  }
  &__plus {
    cursor: pointer;
  }
  &__showMore {
    display: flex;
    color: #ffffff;
    align-items: center;
    cursor: pointer;
    height: 100%;
    float: left;
    width: 18%;
    padding-left: 10px;
    p {
      line-height: 20px;
      padding-left: 10px;
    }
  }
  &__search {
    line-height: 100%;
    width: 30%;
    height: 100%;
    padding: 10px;
    margin-left: 18%;
    &--content {
      display: flex;
      background-color: rgba(white, 0.3);
      img {
        padding-right: 10px;
        padding-left: 10px;
      }
      &:focus {
        outline: 1px solid $yellow;
      }
    }
  }
  // input from table:
  &__field {
    width: 60%;
    float: left;
    height: 45px;
    @include grid-media($small-desktop-grid) {
      height: 42px;
    }
    background-color: #ffffff;
    border: 1px solid $middlegrey;
    display: flex;
    align-items: center;
    input {
      width: 60%;
      background: transparent;
      border: none;
      text-align: center;
      color: $middlegrey;
      font-weight: bold;
      font-family: $roboto-family;
      font-size: 14px;
      height: 100%;
      &:focus {
        outline: none;
      }
    }
    div {
      width: 20%;
      height: 100%;
      display: flex;
      align-items: center;
      align-content: center;
      text-align: center;
      img {
        width: 15px;
        margin: auto;
      }
      cursor: pointer;
    }
    &:focus {
      outline: 1px $yellow;
    }
  }
}
</style>
