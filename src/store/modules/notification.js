import Vue from 'vue'
import store from '@/store/store'
import apiService from "@/services/api";
import Swal from "sweetalert2";
import { filterToQuery } from "../../utils/api/util";

export default {
	namespaced: true,
	state: {
		alerts: [],
		current: null,
		notifications: []
	},

	getters: {
		getCurrent(state) {
			return state.current
		},
		getNotifications(state) {
			return state.notifications
		},
	},
	mutations: {
		add(state, payload) {
			let alert = {
				type: payload.type,
				message: payload.message,
				timeout: payload.timeout || 3000
			}

			state.alerts.push(alert)

			if (state.alerts.length == 1)
				store.commit('notification/setCurrent', 0)
		},

		setCurrent(state, index) {
			// Set current
			Vue.set(state, 'current', state.alerts[index])

			// Wait for timeout
			setTimeout(() => {
				// Reset current
				Vue.set(state, 'current', null)

				// Wait delay for new message
				setTimeout(() => {
					// Remove from list
					state.alerts.splice(index, 1)

					if (state.alerts.length > 0)
						store.commit('notification/setCurrent', 0)
				}, 400)
			}, state.current.timeout)
		}
	},

	actions: {
		fetchNotifications: async ({ state }, { user_id }) => {
			console.log("idBeingPassedToNotification");
			console.log(user_id);
			/* await apiService.get(`api/v1/notifications?search=notifiable_id%3A${user_id}&searchFields=notifiable_id%3A%3D`).then(response => { */
			await apiService.get(`api/v1/notifications`).then(response => {
				state.notifications = response.data.notifications
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
	},
}
