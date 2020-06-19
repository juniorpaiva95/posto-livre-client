import apiService from '@/services/api.js'

export default {
    namespaced: true,
    state: {
        faqs: []
    },
    getters: {
        getFaqs(state) {
            return state.faqs
        },
    },
    mutations: {
      setFaqs(state, faqs) {
        state.faqs = faqs;
      }
    },
    actions: {
        fetchFaqs({ state, commit }) {
            return new Promise((resolve, reject) => {
                apiService.get(`${process.env.VUE_APP_API_URL}/api/v1/faqs`)
                    .then(response => {
                        if (response.status == 200) {
                          commit('setFaqs', response.data.data);
                            return resolve(state.faqs)
                        }
                        return reject(response)
                    })
            })
        }
    }
}