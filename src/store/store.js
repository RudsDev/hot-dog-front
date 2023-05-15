import Vue from 'vue'
import Vuex from 'vuex'
import ingredientes from './modules/ingredientes'
import lanches from './modules/lanches'
import promocoes from './modules/promocoes'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		ingredientes: {
			namespaced: ingredientes.namespaced,
			state: ingredientes.state,
			mutations: ingredientes.mutations,
			actions: ingredientes.actions,
			getters: ingredientes.getters
		},
		lanches: {
			namespaced: lanches.namespaced,
			state: lanches.state,
			mutations: lanches.mutations,
			actions: lanches.actions,
			getters: lanches.getters
		},
		promocoes: {
			namespaced: promocoes.namespaced,
			state: promocoes.state,
			mutations: promocoes.mutations,
			actions: promocoes.actions,
			getters: promocoes.getters
		}
	}
})
