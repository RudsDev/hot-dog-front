import { lanches } from '@/services/lanches'

export default {
	async createLanche({ commit }, payload) {
		const resp = await lanches.create(payload)
		resp.data && commit('ADD_LANCHES', resp.data)
		return resp
	},
	setLancheField(context, payload = { value: undefined, field: '' }) {
		const { field, value } = payload
		context.commit(`SET_LANCHE_${field.toUpperCase()}`, value)
	},
	setLanche(context, payload) {
		context.commit(`SET_LANCHE`, payload)
	},
	getLanchesByName({ commit }, payload) {
		if (payload.length > 2) {
			setTimeout(async () => {
				const resp = await lanches.findByName(payload)
				const data = resp.data.length ? resp.data : [{ id: '', name: payload }]
				commit('SET_LANCHES', data)
			}, 400)
		}
	},
	getLanches({ commit }) {
		setTimeout(async () => {
			const resp = await lanches.getAll()
			const data = resp.data.length ? resp.data : []
			commit(
				'SET_LANCHES',
				data.map(d => ({ ...d, qtd: 0 }))
			)
		}, 400)
	},
	async loadLancheById({ commit }, payload) {
		const { data } = await lanches.findById(payload)
		if (data.id) {
			commit('SET_LANCHE', data)
		} else throw new Error('User not found!')
	},
	updateQtdLanches({ commit }, payload) {
		commit('UPDATE_QTD_LANCHES', payload)
	},
	resetLancheFields({ commit }) {
		commit('RESET_LANCHE_FIELDS')
	},
	resetLancheState({ commit }) {
		commit('RESET_LANCHE_STATE')
	},
	updateQtdLanchesInPromo({ state, commit }, payload) {
		const itensPromo = payload
		const getItemPromo = l => itensPromo.find(i => i.lanche.id === l.id)
		const update = lanche => {
			const itemPromo = getItemPromo(lanche)
			if (itemPromo) {
				lanche.qtd = itemPromo.quantidade
				return lanche
			}
			return lanche
		}
		const updatedLanches = state.lanches.map(l => update(l))
		commit('SET_LANCHES', updatedLanches)
	},
	resetQtdLanchesInPromo({ state, commit }) {
		const reset = lanche => {
			lanche.qtd = 0
			return lanche
		}
		const updatedLanches = state.lanches.map(l => reset(l))
		commit('SET_LANCHES', updatedLanches)
	},
	editLanche({ commit, state, dispatch }, payload) {
		const lanche = payload.id
			? state.lanches.find(c => c.id === payload.id)
			: payload

		// console.log(lanche)

		if (lanche) {
			const action = 'ingredientes/updateQtdIngredientesInLanche'
			const payload = lanche.ingredientes
			const options = { root: true }
			dispatch(action, payload, options)
			commit('SET_LANCHE', lanche)
		}
	},
	async removeLanche(context, payload) {
		const resp = await lanches.delete(payload)
		//TODO - Ponto de notificação
		console.log(resp)
		return resp
	},
	async updateLanche({ commit }, payload) {
		const resp = await lanches.update(payload.id, payload)
		//TODO - Ponto de notificação
		const lanche = resp.data
		if (lanche) {
			commit(`SET_LANCHE`, lanche)
		}
		return resp
	},
	resetLancheEdit({ commit, dispatch }) {
		dispatch('resetQtdIngredientesInLanche', { root: true })
		commit('RESET_LANCHE_FIELDS')
	}
}
