const getters = {
    getSchools: (state) => state.schools,
    getSchoolByCode: (state) => (code) => {
        if (state.schools.length > 0) {
            return state.schools.find((school) => school.code === code);
        }
        return null;
    },
}

export default getters