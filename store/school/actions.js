const actions = {
    async GET_SCHOOLS({ commit }) {
        try {
            const { data } = await this.$axios.get('/lms/menu/')
                commit('SET_SCHOOLS', data.data.children_school);
        } catch (error) {
            console.log(error)
        }
    }
}

export default actions