import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter);

new Vue({
  render: h => h(App)
}).$mount('#app')
