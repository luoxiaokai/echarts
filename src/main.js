import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import SocketService from './utils/socket_service';
import './assets/css/globall.less'
// 字体
import './assets/font/iconfont.css'

SocketService.Instance.connect()
Vue.prototype.$socket = SocketService.Instance

// 请求基准路径的配置
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
// 将axios挂载到vue的原型对象上
Vue.prototype.$axios = axios

// 将全局的echarts对象挂载到vue对象上
Vue.prototype.$echarts = window.echarts


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')