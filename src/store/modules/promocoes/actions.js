import { promocoes } from '@/services/promocoes'

export default {
	async createPromocao({ commit }, payload) {
		const resp = await promocoes.create(payload)
		resp.data && commit('ADD_PROMOCOES', resp.data)
	},
	async updatePromocao({ commit }, payload) {
		const resp = await promocoes.update(payload.id, payload)
		//TODO - Ponto de notificação
		const promocao = resp.data
		if (promocao) {
			commit(`SET_PROMOCAO`, promocao)
		}
	},
	async removePromocao(context, payload) {
		const resp = await promocoes.delete(payload)
		//TODO - Ponto de notificação
		console.log(resp)
	},
	setPromocaoField(context, payload = { value: undefined, field: '' }) {
		const { field, value } = payload
		context.commit(`SET_PROMOCAO_${field.toUpperCase()}`, value)
	},
	setPromocao(context, payload) {
		context.commit(`SET_PROMOCAO`, payload)
	},
	getPromocoesByName({ commit }, payload) {
		if (payload.length > 2) {
			setTimeout(async () => {
				const resp = await promocoes.findByName(payload)
				const data = resp.data.length ? resp.data : [{ id: '', name: payload }]
				commit('SET_PROMOCOES', data)
			}, 400)
		}
	},
	getPromocoes({ commit }) {
		setTimeout(async () => {
			const resp = await promocoes.getAll()
			const data = resp.data.length ? resp.data : []
			commit(
				'SET_PROMOCOES',
				data.map(d => ({ ...d, qtd: 0 }))
			)
		}, 400)
	},
	async loadPromocaoById({ commit }, payload) {
		const { data } = await promocoes.findById(payload)
		if (data.id) {
			commit('SET_PROMOCAO', data)
		} else throw new Error('User not found!')
	},
	updateQtdPromocoes({ commit }, payload) {
		commit('UPDATE_QTD_PROMOCOES', payload)
	},
	resetPromocaoFields({ commit }) {
		commit('RESET_PROMOCAO_FIELDS')
	},
	resetPromocaoEdit({ commit, dispatch }) {
		dispatch('resetQtdLanchesInPromo', { root: true })
		commit('RESET_PROMOCAO_FIELDS')
	},
	resetPromocaoState({ commit }) {
		commit('RESET_PROMOCAO_STATE')
	},
	editPromocao({ commit, state, dispatch }, payload) {
		const promocao = payload.id
			? state.promocoes.find(c => c.id === payload.id)
			: payload

		if (promocao) {
			const action = 'lanches/updateQtdLanchesInPromo'
			const payload = promocao.itens
			const options = { root: true }
			dispatch(action, payload, options)
			commit('SET_PROMOCAO', promocao)
		}
	}
}
