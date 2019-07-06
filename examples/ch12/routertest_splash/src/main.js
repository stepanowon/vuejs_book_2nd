import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import store from './store';

Vue.config.productionTip = false
Vue.use(VueRouter);

const Home = () => ({
  component: new Promise(function(resolve) {
    setTimeout(function() {
      resolve(import("./components/Home"));
    }, 1000);
  })
});

const About = () => ({
  component: new Promise(function(resolve) {
    setTimeout(function() {
      resolve(import("./components/About"));
    }, 1000);
  })
});

const Contacts = () => ({
  component: new Promise(function(resolve) {
    setTimeout(function() {
      resolve(import("./components/Contacts"));
    },1000);
  })
});

const ContactByNo = () => ({
  component: new Promise(function(resolve) {
    setTimeout(function() {
      resolve(import("./components/ContactByNo"));
    }, 1000);
  })
});

const router = new VueRouter({
  mode : "history",
  routes : [
    { path:'/', redirect: { name: 'home' } },
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
  //store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true })
  store.state.isloading = true;
  next();
})

router.afterEach(()=> {
  //store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false })
  store.state.isloading = false;
})


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
