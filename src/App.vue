<template>
  <div id="app">
    <NavBar/>
    <div class="container">
      <div class="content">
        <FlashMessage></FlashMessage>
        <router-view/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif !important;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 150%;
  color: #000000;

  margin-top: 100px;
  background-color: #F0F5FA;
}

.container {
  padding-top: 75px;
}

.content {
  margin: 0;
  padding: 0;
  min-height: calc(100vh - 96px);
}

.card {
  border-radius: 12px !important;
}

input, select, option {
  border-radius: 12px !important;
  min-height: 55px !important;
}

.btn {
  border-radius: 12px !important;
  min-height: 50px !important;
}

._vue-flash-msg-body_success {
  z-index: 100000;
}

._vue-flash-msg-body {

}

._vue-flash-msg-_right-bottom {

}

._vue-flash-msg-body__text {
}
</style>
