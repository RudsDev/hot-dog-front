import { getDefaultState, getDefaultFieldsValues } from './defaultState'

export const SET_INGREDIENTE_ID = 'SET_INGREDIENTE_ID'
export const SET_INGREDIENTE_NOME = 'SET_INGREDIENTE_NOME'
export const SET_INGREDIENTE_PRECO = 'SET_INGREDIENTE_PRECO'

export const SET_INGREDIENTE = 'SET_INGREDIENTE'

export const SET_INGREDIENTES = 'SET_INGREDIENTES'
export const ADD_INGREDIENTES = 'ADD_INGREDIENTES'

export const UPDATE_QTD_INGREDIENTES = 'UPDATE_QTD_INGREDIENTES'

export const RESET_INGREDIENTE_FIELDS = 'RESET_INGREDIENTE_FIELDS'
export const RESET_INGREDIENTE_STATE = 'RESET_INGREDIENTE_STATE'

export default {
	[SET_INGREDIENTE_ID]({ ingrediente }, payload) {
		ingrediente.id = payload
	},
	[SET_INGREDIENTE_NOME]({ ingrediente }, payload) {
		ingrediente.nome = payload
	},
	[SET_INGREDIENTE_PRECO]({ ingrediente }, payload) {
		ingrediente.preco = payload
	},
	[SET_INGREDIENTES]({ ingredientes }, payload) {
		ingredientes.splice(0, payload.length)
		ingredientes.push(...payload)
	},
	[ADD_INGREDIENTES]({ ingredientes }, payload) {
		ingredientes.push(payload)
	},
	[UPDATE_QTD_INGREDIENTES]({ ingredientes }, payload) {
		ingredientes[payload.index].qtd = payload.value
	},
	[RESET_INGREDIENTE_STATE](state) {
		Object.assign(state, getDefaultState())
	},
	[RESET_INGREDIENTE_FIELDS](state) {
		Object.assign(state.ingrediente, getDefaultFieldsValues())
	},
	[SET_INGREDIENTE]({ ingrediente }, payload) {
		Object.assign(ingrediente, payload)
	}
}
