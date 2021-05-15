<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>

import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {
  margin-top: 40px;
}

.content {
  min-height: calc(100vh - 96px);
}
</style>
