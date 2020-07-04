
const USER_KEY = 'user'
const STATION_KEY = 'station'

const userService = {
    /* user */
    getUser() {
        return JSON.parse(localStorage.getItem(USER_KEY));
    },

    saveUser(userJson) {
        localStorage.setItem(USER_KEY,  JSON.stringify(userJson))
    },

    removeUser() {
        localStorage.removeItem(USER_KEY)
    },
    /* station */
    getStation() {
        return JSON.parse(localStorage.getItem(STATION_KEY));
    },

    saveStation(stationJson) {
        localStorage.setItem(STATION_KEY,  JSON.stringify(stationJson))
    },

    removeStation() {
        localStorage.removeItem(STATION_KEY)
    }
}

export default userService