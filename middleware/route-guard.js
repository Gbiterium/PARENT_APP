export default function ({ route, store, redirect, app }) {
    if (route.path.includes('schools') || route.path.includes('parent')) {
      if (!store.getters['auth/isLoggedIn']) {
        if (process.client) {
          app.$toast({
            type: 'error',
            text: 'Unauthorized, please login',
          });
        }
        return redirect('/auth/login');
      }
    }
  }