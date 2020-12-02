import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import '../src/assets/css/init.css'
import  './utils/eventbus'
import i18n from './plugins/i18n'
import {initProject} from './utils/init'

initProject()

//此文件里的内容提取到utils->init.js文件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
