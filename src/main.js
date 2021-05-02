import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
