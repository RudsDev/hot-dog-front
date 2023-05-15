import Vue from 'vue'
import Vuex from 'vuex'
import App from 'App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

import Notifications from 'vue-notification'

import router from '@/router'
import store from '@/store/store'

import '@/assets/css/reset.css'
import '@/assets/css/animate.css'
import '@/assets/scss/global.scss'

// Componentes globais da aplicação
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)
Vue.use(Vuex)

Vue.use(Notifications)

Vue.config.productionTip = false

Vue.axios.defaults.baseURL = process.env.VUE_APP_ROOT_API
Vue.axios.defaults.headers.common['Content-Type'] =
	'application/x-www-form-urlencoded'

Vue.router = router

axios.interceptors.response.use(
	function(response) {
		return response
	},
	function(error) {
		return error.response
	}
)

new Vue({
	el: '#app',
	router,
	render: h => h(App),
	store
}).$mount('#app')
