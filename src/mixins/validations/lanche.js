import { required, minLength, helpers } from 'vuelidate/lib/validators'

const alpha = helpers.regex(
	'alpha',
	/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9 ]*$/
)

export default {
	validations: {
		nome: {
			required,
			alpha,
			minLength: minLength(5)
		}
	}
}
