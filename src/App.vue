<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <FlashMessage></FlashMessage>
        <router-view/>
      </div>
    </div>
    <Timer/>
    <Footer/>
  </div>
</template>

<script>

import Footer from "@/components/Footer";
import Timer from "@/components/Timer";

export default {
  name: 'App',
  components: {
    Footer,
    Timer
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
