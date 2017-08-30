import 'babel-polyfill'

import 'common/stylus/index.styl'
import 'common/fonts/iconfont.css'

import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'

import FastClick from 'fastclick'
import { getParameterByName } from 'common/js/util'
import vrv from 'common/js/vrv-jssdk'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)

FastClick.attach(document.body)

try {
  vrv.init({})
} catch (err) {
  throw err.stack
}

console.log(vrv)

Vue.config.productionTip = false

Vue.prototype.$log = console.log.bind(console)
// Vue.prototype.$log = function () {
//   console.log.apply(console, arguments)
// }

const userToken = getParameterByName('userToken', document.location)

store.dispatch('saveUser', userToken)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
