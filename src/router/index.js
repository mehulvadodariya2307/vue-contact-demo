import Vue from 'vue'
import VueRouter from 'vue-router'
// import App from '../App.vue'
import VueCompositionAPI from '@vue/composition-api'
import Vuelidate from 'vuelidate'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import Home from '../components/Home'
Vue.use(VueRouter)
Vue.use(VueCompositionAPI)
Vue.use(Vuelidate)
Vue.use(VueToast,{
  position: 'top'
});

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../components/Detail')
  },
  {
    path: '/add',
    name: 'add',
    component: () => import('../components/Add')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../components/Add')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
