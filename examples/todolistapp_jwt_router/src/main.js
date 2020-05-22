import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import VueRouter from 'vue-router';
import store from './store';
import Constant from './Constant';

import AddTodo from './components/AddTodo';
import UpdateTodo from './components/UpdateTodo';
import TodoList from './components/TodoList';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import Home from './components/Home';
import NotFound from './components/NotFound';
import AppHeader from './components/AppHeader';

import tokenutil, { getUserInfoFromToken, getToken } from './tokenutil';
tokenutil();

Vue.component("AppHeader", AppHeader);

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  mode : "history",
  routes : [
    { path:"/", name:"root", redirect: { name:"home" } },
    { path:"/home", name: "home", component : Home },
    { path:"/todolist", name:"todoList", component: TodoList },
    { path:"/todolist/add", name:"addTodo", component: AddTodo },
    { path:"/todolist/update/:id", name:"updateTodo", component: UpdateTodo },
    { path:"/login", name:"login", component:Login },
    { path:"/createuser", name:"createUser", component:CreateUser },
    { path:"*", component: NotFound },
  ]
})

router.beforeEach((to, from, next) => {
  let token = getToken();
  let userInfo = getUserInfoFromToken();
  if (token !== store.state.token) {
    store.dispatch(Constant.SET_USER_INFO, { userInfo, token })
  }

  if (to.name === "root" || to.name === "home" || to.name === "login" || to.name==="createUser") {
    if (to.name === "login" && userInfo && userInfo.users_id) {
      //이미 로그인한 상태에서 login페이지로 접근하면 home으로..
      next({ name : "home" })
    } else {
      next()
    }
  } else {
    //가능하다면 role 정보를 이용해 접근 권한을 부여하도록 함.
    if (userInfo && userInfo.users_id) {
      next();
    } else {
      next({ name:"login" })
    }
  }  
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
