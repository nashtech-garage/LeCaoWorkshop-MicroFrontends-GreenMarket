<template>
  <MainPageBlog/>
</template>

<script>
import MainPageBlog from './components/MainPageBlog.vue';

export default {
  name: 'App',
  components: {
    MainPageBlog
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
