export default function ({store, redirect, app }) {
    if (!store.getters['auth/isLoggedIn']) {
        if (process.client) {
        app.$toast('Unauthorized, please login')
        }
        return redirect('/auth/login')
    }
}