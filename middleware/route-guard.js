export default function ({ route, $cookies, redirect, app }) {
    if (route.path.includes('schools') || route.path.includes('parent')) {
    if (!$cookies.get('auth-token')) {
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