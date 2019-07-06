<template>
  <vue-element-loading :active="true" spinner="bar-fade-scale" is-full-screen />
</template>

<script>
import VueElementLoading from "vue-element-loading";

export default {
  components: { VueElementLoading }
};
</script>

<style></style>