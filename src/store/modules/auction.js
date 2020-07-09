import apiService from "@/services/api";
import Swal from "sweetalert2";
import { filterToQuery } from "../../utils/api/util";

const INITIAL_STATE = () => {
  return {
    auctions: [],
    ports: [],
    pagination: "",
    concat: false,
    filters: {
      include: "station,fuel",/* bids,bestBid */
      search: "",
      searchFields: "",
      status: 1,
      cidade: "",
      estado: "",
      relevancia: "",
      page: 1,
      limit: 30
    }
  }
};

export default {
  namespaced: true,
  state: INITIAL_STATE(),
  getters: {
    getAuctions(state) {
      return state.auctions;
    },
    getPorts(state) {
      return state.ports;
    },
    getPagination(state) {
      return state.pagination;
    },
    getFilters(state) {
      return state.filters;
    }
  },
  mutations: {
    pushAuction(state, auction) {
      state.auctions.push(auction);
    },
    concatAuctions(state, auctions) {
      state.auctions.push(...auctions);
    },
    incrementPage(state) {
      state.filters.page = state.filters.page + 1;
    },
    setAuctions(state, auctions) {
      state.auctions = auctions;
    },
    setports(state, ports) {
      state.ports = ports;
    },
    setConcat(state, concat) {
      state.concat = concat;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setFilters(state, filters) {
      state.filters = { ...state.filters, ...filters };
    },
    resetState(state) {
      Object.assign(state, INITIAL_STATE());
    },
    withoutPaginate(state) {
      let noPaginate = { page: "", perPage: "" };
      state.filters = { ...state.filters, ...noPaginate };
    }
  },
  actions: {
    create: async ({ state, commit, rootState }, payload) => {
      let stations = await rootState.station;
      let user = await rootState.auth.user;

      stations.station.forEach(st => {
        if (st.user_id == user.id) {
          console.log(st.user_id);
          payload.station_id = st.id;

        }
      });


      // * adding date_start and date_finish to payload

      console.log(payload);
      return new Promise((resolve, reject) => {
        apiService.post(`/api/v1/auctions`, payload).then(
          response => {
            console.log("auctions response");
            console.log(response);

            if (response.status == 200) {
              commit("pushAuction", response.data);

              Swal.fire({
                position: "bottom-end",
                type: "success",
                title: "Leilão registrado com sucesso.",
                showConfirmButton: false,
                timer: 8500,
                toast: true
              });

              return resolve(state.auctions);
            } else if (response.status == 400) {
              Swal.fire({
                position: "bottom-end",
                type: "error",
                title: response.error.message,
                showConfirmButton: false,
                timer: 8500,
                toast: true
              });

            }

            return reject(response);
          },
          () => {
            Swal.fire({
              position: "bottom-end",
              type: "error",
              title: "Houve uma falha",
              showConfirmButton: false,
              timer: 8500,
              toast: true
            });
          }
        );
      });
    },
    deleteAuction: async ({ dispatch }, { auction_id }) => {
      await apiService.delete(`api/v1/auctions/${auction_id}`).then(response => {
        Swal.fire({
          position: "bottom-end",
          type: "success",
          title: "Pedido cancelado com sucesso!",
          timer: 3000,
          toast: true
        });
        dispatch('fetchAuctions');
      }).catch(error => {
        Swal.fire({
          position: "bottom-end",
          type: "error",
          title: error.message,
          timer: 3000,
          toast: true
        });
      })
    },
    sendPaymentVoucher: async ({ dispatch }, { auction_id }, payload) => {
      /* console.log("sending payment being called to");
      console.log(auction_id);
      return; */
      await apiService.post(`api/v1/auctions/${auction_id}/upload`, payload).then(response => {
        Swal.fire({
          position: "bottom-end",
          type: "success",
          title: "Comprovante enviado com sucesso!",
          timer: 3000,
          toast: true
        });
        dispatch('fetchAuctions');
      }).catch(error => {
        Swal.fire({
          position: "bottom-end",
          type: "error",
          title: error.message,
          timer: 3000,
          toast: true
        });
      })
    },
    fetchAuctions: async ({ state, commit, rootState }, payload) => {
      let concat = rootState.auction.concat;
      let fromOriginFilters = payload ? payload.hasOwnProperty('fromFilters') : false;
      if (concat && !fromOriginFilters) {
        commit('incrementPage');
      }
      let user = await rootState.auth.user;
      let url = "/api/v1/auctions";

      let filterQueryString = filterToQuery(state.filters);
      if(state.filters)

      console.log("filterQueryString");
      console.log(filterQueryString);
      
      await apiService.get(`${url}?${filterQueryString}`).then(response => {
        if (response.status == 200) {
          let data = response.data.auctions;
          console.log("this is the return of auctions.js => fetchAuctions");
          console.log(concat);
          if (concat) {
            commit("concatAuctions", data);
          } else {
            commit("setAuctions", data);
          }

        }
      });
    },
    fetchPorts: async ({ state, commit, rootState }) => {
      let user = await rootState.auth.user;
      let url = "/api/v1/ports";
      await apiService.get(`${url}`).then(response => {
        if (response.status == 200) {
          let data = response.data.ports;
          console.log(data);
          state.ports = data;
          /* commit("auction/setPorts", data, { rootState: true }); */
          /* this.$store.dispatch('auction/setPorts', data) */


        }
      });
    },

    // fetchDistributorAuctionsWins({ state, commit }) {
    //   return new Promise((resolve, reject) => {
    //     commit('withoutPaginate');
    //     let filterQueryString = filterToQuery(state.filters);
    //     apiService.get('/api/v1/distributor/auctions/bids/wins?' + filterQueryString).then(response => {
    //       if (response.status == 200) {
    //         let { data, ...rest } = response.data;
    //         commit("setAuctions", data);
    //         commit("setPagination", rest);
    //         return resolve(state.auctions);
    //       }

    //       return reject(response);
    //     });
    //   });
    // },
  }
};
