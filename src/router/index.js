import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Processes from '@/components/Processes'
import Process from '@/components/Process'
import Sketch from '@/components/Sketch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/process',
      name: 'Process',
      component: Process
    },
    {
      path: '/processes',
      name: 'Processes',
      component: Processes
    },
    {
      path: '/sketch',
      name: 'Sketch',
      component: Sketch
    }
  ]
})
