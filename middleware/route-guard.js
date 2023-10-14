export default function ({store, redirect, app }) {
    if (!store.getters['auth/isLoggedIn']) {
        if (process.client) {
        app.$toast({type: 'error', text: 'Unauthorized, please login'})
        }
        return redirect('/auth/login')
    }
}