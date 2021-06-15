import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import FlashMessage from '@smartweb/vue-flash-message';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAxios, axios)
Vue.use(FlashMessage);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
