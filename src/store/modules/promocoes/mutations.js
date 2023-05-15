import { getDefaultState, getDefaultFieldsValues } from './defaultState'

export const SET_PROMOCAO = 'SET_PROMOCAO'
export const SET_PROMOCAO_ID = 'SET_PROMOCAO_ID'
export const SET_PROMOCAO_NOME = 'SET_PROMOCAO_NOME'
export const SET_PROMOCAO_PRECO = 'SET_PROMOCAO_PRECO'

export const SET_PROMOCOES = 'SET_PROMOCOES'
export const ADD_PROMOCOES = 'ADD_PROMOCOES'

export const UPDATE_QTD_PROMOCOES = 'UPDATE_QTD_PROMOCOES'

export const RESET_PROMOCAO_FIELDS = 'RESET_PROMOCAO_FIELDS'
export const RESET_PROMOCAO_STATE = 'RESET_PROMOCAO_STATE'

export default {
	[SET_PROMOCAO](state, payload) {
		const id = payload.id || Date.now()
		const { nome, tipoCalculo, baseCalculo, itens } = payload
		state.promocao = {
			id: id,
			nome,
			tipoCalculo,
			baseCalculo,
			itens
		}
	},
	[SET_PROMOCAO_ID]({ promocao }, payload) {
		promocao.id = payload
	},
	[SET_PROMOCAO_NOME]({ promocao }, payload) {
		promocao.nome = payload
	},
	[SET_PROMOCAO_PRECO]({ promocao }, payload) {
		promocao.preco = payload
	},
	[SET_PROMOCOES]({ promocoes }, payload) {
		promocoes.splice(0, payload.length)
		promocoes.push(...payload)
	},
	[ADD_PROMOCOES]({ promocoes }, payload) {
		promocoes.push(payload)
	},
	[UPDATE_QTD_PROMOCOES]({ promocoes }, payload) {
		promocoes[payload.index].qtd = payload.value
	},
	[RESET_PROMOCAO_STATE](state) {
		Object.assign(state, getDefaultState())
	},
	[RESET_PROMOCAO_FIELDS](state) {
		Object.assign(state.promocao, getDefaultFieldsValues())
	}
}
