import { required, minLength, helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex(
	'alpha',
	/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]*$/
)

const regex = /^[0-9.,]*$/
const numeric = helpers.regex('numeric', regex)
const MIN_LENGTH = 2

export default {
	validations: {
		nome: {
			required,
			alpha,
			minLength: minLength(MIN_LENGTH)
		},
		preco: {
			required,
			numeric
		}
	}
}
