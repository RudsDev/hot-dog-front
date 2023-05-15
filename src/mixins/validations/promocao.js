import { required, minLength, helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex(
	'alpha',
	/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]*$/
)

const regex = /^[0-9.,]*$/
const numeric = helpers.regex('numeric', regex)

export default {
	validations: {
		nome: {
			required,
			alpha,
			minLength: minLength(5)
		},
		baseCalculo: {
			required,
			numeric
		}
	}
}
