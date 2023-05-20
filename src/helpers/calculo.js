const calculaTotal = items => {
	const values = items.filter(i => i.qtd > 0).map(i => i.preco * i.qtd)
	return values?.length ? values.reduce((c, n) => c + n) : 0
}

export { calculaTotal }
