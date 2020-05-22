<template>
  <div id="root" v-cloak>
    <div class="container">
        <router-view></router-view>
    </div>
    <Loading v-if="isloading" />
  </div>
</template>

<script>
import Loading from './components/Loading';
import { mapState } from 'vuex';

export default {
  name: "app",
  components : { Loading },
  computed : mapState(['isloading']),
}
</script>

<style>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>