// import Vue from 'vue'
import store from '@/store/store'

export default {
	namespaced: true,

	state: {
		message: null
	},

	getters: {
		getMessage(state) {
			return state.message
		}
	},

	mutations: {
		clearMessage(state) {
			state.message = null
		},

		error(state, message) {
			console.log(message)
			state.message = message
		},

		info(state, message) {
			// TODO
		},

		handleError(state, payload) {
			if (!payload.body)
				return

			if (payload.body.error == 'token_expired' || payload.body.error == 'token_not_provided')
				return

			/*if (payload.body.error && payload.body.error.length > 0) {
				payload.body.error.forEach(error => {
					if (error == 'invalid_credentials') {
						state.message = 'Login ou senha inválidos'
					}
				})
			}

			if (payload.body.errors && payload.body.errors.length > 0)
				state.message = payload.body.errors[0]
			*/
		}
	}
}
