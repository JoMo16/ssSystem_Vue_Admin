<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: 'App',
  components: {
  },
  created() {
    this.$router.push("/").catch(()=>{});
  },
}
</script>

<style>
*{
  /* 初始化 */
  margin: 0;
  padding: 0;
}
html,body{
  width: 100%;
  height:100%;
}
#app{
  width: 100%;
  height: 100%;
}
</style>