import Vue from 'vue'
import App from './App.vue'
//import App from './AppAxiosTest.vue'
//import axios from 'axios'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import ES6Promise from 'es6-promise'
ES6Promise.polyfill()

//Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
