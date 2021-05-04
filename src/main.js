import Vue from 'vue'
import { Plugin } from 'vue2-storage';
import App from './App.vue'

Vue.use(Plugin, {
  prefix: 'app_',
  driver: 'local',
  ttl: 0
})

import './assets/styles/index.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
