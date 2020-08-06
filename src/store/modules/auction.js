import apiService from "@/services/api";
import Swal from "sweetalert2";
import { filterToQuery } from "../../utils/api/util";

const INITIAL_STATE = () => {
  return {
    auctions: [],
    auction: [],
    ports: [],
    pagination: "",
    concat: false,
    auction_id: "",
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
    getAuction(state) {
      return state.auction;
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
    setAuction(state, auction) {
      state.auction = auction;
    },
    setAuctionId(state, id) {
      state.auction_id = id;
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
            } else if (response.status == 422) {
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
          (error) => {
            Swal.fire({
              position: "bottom-end",
              type: "error",
              title: "Horário de leilão não permitido! Tente solicitar entre os horários de 12h às 17h",
              showConfirmButton: false,
              timer: 8500,
              toast: true
            });
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
    downloadPaymentVoucher: async ({ dispatch }, { download_url }) => {
      await apiService.get(`${download_url}`).then(response => {
        if (response.data.error.code === 200) {
          Swal.fire({
            position: "bottom-end",
            type: "success",
            title: "Download realizado com sucesso!",
            timer: 3000,
            toast: true
          });
        }else {
          Swal.fire({
            position: "bottom-end",
            type: "error",
            title: response.data.error.message,
            timer: 3000,
            toast: true
          });
  
        }
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

    sendPaymentVoucher: async ({ commit, state }, payload) => {
      /* console.log("sending payment being called to");
      console.log(auction_id);
      return; */
      console.log("is payload valid??");
      console.log(payload);
      console.log(state.auction_id);
      await apiService.post(`api/v1/auctions/${state.auction_id}/upload`, payload).then(response => {
        Swal.fire({
          position: "bottom-end",
          type: "success",
          title: "Comprovante enviado com sucesso!",
          timer: 3000,
          toast: true
        });
      }).catch(error => {
        Swal.fire({
          position: "bottom-end",
          type: "error",
          title: error.message + " --",
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

      console.log("filterQueryString");
      console.log(filterQueryString);

      await apiService.get(`${url}?${filterQueryString}`).then(response => {
        if (response.status == 200) {
          let data = response.data.auctions;
          /* console.log("this is the return of auctions.js => fetchAuctions");
          console.log(concat); */
          if (concat) {
            commit("concatAuctions", data);
          } else {
            commit("setAuctions", data);
          }

        }
      });
    },
    fetchAuction: async ({ state, commit }) => {
      let url = "/api/v1/auctions";

      let filterQueryString = filterToQuery(state.filters);

      await apiService.get(`${url}?${filterQueryString}`).then(response => {
        if (response.status == 200) {
          let data = response.data.auctions;
          commit("setAuction", data);

        }
      });
    },
    fetchLot: async ({ state, commit, rootState }, payload) => {
      let concat = rootState.auction.concat;
      let fromOriginFilters = payload ? payload.hasOwnProperty('fromFilters') : false;
      if (concat && !fromOriginFilters) {
        commit('incrementPage');
      }
      let user = await rootState.auth.user;
      let url = "/api/v1/lot";

      let lotFilters = state.filters;
      lotFilters.include = "fuel,port.unit,auctions,bids";

      let filterQueryString = filterToQuery(state.filters);

      /* console.log("showing filters query strings");
      console.log(lotFilters)
      console.log(filterQueryString) */


      await apiService.get(`${url}?${filterQueryString}`).then(response => {
        if (response.status == 200) {
          let data = response.data.lots;
          console.log("this is the return of auctions.js => fetchAuctions");
          console.log(data);
          console.log(concat);
          commit("setAuctions", data);

        }
      });
    },
    fetchPorts: async ({ state, commit, rootState }) => {
      let user = await rootState.auth.user;
      let url = "/api/v1/ports?include=unit";
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
