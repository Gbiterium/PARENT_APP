const state = () => ({
    user: this.$cookies.set('user-details') || {},
    token: this.$cookies.get('auth-token') || null,
    userSigningUp: ''
})

export default state