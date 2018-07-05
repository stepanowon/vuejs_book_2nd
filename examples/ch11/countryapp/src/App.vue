<template>
  <div id="app">
      <region-buttons></region-buttons>
      <country-list></country-list>
  </div>
</template>

<script>
import RegionButtons from './components/RegionButtons';
import CountryList from './components/CountryList';

export default {
    name : 'app',
    components : { RegionButtons, CountryList }
}
</script>

<style>
  
</style>