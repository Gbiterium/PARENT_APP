import createPersistedState from 'vuex-persistedstate'


export default ({ store }) => {
  createPersistedState({
    key: 'parent-1.1',
    paths: ['auth', 'school'],
  })(store)
}
