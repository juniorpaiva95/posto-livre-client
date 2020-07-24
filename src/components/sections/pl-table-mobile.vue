<template>
  <section class="pl-table-mobile">
    <div class="container">
      <div class="pl-table-mobile__body">
        <div class="pl-table-mobile__header">
          <div class="pl-table-mobile__plus" @click="onToggleFilter">
            <img :src="link" />
            <span class="pl-table-mobile__header--text" id="btnFilters">Mostrar Filtros</span>
          </div>
          <div class="pl-table-mobile__search">
            <div class="pl-table__search--content">
              <img src="images/icons/other-icons/search.svg" alt />
              <pl-input size="large" placeholder="EX.: Diesel"></pl-input>
            </div>
          </div>
        </div>
        <div class="pl-table-mobile__filters--component" id="filters">
          <pl-filters></pl-filters>
        </div>
        <div
          class="pl-table-mobile__item"
          :class="`${item.fuel.slug}`"
          v-for="(item, i) in items"
          :key="i"
        >
          <table class="pl-table-mobile__item--content">
            <tr>
              <td class="pl-table-mobile__item--type">
                <p>{{item.fuel.name}}</p>
              </td>
              <!-- <td class="pl-table-mobile__item--left">
                                <p class="pl-table-mobile__item--title">Restam</p>
                                <div class="pl-table-mobile__item--slot" v-html="item.date_finish">
                                    {{item.date_finish}}
                                </div>
              </td>-->
              <td class="pl-table-mobile__item--props">
                <p class="pl-table-mobile__item--title">Menor Lance</p>
                <!-- <p>{{item.low_bid}}</p> -->
                <p
                  v-if="getBestBid(item.bids.bids) != 9999"
                  v-html="getBestBid(item.bids.bids)"
                  class="bestbit-text"
                ></p>
                <p v-else>Sem lances</p>
              </td>
              <td class="pl-table-mobile__item--cod">
                <p class="pl-table-mobile__item--title">Local de retirada</p>
                <p>{{item.port.name}} ({{item.port.state_abbreviation}})</p>

                <!-- <p class="pl-table-mobile__item--title">Frete</p>
                <p>{{item.freight}}</p>-->
              </td>
              <!-- <td class="pl-table-mobile__item--bid">
                                <p class="pl-table-mobile__item--title">Seu lance</p>
                                <p v-html="item.bid">{{item.bid}}</p>
              </td>-->
              <td class="pl-table-mobile__item--detail">
                <div class="bid-item">
                    <!-- <span class="bid-value">{{item.bid.formatted || item.bid}}</span> -->
                    <button class="btn pl-btn--table bid-btn" type="button" @click="openModal(item.auctions.auctions[0], item)">...</button>
                </div>    
              </td>

              <td class="pl-table-mobile__item--ico">
                <button class="pl-table-mobile__expand" @click="onToggle">
                  <img src="images/icons/other-icons/expand.svg" />
                </button>
              </td>
            </tr>
          </table>
          <div class="pl-table-mobile__item--expanded">
            <div class="expand__code">
              <p class="pl-table-mobile__item--title" style="color: #000">Pedidos:</p>
            </div>
            <div v-for="(auction, j) in item.auctions.auctions" :key="'auction-'+j+'-'+i" class="expand">
              <!-- <div class="expand__address">
                                    <p>{{item.pickup_location}}</p>
              </div>-->
              <div class="expand__code">
                <p class="pl-table-mobile__item--title">Quantidade</p>
                <p>{{auction.fuel_amount}} L</p>
              </div>
              <div class="expand__freight">
                <p class="pl-table-mobile__item--title">Frete</p>
                <p>{{auction.freight_type}}</p>
              </div>
              <div class="expand__freight">
                <p class="pl-table-mobile__item--title">Restam</p>
                <div style="display: none">
                  <pl-countdown @handleOverdue="disableBtnDarLance(auction)" :auction="auction"></pl-countdown>
                </div>
                <p>{{auction.date_finish}}</p>
              </div>
            </div>
            <template v-if="distributor && !btnIsBlocked(item.auctions.auctions[0])">
              <pl-table-input :maxBid="getBestBid(item.bids.bids)" :item="item"></pl-table-input>
            </template>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="pl-table-mobile__button">
          <pl-btn type="standard" text="Mostrar Mais"></pl-btn>
        </div>
      </div>
      <pl-modal
        :item='modalData'
        v-if="showModal" @close="showModal = false">
      </pl-modal>

    </div>
  </section>
</template>
<script>
/* eslint-disable */

// due to annoying eslint pseudo errors
import PLInput from "@/components/atoms/pl-input";
import PLTableInput from "@/components/atoms/pl-table-input";
import PLFilters from "@/components/sections/pl-filters";
import PLBtn from "@/components/atoms/pl-btn";
import { mapGetters } from "vuex";
import PLModal from '@/components/sections/pl-modal';
import PLCountdown from "@/components/atoms/pl-countdown";

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    "pl-input": PLInput,
    'pl-modal': PLModal,
    "pl-table-input": PLTableInput,
    "pl-filters": PLFilters,
    "pl-btn": PLBtn,
    "pl-countdown": PLCountdown

  },
  computed: {
    ...mapGetters({
      user: "auth/getUser",
      auctionPagination: "auction/getPagination"
    }),
    distributor: function() {
      return this.user && this.user.roles[0].name == "distributor";
    }
  },

  data: () => ({
    link: "images/icons/other-icons/plus.svg",
    modalData: '',
    showModal: false,
    showModalBid: false,
    items: [],
    btnsBlocked: []

  }),
  methods: {
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
      console.log("btnIsBlocked");
      console.log(this.btnsBlocked.filter(itemData => itemData === item.id).length)
      return this.btnsBlocked.filter(itemData => itemData === item.id).length;
    },

    getBestBid(bids) {
      let bestBid = 9999;
      bids.forEach(e => {
        if (e.value < bestBid) {
          bestBid = +e.value;
        }
      });
      return bestBid;
    },

    onToggle(event) {
      var item = event.target.closest(".pl-table-mobile__item");
      // eslint-disable-next-line
      $(".pl-table-mobile__item--expanded", item).slideToggle(500);
      var arrow = item.querySelector(".pl-table-mobile__item--ico");
      if (arrow.classList.contains("flip")) {
        arrow.classList.remove("flip");
        return;
      }
      arrow.className += " flip";
    },
    // eslint-disable-next-line
    onToggleFilter(event) {
      var item = document.getElementById("btnFilters");
      console.log(item.style.color.toString);
      item.classList.toggle("plus-active");

      $("#filters").slideToggle("slow", function() {});
      if (this.link == "images/icons/other-icons/plus.svg") {
        this.link = "images/icons/other-icons/minus.svg";
      } else {
        this.link = "images/icons/other-icons/plus.svg";
      }
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
<style lang="scss">
.flip {
  transform: rotate(-180deg);
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
.bestbit-text {
  background-color: #01a32e;
  color: #fff;
  display: inline;
  padding: 2px;
}
.plus-active {
  color: $yellow !important;
}
.pl-table__search--content {
  display: flex !important;
}
.pl-table-mobile {
  &__button {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }
  &__filters--component {
    width: 100%;
    display: block;
    border: 1px solid black;
    display: none;
  }
  .pl-table__item {
    &--success {
      line-height: 12px;
      padding: 4px 0px 4px 4px;
      display: inline-block;
      width: calc(100% - 4px);
    }
    &--danger {
      line-height: 12px;
      padding: 4px 0px 4px 4px;
      display: inline-block;
      width: calc(100% - 4px);
    }
    &--default {
      line-height: 12px;
      padding: 4px 0px 4px 4px;
      display: inline-block;
      width: calc(100% - 4px);
    }
  }
  .gasolina-comum {
    border-left: 5px solid $yellow !important;
  }
  .gasolina-aditivada {
    border-left: 5px solid #01a39d !important;
  }
  .etanol {
    border-left: 5px solid #8d99ae !important;
  }
  .diesel-s10 {
    border-left: 5px solid #000000 !important;
  }
  .diesel-s500 {
    border-left: 5px solid tomato !important;
  }
  .container {
    width: 100%;
  }
  &__body {
    margin-bottom: 50px;
    background: $grey;
    width: 100%;
  }
  &__header {
    padding: 10px;
    height: 50px;
    text-transform: uppercase;
    &--text {
      color: #ffffff;
      padding-left: 5px;
      line-height: 20px;
    }
  }
  &__plus {
    display: flex;
    align-items: center;
    cursor: pointer;
    height: 100%;
    float: left;
    width: 25%;
    font-size: 12px;
    padding-left: 10px;
    @include grid-media($smartphone-grid) {
      width: 40%;
    }
  }
  &__search {
    line-height: 100%;
    display: flex !important;
    align-items: center;
    width: 75%;
    height: 100%;
    padding: 10px;
    &--content {
      display: flex !important;
      width: 100%;
      border: 1px solid rgba(white, 0.3);
      background-color: rgba(white, 0.3);
      img {
        padding-right: 10px;
        padding-left: 10px;
      }
      &:focus {
        outline: 1px solid $yellow;
      }
    }
    @include grid-media($smartphone-grid) {
      width: 60%;
    }
  }
  &__expand {
    background: none;
    border: none;
    img {
      width: 100%;
      height: 100%;
    }
    &:visited {
      outline: none;
    }
    &:focus {
      outline: none;
    }
  }
  &__item {
    flex-flow: row;
    padding: 10px;
    background-color: #ffffff;
    border-left: 5px solid $yellow;
    border-bottom: 1px solid $darkgrey;
    border-right: 1px solid $darkgrey;
    font-size: 12;
    p {
      margin: 0 0 0 0;
      font-size: 12px;
    }
    table {
      width: 100%;
    }
    @include grid-media($smartphone-grid) {
      padding: 10px 2px;
    }
    &--content {
      font-family: $roboto-family;
      font-weight: 600;
      td {
        padding: 0 10px;
        vertical-align: top;
      }
      @include grid-media($smartphone-grid) {
        td {
          padding: 0px 1px;
        }
      }
    }
    &--slot {
      width: 100%;
      height: 50%;
    }
    &--title {
      color: $darkgrey;
      font-family: $roboto-family;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 700;
      margin-top: 10px;
      margin-bottom: 0px;
      padding: 0;
      @include grid-media($smartphone-grid) {
        font-size: 8px !important;
      }
    }
    &--default {
      padding: 0px 0px 0px 0px !important;
      width: 100%;
      text-align: center;
      margin: 0 0 0 0;
      text-transform: uppercase;
      background-color: $yellow;
      color: #fff;
    }
    &--danger {
      padding: 4px 1px 4px 1px;
      width: 100%;
      margin: 0 0 0 0;
      background-color: $redDanger;
      @include grid-media($smartphone-grid) {
        font-size: 10px;
      }
    }
    &--success {
      padding: 4px 1px 4px 1px;
      width: 100%;
      margin: 0 0 0 0;
      background-color: $greenSuccess;
    }
    //table cols
    &--type {
      width: 15%;
      vertical-align: middle !important;
      color: $baseBlack;
      @include grid-media($smartphone-grid) {
        span {
          font-size: 10px;
        }
        width: 15%;
      }
    }
    &--left {
      width: 25%;
      color: $baseBlack;
      p {
        margin-bottom: 5px;
      }
      @include grid-media($smartphone-grid) {
        font-size: 10px;

        p {
          margin-bottom: 0px;
        }
        width: 25%;
      }
    }
    &--cod {
      width: 10%;
      color: $baseBlack;
    }
    &--props {
      width: 15%;
    }
    &--bid {
      width: 15%;
      p {
        margin-bottom: 5px;
      }
      @include grid-media($smartphone-grid) {
        width: 15%;
        p {
          margin-bottom: 0px;
        }
      }
    }
    &--detail {
      width: 3% !important;
      p {
        margin-bottom: 5px;
      }
      @include grid-media($smartphone-grid) {
        width: 15%;
        p {
          margin-bottom: 0px;
        }
      }
    }
    &--ico {
      width: 10%;
      vertical-align: middle !important;
      -moz-transition: transform 0.5s;
      -webkit-transition: transform 0.5s;
      transition: transform s;
    }
    &--expanded {
      display: none;
      .expand {
        display: flex;
        align-items: center;
        padding: 10px 0 10px 0;
        &__address {
          width: 30%;
        }
        &__code {
          margin-left: 5%;
          width: 20%;
        }
        &__freight {
          width: 45%;
        }
        &__input {
          width: 100%;
        }
        &__button {
          width: 100%;
          background-color: $yellow;
        }
      }
    }
  }
}
</style>
