import Vue from 'vue'
import TodoList from './components/TodoList.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(TodoList)
}).$mount('#app')
