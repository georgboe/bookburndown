import Vue from 'vue'
import {Vue2Storage} from 'vue2-storage'
import App from './App.vue'

Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 0
})

import './assets/styles/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
