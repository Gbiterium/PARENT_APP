const state = () => ({
    user: this.$cookies.get('user-details') || {},
    token: this.$cookies.get('auth-token') || null,
    userSigningUp: ''
})

export default state