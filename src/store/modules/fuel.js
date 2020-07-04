import apiService from '@/services/api.js'

export default {
    namespaced: true,
    state: {
        fuels: []
    },
    getters: {
        getFuels(state) {
            return state.fuels
        },
    },
    mutations: {
      setFuels(state, fuels) {
        state.fuels = fuels;
      }
    },
    actions: {
        fetchFuels({ state, commit }) {
            return new Promise((resolve, reject) => {
                apiService.get(`${process.env.VUE_APP_API_URL}/api/v1/fuel`)
                    .then(response => {
                        if (response.status == 200) {
                          commit('setFuels', response.data); 
                            return resolve(state.fuels)
                        }
                        return reject(response)
                    })
            })
        }
    }
}