import store from '@/store/store'
import apiService from '@/services/api'
import tokenService from '@/services/storage'
import router from '@/router/router'
import Swal from "sweetalert2";

export default {
	namespaced: true,
	state: {
		route: null,
		user: null
	},
	getters: {
		getUser(state) {
			return state.user
		},
		getToken() {
			return tokenService.getToken()
		},
		getRoute(state) {
			return state.route
		}
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setToken(state, token) {
			tokenService.saveToken(token)
		},
		removeToken() {
			tokenService.removeToken()
		},
		setRoute(state, name) {
			state.route = name
		}
	},
	actions: {
		fetchUser({ state, commit }) {
			return new Promise((resolve, reject) => {
				if (!tokenService.getToken()){
					return resolve(null)
				}

				if (state.user) {
					return resolve(state.user)
				}

				apiService.get(`/api/v1/auth/profile`)
					.then(response => {
						if (response.status == 200) {
							commit('setUser', response.data.user)
							
							return resolve(state.user)
						}

						return reject(response)
					}, () => {

						Swal.fire({
							position: "bottom-end",
							type: "warning",
							title: "Sua sessão expirou, por favor realize o login novamente.",
							showConfirmButton: false,
							timer: 8500,
							toast: true
						});

						commit('removeToken')
					})
			})
		},

		// Login using cnpj
		login({ state, commit }, payload) {
			return new Promise((resolve, reject) => {
				
				apiService.post(`/api/v1/login`, payload).then(response => {
					if (response.status == 200) {
						
						let token = response.data.token
						let user = response.data.user
						
						commit('setToken', token)
						commit('setUser', user)
						
						return resolve(state.user)
					}

					return reject(response)
				}, () => {
					
					Swal.fire({
						position: "bottom-end",
						type: "error",
						title: "CNPJ ou senha inválidos.",
						showConfirmButton: false,
						timer: 8500,
						toast: true
					});

				})
			})
		},

		// Clear localStorage e erase states
		logout({ commit, state }) {
			state.user = null
			commit('removeToken')
			router.push('/')		
		},

		/*
		 * Register a user
		 */
		register({ commit, state }, payload) {
			return new Promise((resolve, reject) => {
				apiService.post(`/api/v1/auth/register`, payload)
					.then(response => {
						if (response.status == 200) {
							// state.user = response.data.user
							// commit('setToken', response.data.token)

							return resolve(response.data.user);
						}

						return reject(response)
					}, err => {
						reject(err)
					})
			})
		},
    validateResetToken({ state }, token) {
      return new Promise((resolve, reject) => {
        apiService.get(`/api/v1/reset-password/${token}`)
          .then(response => {
            if (response.status == 200) {
              return resolve(true)
            }

            return resolve(false)
          }, response => {
            store.commit('notification/add', {
              type: 'error',
              message: response.body.error
            });

            return reject(false)
          })
      });
    },

    forgotPassword({ state }, email) {
      return new Promise((resolve, reject) => {
        apiService.post(`/api/v1/auth/forgot-password`, {
          email
        })
          .then(response => {
            if (response.status == 200) {
              // store.commit('notification/add', {
              //   type: 'success',
              //   message: response.data.message
              // });
              Swal.fire({
                position: "bottom-end",
                type: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 3500,
                toast: true
              });

              return resolve(true)
            }

            return resolve(false)
          }, response => {
            store.commit('notification/add', {
              type: 'error',
              message: response.body.error
            });
            Swal.fire({
              position: "bottom-end",
              type: "error",
              title: response.data.error,
              showConfirmButton: false,
              timer: 3500,
              toast: true
            });

            return resolve(false)
          })
      })
    },

    resetForgottenPassword({ state }, payload) {
      return new Promise((resolve, reject) => {
        apiService.post(`/api/v1/auth/reset-password`, {
          email: payload.email,
          token: payload.token,
          password: payload.password,
          password_confirmation: payload.password_confirmation
        })
          .then(response => {
            if (response.status == 200) {
              store.commit('notification/add', {
                type: 'success',
                message: 'Senha redefinida com sucesso!'
              });
              return resolve(response)
            }

            return resolve(false)
          }, response => {
            reject(response)
          })
      })
    }
		// No fim
	}
}

		// update({ state }, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.patch(`${process.env.VUE_APP_API_URL}/v1/account/profile`, payload)
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					state.user = response.body.user

		// 					return resolve(state.user)
		// 				}

		// 				return reject(response)
		// 			}, error =>
		// 				reject(store.commit('logger/handleError', error))
		// 			)
		// 	})
		// },

		// updateAvatar({ state }, payload) {
		// 	let form = new FormData()
		// 	form.append('avatar', payload.avatar)

		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.post(`${process.env.VUE_APP_API_URL}/v1/account/profile/avatar`, form)
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					state.user.avatar = response.body.user.avatar

		// 					return resolve(state.user.avatar)
		// 				}

		// 				return reject(response)
		// 			}, error =>
		// 				reject(store.commit('logger/handleError', error))
		// 			)
		// 	})
		// },

		// updateAddress({ state }, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.post(`${process.env.VUE_APP_API_URL}/v1/account/profile/address`, payload)
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					return resolve(response.body)
		// 				}

		// 				return resolve([])
		// 			})
		// 	})
		// },

		// resetPassword(context, passwords) {
		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.patch(`${process.env.VUE_APP_API_URL}/v1/account/profile/reset-password`, passwords)
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					return resolve(response.body.user)
		// 				}

		// 				return reject(response)
		// 			}, error =>
		// 				reject(store.commit('logger/handleError', error))
		// 			)
		// 	})
		// },

		// fetchInterests({ state }, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.get(`${process.env.VUE_APP_API_URL}/v1/account/interests`)
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					state.interests = response.body.interests
		// 					return resolve(response.body.interests)
		// 				}

		// 				return reject(response)
		// 			}, error =>
		// 				reject(store.commit('logger/handleError', error))
		// 			)
		// 	})
		// },

		// updateInterests({ state }, payload) {
		// 	return new Promise((resolve, reject) => {
		// 		Vue.http.patch(`${process.env.VUE_APP_API_URL}/v1/account/profile/update-interests`, {
		// 			interests: payload
		// 		})
		// 			.then(response => {
		// 				if (response.status == 200) {
		// 					state.user.interests = response.body.interests

		// 					return resolve(response.body.interests)
		// 				}

		// 				return reject(response)
		// 			}, error => {
		// 				reject(store.commit('logger/handleError', error))
		// 			})
		// 	})
		// },