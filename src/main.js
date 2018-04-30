// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(Vuex)

let bus = new Vue({
  data: {
    credentials: {
      username: 'admin',
      client_id: '',
      client_secret: '',
      api_url: 'https://ENVKEY.api.processmaker.io',
      password: '',
      access_token: ''
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    credentials: bus.credentials
  },
  components: { App },
  template: '<App />'
})
