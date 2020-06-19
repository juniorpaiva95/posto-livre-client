import apiService from "@/services/api";
import Swal from "sweetalert2";
import {filterToQuery} from "../../utils/api/util";

const INITIAL_STATE = () => {
  return {
    auctions: [],
    pagination: "",
    concat: false,
    filters: {
      search: "",
      status: 1,
      categoria: [],
      cidade: "",
      estado: "",
      relevancia: "",
      page: 1,
      perPage: 30
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
    create({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        apiService.post(`/api/v1/station/auctions`, payload).then(
          response => {
            if (response.status == 201) {
              commit("pushAuction", response.data.auction);

              Swal.fire({
                position: "bottom-end",
                type: "success",
                title: "Leilão registrado com sucesso.",
                showConfirmButton: false,
                timer: 8500,
                toast: true
              });

              return resolve(state.auctions);
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
    fetchAuctions: async ({ state, commit, rootState }, payload) => {
      let concat = rootState.auction.concat;
      let fromOriginFilters = payload ? payload.hasOwnProperty('fromFilters') : false;
      if (concat && !fromOriginFilters) {
        commit('incrementPage');
      }
        let user = await rootState.auth.user;
        let url = "/api/v1/station/auctions";

        if (user.last_name === "Distribuidor") {
          url = "/api/v1/distributor/auctions";
        } else if (user.last_name === "Posto") {
          url = "/api/v1/station/auctions";
        }
        let filterQueryString = filterToQuery(state.filters);
        await apiService.get(`${url}?${filterQueryString}`).then(response => {
          if (response.status == 200) {
            let { data, ...rest } = response.data;
            if (concat) {
              commit("concatAuctions", data);
            } else {
              commit("setAuctions", data);
            }
            commit("setPagination", rest);
          }
        });
    },
    fetchDistributorAuctionsWins({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('withoutPaginate');
        let filterQueryString = filterToQuery(state.filters);
        apiService.get('/api/v1/distributor/auctions/bids/wins?' + filterQueryString).then(response => {
          if (response.status == 200) {
            let { data, ...rest } = response.data;
            commit("setAuctions", data);
            commit("setPagination", rest);
            return resolve(state.auctions);
          }

          return reject(response);
        });
      });
    },
  }
};
