import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import store from './store';
import Constant from './Constant';
import pMinDelay from 'p-min-delay';

Vue.config.productionTip = false
Vue.use(VueRouter);

const Home = ()=> pMinDelay(import("./components/Home"), 1000);
const About = ()=> pMinDelay(import("./components/About"), 1000);
const Contacts = ()=> pMinDelay(import("./components/Contacts"), 1000);
const ContactByNo = ()=> pMinDelay(import("./components/ContactByNo"), 1000);

const router = new VueRouter({
  mode : "history",
  routes : [
    { path:'/', redirect: '/home' },
    { path:'/home', component: Home },
    { path:'/about', component: About },
    { path:'/contacts', component: Contacts, 
      children : [
        { path : ':no', component : ContactByNo },
      ] 
    }
  ]
})

router.beforeEach((to,from,next)=> {
  store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true })
  next();
})

router.afterEach(()=> {
  store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false })
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
