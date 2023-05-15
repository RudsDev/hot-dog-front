import { getDefaultState, getDefaultFieldsValues } from './defaultState'

export const SET_LANCHE_ID = 'SET_LANCHE_ID'
export const SET_LANCHE_NOME = 'SET_LANCHE_NOME'
export const SET_LANCHE_PRECO = 'SET_LANCHE_PRECO'

export const SET_LANCHE = 'SET_LANCHE'

export const SET_LANCHES = 'SET_LANCHES'
export const ADD_LANCHES = 'ADD_LANCHES'

export const UPDATE_QTD_LANCHES = 'UPDATE_QTD_LANCHES'

export const RESET_LANCHE_FIELDS = 'RESET_LANCHE_FIELDS'
export const RESET_LANCHE_STATE = 'RESET_LANCHE_STATE'

export default {
	[SET_LANCHE_ID]({ lanche }, payload) {
		lanche.id = payload
	},
	[SET_LANCHE_NOME]({ lanche }, payload) {
		lanche.nome = payload
	},
	[SET_LANCHE_PRECO]({ lanche }, payload) {
		lanche.preco = payload
	},
	[SET_LANCHES]({ lanches }, payload) {
		lanches.splice(0, payload.length)
		lanches.push(...payload)
	},
	[ADD_LANCHES]({ lanches }, payload) {
		lanches.push(payload)
	},
	[UPDATE_QTD_LANCHES]({ lanches }, payload) {
		lanches[payload.index].qtd = payload.value
	},
	[RESET_LANCHE_STATE](state) {
		Object.assign(state, getDefaultState())
	},
	[RESET_LANCHE_FIELDS](state) {
		Object.assign(state.lanche, getDefaultFieldsValues())
	},
	[SET_LANCHE]({ lanche }, payload) {
		Object.assign(lanche, payload)
	}
}
