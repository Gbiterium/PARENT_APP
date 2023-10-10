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
    SET_SIGNUP_USER: (state, value) => {
        state.userSigningUp = value;
    }
}

export default mutations