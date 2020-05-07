import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import VueRouter from 'vue-router'
import Home from './components/Home.vue';
import About from './components/About.vue';
import Contacts from './components/Contacts.vue';
import ContactByNo from './components/ContactByNo.vue';
import NotFound from './components/NotFound.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const router = new VueRouter({
  mode : "history",
  routes : [
    { path:'/',  component: Home },
    { path:'/home', name:'home', component: Home },
    { path:'/about', name:'about',component: About },
    { 
      path:'/contacts', name:'contacts', component: Contacts, 
      children : [
        { 
          path : ':no', name:'contactbyno', component : ContactByNo, 
          beforeEnter : (to,from,next)=> {
            console.log("@@ beforeEnter! : " + from.path + "-->" + to.path)
            if (from.path.startsWith("/contacts"))
              next();
            else
              next("/home");
          }
        }
      ] 
    },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
 console.log("** beforeEach!!")
 next();
})
router.afterEach(() => {
  console.log("** afterEach!!")
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
