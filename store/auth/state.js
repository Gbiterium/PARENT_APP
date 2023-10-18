import VueCookies from 'vue-cookies'
const authtoken = VueCookies.get('auth-token')
const user_details = VueCookies.get('user-details')
console.log(authtoken, 'hello', user_details)
const state = () => ({
    user: user_details || {},
    token: authtoken || null,
    userSigningUp: ''
})

export default state