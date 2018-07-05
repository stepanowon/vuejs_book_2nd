import Vue from 'vue'
import TodoList from './components/TodoList.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(TodoList)
}).$mount('#app')
