import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ES6Promise from 'es6-promise'

ES6Promise.polyfill();

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
