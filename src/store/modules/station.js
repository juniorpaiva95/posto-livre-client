import apiService from '@/services/api'
import tokenService from '@/services/storage'

export default {
    namespaced: true,
    state: {
        station: null
    },
    getters: {
		getStation(state) {
			return state.station
        },
    },
    mutations: {
        setStation(state, station) {
			state.station = station;
		},
    },
    actions: {
        fetchStation({ state, commit }) {
			return new Promise((resolve, reject) => {
				console.log(" new station being called ****************************")

				if (!tokenService.getToken()){
					return resolve(null)
				}

				if (state.station) {
					return resolve(state.station)
				}

				console.log(" new station after checks")

				apiService.get(`/api/v1/stations`)
					.then(response => {
                        /* console.log(" new station found = teste")
                        console.log(response) */
						if (response.status == 200) {
							commit('setStation', response.data.stations)
							return resolve(state.station)
						}

						return reject(response)
					})
			})
		},
    }
}