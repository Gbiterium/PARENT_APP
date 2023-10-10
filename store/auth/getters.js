const getters = {
    getUser: (state) => state.user,
    isLoggedIn: (state) => !!(state.token)
}

export default getters