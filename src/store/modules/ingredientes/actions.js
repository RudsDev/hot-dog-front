import { ingredientes } from '@/services/ingredientes'
import notification from '@/mixins/notificationsMixin.js'

export default {
	async createIngrediente({ commit }, payload) {
		const resp = await ingredientes.create(payload)
		resp.data && commit('ADD_INGREDIENTES', resp.data)
		return resp
	},
	async updateIngrediente({ commit }, payload) {
		const resp = await ingredientes.update(payload.id, payload)
		const ingrediente = resp.data
		if (ingrediente) {
			commit(`SET_INGREDIENTE`, ingrediente)
		}
		return resp
	},
	async removeIngrediente(context, payload) {
		const resp = await ingredientes.delete(payload)
		//TODO - Ponto de notificação
		console.log(notification)
		notification.methods.apiResponseNotification(resp)
	},
	setIngredienteField(context, payload = { value: undefined, field: '' }) {
		const { field, value } = payload
		context.commit(`SET_INGREDIENTE_${field.toUpperCase()}`, value)
	},
	setIngrediente(context, payload) {
		context.commit(`SET_INGREDIENTE`, payload)
	},
	getIngredientesByName({ commit }, payload) {
		if (payload.length > 2) {
			setTimeout(async () => {
				const resp = await ingredientes.findByName(payload)
				const data = resp.data.length ? resp.data : [{ id: '', name: payload }]
				commit('SET_INGREDIENTES', data)
			}, 400)
		}
	},
	async getIngredientes({ commit }) {
		const resp = await ingredientes.getAll()
		const data = resp.data.length ? resp.data : []
		commit(
			'SET_INGREDIENTES',
			data.map(d => ({ ...d, qtd: 0 }))
		)
	},
	async loadIngredienteById({ commit }, payload) {
		const { data } = await ingredientes.findById(payload)
		if (data.id) {
			commit('SET_INGREDIENTE', data)
		} else throw new Error('User not found!')
	},
	updateQtdIngredientes({ commit }, payload) {
		commit('UPDATE_QTD_INGREDIENTES', payload)
	},
	resetIngredienteFields({ commit }) {
		commit('RESET_INGREDIENTE_FIELDS')
	},
	resetIngredienteState({ commit }) {
		commit('RESET_INGREDIENTE_STATE')
	},
	updateQtdIngredientesInLanche({ state, commit }, payload) {
		const QTD = 1
		const itensLanche = payload
		const getItemLanche = l => itensLanche.find(i => i.id === l.id)
		const update = item => {
			const itemLanche = getItemLanche(item)
			if (itemLanche) {
				item.qtd = QTD
				return item
			}
			return item
		}
		const updatedsIngredientes = state.ingredientes.map(i => update(i))
		commit('SET_INGREDIENTES', updatedsIngredientes)
	},
	resetQtdIngredientesInLanche({ state, commit }) {
		const reset = ingrediente => {
			ingrediente.qtd = 0
			return ingrediente
		}
		const updatedsIngredientes = state.ingredientes.map(l => reset(l))
		commit('SET_INGREDIENTES', updatedsIngredientes)
	}
}
