import apiService from "../../services/api";

export default {
  namespaced: true,
  state: {
    bids: []
  },
  getters: {
    getBids(state) {
      return state.bids;
    }
  },
  mutations: {
    setBids(state, bids) {
      state.bids = bids;
    }
  },
  actions: {
    fetchBids(context) {
      return new Promise((resolve) => {
        let response = require('@/store/modules/bid.mock.json');
        context.state.bids = response.data;
        return resolve(context.state.bids);
      })
    },
    createBid: async (context, params) => {
      let user = await context.rootGetters['auth/getUser'];

      await apiService.post(`/api/v1/bids`, { ...params, distributor_id: user.distributor.id }).then(response => {
        if (response.status == 200) {
          let { data } = response.data;
          return data;
        }
      });
    }
  }
}