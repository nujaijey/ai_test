import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import api from './api/api'



// 所有需要用到的api都需要在main.js中进行引入声明 

Vue.config.productionTip = false
// 声明api 页面中通过$api就可以引用api中的接口
Vue.prototype.$api=api


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
