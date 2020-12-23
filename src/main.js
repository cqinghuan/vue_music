import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import './plugins/antdv.js'
import 'ant-design-vue/dist/antd.css';

import SvgIcon from 'vue-svgicon'
import './assets/icon'
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
});

import axios from 'axios'
Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
