import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'


import { post, get } from '@/fetch/http'
import api from '@/fetch/api'
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.$api = api

import comPagination from './components/ComPagination/ComPagination'
import ComSearch from './components/ComSearch/ComSearch'
import comDelConfirmPop from './components/ComDelConfirmPop/ComDelConfirmPop'
import ComDatePicker from './components/ComDatePicker/ComDatePicker'
import ComTable from './components/ComTable/ComTable'
import ComAddPop from './components/ComAddPop/ComAddPop'
Vue.component('com-pagination', comPagination)
Vue.component('com-search', ComSearch)
Vue.component('com-del-confirm-pop', comDelConfirmPop)
Vue.component('com-date-picker', ComDatePicker)
Vue.component('com-table', ComTable)
Vue.component('com-add-pop', ComAddPop)

Vue.use(ElementUI, { size: 'mini', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
