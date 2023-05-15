export const getDefaultFieldsValues = () => {
	return {
		id: undefined,
		nome: undefined,
		preco: undefined,
		qtd: 0
	}
}

export const getDefaultState = () => {
	return {
		ingrediente: getDefaultFieldsValues(),
		ingredientes: []
	}
}
