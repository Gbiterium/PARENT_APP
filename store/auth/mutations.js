const mutations = {
    SET_USER: (state, user) => {
        state.user = user;
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    REMOVE_TOKEN: (state) => {
        state.token = null;
        state.user = null;
    },
}

export default mutations