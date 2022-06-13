import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { format } from "common/format.js"


Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('assets/img/replace.png'),
  loading: require('assets/img/replace.png'),
  attempt: 3,
  observerOptions: { rootMargin: '0px', threshold: 0.1 }
})

//全局引入filter
for (let key in format) {
  Vue.filter(key, format[key])
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
