const actions = {
    async LOGIN({ commit }, payload) {
        try {
            const response = await this.$axios.$post('/api-auth/login/', payload);;
            if (response.data.token) {
                commit('SET_USER', response.data.user_details);
                commit('SET_TOKEN', response.data.token);
                this.$cookies.set('auth-token', response.data.token, {
                    path: '/',
                    maxAge: 60 * 60 * 24 * 7
                })
                this.$router.push('/schools')
            }
        } catch (error) {
            console.log(error)
        }
    },
    logout({ commit }) {
        commit('REMOVE_TOKEN')
        this.$cookies.remove('auth-token')
    }
}

export default actions