const TOKEN_KEY = 'token'

const tokenService = {
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, `Bearer ${accessToken}`)
    },

    removeToken() {
        localStorage.removeItem(TOKEN_KEY)
    }
}

export default tokenService