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

window.axios = require('axios')
window.graphlib = require('graphlib')
window.dagre = require('dagre')
window.joint = require('jointjs')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

let bus = new Vue({
  data: {
    credentials: {
      username: 'admin',
      client_id: '53718138',
      client_secret: 'IoLsrgbbe7W2H4A8N9MiMR0XhAMCAL6fTOLZk8Jn',
      api_url: 'https://barcrafd.api.processmaker.io',
      password: 'cO7946LP',
      access_token: ''
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  data: {
    credentials: bus.credentials
  },
  template: '<App />'
})
