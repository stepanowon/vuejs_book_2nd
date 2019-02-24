<template>
  <div id="container">
      <div class="page-header">
         <h1 class="text-center">연락처 관리 애플리케이션</h1>
         <p>(Vue-router + Vuex + Axios) </p>
         <div class="btn-group">
            <router-link to="/home" class="btn btn-info menu">Home</router-link>
            <router-link to="/about" class="btn btn-info menu">About</router-link>
            <router-link to="/contacts" class="btn btn-info menu">Contacts</router-link>
         </div>
      </div>
      <router-view></router-view>
      <vue-element-loading :active="isloading" spinner="bar-fade-scale" color="#FF6700" is-full-screen />
  </div>
</template>

<script>
import VueElementLoading from 'vue-element-loading'
import { mapState } from 'vuex';
export default {    
    name: 'app',
    components : { VueElementLoading },
    computed : mapState(['isloading'])
}
</script>

<style scoped>
#container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.menu {
  width : 100px;
}
</style>