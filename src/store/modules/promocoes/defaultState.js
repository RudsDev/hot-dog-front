export const getDefaultFieldsValues = () => {
	return {
		id: undefined,
		nome: undefined,
		tipoCalculo: undefined,
		baseCalculo: 0,
		itens: []
	}
}

export const getDefaultState = () => {
	return {
		promocao: getDefaultFieldsValues(),
		promocoes: [],
		tiposCalculo: [
			{ id: 1, nome: 'Acréscimo valor' },
			{ id: 2, nome: 'Desconto valor' },
			{ id: 3, nome: 'Acréscimo porcentagem' },
			{ id: 4, nome: 'Desconto porcentagem' }
		]
	}
}
