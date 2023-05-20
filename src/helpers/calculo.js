const options = {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2
}
const locale = 'pt-BR'

const calculaTotal = items => {
	const values = items.filter(i => i.qtd > 0).map(i => i.preco * i.qtd)
	return values?.length ? values.reduce((c, n) => c + n) : 0
}

const currencyFormat = value => {
	if (!value) return
	const { maximumFractionDigits, minimumFractionDigits } = options
	const config = { maximumFractionDigits, minimumFractionDigits }
	return value.toLocaleString(locale, config)
}

const currencyFormatBr = value => {
	if (!value) return
	return value.toLocaleString(locale, options)
}

const unCurrency = currency => {
	return Number.parseFloat(currency)
}

export { calculaTotal, currencyFormat, currencyFormatBr, unCurrency }
