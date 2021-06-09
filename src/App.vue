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

/*phone-text*/
h1 {
  font-weight: 500 !important;
  font-size: 30px !important;
  line-height: 130% !important;
}

h2 {
  font-weight: 500 !important;
  font-size: 28px !important;
  line-height: 130% !important;
}

h3 {
  font-weight: 500 !important;
  font-size: 15px !important;
  line-height: 18px !important;
}

small {
  font-weight: normal !important;
  font-size: 13px !important;
  line-height: 15px !important;
}

#app {
  font-size: 14px !important;
  line-height: 16px !important;
}

.btn {
  min-height: 40px !important;
  font-size: 14px !important;
  line-height: 16px !important;
}

@media (min-width: 768px) {
  h1 {
    font-weight: 500 !important;
    font-size: 60px !important;
    line-height: 70px !important;
  }

  h2 {
    font-weight: 500 !important;
    font-size: 48px !important;
    line-height: 56px !important;
  }

  h3 {
    font-weight: 500 !important;
    font-size: 22px !important;
    line-height: 26px !important;
  }

  small {
    font-weight: normal !important;
    font-size: 18px !important;
    line-height: 21px !important;
  }

  .btn {
    min-height: 50px !important;
  }

  #app {
    font-size: 22px !important;
    line-height: 150% !important;
  }
}


#app {
  font-family: 'Roboto', sans-serif !important;
  font-style: normal;
  font-weight: normal;

  padding-top: 96px;
  /*background-color: #F0F5FA;*/
  color: #000000;
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
