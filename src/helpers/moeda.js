const options = {
	style: 'currency',
	currency: 'BRL',
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	locale: 'pt-BR'
}

const currencyFormat = value => {
	if (!value) return
	const { maximumFractionDigits, minimumFractionDigits, locale } = options
	const config = { maximumFractionDigits, minimumFractionDigits, locale }
	return value.toLocaleString(locale, config)
}

const currencyFormatBr = value => {
	if (!value) return
	return value.toLocaleString(options.locale, options)
}

const unCurrency = currency => {
	return Number.parseFloat(currency)
}

export { currencyFormat, currencyFormatBr, unCurrency }
