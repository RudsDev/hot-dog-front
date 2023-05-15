import { updateField, getField } from 'vuex-map-fields'
import mutations from './mutations'
import actions from './actions'
import state from './state'

export default {
	namespaced: true,
	state,
	mutations: { ...mutations, updateField },
	actions,
	getters: { getField }
}
