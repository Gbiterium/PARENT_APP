// import iziToast from 'izitoast'
import qs from 'qs';


export default function ({ $axios, app, store, redirect }) {
  // $axios.defaults.timeout = 1000 * 5 // t - 5s
  // $axios.defaults.onDownloadProgress =  onDownload

  $axios.onRequest(config => {
    config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
    return config;
  });




  let networkTimeOut = null;

  $axios.onRequest((config) => {
    // store.commit('toggleRequestInProgress', true)
    // Logic for network timer
    // networkTimeOut = setTimeout(() => {
    //   store.commit('toggleSlowNetwork', true);
    //   setTimeout(() => {
    //     store.commit('toggleSlowNetwork', false);
    //   }, 7000);

    // }, 30000);


    if (store.state.auth.token) {
      config.headers.common.Authorization = `Bearer ${store.state.auth.token}`
    }
    return config
  })
  $axios.onError((error) => {
    // store.commit('toggleRequestInProgress', false)
    // clearTimeout(networkTimeOut)
    // store.commit('toggleSlowNetwork', false)

    if (!error.response) {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: 'Network Down: Unable to contact server',
        })
      }
      return Promise.reject(error)
    }

    if (error.response && error.response.status === 401) {
      store.dispatch('auth/logout')
      redirect('/auth/login?redirect=true');
      if (process.client) {
        app.$toast({
          type: 'error',
          text: error.response.data.message,
        })
      }


      return Promise.reject(error)
    }

    if (error.response && error.response.status === 400) {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: error.response.data.message,
        })
      }

      return Promise.reject(error)
    }

    if (error.response && error.response.status === 404) {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: 'Not Found',
        })
      }


    } else if (error.response && error.response.data) {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: (error.response.data.message) || 'Whoops Something Went Wrong',
        })
      }

    }
    else {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: 'Whoops Something Went Wrong',
        })
      }


      return Promise.reject(error)
    }

    if (error.message) {
      if (process.client) {
        app.$toast({
          type: 'error',
          text: error.message,
        })
      }

      return Promise.reject(error)
    }

    if (process.client) {
      app.$toast({
        type: 'error',
        text: 'Whoops Something Went Wrong',
      })
    }


    return Promise.reject(error)

  })
  $axios.onResponse((response) => {
    // NProgress.done();
    // store.commit('toggleSlowNetwork', false)
    // clearTimeout(networkTimeOut)
    // store.commit('toggleRequestInProgress', false)
    // if (response.status === 200 || response.status === 201) {
    //   app.$toast({
    //     type: 'success',
    //     text: response.data.message,
    //   })
    // }
    return response
  })
}
