<template>
  <div id="app">
    <NavBar/>
    <div class="container">
      <div class="content">
          <notifications 
            group="foo" 
            position="bottom right" 
            width='355px' 
            height= '167px'
            classes="myNote"
          />
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
  },
}

</script>

<style>

.content {
  margin: 0 0 100px;
  padding: 0;
  min-height: calc(100vh - 96px);
}

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
  font-size: 16px !important;
  line-height: 16px !important;
}

.btn {
  min-height: 40px !important;
  font-size: 14px !important;
  line-height: 16px !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
}

@media (min-width: 960px) {
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
    font-size: 22px !important;
    line-height: 33px !important;
    padding-top: 16px !important;
    padding-bottom: 16px !important;
  }

  #app {
    font-size: 22px !important;
    line-height: 150% !important;
  }

  .content {
    padding-top: 75px;
  }

}


#app {
  font-family: 'Roboto', sans-serif !important;
  font-style: normal;
  font-weight: normal;

  padding-top: 96px;
  background-color: #F0F5FA;
  color: #000000;
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

.btn-primary {
  background-color: #2185FB !important;
  border-color: #2185FB !important;
}

.myNote{
  background-color: white !important;
  font-family: Roboto !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 14px !important;
  line-height: 150% !important;
  color: #212223 !important;
  padding: 31px 20px 31px 20px;

  border-radius: 12px !important;

}


</style>
