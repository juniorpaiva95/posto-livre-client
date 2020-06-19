import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import apiService from './services/api.js'
import Vuex from 'vuex'
import './stylesheets/defaults.scss'
import moment from 'moment'
import VeeValidate from 'vee-validate'
import VueTheMask from 'vue-the-mask'
import VueResource from 'vue-resource'
import TimeFilter from './filters/time'
import DateTimeFilter from './filters/datetime'
import ClipLoader from 'vue-spinner/src/ClipLoader'

Vue.filter('time', TimeFilter ); // register filter globally
Vue.filter('datetime', DateTimeFilter);
Vue.component('clip-loader', ClipLoader);

Vue.config.productionTip = false;
moment.locale('pt-br');
Vue.use(VeeValidate);
Vue.use(Vuex);
Vue.use(VueTheMask);
var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);
Vue.use(VueResource);

apiService.init(process.env.VUE_APP_API_URL)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
